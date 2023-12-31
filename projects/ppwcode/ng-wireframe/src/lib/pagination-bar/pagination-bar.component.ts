import { Component, EventEmitter, Input, Output } from '@angular/core'

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { PagedAsyncResult } from '@ppwcode/ng-async'

@Component({
    selector: 'ppw-pagination-bar',
    standalone: true,
    imports: [MatPaginatorModule],
    templateUrl: './pagination-bar.component.html'
})
export class PaginationBarComponent {
    @Input({ required: true }) public pagedAsyncResult!: PagedAsyncResult<never, never>
    @Input() public hidePageSize = true
    @Input() public showFirstLastButtons = false
    @Input() public pageSizeOptions: number[] = []
    @Output() public page = new EventEmitter<PageEvent>()

    public handlePageEvent(e: PageEvent): void {
        this.page.emit(e)
    }
}
