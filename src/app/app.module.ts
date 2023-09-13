import { LOCALE_ID, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import localeBe from '@angular/common/locales/nl-BE'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { WireframeComponent } from '@ppwcode/ng-wireframe'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HomeComponent } from './home/home.component'
import { MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatDateFormats } from '@angular/material/core'
import { registerLocaleData } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'

registerLocaleData(localeBe)

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
    declarations: [AppComponent, HomeComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MatIconModule,
        TranslateModule.forRoot({
            defaultLanguage: 'nl',
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        BrowserAnimationsModule,
        ...ppwcodeComponents
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'nl-BE' },
        { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
