import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { HttpCallTester } from '@ppwcode/ng-unit-testing'

/**
 * Example spec demonstrating HttpCallTester from @ppwcode/ng-unit-testing.
 * Use this as reference when testing services that perform HTTP calls.
 */
describe('HttpCallTester example', () => {
    let httpClient: HttpClient

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
        })
        httpClient = TestBed.inject(HttpClient)
    })

    it('should verify a successful GET request', () => {
        const mockUsers = [{ id: 1, name: 'Alpha' }]

        HttpCallTester.expectOneCallToUrl<typeof mockUsers, typeof mockUsers>('/api/users')
            .whenSubscribingTo(httpClient.get<typeof mockUsers>('/api/users'))
            .expectRequestTo((request) => {
                expect(request.request.method).toBe('GET')
            })
            .withResponse(mockUsers)
            .expectStreamResultTo((result) => {
                expect(result).toEqual(mockUsers)
                expect(result.length).toBe(1)
            })
            .verify()
    })

    it('should verify an HTTP error is handled', () => {
        HttpCallTester.expectOneCallToUrl<null, unknown>('/api/users/999')
            .whenSubscribingTo(httpClient.get('/api/users/999'))
            .withResponse(null, { status: 404, statusText: 'Not Found' })
            .expectErrorTo((error) => {
                expect((error as { status?: number }).status).toBe(404)
            })
            .verifyFailure()
    })
})
