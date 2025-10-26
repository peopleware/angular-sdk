import { signal, WritableSignal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NumberCellComponent } from './number-cell.component'

describe('NumberCellComponent', () => {
    let component: NumberCellComponent
    let fixture: ComponentFixture<NumberCellComponent>
    let valueSignal: WritableSignal<string>

    beforeEach(async () => {
        valueSignal = signal('1.23')

        await TestBed.configureTestingModule({
            imports: [NumberCellComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(NumberCellComponent)
        component = fixture.componentInstance
        component.value = valueSignal
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should display the given value', () => {
        expect(fixture.debugElement.nativeElement.innerHTML).toEqual('1.23')
    })

    it('should update the displayed value when the signal changes', () => {
        valueSignal.set('4.56')
        fixture.detectChanges()
        expect(fixture.debugElement.nativeElement.innerHTML).toEqual('4.56')
    })
})
