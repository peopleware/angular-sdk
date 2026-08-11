import { HttpHeaders, HttpParams } from '@angular/common/http'
import { PostResourceOptions, _generatePostResourceRequest } from './post-resource'

describe('_generatePostResourceRequest', () => {
    it('should return undefined when url function returns undefined', () => {
        const options: PostResourceOptions<object, object, void, void> = {
            body: () => ({}),
            bodyMapper: (v) => v,
            url: () => undefined
        }

        const requestFn = _generatePostResourceRequest(options)
        const result = requestFn()

        expect(result).toBeUndefined()
    })

    it('should return undefined when url function returns empty string', () => {
        const options: PostResourceOptions<object, object, void, void> = {
            body: () => ({}),
            bodyMapper: (v) => v,
            url: () => ''
        }

        const requestFn = _generatePostResourceRequest(options)
        const result = requestFn()

        expect(result).toBeUndefined()
    })

    it('should return a POST request with correct url when no query params', () => {
        const options: PostResourceOptions<object, object, void, void> = {
            body: () => ({}),
            bodyMapper: (v) => v,
            url: () => '/fakeapi'
        }

        const requestFn = _generatePostResourceRequest(options)
        const result = requestFn()

        expect(result).toEqual({
            url: '/fakeapi',
            method: 'POST',
            headers: undefined,
            body: {}
        })
    })

    it('should return a POST request with query params appended to url', () => {
        const options: PostResourceOptions<object, object, void, void> = {
            body: () => ({}),
            bodyMapper: (v) => v,
            url: () => '/fakeapi',
            requestOptions: {
                queryParams: () => new HttpParams().set('foo', 'bar').set('baz', 'qux')
            }
        }

        const requestFn = _generatePostResourceRequest(options)
        const result = requestFn()

        expect(result).toEqual({
            url: '/fakeapi?foo=bar&baz=qux',
            method: 'POST',
            headers: undefined,
            body: {}
        })
    })

    it('should return a POST request with body mapped to DTO', () => {
        const options: PostResourceOptions<{ name: string }, { mappedName: string }, void, void> = {
            body: () => ({ name: 'Test' }),
            bodyMapper: (v) => ({ mappedName: v.name }),
            url: () => '/fakeapi'
        }

        const requestFn = _generatePostResourceRequest(options)
        const result = requestFn()

        expect(result).toEqual({
            url: '/fakeapi',
            method: 'POST',
            headers: undefined,
            body: { mappedName: 'Test' }
        })
    })

    it('should return a POST request with headers when provided', () => {
        const headers = new HttpHeaders({ 'Custom-Header': 'value' })
        const options: PostResourceOptions<object, object, void, void> = {
            body: () => ({}),
            bodyMapper: (v) => v,
            url: () => '/fakeapi',
            requestOptions: {
                headers: () => headers
            }
        }

        const requestFn = _generatePostResourceRequest(options)
        const result = requestFn()

        expect(result).toEqual({
            url: '/fakeapi',
            method: 'POST',
            headers,
            body: {}
        })
    })
})
