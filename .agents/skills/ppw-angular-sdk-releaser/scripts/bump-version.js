const fs = require('fs')
const path = require('path')

const repoRoot = process.cwd()
const packagesRoot = path.join(repoRoot, 'projects', 'ppwcode')
const versionsFile = path.join(
    repoRoot,
    'projects',
    'ppwcode',
    'ng-sdk',
    'schematics',
    'ng-add',
    'dependencies',
    'versions.ts'
)
const appComponentHtml = path.join(repoRoot, 'src', 'app', 'app.component.html')

const semverPattern =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/

const fail = (message) => {
    console.error(message)
    process.exit(1)
}

const parseVersion = (version) => {
    const match = version.match(semverPattern)

    if (!match) {
        fail(`Invalid version "${version}". Expected a SemVer-style version such as 21.5.1.`)
    }

    return {
        raw: version,
        major: Number(match[1]),
        minor: Number(match[2]),
        patch: Number(match[3]),
        prerelease: match[4]?.split('.') ?? []
    }
}

const comparePrerelease = (left, right) => {
    if (!left.length && !right.length) {
        return 0
    }

    if (!left.length) {
        return 1
    }

    if (!right.length) {
        return -1
    }

    const length = Math.max(left.length, right.length)

    for (let index = 0; index < length; index++) {
        const leftPart = left[index]
        const rightPart = right[index]

        if (leftPart === undefined) {
            return -1
        }

        if (rightPart === undefined) {
            return 1
        }

        const leftNumeric = /^\d+$/.test(leftPart)
        const rightNumeric = /^\d+$/.test(rightPart)

        if (leftNumeric && rightNumeric) {
            const difference = Number(leftPart) - Number(rightPart)

            if (difference !== 0) {
                return difference
            }

            continue
        }

        if (leftNumeric) {
            return -1
        }

        if (rightNumeric) {
            return 1
        }

        if (leftPart !== rightPart) {
            return leftPart.localeCompare(rightPart)
        }
    }

    return 0
}

const compareVersions = (left, right) => {
    for (const part of ['major', 'minor', 'patch']) {
        const difference = left[part] - right[part]

        if (difference !== 0) {
            return difference
        }
    }

    return comparePrerelease(left.prerelease, right.prerelease)
}

const readPackageJsonFiles = () => {
    if (!fs.existsSync(packagesRoot)) {
        fail(`Could not find packages directory: ${packagesRoot}`)
    }

    return fs
        .readdirSync(packagesRoot, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => path.join(packagesRoot, entry.name, 'package.json'))
        .filter((packageJsonPath) => fs.existsSync(packageJsonPath))
        .sort()
}

const readPackageJson = (packageJsonPath) => {
    try {
        return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    } catch (error) {
        fail(`Could not parse ${packageJsonPath}: ${error.message}`)
    }
}

const updatePpwcodeDependencyRanges = (packageJson, newVersion) => {
    for (const dependencySection of ['dependencies', 'peerDependencies', 'devDependencies']) {
        const dependencies = packageJson[dependencySection]

        if (!dependencies) {
            continue
        }

        for (const dependencyName of Object.keys(dependencies)) {
            if (dependencyName.startsWith('@ppwcode/')) {
                dependencies[dependencyName] = `^${newVersion}`
            }
        }
    }
}

const updateVersionsFile = (newVersion) => {
    const content = fs.readFileSync(versionsFile, 'utf8')
    const ppwcodeVersionPattern = /(ppwcode:\s*')[^']+(')/

    if (!ppwcodeVersionPattern.test(content)) {
        fail(`Could not update versions.ppwcode in ${versionsFile}`)
    }

    const updatedContent = content.replace(ppwcodeVersionPattern, `$1${newVersion}$2`)

    fs.writeFileSync(versionsFile, updatedContent)
}

const updateAppComponentHtml = (newVersion) => {
    const content = fs.readFileSync(appComponentHtml, 'utf8')
    const versionInfoPattern = /(<div\s+class="version-info"\s*>\s*<div>)v[^<]+(<\/div>\s*<\/div>)/

    if (!versionInfoPattern.test(content)) {
        fail(`Could not update .version-info in ${appComponentHtml}`)
    }

    const updatedContent = content.replace(versionInfoPattern, `$1v${newVersion}$2`)

    fs.writeFileSync(appComponentHtml, updatedContent)
}

const newVersion = process.argv[2]

if (!newVersion) {
    fail('Missing version. Usage: node .agents/skills/ppw-angular-sdk-releaser/scripts/bump-version.js <version>')
}

const parsedNewVersion = parseVersion(newVersion)
const packageJsonFiles = readPackageJsonFiles()

if (!packageJsonFiles.length) {
    fail(`No library package.json files found under ${packagesRoot}`)
}

const packageJsonEntries = packageJsonFiles.map((packageJsonPath) => ({
    path: packageJsonPath,
    packageJson: readPackageJson(packageJsonPath)
}))
const currentVersions = [...new Set(packageJsonEntries.map((entry) => entry.packageJson.version))]

if (currentVersions.some((version) => !version)) {
    fail('One or more library package.json files are missing a version field.')
}

if (currentVersions.length !== 1) {
    fail(`Library package versions are inconsistent: ${currentVersions.join(', ')}`)
}

const currentVersion = currentVersions[0]
const parsedCurrentVersion = parseVersion(currentVersion)

if (compareVersions(parsedNewVersion, parsedCurrentVersion) < 0) {
    fail(`New version ${newVersion} is lower than current version ${currentVersion}. Release bump stopped.`)
}

for (const entry of packageJsonEntries) {
    entry.packageJson.version = newVersion
    updatePpwcodeDependencyRanges(entry.packageJson, newVersion)
    fs.writeFileSync(entry.path, JSON.stringify(entry.packageJson, null, 4) + '\n')
}

updateVersionsFile(newVersion)
updateAppComponentHtml(newVersion)

console.log(`Updated ${packageJsonEntries.length} library package.json files to ${newVersion}.`)
console.log(`Updated internal @ppwcode/* dependency ranges to ^${newVersion}.`)
console.log(`Updated ${path.relative(repoRoot, versionsFile)}.`)
console.log(`Updated ${path.relative(repoRoot, appComponentHtml)}.`)
