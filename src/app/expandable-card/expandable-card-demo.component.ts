import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ExpandableCardComponent } from '@ppwcode/ng-common-components'

@Component({
    selector: 'ppw-expandable-card-demo',
    templateUrl: './expandable-card-demo.component.html',
    styleUrls: ['./expandable-card-demo.component.scss'],
    imports: [ExpandableCardComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ExpandableCardDemoComponent {}
