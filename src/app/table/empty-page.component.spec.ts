import { TestBed } from '@angular/core/testing'
import { expectNoA11yViolations, runA11yChecks } from '@ppwcode/ng-unit-testing'
import { EmptyTablePageComponent } from './empty-page.component'

describe('EmptyTablePageComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [EmptyTablePageComponent]
        })
    )

    it('should create', () => {
        const fixture = TestBed.createComponent(EmptyTablePageComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    it('should have no accessibility violations in its default state', async () => {
        const fixture = TestBed.createComponent(EmptyTablePageComponent)
        fixture.detectChanges()
        const results = await runA11yChecks(fixture.nativeElement)
        expectNoA11yViolations(results)
    })
})
