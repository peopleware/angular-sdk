import { Routes } from '@angular/router'
import { getRouteSegment } from '../../projects/ppwcode/ng-router/src/lib/route-map/route-retrieval'
import { ROUTE_MAP } from './app.routes'
import ComponentsDashboardDemoComponent from './components-dashboard-demo/components-dashboard-demo.component'
import ConfirmationDialogDemoComponent from './confirmation-dialog-demo/confirmation-dialog-demo.component'
import EditableTableComponent from './editable-table/editable-table.component'
import ExpandableCardDemoComponent from './expandable-card/expandable-card-demo.component'
import MessageBarComponent from './message-bar/message-bar.component'
import TableDemoComponent from './table/table-demo.component'

export const componentsRoutes: Routes = [
    { path: '', component: ComponentsDashboardDemoComponent, title: 'navigation.components' },
    {
        path: getRouteSegment(ROUTE_MAP.components.confirmationDialog),
        component: ConfirmationDialogDemoComponent,
        title: 'navigation.confirmation_dialog'
    },
    {
        path: getRouteSegment(ROUTE_MAP.components.expandableCard),
        component: ExpandableCardDemoComponent,
        title: 'navigation.expandable_card'
    },
    { path: getRouteSegment(ROUTE_MAP.components.table), component: TableDemoComponent, title: 'navigation.table' },
    {
        path: getRouteSegment(ROUTE_MAP.components.formTable),
        component: EditableTableComponent,
        title: 'navigation.form_table'
    },
    {
        path: getRouteSegment(ROUTE_MAP.components.messageBar),
        component: MessageBarComponent,
        title: 'navigation.message_bar'
    },
    {
        path: getRouteSegment(ROUTE_MAP.components.asyncResult),
        loadComponent: () => import('./async-result-demo/async-result-demo.component').then((m) => m.AsyncResultDemoComponent),
        title: 'navigation.async_result'
    },
    {
        path: getRouteSegment(ROUTE_MAP.components.fileDownload),
        loadComponent: () => import('./file-download-demo/file-download-demo.component').then((m) => m.FileDownloadDemoComponent),
        title: 'navigation.file_download'
    },
    {
        path: getRouteSegment(ROUTE_MAP.components.draggableDialog),
        loadComponent: () =>
            import('./draggable-dialog-demo/draggable-dialog-demo.component').then((m) => m.DraggableDialogDemoComponent),
        title: 'navigation.draggable_dialog'
    },
    {
        path: getRouteSegment(ROUTE_MAP.components.formsDemo),
        loadComponent: () => import('./forms-demo/forms-demo.component').then((m) => m.FormsDemoComponent),
        title: 'navigation.forms_demo'
    },
    {
        path: getRouteSegment(ROUTE_MAP.components.routeMap),
        loadComponent: () => import('./route-map-demo/route-map-demo.component').then((m) => m.RouteMapDemoComponent),
        title: 'navigation.route_map'
    },
    {
        path: getRouteSegment(ROUTE_MAP.components.signalStore),
        loadComponent: () => import('./signal-store-demo/signal-store-demo.component').then((m) => m.SignalStoreDemoComponent),
        title: 'navigation.signal_store'
    },
    {
        path: getRouteSegment(ROUTE_MAP.components.utilsDemo),
        loadComponent: () => import('./utils-demo/utils-demo.component').then((m) => m.UtilsDemoComponent),
        title: 'navigation.utils_demo'
    }
]
