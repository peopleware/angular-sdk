import { isAsyncResult } from './async-result'

describe('AsyncResult', () => {
    it('should detect invalid async result models', () => {
        expect(isAsyncResult(null)).toBe(false)
        expect(isAsyncResult(undefined)).toBe(false)
        expect(isAsyncResult('')).toBe(false)
        expect(isAsyncResult(0)).toBe(false)
        expect(isAsyncResult({})).toBe(false)
        expect(isAsyncResult({ status: 'success' })).toBe(false)
    })

    it('should detect valid async result models', () => {
        expect(isAsyncResult({ status: 'success', entity: null })).toBe(true)
        expect(isAsyncResult({ status: 'success', entity: {} })).toBe(true)
        expect(isAsyncResult({ status: 'success', entity: {}, filters: null })).toBe(true)
        expect(isAsyncResult({ status: 'failed', error: new Error(), entity: null, filters: null })).toBe(true)
    })
})
