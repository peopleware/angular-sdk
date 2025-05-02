import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, inject, Injectable, InjectionToken, Injector } from '@angular/core'

export const ERROR_HANDLERS = new InjectionToken<ErrorHandler[]>('ERROR_HANDLERS')

/**
 * Pass errors to all error handers.
 */
@Injectable()
export class MultiErrorHandler extends ErrorHandler {
    #injector: Injector = inject(Injector)

    public override handleError(error: Error | HttpErrorResponse | string): void {
        this.#injector.get(ERROR_HANDLERS).forEach((handle) => handle.handleError(error))
    }
}
