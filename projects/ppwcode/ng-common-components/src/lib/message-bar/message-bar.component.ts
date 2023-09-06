import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { Severity } from '../enum/severity'

@Component({
    selector: 'ppw-message-bar',
    templateUrl: './message-bar.component.html',
    styleUrls: ['./message-bar.component.scss'],
    imports: [CommonModule, MatCardModule],
    standalone: true
})
export class MessageBarComponent {
    @Input({ required: true }) public severity!: Severity
    @Input({ required: true }) public message!: string
}
