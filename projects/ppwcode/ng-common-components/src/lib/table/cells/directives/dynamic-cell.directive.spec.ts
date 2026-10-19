import { Component, signal, ViewContainerRef } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { ColumnType } from '../../columns/column'
import { TextColumn } from '../../columns/text-column'
import { DateCellComponent } from '../date-cell/date-cell.component'
import { NumberCellComponent } from '../number-cell/number-cell.component'
import { TemplateCellComponent } from '../template-cell/template-cell.component'
import { TextCellComponent } from '../text-cell/text-cell.component'
import { DynamicCellDirective } from './dynamic-cell.directive'

@Component({
    imports: [DynamicCellDirective],
    template: `<div
        ppwDynamicCell
        [column]="column"
        [record]="record()"
        [value]="value()"
        [rowIndex]="rowIndex()"
    ></div>`
})
class TestHostComponent {
    public column = {
        ...new TextColumn('name', 'Name', false, false, signal(false), signal(false)),
        type: ColumnType.Text
    }
    public record = signal<Record<string, unknown>>({ name: 'Alice' })
    public value = signal<string | null>(null)
    public rowIndex = signal(0)
}

describe('DynamicCellDirective', () => {
    let fixture: ComponentFixture<TestHostComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents()
        fixture = TestBed.createComponent(TestHostComponent)
    })

    const cases = [
        { type: ColumnType.Text, component: TextCellComponent },
        { type: ColumnType.Date, component: DateCellComponent },
        { type: ColumnType.Number, component: NumberCellComponent },
        { type: ColumnType.Template, component: TemplateCellComponent },
        { type: undefined, component: TextCellComponent }
    ]

    for (const { type, component } of cases) {
        it(`should create one ${type ?? 'default text'} cell and forward its input signals`, () => {
            fixture.componentInstance.column.type = type!
            fixture.detectChanges()

            const element = fixture.debugElement.query(By.directive(DynamicCellDirective))
            const directive = element.injector.get(DynamicCellDirective)
            const cell = directive.componentRef.instance

            expect(cell).toBeInstanceOf(component)
            expect(cell.column).toBe(directive.column)
            expect(cell.record).toBe(directive.record)
            expect(cell.value).toBe(directive.value)
            expect(cell.rowIndex).toBe(directive.rowIndex)

            fixture.detectChanges()
            expect(element.injector.get(ViewContainerRef).length).toBe(1)
        })
    }

    it('should forward updated inputs without recreating the cell', () => {
        fixture.componentInstance.value.set('Alice')
        fixture.detectChanges()
        const directive = fixture.debugElement
            .query(By.directive(DynamicCellDirective))
            .injector.get(DynamicCellDirective)
        const componentRef = directive.componentRef

        fixture.componentInstance.record.set({ name: 'Bob' })
        fixture.componentInstance.value.set('Bob')
        fixture.componentInstance.rowIndex.set(2)
        fixture.detectChanges()

        expect(directive.componentRef).toBe(componentRef)
        expect(componentRef.instance.record()).toEqual({ name: 'Bob' })
        expect(componentRef.instance.value()).toBe('Bob')
        expect(componentRef.instance.rowIndex()).toBe(2)
        expect(fixture.nativeElement.textContent).toBe('Bob')
    })
})
