import { HttpClient } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { noop, of } from 'rxjs'
import { map } from 'rxjs/operators'

import { ERROR_MESSAGE } from '../constants'
import { HttpCallTester } from './http-call-tester'
import { expectNoOutstandingRequests } from './http-client-testing-controller'

describe('http-call-tester', () => {
    let httpClient: HttpClient

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        })

        httpClient = TestBed.inject(HttpClient)
    })

    it('should instantiate a new HttpCallTester instance', () => {
        const tester = HttpCallTester.expectOneCallToUrl('/api')

        expect(tester).toBeInstanceOf(HttpCallTester)
    })

    it('should have a default implementation for testing blob downloads', () => {
        const tester = HttpCallTester.expectOneBlobFromUrl('/api/export').whenSubscribingTo(
            httpClient.get('/api/export', { responseType: 'blob' })
        )

        expect(tester).toBeInstanceOf(HttpCallTester)

        // Cast to any to access the private fields which we don't want to expose for the sake of a clean API.
        // Casting here is less of a risk then a complex workaround to get access to the properties in a TypeScript supported way.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const testerAsAny = tester as any
        expect(testerAsAny.mockedResponse).toEqual(new Blob())
        expect(testerAsAny.expectStreamResultFn).not.toBe(noop)

        expect(() => {
            tester.verify()
        }).not.toThrow()
    })

    it('should throw if not all required info is given during verification', () => {
        const testerWithNoStream = HttpCallTester.expectOneCallToUrl('/api')
        const testerWithNoResponse = HttpCallTester.expectOneCallToUrl('/api').whenSubscribingTo(of([]))

        expect(() => {
            testerWithNoStream.verify()
        }).toThrow()
        expect(() => {
            testerWithNoResponse.verify()
        }).toThrow()
    })

    it('should verify a call to the fake backend', () => {
        const httpTestingController = TestBed.inject(HttpTestingController)
        spyOn(httpTestingController, 'expectOne').and.callThrough()

        const response: Array<string> = []

        HttpCallTester.expectOneCallToUrl('/api')
            .whenSubscribingTo(httpClient.get('/api'))
            .withResponse(response)
            .verify()

        expect(httpTestingController.expectOne).toHaveBeenCalledWith('/api')
        expectNoOutstandingRequests()
    })

    it('should support expectations on the request and response', () => {
        const response: Array<string> = []
        let requestVerificationHasBeenExecuted = false
        let streamResultVerificationHasBeenExecuted = false

        HttpCallTester.expectOneCallToUrl('/api')
            .whenSubscribingTo(httpClient.get('/api'))
            .expectRequestTo((testRequest) => {
                requestVerificationHasBeenExecuted = true
                expect(testRequest.request.url).toEqual('/api')
            })
            .withResponse(response)
            .expectStreamResultTo((result) => {
                streamResultVerificationHasBeenExecuted = true
                expect(result).toBe(response)
            })
            .verify()

        // The verification functions should both have been executed by now.
        expect(requestVerificationHasBeenExecuted).toBe(true)
        expect(streamResultVerificationHasBeenExecuted).toBe(true)
    })

    it('should support failures', () => {
        const httpTestingController = TestBed.inject(HttpTestingController)
        spyOn(httpTestingController, 'expectOne').and.callThrough()

        const response: Array<string> = []

        HttpCallTester.expectOneCallToUrl('/api')
            .whenSubscribingTo(
                httpClient.get('/api').pipe(
                    map(() => {
                        throw new Error(ERROR_MESSAGE)
                    })
                )
            )
            .withResponse(response)
            .verifyFailure()

        expect(httpTestingController.expectOne).toHaveBeenCalledWith('/api')
        expectNoOutstandingRequests()
    })

    it('should support checking the failure', () => {
        const httpTestingController = TestBed.inject(HttpTestingController)
        spyOn(httpTestingController, 'expectOne').and.callThrough()

        const response: Array<string> = []

        HttpCallTester.expectOneCallToUrl('/api')
            .whenSubscribingTo(
                httpClient.get('/api').pipe(
                    map(() => {
                        throw new Error(ERROR_MESSAGE)
                    })
                )
            )
            .withResponse(response)
            .expectErrorTo((error) => {
                expect(error).toBeInstanceOf(Error)
            })
            .verifyFailure()

        expect(httpTestingController.expectOne).toHaveBeenCalledWith('/api')
        expectNoOutstandingRequests()
    })
})
