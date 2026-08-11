import { InjectionToken, ValueProvider } from '@angular/core'

/** Type definition for a function that handles successes from PpwResource. */
export type PpwResourceSuccessHandler<TResult> = (value: Exclude<TResult, undefined>) => void

/** Type definition for a function that handles errors from PpwResource. */
export type PpwResourceErrorHandler = (error: Error) => void

/** Type definition for a function that handles finally blocks from PpwResource. */
export type PpwResourceFinallyHandler = () => void

/** Injection token for providing a default error handler for PpwResource. */
export const PPW_RESOURCE_DEFAULT_ERROR_HANDLER = new InjectionToken<(error: Error) => void>(
    'PPW_RESOURCE_DEFAULT_ERROR_HANDLER'
)

/**
 * Provides a default error handler for PpwResource.
 * @param handler The error handler function to provide.
 * @returns A ValueProvider for the PPW_RESOURCE_DEFAULT_ERROR_HANDLER token.
 */
export const providePpwResourceDefaultErrorHandler = (handler: PpwResourceErrorHandler): ValueProvider => ({
    provide: PPW_RESOURCE_DEFAULT_ERROR_HANDLER,
    useValue: handler
})
