import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ExpandableCardDemoComponent } from './expandable-card/expandable-card-demo.component'
import { DemoComponent } from './demo/demo.component'

const routes: Routes = [
    { path: '', redirectTo: 'expandable-card', pathMatch: 'full' },
    { path: 'expandable-card', component: ExpandableCardDemoComponent, title: 'navigation.expandable_card' },
    { path: 'demo', component: DemoComponent, title: 'navigation.demo' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
