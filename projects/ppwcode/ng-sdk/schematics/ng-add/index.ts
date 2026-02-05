import { chain, Rule, Tree } from '@angular-devkit/schematics'
import { addPackageJsonDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies'
import { dependencies, devDependencies } from './dependencies/dependencies'

export function ngAdd(): Rule {
    return chain([addDependenciesToPackageJson()])
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
