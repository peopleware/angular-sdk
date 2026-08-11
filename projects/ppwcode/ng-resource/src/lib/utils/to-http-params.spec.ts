import { paramsToHttpParams, toHttpParams } from './to-http-params'

describe('toHttpParams', () => {
    it('should keep flat primitive values unchanged', () => {
        const result = toHttpParams({ foo: 'bar', count: 3, active: true })

        expect(result.toString()).toEqual('foo=bar&count=3&active=true')
    })

    it('should encode nested object values with bracket notation', () => {
        const result = toHttpParams({ user: { name: 'Ada' } })

        expect(result.toString()).toEqual('user%5Bname%5D=Ada')
    })

    it('should encode multiple nesting levels with bracket notation', () => {
        const result = toHttpParams({ filter: { range: { from: 1 } } })

        expect(result.toString()).toEqual('filter%5Brange%5D%5Bfrom%5D=1')
    })

    it('should append arrays as repeated keys', () => {
        const result = toHttpParams({ tags: ['a', 'b'] })

        expect(result.toString()).toEqual('tags=a&tags=b')
    })

    it('should append nested arrays as repeated bracket keys', () => {
        const result = toHttpParams({ filter: { ids: [1, 2] } })

        expect(result.toString()).toEqual('filter%5Bids%5D=1&filter%5Bids%5D=2')
    })

    it('should omit null and undefined values', () => {
        const result = toHttpParams({ foo: 'bar', empty: null, missing: undefined, nested: { skipped: null } })

        expect(result.toString()).toEqual('foo=bar')
    })

    it('should not add params for empty objects', () => {
        const result = toHttpParams({ filter: {} })

        expect(result.toString()).toEqual('')
    })
})

describe('paramsToHttpParams', () => {
    interface SearchParamsEntity {
        search: string
        includeArchived: boolean
        selectedIds: number[]
    }

    interface SearchParamsDto {
        q: string
        include_archived: boolean
        selected_ids: number[]
    }

    const mapSearchParamsEntityToDto = (entity: SearchParamsEntity): SearchParamsDto => ({
        q: entity.search,
        include_archived: entity.includeArchived,
        selected_ids: entity.selectedIds
    })

    it('should map the params entity to dto params before creating HttpParams', () => {
        const queryParams = paramsToHttpParams(
            () => ({
                search: 'rice',
                includeArchived: false,
                selectedIds: [3, 5]
            }),
            mapSearchParamsEntityToDto
        )

        expect(queryParams().toString()).toEqual('q=rice&include_archived=false&selected_ids=3&selected_ids=5')
    })

    it('should evaluate params lazily on each query params call', () => {
        let search = 'rice'
        const queryParams = paramsToHttpParams(
            () => ({
                search,
                includeArchived: true,
                selectedIds: []
            }),
            mapSearchParamsEntityToDto
        )

        const firstResult = queryParams()
        search = 'pasta'
        const secondResult = queryParams()

        expect(firstResult.toString()).toEqual('q=rice&include_archived=true')
        expect(secondResult.toString()).toEqual('q=pasta&include_archived=true')
    })

    it('should not call the mapper when params are undefined', () => {
        let mapperCalls = 0
        const queryParams = paramsToHttpParams(
            () => undefined,
            (entity: SearchParamsEntity): SearchParamsDto => {
                mapperCalls++
                return mapSearchParamsEntityToDto(entity)
            }
        )

        expect(queryParams().toString()).toEqual('')
        expect(mapperCalls).toBe(0)
    })
})
