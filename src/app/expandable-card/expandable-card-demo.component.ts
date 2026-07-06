import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { ExpandableCardComponent } from '@ppwcode/ng-common-components'

@Component({
    selector: 'ppw-expandable-card-demo',
    templateUrl: './expandable-card-demo.component.html',
    styleUrls: ['./expandable-card-demo.component.scss'],
    imports: [ExpandableCardComponent, TranslatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ExpandableCardDemoComponent {}
