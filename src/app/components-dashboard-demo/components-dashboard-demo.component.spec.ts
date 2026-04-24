import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { provideTranslateService } from '@ngx-translate/core'
import { expectNoA11yViolations, runA11yChecks } from '@ppwcode/ng-unit-testing'
import ComponentsDashboardDemoComponent from './components-dashboard-demo.component'

describe('ComponentsDashboardDemoComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [ComponentsDashboardDemoComponent, NoopAnimationsModule, RouterTestingModule],
            providers: [provideTranslateService({})]
        })
    )

    it('should create', () => {
        const fixture = TestBed.createComponent(ComponentsDashboardDemoComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    it('should have no accessibility violations in its default state', async () => {
        const fixture = TestBed.createComponent(ComponentsDashboardDemoComponent)
        fixture.detectChanges()
        const results = await runA11yChecks(fixture.nativeElement)
        expectNoA11yViolations(results)
    })
})
