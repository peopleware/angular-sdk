// @ts-check

const eslint = require('@eslint/js')
const { FlatCompat } = require('@eslint/eslintrc')
const angular = require('angular-eslint')
const noSecrets = require('eslint-plugin-no-secrets')
const tseslint = require('typescript-eslint')

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: eslint.configs.recommended,
    allConfig: eslint.configs.all
})

const noSecretsRule = {
    'no-secrets/no-secrets': ['error', { tolerance: 4.3 }]
}

const angularSelectorRules = {
    '@angular-eslint/directive-selector': [
        'error',
        {
            type: 'attribute',
            prefix: 'ppw',
            style: 'camelCase'
        }
    ],
    '@angular-eslint/component-selector': [
        'error',
        {
            type: 'element',
            prefix: 'ppw',
            style: 'kebab-case'
        }
    ]
}

const ppwcodeLibraries = [
    'ng-async',
    'ng-common',
    'ng-common-components',
    'ng-dialogs',
    'ng-forms',
    'ng-router',
    'ng-state-management',
    'ng-unit-testing',
    'ng-utils',
    'ng-wireframe'
]

module.exports = tseslint.config(
    {
        ignores: ['dist/**/*', 'node_modules/**/*']
    },
    ...compat.extends('plugin:depend/recommended'),
    {
        files: ['**/*.ts'],
        extends: [eslint.configs.recommended, ...tseslint.configs.recommended, ...angular.configs.tsRecommended],
        processor: angular.processInlineTemplates,
        plugins: {
            'no-secrets': noSecrets
        },
        rules: {
            ...angularSelectorRules,
            '@angular-eslint/prefer-on-push-component-change-detection': ['error'],
            ...noSecretsRule
        }
    },
    {
        files: ['**/*.html'],
        extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
        plugins: {
            'no-secrets': noSecrets
        },
        rules: {
            ...noSecretsRule
        }
    },
    ...ppwcodeLibraries.map((libraryName) => ({
        files: [`projects/ppwcode/${libraryName}/**/*.ts`],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    paths: [
                        {
                            name: `@ppwcode/${libraryName}`,
                            message: `Use a relative import instead. Importing from @ppwcode/${libraryName} is not allowed inside this lib directory.`
                        }
                    ]
                }
            ]
        }
    }))
)
