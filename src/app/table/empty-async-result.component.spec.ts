import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { expectNoA11yViolations, runA11yChecks } from '@ppwcode/ng-unit-testing'
import { EmptyAsyncResultComponent } from './empty-async-result.component'

describe('EmptyAsyncResultComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [EmptyAsyncResultComponent, NoopAnimationsModule]
        })
    )

    it('should create', () => {
        const fixture = TestBed.createComponent(EmptyAsyncResultComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    it('should have no accessibility violations in its default state', async () => {
        const fixture = TestBed.createComponent(EmptyAsyncResultComponent)
        fixture.detectChanges()
        const results = await runA11yChecks(fixture.nativeElement)
        expectNoA11yViolations(results)
    })
})
