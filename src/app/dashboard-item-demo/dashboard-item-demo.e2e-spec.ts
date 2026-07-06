import { verifyE2eA11y } from '@ppwcode/ng-e2e-testing'

verifyE2eA11y({
    name: 'dashboard item demo has no WCAG 2.2 AA violations',
    path: 'dashboard-item',
    includeSelector: 'ppw-dashboard-item-demo',
    readyLocator: (page) => page.locator('mat-card-title', { hasText: 'Components' })
})
