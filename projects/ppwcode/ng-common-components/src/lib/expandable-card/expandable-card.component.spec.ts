import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ExpandableCardComponent } from './expandable-card.component'

describe('ExpandableCardComponent', () => {
    let component: ExpandableCardComponent
    let fixture: ComponentFixture<ExpandableCardComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ExpandableCardComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(ExpandableCardComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
