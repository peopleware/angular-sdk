/// <reference types="node" />

import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: './src/app',
    testMatch: '**/*.e2e-spec.ts',
    fullyParallel: true,
    forbidOnly: !!process.env['CI'],
    retries: process.env['CI'] ? 2 : 0,
    workers: process.env['CI'] ? 1 : undefined,
    reporter: process.env['CI'] ? 'github' : 'list',
    use: {
        baseURL: 'http://127.0.0.1:4200/angular-sdk/',
        trace: 'retain-on-failure'
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ]
})
