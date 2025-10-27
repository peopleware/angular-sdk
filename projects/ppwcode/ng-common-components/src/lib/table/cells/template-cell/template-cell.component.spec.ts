import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { PpwTableModule } from '../../table.module'

@Component({
    template: ` <ppw-table [data]="data" [trackBy]="trackBy">
        <ppw-column type="template" name="rowIndex">
            <ng-template ppw-column-cell let-rowIndex="rowIndex" let-row>
                <span class="row-id">Row id: {{ row.id }}</span>
                <span class="row-index">Row index: {{ rowIndex }}</span>
            </ng-template>
        </ppw-column>
    </ppw-table>`,
    imports: [PpwTableModule]
})
class TemplateCellHostComponent {
    public data: Array<{ id: number }> = [{ id: 128 }, { id: 129 }]

    public readonly trackBy = (_index: number, item: { id: number }): number => item.id
}

describe('TemplateCellComponent', () => {
    let component: TemplateCellHostComponent
    let fixture: ComponentFixture<TemplateCellHostComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TemplateCellHostComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(TemplateCellHostComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should use the correct row indices', () => {
        const rowIdSpans = fixture.debugElement.queryAll(By.css('.row-id'))
        const rowIndexSpans = fixture.debugElement.queryAll(By.css('.row-index'))

        expect(rowIdSpans.length).toBe(2)
        expect(rowIdSpans[0].nativeElement.textContent).toBe('Row id: 128')
        expect(rowIdSpans[1].nativeElement.textContent).toBe('Row id: 129')

        expect(rowIndexSpans.length).toBe(2)
        expect(rowIndexSpans[0].nativeElement.textContent).toBe('Row index: 0')
        expect(rowIndexSpans[1].nativeElement.textContent).toBe('Row index: 1')

        // Switch data order to simulate a drag and drop reorder
        component.data = [component.data[1], component.data[0]]
        fixture.detectChanges()

        const updatedRowIdSpans = fixture.debugElement.queryAll(By.css('.row-id'))
        const updatedRowIndexSpans = fixture.debugElement.queryAll(By.css('.row-index'))

        expect(updatedRowIdSpans.length).toBe(2)
        expect(updatedRowIdSpans[0].nativeElement.textContent).toBe('Row id: 129')
        expect(updatedRowIdSpans[1].nativeElement.textContent).toBe('Row id: 128')

        expect(updatedRowIndexSpans.length).toBe(2)
        expect(updatedRowIndexSpans[0].nativeElement.textContent).toBe('Row index: 0')
        expect(updatedRowIndexSpans[1].nativeElement.textContent).toBe('Row index: 1')
    })
})
