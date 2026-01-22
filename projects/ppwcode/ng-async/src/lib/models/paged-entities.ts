import { notUndefined } from '@ppwcode/ng-utils'

export interface PagedEntitiesDto<T> {
    /** The current page number (1-based). */
    pageIndex?: number
    /** The current page number (1-based). */
    page?: number
    pageSize: number
    totalCount: number
    totalPages: number
    hasPreviousPage: boolean
    hasNextPage: boolean
    items: Array<T>
}

export interface PagedEntities<T> {
    /**
     * @deprecated Use `page` instead. The value is 1-based, but the naming suggested 0-based. Will be removed in v22.
     */
    pageIndex: number
    /** The current page number (1-based). */
    page: number
    pageSize: number
    totalCount: number
    totalPages: number
    hasPreviousPage: boolean
    hasNextPage: boolean
    items: Array<T>
}

export const pagedEntitiesFromDto = <TDto, TModel>(
    pagedEntitiesDto: PagedEntitiesDto<TDto>,
    entityMapper: (dto: TDto) => TModel
): PagedEntities<TModel> => {
    // Prefer 'page' over 'pageIndex' as 'pageIndex' is deprecated
    const page = notUndefined(pagedEntitiesDto.page ?? pagedEntitiesDto.pageIndex)
    return {
        page,
        pageIndex: page, // deprecated
        pageSize: pagedEntitiesDto.pageSize,
        totalCount: pagedEntitiesDto.totalCount,
        totalPages: pagedEntitiesDto.totalPages,
        hasPreviousPage: pagedEntitiesDto.hasPreviousPage,
        hasNextPage: pagedEntitiesDto.hasNextPage,
        items: pagedEntitiesDto.items.map(entityMapper)
    }
}

export const createEmptyPagedEntities = <T>(): PagedEntities<T> => {
    return {
        pageIndex: 1, // deprecated
        page: 1,
        pageSize: 20,
        totalCount: 0,
        totalPages: 1,
        hasPreviousPage: false,
        hasNextPage: false,
        items: []
    }
}
