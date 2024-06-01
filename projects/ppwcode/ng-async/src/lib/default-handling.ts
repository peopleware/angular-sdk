import { map, Observable } from 'rxjs'
import { DEFAULT_HTTP_ERROR_CODES } from './constants/error-codes'
import { expectAsyncResultHttpError, expectPagedAsyncResultHttpError } from './error-handling'
import { createSuccessAsyncResult } from './models/async-result'
import { createSuccessPagedAsyncResult } from './models/paged-async-result'
import { PagedEntities } from './models/paged-entities'

/**
 * Default handling for observables that return a single result.
 * Converts the result to an AsyncResult and handles http errors thrown for the given http error codes.
 *
 * The returned observable will emit with an AsyncResult that is either in status "success" or "failed".
 * The filters property of the async result will be `null`.
 *
 * @param serviceCall$ The observable that returns the result.
 * @param httpErrorCodes The http error codes that should be handled as an error. Defaults to `DEFAULT_HTTP_ERROR_CODES`.
 */
export const handleAsyncResult = <T>(
    serviceCall$: Observable<T>,
    httpErrorCodes: Array<number> = DEFAULT_HTTP_ERROR_CODES
) => {
    return serviceCall$.pipe(
        map((result: T) => createSuccessAsyncResult<T | null>(result)),
        expectAsyncResultHttpError<T | null>(httpErrorCodes, null)
    )
}

/**
 * Default handling for observables that return a single result but the returned entity is ignored.
 * Converts the result to an AsyncResult and handles http errors thrown for the given http error codes.
 *
 * The returned observable will emit with an AsyncResult that is either in status "success" or "failed".
 * The filters property of the async result will be `null`.
 *
 * The entity in the AsyncResult will always be `undefined` because the result of the service call is ignored.
 * @param serviceCall$ The observable that returns the result.
 * @param httpErrorCodes The http error codes that should be handled as an error. Defaults to `DEFAULT_HTTP_ERROR_CODES`.
 */
export const handleAsyncResultIgnoreEntity = <T>(
    serviceCall$: Observable<T>,
    httpErrorCodes: Array<number> = DEFAULT_HTTP_ERROR_CODES
) => {
    return serviceCall$.pipe(
        map(() => createSuccessAsyncResult(void 0)),
        expectAsyncResultHttpError(httpErrorCodes, void 0)
    )
}

/**
 * Default handling for observables that return a paged result.
 * Converts the result to a PagedAsyncResult and handles http errors thrown for the given http error codes.
 *
 * The returned observable will emit with a PagedAsyncResult that is either in status "success" or "failed".
 * The filters property of the async result will be the filters that were passed to this function or `null`.
 * @param serviceCall$ The observable that returns the result.
 * @param httpErrorCodes The http error codes that should be handled as an error. Defaults to `DEFAULT_HTTP_ERROR_CODES`.
 * @param filters The filters that were used to request the paged result.
 */
export const handlePagedAsyncResult = <
    TEntity,
    TFilters extends object | null | undefined,
    T extends PagedEntities<TEntity> = PagedEntities<TEntity>
>(
    serviceCall$: Observable<T>,
    httpErrorCodes: Array<number> = DEFAULT_HTTP_ERROR_CODES,
    filters?: TFilters
) => {
    return serviceCall$.pipe(
        map((r) => createSuccessPagedAsyncResult<TEntity, TFilters>(r, filters)),
        expectPagedAsyncResultHttpError<T, TFilters>(httpErrorCodes, filters)
    )
}
