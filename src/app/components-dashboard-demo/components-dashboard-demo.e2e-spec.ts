import { verifyE2eA11y } from '@ppwcode/ng-e2e-testing'

verifyE2eA11y({
    name: 'components dashboard demo has no WCAG 2.2 AA violations',
    path: 'components',
    includeSelector: 'ppw-components-dashboard-demo',
    readyLocator: (page) => page.getByText('Confirmation Dialog')
})
