import { PagedEntities, PagedEntitiesDto } from './paged-entities'

export const createPagedEntitiesDtoMock = <TDto>(dtoEntities: Array<TDto>): PagedEntitiesDto<TDto> => {
    return {
        pageIndex: 1,
        pageSize: dtoEntities.length ?? 20,
        totalCount: dtoEntities.length,
        totalPages: 1,
        hasPreviousPage: false,
        hasNextPage: false,
        items: dtoEntities
    }
}

export const createPagedEntitiesMock = <TModel>(models: Array<TModel>): PagedEntities<TModel> => {
    return {
        pageIndex: 1,
        page: 1,
        pageSize: models.length ?? 20,
        totalCount: models.length,
        totalPages: 1,
        hasPreviousPage: false,
        hasNextPage: false,
        items: models
    }
}
