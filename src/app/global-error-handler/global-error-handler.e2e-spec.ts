import { verifyE2eA11y } from '@ppwcode/ng-e2e-testing'

verifyE2eA11y({
    name: 'global error handler demo has no WCAG 2.2 AA violations',
    path: 'global-error-handler',
    includeSelector: 'ppw-global-error-handler',
    readyLocator: (page) => page.getByRole('button', { name: 'Invoke error' })
})
