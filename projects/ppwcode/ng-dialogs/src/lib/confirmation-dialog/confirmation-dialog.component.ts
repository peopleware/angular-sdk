import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { ThemePalette } from '@angular/material/core'
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { DraggableDialogDirective } from '../directives/draggable-dialog.directive'
import { CdkDragHandle } from '@angular/cdk/drag-drop' /* NgxTranslate expects any for params. tslint should stop complaining */

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
    imports: [
        MatDialogModule,
        TranslatePipe,
        TranslateDirective,
        MatButtonModule,
        DraggableDialogDirective,
        CdkDragHandle
    ],
    styleUrls: ['./confirmation-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent {
    public data: ConfirmationDialogData = inject(MAT_DIALOG_DATA)

    get confirmationThemePalette(): ThemePalette {
        return this.data.confirmationThemePalette ?? 'primary'
    }
}
