import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { expectNoA11yViolations, runA11yChecks } from '@ppwcode/ng-unit-testing'
import ComponentsPageContainerComponent from './components-page-container.component'

describe('ComponentsPageContainerComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [ComponentsPageContainerComponent, RouterTestingModule]
        })
    )

    it('should create', () => {
        const fixture = TestBed.createComponent(ComponentsPageContainerComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    it('should have no accessibility violations in its default state', async () => {
        const fixture = TestBed.createComponent(ComponentsPageContainerComponent)
        fixture.detectChanges()
        const results = await runA11yChecks(fixture.nativeElement)
        expectNoA11yViolations(results)
    })
})
