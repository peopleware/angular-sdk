import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, ViewEncapsulation } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { mixinHandleSubscriptions } from '@ppwcode/ng-common'

@Component({
    selector: 'ppw-language-select',
    templateUrl: './language-select.component.html',
    styleUrls: ['./language-select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [FormsModule, MatFormFieldModule, MatSelectModule, TranslateModule, MatCardModule, MatButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LanguageSelectComponent extends mixinHandleSubscriptions() implements OnInit {
    private translate: TranslateService = inject(TranslateService)
    private cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

    protected readonly ALL_LANGUAGES_VALUES = ['en', 'nl']
    private currentLanguage = this.translate.getDefaultLang()
    public selectedLanguage = this.isValidLanguage(this.currentLanguage) ? this.currentLanguage : null

    ngOnInit(): void {
        this.stopOnDestroy(this.translate.onLangChange).subscribe((event) => {
            this.selectedLanguage = this.isValidLanguage(event.lang) ? event.lang : null
            this.cdr.detectChanges()
        })
    }

    public changeSelectedLanguage(): void {
        if (!this.selectedLanguage) {
            return
        }
        this.translate.use(this.selectedLanguage)
    }

    private isValidLanguage(languageCode: string): boolean {
        return !!this.ALL_LANGUAGES_VALUES.find((lang) => lang === languageCode)
    }
}
