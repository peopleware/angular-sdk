import { Routes } from '@angular/router'
import { defineRoute, getRouteSegment } from '@ppwcode/ng-router'
import { ConfirmationDialogDemoComponent } from './confirmation-dialog-demo/confirmation-dialog-demo.component'
import { DashboardItemDemoComponent } from './dashboard-item-demo/dashboard-item-demo.component'
import EditableTableComponent from './editable-table/editable-table.component'
import { ExpandableCardDemoComponent } from './expandable-card/expandable-card-demo.component'
import { GlobalErrorHandlerComponent } from './global-error-handler/global-error-handler.component'
import { InMemoryLoggingDemoComponent } from './logging/in-memory-logging-demo/in-memory-logging-demo.component'
import { MessageBarComponent } from './message-bar/message-bar.component'
import { TableDemoComponent } from './table/table-demo.component'

export const ROUTE_MAP = {
    confirmationDialog: defineRoute('confirmation-dialog'),
    expandableCard: defineRoute('expandable-card'),
    dashboardItem: defineRoute('dashboard-item'),
    table: defineRoute('table'),
    formTable: defineRoute('form-table'),
    globalErrorHandler: defineRoute('global-error-handler'),
    inMemoryLogging: defineRoute('in-memory-logging'),
    messageBar: defineRoute('message-bar')
}

export const routes: Routes = [
    { path: '', redirectTo: getRouteSegment(ROUTE_MAP.dashboardItem), pathMatch: 'full' },
    {
        path: getRouteSegment(ROUTE_MAP.confirmationDialog),
        component: ConfirmationDialogDemoComponent,
        title: 'navigation.confirmation_dialog'
    },
    {
        path: getRouteSegment(ROUTE_MAP.expandableCard),
        component: ExpandableCardDemoComponent,
        title: 'navigation.expandable_card'
    },
    {
        path: getRouteSegment(ROUTE_MAP.dashboardItem),
        component: DashboardItemDemoComponent,
        title: 'navigation.dashboard_item'
    },
    { path: getRouteSegment(ROUTE_MAP.table), component: TableDemoComponent, title: 'navigation.table' },
    { path: getRouteSegment(ROUTE_MAP.formTable), component: EditableTableComponent, title: 'navigation.form_table' },
    { path: getRouteSegment(ROUTE_MAP.messageBar), component: MessageBarComponent, title: 'navigation.message_bar' },
    {
        path: getRouteSegment(ROUTE_MAP.inMemoryLogging),
        component: InMemoryLoggingDemoComponent,
        title: 'navigation.in_memory_logging'
    },
    {
        path: getRouteSegment(ROUTE_MAP.globalErrorHandler),
        component: GlobalErrorHandlerComponent,
        title: 'navigation.global_error_handler'
    }
]
