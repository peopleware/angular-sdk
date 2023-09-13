import { inject, Injectable } from '@angular/core'
import { RouterStateSnapshot, TitleStrategy } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { Title } from '@angular/platform-browser'

@Injectable()
export class TranslatedPageTitleStrategy extends TitleStrategy {
    private translate: TranslateService = inject(TranslateService)

    constructor(private readonly title: Title) {
        super()
    }

    override updateTitle(snapshot: RouterStateSnapshot): void {
        const titleKey = this.buildTitle(snapshot)
        this.translate.get('APP_TITLE').subscribe((appTitle: string) => {
            const pageTitle = titleKey ? this.translate.instant(titleKey) : undefined
            this.title.setTitle((appTitle ?? '') + (appTitle && pageTitle ? ' - ' : '') + (pageTitle ?? ''))
        })
    }
}
