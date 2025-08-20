
import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'

import { MatCardModule } from '@angular/material/card'

@Component({
    selector: 'ppw-search-filter',
    templateUrl: './search-filter.component.html',
    styleUrls: ['./search-filter.component.scss'],
    imports: [MatCardModule, MatButtonModule]
})
export class SearchFilterComponent {
    // Inputs
    public submitDisabled: InputSignal<boolean> = input(false)
    public allowReset: InputSignal<boolean> = input(true)
    public searchLabel: InputSignal<string> = input('Search')
    public resetLabel: InputSignal<string> = input('Reset')

    // Outputs
    public search: OutputEmitterRef<void> = output<void>()
    public clear: OutputEmitterRef<void> = output<void>()
    /**
     * @deprecated This output will be removed in v20. It should be replaced with the `restart` output.
     */
    public reset: OutputEmitterRef<void> = this.clear
}
