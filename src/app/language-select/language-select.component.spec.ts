import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { provideTranslateService } from '@ngx-translate/core'
import { verifyA11y } from '@ppwcode/ng-unit-testing'
import LanguageSelectComponent from './language-select.component'

describe('LanguageSelectComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [LanguageSelectComponent, NoopAnimationsModule],
            providers: [provideTranslateService({})]
        })
    )

    it('should create', () => {
        const fixture = TestBed.createComponent(LanguageSelectComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    verifyA11y(LanguageSelectComponent)
})
