import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ConfirmationDialogDemoComponent } from './confirmation-dialog-demo/confirmation-dialog-demo.component'
import { ExpandableCardDemoComponent } from './expandable-card/expandable-card-demo.component'
import { FilterTableComponent } from './filter-table/filter-table.component'
import { InMemoryLoggingDemoComponent } from './logging/in-memory-logging-demo/in-memory-logging-demo.component'
import { MessageBarComponent } from './message-bar/message-bar.component'

const routes: Routes = [
    { path: '', redirectTo: 'expandable-card', pathMatch: 'full' },
    {
        path: 'confirmation-dialog',
        component: ConfirmationDialogDemoComponent,
        title: 'navigation.confirmation_dialog'
    },
    { path: 'expandable-card', component: ExpandableCardDemoComponent, title: 'navigation.expandable_card' },
    { path: 'filter-table', component: FilterTableComponent, title: 'navigation.filter_table' },
    { path: 'message-bar', component: MessageBarComponent, title: 'navigation.message_bar' },
    { path: 'in-memory-logging', component: InMemoryLoggingDemoComponent, title: 'navigation.in_memory_logging' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
