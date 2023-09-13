import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ExpandableCardDemoComponent } from './expandable-card/expandable-card-demo.component'
import { FilterTableComponent } from './filter-table/filter-table.component'

const routes: Routes = [
    { path: '', redirectTo: 'expandable-card', pathMatch: 'full' },
    { path: 'expandable-card', component: ExpandableCardDemoComponent, title: 'navigation.expandable_card' },
    { path: 'filter-table', component: FilterTableComponent, title: 'navigation.filter_table' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
