import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, inject, Injectable, Injector, NgZone } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { notUndefined } from '@ppwcode/js-ts-oddsandends/lib/conditional-assert'
import { GlobalErrorDialogComponent } from './global-error-dialog.component'

/**
 * Handle any errors thrown by Angular application.
 */
@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
    #injector: Injector = inject(Injector)

    dialogRef?: MatDialogRef<GlobalErrorDialogComponent>

    // This flag is only here to ensure a clean testing output.
    // NEVER set this to true, only in the spec file of this class.
    preventConsoleErrorLogging = false
    pageIsBeingUnloaded = false

    constructor() {
        super()

        window.addEventListener('beforeunload', this.onPageUnloading.bind(this))
    }

    public override handleError(error: Error | HttpErrorResponse | string): void {
        if (this.pageIsBeingUnloaded) {
            return
        }

        if (!this.preventConsoleErrorLogging) {
            super.handleError(error)
        }

        this.zone.runTask(() => {
            if (this.dialogRef === undefined) {
                this.openDialog()
            }

            notUndefined(this.dialogRef).componentInstance.errors.push({
                errorInstance: this.extractErrorInstance(error),
                message: this.extractErrorMessage(error)
            })
        })
    }

    public onPageUnloading(): void {
        this.pageIsBeingUnloaded = true
    }

    public extractErrorInstance(error: Error | HttpErrorResponse | string): Error | null {
        return error instanceof Error ? error : error instanceof HttpErrorResponse ? error.error : null
    }

    public extractErrorMessage(error: Error | HttpErrorResponse | string): string {
        return error instanceof Error || error instanceof HttpErrorResponse ? error.message : error
    }

    private get dialog(): MatDialog {
        return this.#injector.get(MatDialog)
    }

    private get zone(): NgZone {
        return this.#injector.get(NgZone)
    }

    private openDialog(): void {
        this.dialogRef = this.dialog.open(GlobalErrorDialogComponent, { closeOnNavigation: false, disableClose: true })

        this.dialogRef.afterClosed().subscribe(() => {
            this.dialogRef = undefined
        })
    }
}
