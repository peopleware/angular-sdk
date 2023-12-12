import { HttpClient, HttpResponse } from '@angular/common/http'
import { HttpClientTestingModule, TestRequest } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { expectNoOutstandingRequests, expectOneCallToUrl, ResponseOptions } from './http-client-testing-controller'
import { HttpStatus } from './status-codes'

describe('http-client-testing-controller', () => {
    let httpClient: HttpClient

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        })

        httpClient = TestBed.inject(HttpClient)
    })

    it('should support expecting a call to a url and send a fake response', (done: DoneFn) => {
        const httpCall = httpClient.get('/api')
        const response = [{ id: 1 }]

        const subscription = httpCall.subscribe((callResponse) => {
            expect(callResponse).toBe(response)
            done()
        })

        expectOneCallToUrl('/api', response)
        subscription.unsubscribe()
    })

    it('should support expecting a call to url and validate the request body', () => {
        const httpCall = httpClient.get('/api')
        const response = [{ id: 1 }]
        let hasCheckedRequest = false

        const subscription = httpCall.subscribe()
        expectOneCallToUrl('/api', response, (request: TestRequest) => {
            expect(request.request.url).toEqual('/api')
            hasCheckedRequest = true
        })

        subscription.unsubscribe()
        expect(hasCheckedRequest).toBe(true)
    })

    it('should support settings specific request response options', () => {
        const httpCall = httpClient.get('/api', { observe: 'response' })
        const responseBody = [{ id: 1 }]
        const responseOptions: ResponseOptions = { status: HttpStatus.CREATED, statusText: 'OK' }
        let hasCheckedResponse = false

        const subscription = httpCall.subscribe((response: HttpResponse<unknown>) => {
            expect(response.status).toEqual(HttpStatus.CREATED)
            hasCheckedResponse = true
        })
        expectOneCallToUrl('/api', responseBody, undefined, responseOptions)

        subscription.unsubscribe()
        expect(hasCheckedResponse).toBe(true)
    })

    it('should verify that there are no outstanding requests', () => {
        const httpCall = httpClient.get('/api')
        const response = [{ id: 1 }]
        const subscription = httpCall.subscribe()

        expect(expectNoOutstandingRequests).toThrowError('Expected no open requests, found 1: GET /api')

        expectOneCallToUrl('/api', response)
        expect(expectNoOutstandingRequests).not.toThrow()

        subscription.unsubscribe()
    })
})
