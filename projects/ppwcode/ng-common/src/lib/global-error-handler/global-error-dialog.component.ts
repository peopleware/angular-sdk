import { Clipboard } from '@angular/cdk/clipboard'
import { DOCUMENT } from '@angular/common'
import { Component, inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatExpansionModule } from '@angular/material/expansion'
import { TranslatePipe } from '@ngx-translate/core'
import { GLOBAL_ERROR_DIALOG_OPTIONS, GlobalErrorDialogOptions } from './global-error-dialog-options'

@Component({
    selector: 'ppw-global-error-dialog',
    templateUrl: './global-error-dialog.component.html',
    styleUrl: './global-error-dialog.component.scss',
    imports: [MatDialogModule, TranslatePipe, MatExpansionModule, MatButtonModule]
})
export class GlobalErrorDialogComponent {
    #options: GlobalErrorDialogOptions = inject(GLOBAL_ERROR_DIALOG_OPTIONS)
    #window: Document = inject(DOCUMENT)
    #clipboard: Clipboard = inject(Clipboard)

    public readonly errors: Array<GlobalError> = []

    public get messages(): GlobalErrorDialogOptions['messages'] {
        return this.#options.messages
    }

    public get canIgnore(): boolean {
        return this.#options.allowIgnore ?? false
    }

    public get canGoHome(): boolean {
        return this.#options.navigation?.home ?? true
    }

    public get canCopyAllErrors(): boolean {
        return this.#options.copy?.allErrors ?? true
    }

    public get canCopySingleError(): boolean {
        return this.#options.copy?.singleError ?? true
    }

    public get canReload(): boolean {
        return this.#options.navigation?.reload ?? true
    }

    public get showGenericErrorMessage(): boolean {
        return !!this.#options.messages.genericErrorMessage
    }

    public reloadPage(): void {
        this.#window.location.reload()
    }

    public toHome(): void {
        this.#window.location.href = '/'
    }

    public copyError(error: GlobalError): void {
        this.copyErrorsToClipboard([error])
    }

    public copyAllErrors(): void {
        this.copyErrorsToClipboard(this.errors)
    }

    private copyErrorsToClipboard(errors: Array<GlobalError>): void {
        const mappedErrors = errors.map((error) => ({
            message: error.message,
            stackTrace: error.errorInstance?.stack
        }))

        this.#clipboard.copy(JSON.stringify(mappedErrors))
    }
}

export interface GlobalError {
    message?: string
    errorInstance?: Error | null
}
