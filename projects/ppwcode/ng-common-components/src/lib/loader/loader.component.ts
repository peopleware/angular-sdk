import { Component, input, InputSignal } from '@angular/core'
import { MatProgressBar } from '@angular/material/progress-bar'

@Component({
    selector: 'ppw-loader',
    standalone: true,
    imports: [MatProgressBar],
    templateUrl: './loader.component.html',
    styleUrl: './loader.component.scss'
})
export class LoaderComponent {
    public loading: InputSignal<boolean | null> = input<boolean | null>(false)
}
