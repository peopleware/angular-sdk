import type { StorybookConfig } from '@storybook/angular'

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-onboarding'],
    framework: '@storybook/angular',
    staticDirs: [
        {
            from: '../../../../src/assets',
            to: '/assets'
        }
    ]
}
export default config
