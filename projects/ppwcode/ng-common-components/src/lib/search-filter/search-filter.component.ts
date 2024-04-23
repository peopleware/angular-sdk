import { CommonModule } from '@angular/common'
import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'

import { MatCardModule } from '@angular/material/card'

@Component({
    selector: 'ppw-search-filter',
    templateUrl: './search-filter.component.html',
    styleUrls: ['./search-filter.component.scss'],
    imports: [MatCardModule, MatButtonModule, CommonModule],
    standalone: true
})
export class SearchFilterComponent {
    // Inputs
    public submitDisabled: InputSignal<boolean> = input(false)
    public allowReset: InputSignal<boolean> = input(true)
    public searchLabel: InputSignal<string> = input('Search')
    public resetLabel: InputSignal<string> = input('Reset')

    // Outputs
    public search: OutputEmitterRef<void> = output<void>()
    public reset: OutputEmitterRef<void> = output<void>()
}
