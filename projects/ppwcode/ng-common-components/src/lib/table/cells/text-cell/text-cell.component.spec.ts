import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TextCellComponent } from './text-cell.component'

describe('TextCellComponent', () => {
    let component: TextCellComponent
    let fixture: ComponentFixture<TextCellComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TextCellComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(TextCellComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
