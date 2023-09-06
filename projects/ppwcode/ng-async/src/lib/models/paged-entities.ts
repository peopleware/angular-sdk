export interface PagedEntitiesDto<T> {
    pageIndex: number
    pageSize: number
    totalCount: number
    totalPages: number
    hasPreviousPage: boolean
    hasNextPage: boolean
    items: Array<T>
}

export interface PagedEntities<T> {
    pageIndex: number
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
    return {
        ...pagedEntitiesDto,
        items: pagedEntitiesDto.items.map(entityMapper)
    }
}

export const createEmptyPagedEntities = <T>(): PagedEntities<T> => {
    return {
        pageIndex: 1,
        pageSize: 20,
        totalCount: 0,
        totalPages: 1,
        hasPreviousPage: false,
        hasNextPage: false,
        items: []
    }
}
