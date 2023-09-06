import { AsyncResult, createFailedAsyncResult, createSuccessAsyncResult } from './async-result'
import { PagedEntities } from './paged-entities'

export type PagedList<TEntity, TFilter = null> = AsyncResult<PagedEntities<TEntity>, TFilter>

export const createSuccessPagedListResult = <TEntity, TFilter = null>(
    entities: PagedEntities<TEntity>,
    filters?: TFilter
): PagedList<TEntity, TFilter> => {
    return createSuccessAsyncResult<PagedEntities<TEntity>, TFilter>(entities, filters)
}

export const createFailedPagedListResult = <TEntity, TFilter = null>(
    error: Error,
    entities: PagedEntities<TEntity>,
    filters?: TFilter
): PagedList<TEntity, TFilter> => {
    return createFailedAsyncResult<PagedEntities<TEntity>, TFilter>(error, entities, filters)
}
