import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core'

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { PagedAsyncResult } from '@ppwcode/ng-async'

@Component({
    selector: 'ppw-pagination-bar',
    standalone: true,
    imports: [MatPaginatorModule],
    templateUrl: './pagination-bar.component.html'
})
export class PaginationBarComponent {
    // Inputs
    public pagedAsyncResult: InputSignal<PagedAsyncResult<unknown, unknown>> = input.required()
    public hidePageSize: InputSignal<boolean> = input(true)
    public showFirstLastButtons: InputSignal<boolean> = input(false)
    public pageSizeOptions: InputSignal<Array<number>> = input<Array<number>>([])

    // Outputs
    public page: OutputEmitterRef<PageEvent> = output()

    public handlePageEvent(e: PageEvent): void {
        this.page.emit(e)
    }
}
