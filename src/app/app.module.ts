import { NgOptimizedImage, registerLocaleData } from '@angular/common'
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import localeEn from '@angular/common/locales/en-BE'
import { LOCALE_ID, NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatCard, MatCardContent } from '@angular/material/card'
import { MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatDateFormats } from '@angular/material/core'
import { MatIconModule } from '@angular/material/icon'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TitleStrategy } from '@angular/router'
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { PPW_ASYNC_RESULT_DEFAULT_OPTIONS, PpwAsyncResultDefaultOptions } from '@ppwcode/ng-async'
import { provideGlobalErrorHandler } from '@ppwcode/ng-common'
import { PPW_TABLE_DEFAULT_OPTIONS } from '@ppwcode/ng-common-components'
import { TranslatedPageTitleStrategy, providePaginationOptions } from '@ppwcode/ng-router'
import { WireframeComponent } from '@ppwcode/ng-wireframe'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { EmptyAsyncResultComponent } from './filter-table/empty-async-result.component'
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
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatIconModule,
        BrowserAnimationsModule,
        ...ppwcodeComponents,
        NgOptimizedImage,
        MatSlideToggleModule,
        FormsModule,
        MatCardContent,
        MatCard
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'en-US' },
        { provide: TitleStrategy, useClass: TranslatedPageTitleStrategy },
        { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
        { provide: PPW_TABLE_DEFAULT_OPTIONS, useValue: { dateColumnFormatter: getLuxonFormatter('dd/MM/yyyy') } },
        {
            provide: PPW_ASYNC_RESULT_DEFAULT_OPTIONS,
            useValue: { emptyResultComponent: EmptyAsyncResultComponent } as PpwAsyncResultDefaultOptions
        },
        provideGlobalErrorHandler({
            errorDialogOptions: {
                allowIgnore: true,
                messages: {
                    title: 'global-error-dialog.title',
                    reload: 'global-error-dialog.reload',
                    ignore: 'global-error-dialog.ignore',
                    copySingleError: 'global-error-dialog.copy-single-error',
                    copyAllErrors: 'global-error-dialog.copy-all-errors',
                    goHome: 'global-error-dialog.go-home',
                    singleErrorDetails: 'global-error-dialog.single-error-details'
                }
            }
        }),
        provideHttpClient(withInterceptorsFromDi()),
        provideTranslateService({
            defaultLanguage: 'en',
            loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] }
        }),
        providePaginationOptions({
            skipLocationChange: false,
            replaceUrl: true
        })
    ]
})
export class AppModule {}
