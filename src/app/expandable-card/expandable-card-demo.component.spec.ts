import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { provideTranslateService } from '@ngx-translate/core'
import { verifyA11y } from '@ppwcode/ng-unit-testing'
import ExpandableCardDemoComponent from './expandable-card-demo.component'

describe('ExpandableCardDemoComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [ExpandableCardDemoComponent, NoopAnimationsModule],
            providers: [provideTranslateService({})]
        })
    )

    it('should create', () => {
        const fixture = TestBed.createComponent(ExpandableCardDemoComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    verifyA11y(ExpandableCardDemoComponent)
})
