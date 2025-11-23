import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        // Workaround for the PointerEvent constructor issue in Vitest
        // https://github.com/angular/components/issues/32389
        pool: 'vmThreads'
    }
})
