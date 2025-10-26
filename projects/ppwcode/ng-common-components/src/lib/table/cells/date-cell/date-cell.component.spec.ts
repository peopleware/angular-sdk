import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DateCellComponent } from './date-cell.component'
import { signal, WritableSignal } from '@angular/core'

describe('DateCellComponent', () => {
    let component: DateCellComponent
    let fixture: ComponentFixture<DateCellComponent>
    let valueSignal: WritableSignal<string>

    beforeEach(async () => {
        valueSignal = signal('01/01/2024')

        await TestBed.configureTestingModule({
            imports: [DateCellComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(DateCellComponent)
        component = fixture.componentInstance
        component.value = valueSignal
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should display the given value', () => {
        expect(fixture.debugElement.nativeElement.innerHTML).toEqual('01/01/2024')
    })

    it('should update the displayed value when the signal changes', () => {
        valueSignal.set('11/03/2024')
        fixture.detectChanges()
        expect(fixture.debugElement.nativeElement.innerHTML).toEqual('11/03/2024')
    })
})
