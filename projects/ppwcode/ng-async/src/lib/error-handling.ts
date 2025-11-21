import { HttpErrorResponse } from '@angular/common/http'
import { map, Observable, Subscriber } from 'rxjs'
import { STATUS_CODE_MAP } from './constants/error-codes'
import { createFailedAsyncResult } from './models/async-result'
import { createFailedPagedAsyncResult, createSuccessPagedAsyncResult } from './models/paged-async-result'
import { createEmptyPagedEntities, PagedEntities } from './models/paged-entities'

declare global {
    interface Window {
        ppwcodeHttpErrorExtractor?: (httpError: HttpErrorResponse) => Error
    }
}

export const extractHttpError = (httpError: HttpErrorResponse, skipCustomExtractor: boolean = false): Error => {
    // When a global error handler has been defined in the application itself, we should use that one instead of the
    // default implementation that we provided here in the SDK.
    if (window.ppwcodeHttpErrorExtractor && !skipCustomExtractor) {
        return window.ppwcodeHttpErrorExtractor(httpError)
    }

    if (typeof httpError.error === 'object' && httpError.error !== null) {
        if (typeof httpError.error.errors === 'object') {
            const errorKeys = Object.keys(httpError.error.errors)
            return new Error(httpError.error.errors[errorKeys[0]])
        }

        if (Array.isArray(httpError.error.messages) && httpError.error.messages.length > 0) {
            const firstErrorMessage = httpError.error.messages[0]
            if (firstErrorMessage.text === 'DB_UQ_CONSTRAINT_VIOLATION') {
                const parameter = firstErrorMessage.parameters.length > 0 ? firstErrorMessage.parameters[0] : null
                if (parameter) {
                    return new Error(parameter)
                } else {
                    return new Error(firstErrorMessage.text)
                }
            } else {
                return new Error(firstErrorMessage.text ?? firstErrorMessage.code)
            }
        }

        if (typeof httpError.error.title === 'string') {
            return new Error(httpError.error.title)
        }
    }

    return new Error(httpError.error ?? STATUS_CODE_MAP.get(httpError.status) ?? httpError.statusText)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const expectAsyncResultHttpError = <TEntity>(
    statusCodes: Array<number>,
    fallbackValue: TEntity,
    completeOnError = true
) =>
    expectHttpError(
        statusCodes,
        (httpError: HttpErrorResponse) => {
            const error = extractHttpError(httpError)
            return createFailedAsyncResult(error, fallbackValue, null)
        },
        completeOnError
    )

export const expectPagedAsyncResultHttpSuccess = <TEntity, TFilters>(filters?: TFilters) =>
    map((entities: PagedEntities<TEntity>) => createSuccessPagedAsyncResult<TEntity, TFilters>(entities, filters))

export const expectPagedAsyncResultHttpError = <TEntity, TFilters = object | null | undefined>(
    statusCodes: Array<number>,
    filters?: TFilters,
    completeOnError = true
) =>
    function <T>(source: Observable<T>): Observable<T> {
        // This is syntactic sugar for handling the error case of a paged async result. It will create a failed paged async
        // result, meaning that the result type of the handler is actually the same as the value received in the source.
        // That's the reason why T is used twice in the generics of createHttpErrorResponseOperatorObservable.
        return createHttpErrorResponseOperatorObservable<T, T>(
            source,
            statusCodes,
            (httpError: HttpErrorResponse) => {
                const error = extractHttpError(httpError)
                return createFailedPagedAsyncResult<TEntity, TFilters>(
                    error,
                    createEmptyPagedEntities<TEntity>(),
                    filters
                ) as T // Cast to T because we are creating a PagedEntities<T> in the handler but the "item type" can't be inferred.
            },
            completeOnError
        )
    }

export const expectHttpError = <TResult>(
    statusCodes: Array<number>,
    handler: (httpError: HttpErrorResponse) => TResult,
    complete = false
) =>
    function <T>(source: Observable<T>): Observable<T | TResult> {
        return createHttpErrorResponseOperatorObservable(source, statusCodes, handler, complete)
    }

const createHttpErrorResponseOperatorObservable = <T, TResult>(
    source: Observable<T>,
    statusCodes: Array<number>,
    handler: (httpError: HttpErrorResponse) => TResult,
    complete = false
) => {
    return new Observable((subscriber: Subscriber<T | TResult>) =>
        source.subscribe({
            next(value: T) {
                subscriber.next(value)
            },
            error(error: HttpErrorResponse | unknown) {
                if (error instanceof HttpErrorResponse && statusCodes.indexOf(error.status) > -1) {
                    const continueWithValue: TResult = handler(error)
                    subscriber.next(continueWithValue)
                    if (complete) {
                        subscriber.complete()
                    }
                } else {
                    subscriber.error(error)
                }
            },
            complete() {
                subscriber.complete()
            }
        })
    )
}
