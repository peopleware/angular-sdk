import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core'
import { PpwTranslationMap } from '../models/ppw-translation-map.model'

@Pipe({
    name: 'ppwApiTranslate',
    standalone: true
})
export class PpwApiTranslatePipe implements PipeTransform {
    private locale = inject(LOCALE_ID)

    transform(value?: PpwTranslationMap): string {
        if (value !== null && value !== undefined) {
            const lang = this.locale.substring(0, 2)
            return value[lang ?? 'en'] ?? value
        }
        return ''
    }
}
