import { LOCALE_ID, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import localeEn from '@angular/common/locales/en-BE'
import { PPW_TABLE_DEFAULT_OPTIONS } from '@ppwcode/ng-common-components'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { WireframeComponent } from '@ppwcode/ng-wireframe'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatDateFormats } from '@angular/material/core'
import { NgOptimizedImage, registerLocaleData } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { TitleStrategy } from '@angular/router'
import { TranslatedPageTitleStrategy } from '@ppwcode/ng-router'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { FormsModule } from '@angular/forms'
import { getLuxonFormatter } from './filter-table/filter-table.component'

registerLocaleData(localeEn)

export const DATE_FORMATS: MatDateFormats = {
    ...MAT_NATIVE_DATE_FORMATS,
    display: {
        ...MAT_NATIVE_DATE_FORMATS.display,
        dateInput: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        } as Intl.DateTimeFormatOptions
    }
}

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http)
}

const ppwcodeComponents = [WireframeComponent]

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MatIconModule,
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        BrowserAnimationsModule,
        ...ppwcodeComponents,
        NgOptimizedImage,
        MatSlideToggleModule,
        FormsModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'en-US' },
        { provide: TitleStrategy, useClass: TranslatedPageTitleStrategy },
        { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
        { provide: PPW_TABLE_DEFAULT_OPTIONS, useValue: { dateColumnFormatter: getLuxonFormatter('dd/MM/yyyy') } }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
