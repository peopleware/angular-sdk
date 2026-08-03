import { Component, input, InputSignal, ChangeDetectionStrategy, inject } from '@angular/core'
import { MatProgressBar } from '@angular/material/progress-bar'
import { TranslatePipe } from '@ngx-translate/core'
import { PPWCODE_COMMON_COMPONENTS_OPTIONS, PpwcodeCommonComponentsTranslationKeys } from '../providers'

@Component({
    selector: 'ppw-loader',
    imports: [MatProgressBar, TranslatePipe],
    templateUrl: './loader.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './loader.component.scss'
})
export class LoaderComponent {
    public loading: InputSignal<boolean | null> = input<boolean | null>(false)
    public translationKeys: PpwcodeCommonComponentsTranslationKeys = inject(PPWCODE_COMMON_COMPONENTS_OPTIONS)
        .translationKeys
}
