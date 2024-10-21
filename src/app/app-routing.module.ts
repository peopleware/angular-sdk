import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { defineRoute, getRouteSegment } from '@ppwcode/ng-router'
import { ConfirmationDialogDemoComponent } from './confirmation-dialog-demo/confirmation-dialog-demo.component'
import { ExpandableCardDemoComponent } from './expandable-card/expandable-card-demo.component'
import { FilterTableComponent } from './filter-table/filter-table.component'
import { GlobalErrorHandlerComponent } from './global-error-handler/global-error-handler.component'
import { InMemoryLoggingDemoComponent } from './logging/in-memory-logging-demo/in-memory-logging-demo.component'
import { MessageBarComponent } from './message-bar/message-bar.component'

export const ROUTE_MAP = {
    confirmationDialog: defineRoute('confirmation-dialog'),
    expandableCard: defineRoute('expandable-card'),
    filterTable: defineRoute('filter-table'),
    globalErrorHandler: defineRoute('global-error-handler'),
    inMemoryLogging: defineRoute('in-memory-logging'),
    messageBar: defineRoute('message-bar')
}

const routes: Routes = [
    { path: '', redirectTo: getRouteSegment(ROUTE_MAP.expandableCard), pathMatch: 'full' },
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
    { path: getRouteSegment(ROUTE_MAP.filterTable), component: FilterTableComponent, title: 'navigation.filter_table' },
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

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
