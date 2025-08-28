import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ExampleItemsContainerComponent } from './example-items-container.component'

describe('ExampleItemsContainerComponent', () => {
    let component: ExampleItemsContainerComponent
    let fixture: ComponentFixture<ExampleItemsContainerComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ExampleItemsContainerComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(ExampleItemsContainerComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
