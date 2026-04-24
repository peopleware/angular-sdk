import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { expectNoA11yViolations, runA11yChecks } from '@ppwcode/ng-unit-testing'
import { GlobalErrorHandlerComponent } from './global-error-handler.component'

describe('GlobalErrorHandlerComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [GlobalErrorHandlerComponent, NoopAnimationsModule]
        })
    )

    it('should create', () => {
        const fixture = TestBed.createComponent(GlobalErrorHandlerComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    it('should have no accessibility violations in its default state', async () => {
        const fixture = TestBed.createComponent(GlobalErrorHandlerComponent)
        fixture.detectChanges()
        const results = await runA11yChecks(fixture.nativeElement)
        expectNoA11yViolations(results)
    })
})
