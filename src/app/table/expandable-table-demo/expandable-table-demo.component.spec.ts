import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { provideTranslateService } from '@ngx-translate/core'
import { expectNoA11yViolations, runA11yChecks } from '@ppwcode/ng-unit-testing'
import { ExpandableTableDemoComponent } from './expandable-table-demo.component'

describe('ExpandableTableDemoComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [ExpandableTableDemoComponent, NoopAnimationsModule],
            providers: [provideTranslateService({})]
        })
    )

    it('should create', () => {
        const fixture = TestBed.createComponent(ExpandableTableDemoComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    it('should have no accessibility violations in its default state', async () => {
        const fixture = TestBed.createComponent(ExpandableTableDemoComponent)
        fixture.detectChanges()
        const results = await runA11yChecks(fixture.nativeElement)
        expectNoA11yViolations(results)
    })
})
