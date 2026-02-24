import { UnitTestBuilderOptions } from '@angular/build'
import {
    apply,
    applyTemplates,
    chain,
    MergeStrategy,
    mergeWith,
    move,
    Rule,
    SchematicsException,
    Tree,
    url
} from '@angular-devkit/schematics'
import { workspaces } from '@angular-devkit/core'
import { TargetDefinition } from '@schematics/angular/utility'
import { addPackageJsonDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies'
import { addAngularMaterial } from './angular-material/add'
import { createHost } from './create-host'
import { dependencies, devDependencies } from './dependencies/dependencies'
import { addAngularESLint } from './eslint/add'
import { modifyESLintConfig } from './eslint/modify'

export function ngAdd(): Rule {
    return chain([
        addDependenciesToPackageJson(),
        addAngularESLint(),
        modifyESLintConfig(),
        copyFilesToRoot(),
        addAngularMaterial(),
        addVitestConfig(),
        updatePackageJsonScripts()
    ])
}

/**
 * Adds the listed dependencies and dev dependencies to package.json.
 * This does not install the dependencies, only adds them.
 */
const addDependenciesToPackageJson = () => {
    return (host: Tree): Tree => {
        dependencies.forEach((dependency) => {
            addPackageJsonDependency(host, {
                type: NodeDependencyType.Default,
                name: dependency.name,
                version: dependency.version
            })
        })

        devDependencies.forEach((dependency) => {
            addPackageJsonDependency(host, {
                type: NodeDependencyType.Dev,
                name: dependency.name,
                version: dependency.version
            })
        })

        return host
    }
}

const copyFilesToRoot = () => {
    return mergeWith(
        apply(url('./files'), [applyTemplates({ dot: '.' }), move('/')]),
        MergeStrategy.AllowCreationConflict
    )
}

const addVitestConfig = () => {
    return async (host: Tree) => {
        const workspaceHost = createHost(host)
        const { workspace } = await workspaces.readWorkspace('/', workspaceHost)

        // For each project in the workspace, update the test target to refer to the vitest config file and tsconfig.spec.json
        const projectNames = Array.from(workspace.projects.keys())
        projectNames.forEach((projectName) => {
            const project = workspace.projects.get(projectName)!

            const testTarget: TargetDefinition = project.targets.get('test') ?? { builder: '@angular/build:unit-test' }
            const options: UnitTestBuilderOptions = (testTarget.options ??= {})
            options.runnerConfig = 'vitest.config.ts'
            options.tsConfig = 'tsconfig.spec.json'

            project.targets.set(projectName, testTarget)
        })

        await workspaces.writeWorkspace(workspace, workspaceHost)
    }
}

const updatePackageJsonScripts = () => {
    return (host: Tree) => {
        const path = '/package.json'
        const file = host.read(path)
        if (!file) {
            throw new SchematicsException(`Could not find ${path} to update scripts.`)
        }

        const packageJson = JSON.parse(file.toString('utf-8'))
        const scriptsToDelete = ['build', 'watch', 'test', 'lint']
        scriptsToDelete.forEach((script) => delete packageJson.scripts[script])

        packageJson.scripts = {
            ...packageJson.scripts,
            'ci:build': 'ng build',
            'ci:lint': 'npm run lint:prettier && npm run lint:lint',
            'ci:test': 'ng test --watch=false',
            'lint:lint': 'ng lint',
            'lint:prettier': 'cross-env prettier --check "**/*.{ts,js,json,md,html,scss}"',
            'format:lint': 'ng lint --fix',
            'format:prettier': 'cross-env prettier --write "**/*.{ts,js,json,md,html,scss}"'
        }

        host.overwrite(path, JSON.stringify(packageJson, null, 2))
    }
}
