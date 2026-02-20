import { Routes } from '@angular/router'
import { BREADCRUMB_KEY } from '@ppwcode/ng-router'
import { defineRoute } from '../../projects/ppwcode/ng-router/src/lib/route-map/define-route'
import { getRouteSegment } from '../../projects/ppwcode/ng-router/src/lib/route-map/route-retrieval'
import { DashboardItemDemoComponent } from './dashboard-item-demo/dashboard-item-demo.component'
import { GlobalErrorHandlerComponent } from './global-error-handler/global-error-handler.component'
import { InMemoryLoggingDemoComponent } from './logging/in-memory-logging-demo/in-memory-logging-demo.component'

export const ROUTE_MAP = {
    components: defineRoute('components', {
        confirmationDialog: defineRoute('confirmation-dialog'),
        expandableCard: defineRoute('expandable-card'),
        table: defineRoute('table'),
        formTable: defineRoute('form-table'),
        messageBar: defineRoute('message-bar'),
        asyncResult: defineRoute('async-result'),
        fileDownload: defineRoute('file-download'),
        draggableDialog: defineRoute('draggable-dialog'),
        formsDemo: defineRoute('forms'),
        routeMap: defineRoute('route-map'),
        signalStore: defineRoute('signal-store'),
        utilsDemo: defineRoute('utils')
    }),
    dashboardItem: defineRoute('dashboard-item'),
    globalErrorHandler: defineRoute('global-error-handler'),
    inMemoryLogging: defineRoute('in-memory-logging'),
    subscriptionHandling: defineRoute('subscription-handling'),
    localStorage: defineRoute('local-storage')
}

export const routes: Routes = [
    { path: '', redirectTo: getRouteSegment(ROUTE_MAP.dashboardItem), pathMatch: 'full' },
    {
        path: getRouteSegment(ROUTE_MAP.components),
        title: 'navigation.components',
        loadComponent: () =>
            import('./components-page-container/components-page-container.component').then((it) => it.default),
        loadChildren: () => import('./components.routes').then((it) => it.componentsRoutes),
        data: { [BREADCRUMB_KEY]: 'navigation.components' }
    },
    {
        path: getRouteSegment(ROUTE_MAP.dashboardItem),
        component: DashboardItemDemoComponent,
        title: 'navigation.dashboard_item'
    },
    {
        path: getRouteSegment(ROUTE_MAP.inMemoryLogging),
        component: InMemoryLoggingDemoComponent,
        title: 'navigation.in_memory_logging'
    },
    {
        path: getRouteSegment(ROUTE_MAP.globalErrorHandler),
        component: GlobalErrorHandlerComponent,
        title: 'navigation.global_error_handler'
    },
    {
        path: getRouteSegment(ROUTE_MAP.subscriptionHandling),
        loadComponent: () =>
            import('./subscription-handling-demo/subscription-handling-demo.component').then((m) => m.SubscriptionHandlingDemoComponent),
        title: 'navigation.subscription_handling'
    },
    {
        path: getRouteSegment(ROUTE_MAP.localStorage),
        loadComponent: () =>
            import('./local-storage-demo/local-storage-demo.component').then((m) => m.LocalStorageDemoComponent),
        title: 'navigation.local_storage'
    }
]
