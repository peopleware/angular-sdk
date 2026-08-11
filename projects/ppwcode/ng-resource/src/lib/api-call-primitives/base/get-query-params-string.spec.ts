import { HttpParams } from '@angular/common/http'
import { getQueryParamsString } from './get-query-params-string'

describe('getQueryParamsString', () => {
    it.each([
        { scenario: 'no params', params: undefined, expected: '' },
        { scenario: 'empty params', params: new HttpParams(), expected: '' },
        { scenario: 'single param', params: new HttpParams().set('foo', 'bar'), expected: '?foo=bar' },
        {
            scenario: 'multiple params',
            params: new HttpParams().set('foo', 'bar').set('baz', 'qux'),
            expected: '?foo=bar&baz=qux'
        }
    ])(`should return $expected for $scenario`, ({ params, expected }) => {
        expect(getQueryParamsString(params)).toEqual(expected)
    })
})
