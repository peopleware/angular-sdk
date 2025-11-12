import { Component } from '@angular/core'

import { MessageBarComponent as PpwMessageBarComponent, Severity } from '@ppwcode/ng-common-components'

@Component({
    selector: 'ppw-message-bar-demo',
    imports: [PpwMessageBarComponent],
    templateUrl: './message-bar.component.html',
    styleUrls: ['./message-bar.component.scss']
})
export default class MessageBarComponent {
    public readonly severity: typeof Severity = Severity
}
