import { HttpHeaders, HttpParams } from '@angular/common/http'
import { PatchResourceOptions, _generatePatchResourceRequest } from './patch-resource'

describe('_generatePatchResourceRequest', () => {
    it('should return undefined when url function returns undefined', () => {
        const options: PatchResourceOptions<object, object, void, void> = {
            body: () => ({}),
            bodyMapper: (v) => v,
            url: () => undefined
        }

        const requestFn = _generatePatchResourceRequest(options)
        const result = requestFn()

        expect(result).toBeUndefined()
    })

    it('should return undefined when url function returns empty string', () => {
        const options: PatchResourceOptions<object, object, void, void> = {
            body: () => ({}),
            bodyMapper: (v) => v,
            url: () => ''
        }

        const requestFn = _generatePatchResourceRequest(options)
        const result = requestFn()

        expect(result).toBeUndefined()
    })

    it('should return undefined when body function returns undefined', () => {
        const options: PatchResourceOptions<object, object, void, void> = {
            body: () => undefined,
            bodyMapper: (v) => v,
            url: () => '/fakeapi'
        }

        const requestFn = _generatePatchResourceRequest(options)
        const result = requestFn()

        expect(result).toBeUndefined()
    })

    it('should return a PATCH request with correct url when no query params', () => {
        const options: PatchResourceOptions<object, object, void, void> = {
            body: () => ({}),
            bodyMapper: (v) => v,
            url: () => '/fakeapi'
        }

        const requestFn = _generatePatchResourceRequest(options)
        const result = requestFn()

        expect(result).toEqual({
            url: '/fakeapi',
            method: 'PATCH',
            headers: undefined,
            body: {}
        })
    })

    it('should return a PATCH request with query params appended to url', () => {
        const options: PatchResourceOptions<object, object, void, void> = {
            body: () => ({}),
            bodyMapper: (v) => v,
            url: () => '/fakeapi',
            requestOptions: {
                queryParams: () => new HttpParams().set('foo', 'bar').set('baz', 'qux')
            }
        }

        const requestFn = _generatePatchResourceRequest(options)
        const result = requestFn()

        expect(result).toEqual({
            url: '/fakeapi?foo=bar&baz=qux',
            method: 'PATCH',
            headers: undefined,
            body: {}
        })
    })

    it('should return a PATCH request with body mapped to DTO', () => {
        const options: PatchResourceOptions<{ name: string }, { mappedName: string }, void, void> = {
            body: () => ({ name: 'Test' }),
            bodyMapper: (v) => ({ mappedName: v.name }),
            url: () => '/fakeapi'
        }

        const requestFn = _generatePatchResourceRequest(options)
        const result = requestFn()

        expect(result).toEqual({
            url: '/fakeapi',
            method: 'PATCH',
            headers: undefined,
            body: { mappedName: 'Test' }
        })
    })

    it('should return a PATCH request with headers when provided', () => {
        const headers = new HttpHeaders({ 'Custom-Header': 'value' })
        const options: PatchResourceOptions<object, object, void, void> = {
            body: () => ({}),
            bodyMapper: (v) => v,
            url: () => '/fakeapi',
            requestOptions: {
                headers: () => headers
            }
        }

        const requestFn = _generatePatchResourceRequest(options)
        const result = requestFn()

        expect(result).toEqual({
            url: '/fakeapi',
            method: 'PATCH',
            headers,
            body: {}
        })
    })
})
