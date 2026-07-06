import { verifyE2eA11y } from '@ppwcode/ng-e2e-testing'

verifyE2eA11y({
    name: 'in-memory logging demo has no WCAG 2.2 AA violations',
    path: 'in-memory-logging',
    includeSelector: 'ppw-in-memory-logging-demo',
    readyLocator: (page) => page.getByRole('button', { name: 'Add debug line' })
})
