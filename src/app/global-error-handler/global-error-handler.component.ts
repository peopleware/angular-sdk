import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MessageBarComponent, Severity } from '@ppwcode/ng-common-components'

@Component({
    selector: 'ppw-global-error-handler',
    standalone: true,
    imports: [MatButtonModule, MessageBarComponent],
    templateUrl: './global-error-handler.component.html'
})
export class GlobalErrorHandlerComponent {
    protected readonly Severity = Severity

    public invokeError() {
        throw new Error('This is a test error invoked by the button!')
    }
}
