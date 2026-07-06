import { verifyE2eA11y } from '@ppwcode/ng-e2e-testing'

verifyE2eA11y({
    name: 'message bar demo has no WCAG 2.2 AA violations',
    path: 'components/message-bar',
    includeSelector: 'ppw-message-bar-demo',
    readyLocator: (page) => page.getByRole('heading', { name: 'Message bar with input parameter message' })
})
