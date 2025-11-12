import { registerLocaleData } from '@angular/common'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import localeEn from '@angular/common/locales/en-BE'
import localeNl from '@angular/common/locales/nl-BE'
import { LOCALE_ID } from '@angular/core'
import { MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatDateFormats } from '@angular/material/core'
import { bootstrapApplication } from '@angular/platform-browser'
import { provideRouter, TitleStrategy, withViewTransitions } from '@angular/router'
import { provideTranslateService } from '@ngx-translate/core'
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader'
import {
    PPW_ASYNC_RESULT_DEFAULT_OPTIONS,
    PpwAsyncResultDefaultOptions,
    ppwHttpErrorExtractorWithTranslatedMessages
} from '@ppwcode/ng-async'
import { provideGlobalErrorHandler } from '@ppwcode/ng-common'
import { PPW_TABLE_DEFAULT_OPTIONS } from '@ppwcode/ng-common-components'
import { providePaginationOptions, TranslatedPageTitleStrategy } from '@ppwcode/ng-router'
import { AppComponent } from './app/app.component'
import { routes } from './app/app.routes'
import { EmptyAsyncResultComponent } from './app/table/empty-async-result.component'
import { getLuxonFormatter } from './app/table/table-demo.component'

registerLocaleData(localeEn)
registerLocaleData(localeNl)

const DATE_FORMATS: MatDateFormats = {
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

const translationLocationPrefix =
    window.location.host === 'peopleware.github.io' ? '/angular-sdk/assets/i18n/' : '/assets/i18n/'

bootstrapApplication(AppComponent, {
    providers: [
        { provide: LOCALE_ID, useValue: 'en-US' },
        { provide: TitleStrategy, useClass: TranslatedPageTitleStrategy },
        { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
        { provide: PPW_TABLE_DEFAULT_OPTIONS, useValue: { dateColumnFormatter: getLuxonFormatter('dd/MM/yyyy') } },
        {
            provide: PPW_ASYNC_RESULT_DEFAULT_OPTIONS,
            useValue: { emptyResultComponent: EmptyAsyncResultComponent } as PpwAsyncResultDefaultOptions
        },
        provideRouter(routes, withViewTransitions()),
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
        providePaginationOptions({
            // Defaults
            skipLocationChange: false,
            replaceUrl: true
        }),
        provideHttpClient(withInterceptorsFromDi()),
        provideTranslateService({
            fallbackLang: 'en',
            loader: provideTranslateHttpLoader({
                prefix: translationLocationPrefix,
                suffix: '.json'
            })
        })
    ]
}).catch((err) => console.error(err))

window.ppwcodeHttpErrorExtractor = ppwHttpErrorExtractorWithTranslatedMessages
