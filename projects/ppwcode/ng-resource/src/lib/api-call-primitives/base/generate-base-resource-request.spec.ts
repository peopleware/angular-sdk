import { HttpHeaders, HttpParams } from '@angular/common/http'
import { generateBaseResourceRequest } from './generate-base-resource-request'

describe('generateBaseResourceRequest', () => {
    it('should return undefined when no URL can be resolved', () => {
        expect(generateBaseResourceRequest({ url: () => undefined })).toBeUndefined()
    })

    it('should return the resolved URL and headers', () => {
        const result = generateBaseResourceRequest({
            url: '/api/items',
            requestOptions: {
                headers: new HttpHeaders({ Authorization: 'Bearer token' })
            }
        })

        expect(result?.url).toBe('/api/items')
        expect((result?.headers as HttpHeaders | undefined)?.get('Authorization')).toBe('Bearer token')
    })

    it('should append query params through the URL helper', () => {
        expect(
            generateBaseResourceRequest({
                url: '/api/items',
                requestOptions: {
                    queryParams: () => new HttpParams().set('search', 'unit')
                }
            })?.url
        ).toBe('/api/items?search=unit')
    })
})
