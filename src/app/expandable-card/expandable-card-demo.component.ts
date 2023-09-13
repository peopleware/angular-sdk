import { Component } from '@angular/core'
import { ExpandableCardComponent } from '@ppwcode/ng-common-components'

@Component({
    selector: 'ppw-expandable-card-demo',
    templateUrl: './expandable-card-demo.component.html',
    styleUrls: ['./expandable-card-demo.component.scss'],
    standalone: true,
    imports: [ExpandableCardDemoComponent, ExpandableCardComponent]
})
export class ExpandableCardDemoComponent {}
