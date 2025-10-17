import { TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { provideTranslateService } from '@ngx-translate/core'
import { WireframeComponent } from '@ppwcode/ng-wireframe'
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
            providers: [provideTranslateService({})]
        })
    )

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent)
        const app = fixture.componentInstance
        expect(app).toBeTruthy()
    })
})
