import { HttpErrorResponse } from '@angular/common/http'
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs'
import { expectHttpError } from '../rxjs-operators/expect-http-error'
import { createEmptyPagedEntities, PagedEntities } from './paged-entities'
import { createFailedPagedAsyncResult, createSuccessPagedAsyncResult } from './paged-async-result'

export type AsyncResultStatus = 'pending' | 'failed' | 'success' | 'initial'

export interface AsyncResult<TResult, TFilter = null> {
    status: AsyncResultStatus
    error?: Error
    entity: TResult
    filters: TFilter | null
}

export const createSuccessAsyncResult = <TResult, TFilter = null>(
    entities: TResult,
    filters: TFilter | null = null
): AsyncResult<TResult, TFilter> => {
    return {
        status: 'success',
        entity: entities,
        filters
    }
}

export const createFailedAsyncResult = <TResult, TFilter = null>(
    error: Error,
    entities: TResult,
    filters: TFilter | null = null
): AsyncResult<TResult, TFilter> => {
    return {
        status: 'failed',
        error,
        entity: entities,
        filters
    }
}

export const extractHttpError = (httpError: HttpErrorResponse): Error => {
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

    return new Error(httpError.error ?? httpError.statusText)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const expectAsyncResultHttpError = <TEntity>(statusCodes: Array<number>, fallbackValue: TEntity) =>
    expectHttpError(statusCodes, (httpError: HttpErrorResponse) => {
        const error = extractHttpError(httpError)
        return createFailedAsyncResult(error, fallbackValue, null)
    })

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const expectPagedAsyncResultHttpSuccess = <TEntity, TFilters>(filters?: TFilters) =>
    map((entities: PagedEntities<TEntity>) => createSuccessPagedAsyncResult<TEntity, TFilters>(entities, filters))

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const expectPagedAsyncResultHttpError = <TEntity, TFilters>(statusCodes: Array<number>, filters?: TFilters) =>
    expectHttpError(statusCodes, (httpError: HttpErrorResponse) => {
        const error = extractHttpError(httpError)
        return createFailedPagedAsyncResult<TEntity, TFilters>(error, createEmptyPagedEntities<TEntity>(), filters)
    })

export const executeAsyncOperation = async <TAsyncResult, TAsyncFilter, TSubject>(
    operation$: Observable<AsyncResult<TAsyncResult, TAsyncFilter>>,
    handlers: {
        success: (result: AsyncResult<TAsyncResult, TAsyncFilter>) => void
        error: (result: AsyncResult<TAsyncResult, TAsyncFilter>) => void
    },
    isExecuting$: BehaviorSubject<TSubject>,
    executingStartedValue?: TSubject,
    executingFinishedValue?: TSubject
): Promise<AsyncResult<TAsyncResult, TAsyncFilter>> => {
    isExecuting$.next(executingStartedValue ?? (true as TSubject))
    const result = await firstValueFrom(operation$)
    isExecuting$.next(executingFinishedValue ?? (false as TSubject))

    if (result.status === 'success') {
        handlers.success(result)
    } else if (result.status === 'failed') {
        handlers.error(result)
    }

    return result
}
