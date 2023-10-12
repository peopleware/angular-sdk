import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MessageBarComponent as PpwMessageBarComponent, Severity } from '@ppwcode/ng-common-components'

@Component({
    selector: 'ppw-message-bar-demo',
    standalone: true,
    imports: [CommonModule, PpwMessageBarComponent],
    templateUrl: './message-bar.component.html',
    styleUrls: ['./message-bar.component.scss']
})
export class MessageBarComponent {
    public readonly severity: typeof Severity = Severity
}
