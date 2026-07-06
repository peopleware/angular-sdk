import { verifyE2eA11y } from '@ppwcode/ng-e2e-testing'

verifyE2eA11y({
    name: 'form table demo has no WCAG 2.2 AA violations',
    path: 'components/form-table',
    includeSelector: 'ppw-editable-table',
    readyLocator: (page) => page.getByText('Current form array value:')
})
