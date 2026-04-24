import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { expectNoA11yViolations, runA11yChecks } from '@ppwcode/ng-unit-testing'
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

    it('should have no accessibility violations in its default state', async () => {
        const fixture = TestBed.createComponent(MessageBarComponent)
        fixture.detectChanges()
        const results = await runA11yChecks(fixture.nativeElement)
        expectNoA11yViolations(results)
    })
})
