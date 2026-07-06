import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { verifyA11y } from '@ppwcode/ng-unit-testing'
import MessageBarComponent from './message-bar.component'

describe('MessageBarDemoComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [MessageBarComponent, NoopAnimationsModule]
        })
    )

    it('should create', () => {
        const fixture = TestBed.createComponent(MessageBarComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    verifyA11y(MessageBarComponent)
})
