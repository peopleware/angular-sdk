import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DateCellComponent } from './date-cell.component'

describe('DateCellComponent', () => {
    let component: DateCellComponent
    let fixture: ComponentFixture<DateCellComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DateCellComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(DateCellComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
