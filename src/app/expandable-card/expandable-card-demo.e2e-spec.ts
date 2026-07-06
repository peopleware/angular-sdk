import { verifyE2eA11y } from '@ppwcode/ng-e2e-testing'

verifyE2eA11y({
    name: 'expandable card demo has no WCAG 2.2 AA violations',
    path: 'components/expandable-card',
    includeSelector: 'ppw-expandable-card-demo',
    readyLocator: (page) => page.getByText('Demo card which cannot be collapsed')
})
