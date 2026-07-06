import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { verifyA11y } from '@ppwcode/ng-unit-testing'
import ConfirmationDialogDemoComponent from './confirmation-dialog-demo.component'

describe('ConfirmationDialogDemoComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [ConfirmationDialogDemoComponent, NoopAnimationsModule]
        })
    )

    it('should create', () => {
        const fixture = TestBed.createComponent(ConfirmationDialogDemoComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    verifyA11y(ConfirmationDialogDemoComponent)
})
