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
    }
]
