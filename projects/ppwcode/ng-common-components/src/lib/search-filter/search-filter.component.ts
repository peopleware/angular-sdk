import { Component, EventEmitter, Input, Output } from '@angular/core'

import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'

@Component({
    selector: 'ppw-search-filter',
    templateUrl: './search-filter.component.html',
    styleUrls: ['./search-filter.component.scss'],
    imports: [MatCardModule, MatButtonModule],
    standalone: true
})
export class SearchFilterComponent {
    @Input() public submitDisabled = false
    @Output() public search: EventEmitter<void> = new EventEmitter<void>()
    @Output() public reset: EventEmitter<void> = new EventEmitter<void>()
}
