import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormTableComponent } from '../../../projects/ppwcode/ng-common-components/src/lib/table/form-table.component'

describe('FormTableComponent', () => {
    let component: FormTableComponent<unknown>
    let fixture: ComponentFixture<FormTableComponent<unknown>>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: []
        }).compileComponents()

        fixture = TestBed.createComponent(FormTableComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
