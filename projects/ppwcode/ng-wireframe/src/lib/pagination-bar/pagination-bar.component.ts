import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { PagedAsyncResult } from '@ppwcode/ng-async'

@Component({
    selector: 'ppw-pagination-bar',
    standalone: true,
    imports: [CommonModule, MatPaginatorModule],
    templateUrl: './pagination-bar.component.html'
})
export class PaginationBarComponent {
    @Input({ required: true }) public pagedAsyncResult!: PagedAsyncResult<never, never>
    @Input() public hidePageSize = true
    @Output() public page = new EventEmitter<PageEvent>()

    public handlePageEvent(e: PageEvent): void {
        this.page.emit(e)
    }
}
