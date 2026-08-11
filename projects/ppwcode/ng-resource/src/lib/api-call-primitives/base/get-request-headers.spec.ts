import '@angular/compiler'
import { HttpHeaders } from '@angular/common/http'
import { getRequestHeaders } from './get-request-headers'

describe('getRequestHeaders', () => {
    it('should return undefined when no headers are configured', () => {
        expect(getRequestHeaders()).toBeUndefined()
    })

    it('should keep existing HttpHeaders instances unchanged', () => {
        const headers = new HttpHeaders({ Authorization: 'Bearer token' })

        const result = getRequestHeaders(headers)

        expect(result).toBe(headers)
    })

    it('should create HttpHeaders from a raw headers object', () => {
        const result = getRequestHeaders({
            'Custom-Header': 'value',
            Count: 3,
            Tags: ['one', 'two']
        })

        expect(result?.get('Custom-Header')).toEqual('value')
        expect(result?.get('Count')).toEqual('3')
        expect(result?.getAll('Tags')).toEqual(['one', 'two'])
    })

    it('should create HttpHeaders from a raw headers string', () => {
        const result = getRequestHeaders('Custom-Header: value')

        expect(result?.get('Custom-Header')).toEqual('value')
    })

    it('should resolve headers from a factory', () => {
        const result = getRequestHeaders(() => ({ 'Custom-Header': 'value' }))

        expect(result?.get('Custom-Header')).toEqual('value')
    })
})
