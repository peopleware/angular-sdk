import { Component, inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { ThemePalette } from '@angular/material/core'
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import {
    TranslateDirective,
    TranslatePipe
} from '@ngx-translate/core' /* NgxTranslate expects any for params. tslint should stop complaining */

/* NgxTranslate expects any for params. tslint should stop complaining */
export interface ConfirmationDialogData {
    titleKey: string
    bodyKey: string

    /* eslint-disable @typescript-eslint/no-explicit-any */
    bodyParams: any
    titleParams: any
    /* eslint-enable */

    confirmationKey: string
    cancelKey: string

    allowConfirmOnly?: boolean

    confirmationThemePalette?: ThemePalette
}

@Component({
    selector: 'ppw-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    imports: [MatDialogModule, TranslatePipe, TranslateDirective, MatButtonModule],
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
    public data: ConfirmationDialogData = inject(MAT_DIALOG_DATA)

    get confirmationThemePalette(): ThemePalette {
        return this.data.confirmationThemePalette ?? 'primary'
    }
}
