import { Provider } from '@angular/core'
import {
    TranslateLoader,
    TranslationObject,
    provideTranslateLoader,
    provideTranslateService
} from '@ngx-translate/core'
import { Observable, of } from 'rxjs'

export const provideStaticTranslations = (
    translations: TranslationObject,
    language: string = 'nl'
): Array<Provider> => {
    class StaticTranslationLoader implements TranslateLoader {
        public getTranslation(_: string): Observable<TranslationObject> {
            return of(translations)
        }
    }

    return provideTranslateService({
        lang: language,
        fallbackLang: language,
        loader: provideTranslateLoader(StaticTranslationLoader)
    })
}
