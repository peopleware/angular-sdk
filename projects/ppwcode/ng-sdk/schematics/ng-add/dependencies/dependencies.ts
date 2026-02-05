import { versions } from './versions'

/**
 * Defines a dependency by name and version.
 */
export interface Dependency {
    name: string
    version: string
}

/**
 * List of dependencies to be added to the project with their versions.
 */
export const dependencies: Array<Dependency> = [
    { name: '@ppwcode/ng-async', version: versions.ppwcode },
    { name: '@ppwcode/ng-common', version: versions.ppwcode },
    { name: '@ppwcode/ng-common-components', version: versions.ppwcode },
    { name: '@ppwcode/ng-dialogs', version: versions.ppwcode },
    { name: '@ppwcode/ng-forms', version: versions.ppwcode },
    { name: '@ppwcode/ng-router', version: versions.ppwcode },
    { name: '@ppwcode/ng-state-management', version: versions.ppwcode },
    { name: '@ppwcode/ng-unit-testing', version: versions.ppwcode },
    { name: '@ppwcode/ng-utils', version: versions.ppwcode },
    { name: '@ppwcode/ng-wireframe', version: versions.ppwcode },
    { name: '@ngx-translate/core', version: versions.ngxTranslateCore },
    { name: '@ngx-translate/http-loader', version: versions.ngxTranslateHttpLoader },
    { name: '@fortawesome/fontawesome-free', version: versions.fontawesomeFree }
]

/**
 * List of dependencies to be added to the project as a dev dependency.
 */
export const devDependencies: Array<Dependency> = [
    { name: '@ppwcode/ng-sdk', version: versions.ppwcode },
    { name: 'cross-env', version: versions.crossEnv },
    { name: 'prettier', version: versions.prettier },
    { name: 'prettier-config-standard', version: versions.prettierConfigStandard },
    { name: 'eslint-plugin-no-secrets', version: versions.eslintPluginNoSecrets }
]
