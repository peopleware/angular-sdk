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
    public clearDisabled: InputSignal<boolean> = input(false)
    public allowReset: InputSignal<boolean> = input(true)
    public searchLabel: InputSignal<string> = input('Search')
    public resetLabel: InputSignal<string> = input('Reset')

    // Outputs
    public performSearch: OutputEmitterRef<void> = output<void>()
    public clear: OutputEmitterRef<void> = output<void>()
    /**
     * @deprecated This output will be removed in v21. It should be replaced with the `performSearch` output.
     */
    // eslint-disable-next-line @angular-eslint/no-output-native
    public search: OutputEmitterRef<void> = output<void>()
    /**
     * @deprecated This output will be removed in v21. It should be replaced with the `clear` output.
     */
    // eslint-disable-next-line @angular-eslint/no-output-native
    public reset: OutputEmitterRef<void> = output<void>()

    protected executeSearch(): void {
        this.performSearch.emit()
        this.search.emit()
    }

    protected executeClear(): void {
        this.clear.emit()
        this.reset.emit()
    }
}
