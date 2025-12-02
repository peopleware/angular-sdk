import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MessageBarComponent, Severity } from '@ppwcode/ng-common-components'

@Component({
    selector: 'ppw-empty-async-result-component',
    template:
        '<ppw-message-bar [severity]="Severity.warning" message="This async result returned unexpectedly with a null value."></ppw-message-bar>',
    imports: [MessageBarComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyAsyncResultComponent {
    protected readonly Severity = Severity
}
