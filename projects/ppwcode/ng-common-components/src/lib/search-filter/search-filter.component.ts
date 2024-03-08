import { Component, EventEmitter, Input, Output } from '@angular/core'

import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'ppw-search-filter',
    templateUrl: './search-filter.component.html',
    styleUrls: ['./search-filter.component.scss'],
    imports: [MatCardModule, MatButtonModule, CommonModule],
    standalone: true
})
export class SearchFilterComponent {
    @Input() public submitDisabled = false
    @Input() public allowReset = true
    @Input() public searchLabel: string = 'Search'
    @Input() public resetLabel: string = 'Reset'
    @Output() public search: EventEmitter<void> = new EventEmitter<void>()
    @Output() public reset: EventEmitter<void> = new EventEmitter<void>()
}
