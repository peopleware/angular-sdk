import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MessageBarComponent } from './message-bar.component'

describe('MessageBarComponent', () => {
    let component: MessageBarComponent
    let fixture: ComponentFixture<MessageBarComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MessageBarComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(MessageBarComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
