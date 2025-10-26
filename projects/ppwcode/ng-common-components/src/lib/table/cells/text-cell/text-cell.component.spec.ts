import { signal, WritableSignal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TextCellComponent } from './text-cell.component'

describe('TextCellComponent', () => {
    let component: TextCellComponent
    let fixture: ComponentFixture<TextCellComponent>
    let valueSignal: WritableSignal<string>

    beforeEach(async () => {
        valueSignal = signal('My text value')

        await TestBed.configureTestingModule({
            imports: [TextCellComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(TextCellComponent)
        component = fixture.componentInstance
        component.value = valueSignal
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should display the given value', () => {
        expect(fixture.debugElement.nativeElement.innerHTML).toEqual('My text value')
    })

    it('should update the displayed value when the signal changes', () => {
        valueSignal.set('Updated text value')
        fixture.detectChanges()
        expect(fixture.debugElement.nativeElement.innerHTML).toEqual('Updated text value')
    })
})
