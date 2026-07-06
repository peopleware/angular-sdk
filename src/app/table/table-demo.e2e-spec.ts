import { verifyE2eA11y } from '@ppwcode/ng-e2e-testing'

verifyE2eA11y({
    name: 'table demo has no WCAG 2.2 AA violations',
    path: 'components/table',
    includeSelector: 'ppw-table-demo',
    readyLocator: (page) => page.getByRole('heading', { name: 'Filter table' })
})
