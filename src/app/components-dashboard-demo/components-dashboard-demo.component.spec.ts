import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { provideTranslateService } from '@ngx-translate/core'
import { verifyA11y } from '@ppwcode/ng-unit-testing'
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

    verifyA11y(ComponentsDashboardDemoComponent)
})
