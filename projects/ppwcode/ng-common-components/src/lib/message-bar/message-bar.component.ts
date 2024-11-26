import { Component, input, InputSignal } from '@angular/core'

import { MatCardModule } from '@angular/material/card'
import { Severity } from '../enum/severity'

@Component({
    selector: 'ppw-message-bar',
    templateUrl: './message-bar.component.html',
    styleUrls: ['./message-bar.component.scss'],
    imports: [MatCardModule]
})
export class MessageBarComponent {
    public severity: InputSignal<Severity> = input.required<Severity>()
    public message: InputSignal<string | null> = input<string | null>(null)
}
