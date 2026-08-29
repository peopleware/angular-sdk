import type { StorybookConfig } from '@storybook/angular-vite'
import { fileURLToPath } from 'node:url'
import { resolve as resolvePath } from 'node:path'
import { mergeConfig, type UserConfig } from 'vite'

const workspaceRoot = fileURLToPath(new URL('../../../', import.meta.url))
const workspaceAliases = {
    '@ppwcode/ng-async': resolvePath(workspaceRoot, 'projects/ppwcode/ng-async/src/public-api.ts'),
    '@ppwcode/ng-common': resolvePath(workspaceRoot, 'projects/ppwcode/ng-common/src/public-api.ts'),
    '@ppwcode/ng-common-components': resolvePath(
        workspaceRoot,
        'projects/ppwcode/ng-common-components/src/public-api.ts'
    ),
    '@ppwcode/ng-dialogs': resolvePath(workspaceRoot, 'projects/ppwcode/ng-dialogs/src/public-api.ts'),
    '@ppwcode/ng-e2e-testing': resolvePath(workspaceRoot, 'projects/ppwcode/ng-e2e-testing/src/public-api.ts'),
    '@ppwcode/ng-forms': resolvePath(workspaceRoot, 'projects/ppwcode/ng-forms/src/public-api.ts'),
    '@ppwcode/ng-ppw-ds': resolvePath(workspaceRoot, 'projects/ppwcode/ng-ppw-ds/src/public-api.ts'),
    '@ppwcode/ng-resource': resolvePath(workspaceRoot, 'projects/ppwcode/ng-resource/src/public-api.ts'),
    '@ppwcode/ng-router': resolvePath(workspaceRoot, 'projects/ppwcode/ng-router/src/public-api.ts'),
    '@ppwcode/ng-state-management': resolvePath(
        workspaceRoot,
        'projects/ppwcode/ng-state-management/src/public-api.ts'
    ),
    '@ppwcode/ng-unit-testing': resolvePath(workspaceRoot, 'projects/ppwcode/ng-unit-testing/src/public-api.ts'),
    '@ppwcode/ng-utils': resolvePath(workspaceRoot, 'projects/ppwcode/ng-utils/src/public-api.ts'),
    '@ppwcode/ng-wireframe': resolvePath(workspaceRoot, 'projects/ppwcode/ng-wireframe/src/public-api.ts')
}

const config: StorybookConfig = {
    stories: ['../**/src/**/*.mdx', '../**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-themes',
        '@storybook/addon-a11y',
        '@storybook/addon-docs',
        '@storybook/addon-onboarding'
    ],
    framework: {
        name: '@storybook/angular-vite',
        options: {
            compodoc: false,
            inlineStylesExtension: 'scss',
            tsconfig: 'projects/ppwcode/.storybook/tsconfig.json'
        }
    },
    async viteFinal(config: UserConfig) {
        return mergeConfig(config, {
            resolve: {
                tsconfigPaths: true,
                alias: workspaceAliases
            }
        })
    },
    staticDirs: [
        {
            from: '../../../src/assets',
            to: '/assets'
        }
    ]
}
export default config
