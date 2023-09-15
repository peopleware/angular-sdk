import { AsyncResult, createFailedAsyncResult, createSuccessAsyncResult } from './async-result'
import { PagedEntities } from './paged-entities'

export type PagedAsyncResult<TEntity, TFilter = null> = AsyncResult<PagedEntities<TEntity>, TFilter>

export const createSuccessPagedAsyncResult = <TEntity, TFilter = null>(
    entities: PagedEntities<TEntity>,
    filters?: TFilter
): PagedAsyncResult<TEntity, TFilter> => {
    return createSuccessAsyncResult<PagedEntities<TEntity>, TFilter>(entities, filters)
}

export const createFailedPagedAsyncResult = <TEntity, TFilter = null>(
    error: Error,
    entities: PagedEntities<TEntity>,
    filters?: TFilter
): PagedAsyncResult<TEntity, TFilter> => {
    return createFailedAsyncResult<PagedEntities<TEntity>, TFilter>(error, entities, filters)
}
