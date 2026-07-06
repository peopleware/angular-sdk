import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { expectNoA11yViolations, runA11yChecks } from '@ppwcode/ng-unit-testing'
import ExpandableCardDemoComponent from './expandable-card-demo.component'

describe('ExpandableCardDemoComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [ExpandableCardDemoComponent, NoopAnimationsModule]
        })
    )

    it('should create', () => {
        const fixture = TestBed.createComponent(ExpandableCardDemoComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    it('should have no accessibility violations in its default state', async () => {
        const fixture = TestBed.createComponent(ExpandableCardDemoComponent)
        fixture.detectChanges()
        const results = await runA11yChecks(fixture.nativeElement)
        expectNoA11yViolations(results)
    })
})
