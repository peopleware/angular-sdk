import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { provideTranslateService } from '@ngx-translate/core'
import { expectNoA11yViolations, runA11yChecks } from '@ppwcode/ng-unit-testing'
import { InMemoryLoggingDemoComponent } from './in-memory-logging-demo.component'

describe('InMemoryLoggingDemoComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [InMemoryLoggingDemoComponent, NoopAnimationsModule],
            providers: [provideTranslateService({})]
        })
    )

    it('should create', () => {
        const fixture = TestBed.createComponent(InMemoryLoggingDemoComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    it('should have no accessibility violations in its default state', async () => {
        const fixture = TestBed.createComponent(InMemoryLoggingDemoComponent)
        fixture.detectChanges()
        const results = await runA11yChecks(fixture.nativeElement)
        expectNoA11yViolations(results)
    })
})
