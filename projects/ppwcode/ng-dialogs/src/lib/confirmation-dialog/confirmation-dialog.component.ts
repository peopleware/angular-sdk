import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatButtonAppearance, MatButtonModule } from '@angular/material/button'
import { ThemePalette } from '@angular/material/core'
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { DraggableDialogDirective } from '../directives/draggable-dialog.directive'
import { CdkDragHandle } from '@angular/cdk/drag-drop' /* NgxTranslate expects any for params. tslint should stop complaining */

export interface ConfirmationDialogButtonOptions {
    /** The translation key for the button label. */
    key: string
    /** Whether to hide the icon. */
    hideIcon?: boolean
    /** The icon class to use. */
    icon?: string
    /** The appearance variant of the button. */
    type?: MatButtonAppearance
    /** The theme palette color of the button. */
    color?: ThemePalette
}

/* NgxTranslate expects any for params. tslint should stop complaining */
export interface ConfirmationDialogData {
    titleKey: string
    bodyKey: string

    bodyParams?: Record<string, unknown>
    titleParams?: Record<string, unknown>

    /**
     * @deprecated Use confirm.key instead. Will be removed in v23.
     */
    confirmationKey?: string
    /**
     * @deprecated Use cancel.key instead. Will be removed in v23.
     */
    cancelKey?: string

    /**
     * @deprecated Use absence of cancel options to hide the cancel button instead. Will be removed in v23.
     */
    allowConfirmOnly?: boolean

    /**
     * @deprecated Use confirm.color instead. Will be removed in v23.
     */
    confirmationThemePalette?: ThemePalette

    /** Options for the cancel button. */
    cancel?: ConfirmationDialogButtonOptions
    /** Options for the confirmation button. */
    confirm?: ConfirmationDialogButtonOptions
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

    get showCancelButton(): boolean {
        return (
            (this.data.cancel !== undefined || this.data.cancelKey !== undefined) && this.data.allowConfirmOnly !== true
        )
    }

    get confirmationThemePalette(): ThemePalette {
        return this.data.confirm?.color ?? this.data.confirmationThemePalette ?? 'primary'
    }

    get cancelButtonAppearance(): MatButtonAppearance {
        return this.data.cancel?.type ?? 'outlined'
    }

    get confirmationButtonAppearance(): MatButtonAppearance {
        return this.data.confirm?.type ?? 'elevated'
    }

    get cancelKey(): string {
        return this.data.cancel?.key ?? this.data.cancelKey ?? ''
    }

    get confirmationKey(): string {
        return this.data.confirm?.key ?? this.data.confirmationKey ?? ''
    }

    get hideCancelIcon(): boolean {
        return this.data.cancel?.hideIcon ?? false
    }

    get hideConfirmIcon(): boolean {
        return this.data.confirm?.hideIcon ?? false
    }

    get cancelIcon(): string {
        return this.data.cancel?.icon ?? 'fa-solid fa-ban'
    }

    get confirmationIcon(): string {
        return this.data.confirm?.icon ?? 'fa-solid fa-check'
    }

    get titleParams(): Record<string, unknown> {
        return this.data.titleParams ?? {}
    }

    get bodyParams(): Record<string, unknown> {
        return this.data.bodyParams ?? {}
    }
}
