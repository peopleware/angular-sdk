import { HttpHeaders, HttpParams } from '@angular/common/http'
import { GetResourceOptions, _generateGetResourceRequest } from './get-resource'

describe('_generateGetResourceRequest', () => {
    it('should return undefined when url function returns undefined', () => {
        const options: GetResourceOptions<void, void> = {
            responseMapper: (v) => v,
            url: () => undefined
        }

        const requestFn = _generateGetResourceRequest(options)
        const result = requestFn()

        expect(result).toBeUndefined()
    })

    it('should return undefined when url function returns empty string', () => {
        const options: GetResourceOptions<void, void> = {
            responseMapper: (v) => v,
            url: () => ''
        }

        const requestFn = _generateGetResourceRequest(options)
        const result = requestFn()

        expect(result).toBeUndefined()
    })

    it('should return a request with correct url when no query params', () => {
        const options: GetResourceOptions<void, void> = {
            responseMapper: (v) => v,
            url: () => '/fakeapi'
        }

        const requestFn = _generateGetResourceRequest(options)
        const result = requestFn()

        expect(result).toEqual({
            url: '/fakeapi',
            headers: undefined
        })
    })

    it('should return a GET request with query params appended to url', () => {
        const options: GetResourceOptions<void, void> = {
            responseMapper: (v) => v,
            url: () => '/fakeapi',
            requestOptions: {
                queryParams: () => new HttpParams().set('foo', 'bar').set('baz', 'qux')
            }
        }

        const requestFn = _generateGetResourceRequest(options)
        const result = requestFn()

        expect(result).toEqual({
            url: '/fakeapi?foo=bar&baz=qux',
            headers: undefined
        })
    })

    it('should return a GET request with headers when provided', () => {
        const headers = new HttpHeaders({ 'Custom-Header': 'value' })
        const options: GetResourceOptions<void, void> = {
            responseMapper: (v) => v,
            url: () => '/fakeapi',
            requestOptions: {
                headers: () => headers
            }
        }

        const requestFn = _generateGetResourceRequest(options)
        const result = requestFn()

        expect(result).toEqual({
            url: '/fakeapi',
            headers: headers
        })
    })
})
