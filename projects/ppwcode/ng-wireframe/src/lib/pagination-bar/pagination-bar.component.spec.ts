import { ChangeDetectionStrategy, Component, input, InputSignal, Signal, viewChild } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { createEmptyPagedEntities, createSuccessAsyncResult, PagedAsyncResult, PagedEntities } from '@ppwcode/ng-async'
import { PaginationBarComponent } from './pagination-bar.component'

describe('Pagination bar component', () => {
    const createTestComponent = async (value: PagedAsyncResult<unknown, unknown> | PagedEntities<unknown>) => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [PaginationBarComponent]
        })
        const fixture = TestBed.createComponent(TestComponent)
        fixture.componentRef.setInput('value', value)
        fixture.detectChanges()
        await fixture.whenStable()
        return fixture
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const verifyPaginationBarEntity = (value: any, expectedEntityValue: any) => async () => {
        const fixture = await createTestComponent(value)
        const component = fixture.componentInstance

        expect(component.paginationBar().entity()).toEqual(expectedEntityValue)
    }

    it(
        'should support paged entities values',
        verifyPaginationBarEntity(createEmptyPagedEntities(), createEmptyPagedEntities())
    )

    it(
        'should support async result values',
        verifyPaginationBarEntity(createSuccessAsyncResult(createEmptyPagedEntities()), createEmptyPagedEntities())
    )
})

@Component({
    template: '<ppw-pagination-bar [pagedAsyncResult]="value()"></ppw-pagination-bar>',
    /* eslint-disable @angular-eslint/prefer-standalone */
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent {
    value: InputSignal<PagedAsyncResult<unknown, unknown> | PagedEntities<unknown>> = input.required()

    paginationBar: Signal<PaginationBarComponent> = viewChild.required(PaginationBarComponent)
}
