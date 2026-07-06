import { verifyE2eA11y } from '@ppwcode/ng-e2e-testing'

verifyE2eA11y({
    name: 'confirmation dialog demo has no WCAG 2.2 AA violations',
    path: 'components/confirmation-dialog',
    includeSelector: 'ppw-confirmation-dialog-demo',
    readyLocator: (page) => page.getByRole('button', { name: 'Request confirmation' })
})
