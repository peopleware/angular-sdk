import { HttpErrorResponse } from '@angular/common/http'
import { map } from 'rxjs'
import { STATUS_CODE_MAP } from './constants/error-codes'
import { createFailedAsyncResult } from './models/async-result'
import { createFailedPagedAsyncResult, createSuccessPagedAsyncResult } from './models/paged-async-result'
import { createEmptyPagedEntities, PagedEntities } from './models/paged-entities'
import { expectHttpError } from './rxjs-operators/expect-http-error'

declare global {
    interface Window {
        ppwcodeHttpErrorExtractor?: (httpError: HttpErrorResponse) => Error
    }
}

export const extractHttpError = (httpError: HttpErrorResponse): Error => {
    // When a global error handler has been defined in the application itself, we should use that one instead of the
    // default implementation that we provided here in the SDK.
    if (window.ppwcodeHttpErrorExtractor) {
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
                const parameter = firstErrorMessage.parameters?.find((param: string) => param.startsWith('UQ_'))
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const expectPagedAsyncResultHttpSuccess = <TEntity, TFilters>(filters?: TFilters) =>
    map((entities: PagedEntities<TEntity>) => createSuccessPagedAsyncResult<TEntity, TFilters>(entities, filters))

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const expectPagedAsyncResultHttpError = <TEntity, TFilters>(
    statusCodes: Array<number>,
    filters?: TFilters,
    completeOnError = true
) =>
    expectHttpError(
        statusCodes,
        (httpError: HttpErrorResponse) => {
            const error = extractHttpError(httpError)
            return createFailedPagedAsyncResult<TEntity, TFilters>(error, createEmptyPagedEntities<TEntity>(), filters)
        },
        completeOnError
    )
