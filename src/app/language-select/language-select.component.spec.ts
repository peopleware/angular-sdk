import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { provideTranslateService } from '@ngx-translate/core'
import { expectNoA11yViolations, runA11yChecks } from '@ppwcode/ng-unit-testing'
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

    it('should have no accessibility violations in its default state', async () => {
        const fixture = TestBed.createComponent(LanguageSelectComponent)
        fixture.detectChanges()
        const results = await runA11yChecks(fixture.nativeElement)
        expectNoA11yViolations(results)
    })
})
