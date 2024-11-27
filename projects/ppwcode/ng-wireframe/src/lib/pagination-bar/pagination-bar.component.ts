import { Component, computed, input, InputSignal, output, OutputEmitterRef, Signal } from '@angular/core'

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { isAsyncResult, PagedAsyncResult, PagedEntities } from '@ppwcode/ng-async'

@Component({
    selector: 'ppw-pagination-bar',
    imports: [MatPaginatorModule],
    templateUrl: './pagination-bar.component.html'
})
export class PaginationBarComponent {
    // Inputs
    public pagedAsyncResult: InputSignal<PagedAsyncResult<unknown, unknown> | PagedEntities<unknown>> = input.required()
    public hidePageSize: InputSignal<boolean> = input(true)
    public showFirstLastButtons: InputSignal<boolean> = input(false)
    public pageSizeOptions: InputSignal<Array<number>> = input<Array<number>>([])

    // Outputs
    public page: OutputEmitterRef<PageEvent> = output()

    public entity: Signal<PagedEntities<unknown>> = computed(() => {
        const asyncResultInput = this.pagedAsyncResult()
        if (isAsyncResult<unknown, unknown>(asyncResultInput)) {
            return asyncResultInput.entity
        } else {
            return asyncResultInput
        }
    })

    public handlePageEvent(e: PageEvent): void {
        this.page.emit(e)
    }
}
