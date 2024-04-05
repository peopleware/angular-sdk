import { AsyncResult, createFailedAsyncResult, createSuccessAsyncResult } from './async-result'
import { PagedEntities } from './paged-entities'

export type PagedAsyncResult<TEntity, TFilter = object | null | undefined> = AsyncResult<
    PagedEntities<TEntity>,
    TFilter
>

export const createSuccessPagedAsyncResult = <TEntity, TFilter = object | null | undefined>(
    entities: PagedEntities<TEntity>,
    filters?: TFilter
): PagedAsyncResult<TEntity, TFilter> => {
    return createSuccessAsyncResult<PagedEntities<TEntity>, TFilter>(entities, filters)
}

export const createFailedPagedAsyncResult = <TEntity, TFilter = object | null | undefined>(
    error: Error,
    entities: PagedEntities<TEntity>,
    filters?: TFilter
): PagedAsyncResult<TEntity, TFilter> => {
    return createFailedAsyncResult<PagedEntities<TEntity>, TFilter>(error, entities, filters)
}
