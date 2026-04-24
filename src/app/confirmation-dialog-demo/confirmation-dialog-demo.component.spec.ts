import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { expectNoA11yViolations, runA11yChecks } from '@ppwcode/ng-unit-testing'
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

    it('should have no accessibility violations in its default state', async () => {
        const fixture = TestBed.createComponent(ConfirmationDialogDemoComponent)
        fixture.detectChanges()
        const results = await runA11yChecks(fixture.nativeElement)
        expectNoA11yViolations(results)
    })
})
