import { ErrorHandler, Provider } from '@angular/core'
import { GLOBAL_ERROR_DIALOG_OPTIONS, GlobalErrorDialogOptions } from './global-error-dialog-options'
import { GlobalErrorHandler } from './global-error-handler'
import { ERROR_HANDLERS, MultiErrorHandler } from './multi-error-handler'

export const provideGlobalErrorHandler = ({
    errorDialogOptions,
    errorHandlers = []
}: {
    errorDialogOptions: GlobalErrorDialogOptions
    errorHandlers?: Array<typeof ErrorHandler>
}): Array<Provider> => {
    const { messages, copy, navigation } = errorDialogOptions

    // Validations to check whether the necessary messages are set based on optional functionality support.
    assertMessageNecessity(
        copy?.singleError ?? true,
        messages.copySingleError,
        'copying a single error to the clipboard'
    )
    assertMessageNecessity(copy?.allErrors ?? true, messages.copyAllErrors, 'copying all errors to the clipboard')
    assertMessageNecessity(navigation?.home ?? true, messages.goHome, 'going to the home page')
    assertMessageNecessity(navigation?.reload ?? true, messages.reload, 'reloading the page')
    assertMessageNecessity(errorDialogOptions.allowIgnore, messages.ignore, 'ignoring the error')

    const errorHandlerProviders: Array<Provider> = errorHandlers.map((handler) => ({
        provide: ERROR_HANDLERS,
        useClass: handler,
        multi: true
    }))

    return [
        {
            provide: ERROR_HANDLERS,
            useClass: GlobalErrorHandler,
            multi: true
        },
        ...errorHandlerProviders,
        {
            provide: ErrorHandler,
            useClass: MultiErrorHandler
        },
        {
            provide: GLOBAL_ERROR_DIALOG_OPTIONS,
            useValue: errorDialogOptions
        }
    ]
}

const assertMessageNecessity = (
    messageShouldBeSet: boolean | undefined,
    message: string | undefined,
    info: string
): void => {
    if (messageShouldBeSet && !message) {
        throw new Error(`The translation key for ${info} is missing.`)
    } else if (!messageShouldBeSet && message) {
        console.warn(`The translation key for ${info} in the global error handler is set but this has no effect.`)
    }
}
