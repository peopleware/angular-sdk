import { HttpHeaders, HttpParams } from '@angular/common/http'
import { DeleteResourceOptions, _generateDeleteResourceRequest } from './delete-resource'

describe('_generateDeleteResourceRequest', () => {
    it('should return undefined when url function returns undefined', () => {
        const options: DeleteResourceOptions = {
            url: () => undefined
        }

        const requestFn = _generateDeleteResourceRequest(options)
        const result = requestFn()

        expect(result).toBeUndefined()
    })

    it('should return undefined when url function returns empty string', () => {
        const options: DeleteResourceOptions = {
            url: () => ''
        }

        const requestFn = _generateDeleteResourceRequest(options)
        const result = requestFn()

        expect(result).toBeUndefined()
    })

    it('should return a DELETE request with correct url when no query params', () => {
        const options: DeleteResourceOptions = {
            url: () => '/fakeapi'
        }

        const requestFn = _generateDeleteResourceRequest(options)
        const result = requestFn()

        expect(result).toEqual({
            url: '/fakeapi',
            method: 'DELETE',
            headers: undefined
        })
    })

    it('should return a DELETE request with query params appended to url', () => {
        const options: DeleteResourceOptions = {
            url: () => '/fakeapi',
            requestOptions: {
                queryParams: () => new HttpParams().set('foo', 'bar').set('baz', 'qux')
            }
        }

        const requestFn = _generateDeleteResourceRequest(options)
        const result = requestFn()

        expect(result).toEqual({
            url: '/fakeapi?foo=bar&baz=qux',
            method: 'DELETE',
            headers: undefined
        })
    })

    it('should return a DELETE request with headers when provided', () => {
        const headers = new HttpHeaders({ 'Custom-Header': 'value' })
        const options: DeleteResourceOptions = {
            url: () => '/fakeapi',
            requestOptions: {
                headers: () => headers
            }
        }

        const requestFn = _generateDeleteResourceRequest(options)
        const result = requestFn()

        expect(result).toEqual({
            url: '/fakeapi',
            method: 'DELETE',
            headers
        })
    })

    it('should return a DELETE request with mapped body when provided', () => {
        const requestFn = _generateDeleteResourceRequest({
            url: () => '/fakeapi',
            body: () => ({ id: 'mock-id' }),
            bodyMapper: (body) => ({ mappedId: body.id })
        })

        const result = requestFn()

        expect(result).toEqual({
            url: '/fakeapi',
            method: 'DELETE',
            headers: undefined,
            body: {
                mappedId: 'mock-id'
            }
        })
    })

    it('should return undefined when body options are provided but body returns undefined', () => {
        const requestFn = _generateDeleteResourceRequest({
            url: () => '/fakeapi',
            body: () => undefined as { id: string } | undefined,
            bodyMapper: (body) => ({ mappedId: body.id })
        })

        expect(requestFn()).toBeUndefined()
    })
})
