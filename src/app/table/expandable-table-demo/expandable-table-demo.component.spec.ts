import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { provideTranslateService } from '@ngx-translate/core'
import { verifyA11y } from '@ppwcode/ng-unit-testing'
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

    verifyA11y(ExpandableTableDemoComponent)
})
