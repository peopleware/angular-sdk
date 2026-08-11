import '@angular/compiler'
import { HttpParams } from '@angular/common/http'
import { getRequestUrl } from './get-request-url'

describe('getRequestUrl', () => {
    it('should return the configured url without query params', () => {
        const result = getRequestUrl('/fakeapi')

        expect(result).toEqual('/fakeapi')
    })

    it('should resolve the url from a factory', () => {
        const result = getRequestUrl(() => '/fakeapi')

        expect(result).toEqual('/fakeapi')
    })

    it('should return undefined when the configured url is empty', () => {
        const result = getRequestUrl('')

        expect(result).toBeUndefined()
    })

    it('should return undefined when the url factory returns undefined', () => {
        const result = getRequestUrl(() => undefined)

        expect(result).toBeUndefined()
    })

    it('should append query params to the url', () => {
        const result = getRequestUrl('/fakeapi', () => new HttpParams().set('foo', 'bar').set('baz', 'qux'))

        expect(result).toEqual('/fakeapi?foo=bar&baz=qux')
    })

    it('should keep the url unchanged when query params return undefined', () => {
        const result = getRequestUrl('/fakeapi', () => undefined)

        expect(result).toEqual('/fakeapi')
    })

    it('should not resolve query params when no url can be resolved', () => {
        let queryParamsResolved = false

        const result = getRequestUrl(
            () => undefined,
            () => {
                queryParamsResolved = true
                return new HttpParams().set('foo', 'bar')
            }
        )

        expect(result).toBeUndefined()
        expect(queryParamsResolved).toEqual(false)
    })
})
