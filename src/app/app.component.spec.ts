import { TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { By } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { provideTranslateService } from '@ngx-translate/core'
import { provideBreadcrumbOptions } from '@ppwcode/ng-router'
import { verifyA11y } from '@ppwcode/ng-unit-testing'
import { LeftSidenavComponent, WireframeComponent } from '@ppwcode/ng-wireframe'
import { AppComponent } from './app.component'
import LanguageSelectComponent from './language-select/language-select.component'

describe('AppComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [
                AppComponent,
                NoopAnimationsModule,
                RouterTestingModule,
                MatIconModule,
                MatSlideToggleModule,
                FormsModule,
                WireframeComponent,
                LanguageSelectComponent
            ],
            providers: [provideTranslateService({}), provideBreadcrumbOptions()]
        })
    )

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent)
        const app = fixture.componentInstance
        expect(app).toBeTruthy()
    })

    it('should toggle native sidebar links off and on through the wireframe', async () => {
        const fixture = TestBed.createComponent(AppComponent)
        fixture.detectChanges()
        await fixture.whenStable()

        const leftSidenav = fixture.debugElement.query(By.directive(LeftSidenavComponent))
            .componentInstance as LeftSidenavComponent
        const toggle = fixture.debugElement
            .queryAll(By.css('.page-toggles mat-slide-toggle'))
            .find((element) => element.nativeElement.textContent.includes('Use native navigation links'))!
            .nativeElement.querySelector('button') as HTMLButtonElement

        expect(leftSidenav.useNativeLinks()).toBe(false)

        toggle.click()
        fixture.detectChanges()
        await fixture.whenStable()
        expect(leftSidenav.useNativeLinks()).toBe(true)

        toggle.click()
        fixture.detectChanges()
        await fixture.whenStable()
        expect(leftSidenav.useNativeLinks()).toBe(false)
    })

    verifyA11y(AppComponent)
})
