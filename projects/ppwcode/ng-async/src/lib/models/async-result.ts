import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs'

export type AsyncResultStatus = 'pending' | 'failed' | 'success' | 'initial'

export interface AsyncResult<TResult, TFilter = null> {
    status: AsyncResultStatus
    error?: Error
    entity: TResult
    filters: TFilter | null
}

export const isAsyncResult = <TResult, TFilter = null>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    possibleAsyncResult: any
): possibleAsyncResult is AsyncResult<TResult, TFilter> => {
    return (
        typeof possibleAsyncResult === 'object' &&
        possibleAsyncResult !== null &&
        'status' in possibleAsyncResult &&
        'entity' in possibleAsyncResult
    )
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
