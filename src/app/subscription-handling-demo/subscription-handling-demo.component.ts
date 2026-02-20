import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { mixinHandleSubscriptions } from '@ppwcode/ng-common'
import { interval } from 'rxjs'

const SubscriptionHandlerBase = mixinHandleSubscriptions()

@Component({
    selector: 'ppw-subscription-handling-demo',
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: './subscription-handling-demo.component.html',
    styleUrl: './subscription-handling-demo.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionHandlingDemoComponent extends SubscriptionHandlerBase {
    readonly counter = signal(0)

    constructor() {
        super()
        this.stopOnDestroy(interval(1000)).subscribe((value) => {
            this.counter.set(value)
        })
    }
}
