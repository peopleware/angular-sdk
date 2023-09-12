import { Component } from '@angular/core'
import { ExpandableCardComponent } from '@ppwcode/ng-common-components'

@Component({
    selector: 'ppw-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    imports: [ExpandableCardComponent]
})
export class DemoComponent {}
