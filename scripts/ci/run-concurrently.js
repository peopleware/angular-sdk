const concurrently = require('concurrently')
const stream = require('stream')

const logBlockMessage = (message, logFn = console.log) => {
    logFn('*-' + ''.padStart(message.length, '-') + '-*')
    logFn('| ' + message + ' |')
    logFn('*-' + ''.padStart(message.length, '-') + '-*')
}

const oneSecond = 1000
const oneMinute = oneSecond * 60

const startTime = new Date()
let endTime

const output = []

const writable = new stream.Writable({
    write: function (chunk, encoding, next) {
        output.push(chunk.toString())
        next()
    }
})

/**
 * Runs the build commands in parallel.
 * @returns {Promise<unknown>} Returns a promise that resolves when all commands are finished.
 */
const runBuild = (commands) =>
    concurrently(commands, {
        prefix: '[[{name}]] {time}',
        restartTries: 0,
        outputStream: writable
    })

/**
 * Callback for when the parallel build commands all executed successfully.
 */
const onBuildSuccessful = () => {
    endTime = new Date()
    logBlockMessage(`Finished running commands at ${endTime}`)
}

/**
 * Callback for when at least one of the build commands failed.
 * @param error
 */
const onBuildFailed = (error) => {
    process.exitCode = 1

    endTime = new Date()
    logBlockMessage('The following commands failed:', console.error)

    // error also contains successful commands (exit code 0) so we need to filter them out.
    for (let process of error) {
        if (process.exitCode === 1) {
            console.error(`[${process.command.name}] ${process.command.command}`)
        }
    }
}

/**
 * Logs the full duration of the build.
 */
const logBuildDuration = () => {
    const duration = endTime.getTime() - startTime.getTime()
    const durationMilliseconds = duration % oneSecond
    const durationSeconds = Math.floor((duration / oneSecond) % 60)
    const durationMinutes = Math.floor(duration / oneMinute)

    logBlockMessage(`Running the commands took ${durationMinutes}m ${durationSeconds}s ${durationMilliseconds}ms`)

    // Group the logging output per command so that it can be printed together for easier investigations.
    const groupedOutput = {}
    let previousCommand = null
    for (let line of output) {
        const foundCommandNameInLine = line.match(/\[\[(.*?)\]\]/)
        let commandName = foundCommandNameInLine?.[1]
        if (!commandName?.length && previousCommand) {
            commandName = previousCommand
        }

        groupedOutput[commandName] ??= []
        groupedOutput[commandName].push(line.replaceAll(`[[${commandName}]] `, ''))

        previousCommand = commandName
    }

    Object.keys(groupedOutput).forEach((commandName) => {
        console.log(`--- ${commandName} ---`)
        console.log(groupedOutput[commandName].join(''))
    })
}

module.exports = {
    run: (commands) => {
        logBlockMessage(`Started running commands at ${startTime}`)
        runBuild(commands).result.then(onBuildSuccessful, onBuildFailed).finally(logBuildDuration)
    }
}
