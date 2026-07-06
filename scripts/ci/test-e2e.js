const { spawn } = require('child_process')
const http = require('http')
const path = require('path')

const isWindows = process.platform === 'win32'
const serverUrl = 'http://127.0.0.1:4200/angular-sdk/'
const commandExtension = isWindows ? '.cmd' : ''
const nodeBinPath = path.join(__dirname, '..', '..', 'node_modules', '.bin')

const ngCommand = path.join(nodeBinPath, `ng${commandExtension}`)
const playwrightCommand = path.join(nodeBinPath, `playwright${commandExtension}`)
const playwrightArgs = ['test', ...process.argv.slice(2)]

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))
const quoteCommandPart = (commandPart) => `"${commandPart.replaceAll('"', '\\"')}"`

const getSpawnOptions = (command, args) => {
    if (!isWindows) {
        return { command, args, shell: false }
    }

    return {
        command: [command, ...args].map(quoteCommandPart).join(' '),
        args: [],
        shell: true
    }
}

const isServerReady = () =>
    new Promise((resolve) => {
        const request = http.get(serverUrl, (response) => {
            response.resume()
            resolve(response.statusCode >= 200 && response.statusCode < 500)
        })

        request.on('error', () => resolve(false))
        request.setTimeout(1000, () => {
            request.destroy()
            resolve(false)
        })
    })

const waitForServer = async () => {
    const deadline = Date.now() + 120_000

    while (Date.now() < deadline) {
        if (await isServerReady()) {
            return
        }

        await wait(1000)
    }

    throw new Error(`Timed out waiting for ${serverUrl}`)
}

const runCommand = (command, args, options = {}) =>
    new Promise((resolve) => {
        const spawnOptions = getSpawnOptions(command, args)
        const childProcess = spawn(spawnOptions.command, spawnOptions.args, {
            stdio: 'inherit',
            shell: spawnOptions.shell,
            ...options
        })

        childProcess.on('exit', (code) => resolve(code ?? 1))
        childProcess.on('error', (error) => {
            console.error(error)
            resolve(1)
        })
    })

const killProcessTree = (processId) =>
    new Promise((resolve) => {
        if (isWindows) {
            const taskkill = spawn('taskkill', ['/pid', processId.toString(), '/T', '/F'], {
                stdio: 'ignore'
            })
            taskkill.on('exit', resolve)
            taskkill.on('error', resolve)
            return
        }

        try {
            process.kill(-processId, 'SIGTERM')
        } catch {
            try {
                process.kill(processId, 'SIGTERM')
            } catch {
                // The process has already exited.
            }
        }

        resolve()
    })

const run = async () => {
    const serverSpawnOptions = getSpawnOptions(ngCommand, ['serve', '--host', '127.0.0.1', '--port', '4200'])
    const serverProcess = spawn(serverSpawnOptions.command, serverSpawnOptions.args, {
        detached: !isWindows,
        shell: serverSpawnOptions.shell,
        stdio: 'inherit'
    })

    try {
        await waitForServer()
        process.exitCode = await runCommand(playwrightCommand, playwrightArgs)
    } finally {
        await killProcessTree(serverProcess.pid)
    }
}

run()
    .then(() => process.exit(process.exitCode ?? 0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
