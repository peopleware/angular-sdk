import { HttpHeaders, HttpParams } from '@angular/common/http'
import { PutResourceOptions, _generatePutResourceRequest } from './put-resource'

describe('_generatePutResourceRequest', () => {
    it('should return undefined when url function returns undefined', () => {
        const options: PutResourceOptions<object, object, void, void> = {
            body: () => ({}),
            bodyMapper: (v) => v,
            url: () => undefined
        }

        const requestFn = _generatePutResourceRequest(options)
        const result = requestFn()

        expect(result).toBeUndefined()
    })

    it('should return undefined when url function returns empty string', () => {
        const options: PutResourceOptions<object, object, void, void> = {
            body: () => ({}),
            bodyMapper: (v) => v,
            url: () => ''
        }

        const requestFn = _generatePutResourceRequest(options)
        const result = requestFn()

        expect(result).toBeUndefined()
    })

    it('should return undefined when body function returns undefined', () => {
        const options: PutResourceOptions<object, object, void, void> = {
            body: () => undefined,
            bodyMapper: (v) => v,
            url: () => '/fakeapi'
        }

        const requestFn = _generatePutResourceRequest(options)
        const result = requestFn()

        expect(result).toBeUndefined()
    })

    it('should return a PUT request with correct url when no query params', () => {
        const options: PutResourceOptions<object, object, void, void> = {
            body: () => ({}),
            bodyMapper: (v) => v,
            url: () => '/fakeapi'
        }

        const requestFn = _generatePutResourceRequest(options)
        const result = requestFn()

        expect(result).toEqual({
            url: '/fakeapi',
            method: 'PUT',
            headers: undefined,
            body: {}
        })
    })

    it('should return a PUT request with query params appended to url', () => {
        const options: PutResourceOptions<object, object, void, void> = {
            body: () => ({}),
            bodyMapper: (v) => v,
            url: () => '/fakeapi',
            requestOptions: {
                queryParams: () => new HttpParams().set('foo', 'bar').set('baz', 'qux')
            }
        }

        const requestFn = _generatePutResourceRequest(options)
        const result = requestFn()

        expect(result).toEqual({
            url: '/fakeapi?foo=bar&baz=qux',
            method: 'PUT',
            headers: undefined,
            body: {}
        })
    })

    it('should return a PUT request with body mapped to DTO', () => {
        const options: PutResourceOptions<{ name: string }, { mappedName: string }, void, void> = {
            body: () => ({ name: 'Test' }),
            bodyMapper: (v) => ({ mappedName: v.name }),
            url: () => '/fakeapi'
        }

        const requestFn = _generatePutResourceRequest(options)
        const result = requestFn()

        expect(result).toEqual({
            url: '/fakeapi',
            method: 'PUT',
            headers: undefined,
            body: { mappedName: 'Test' }
        })
    })

    it('should return a PUT request with headers when provided', () => {
        const headers = new HttpHeaders({ 'Custom-Header': 'value' })
        const options: PutResourceOptions<object, object, void, void> = {
            body: () => ({}),
            bodyMapper: (v) => v,
            url: () => '/fakeapi',
            requestOptions: {
                headers: () => headers
            }
        }

        const requestFn = _generatePutResourceRequest(options)
        const result = requestFn()

        expect(result).toEqual({
            url: '/fakeapi',
            method: 'PUT',
            headers,
            body: {}
        })
    })
})
