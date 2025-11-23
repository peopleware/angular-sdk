import { TestRequest } from '@angular/common/http/testing'
import { notUndefined } from '@ppwcode/js-ts-oddsandends/lib/conditional-assert'
import { FileDownload } from '@ppwcode/ng-async'
import { noop, Observable } from 'rxjs'
import { expectOneCallToUrl, ResponseOptions } from './http-client-testing-controller'

/**
 * This class can be used in testing to leverage the HttpTestingController for HTTP call testing.
 *
 * @example
 * it('should verify the call to /api', () => {
 *   const response: Array<string> = [];
 *
 *   HttpCallTester.expectOneCallToUrl('/api')
 *     .whenSubscribingTo(httpClient.get('/api'))
 *     .checkRequest((testRequest) => { // Optional
 *       expect(testRequest.request.url).toEqual('/api');
 *     })
 *     .withResponse(response)
 *     .checkResult((result) => { // Optional
 *       expect(result).toBe(response);
 *     })
 *     .verify();
 * });
 */
export class HttpCallTester<TRequestResponse, TStreamResult> {
    /** The stream that will be subscribed to in the verify function. */
    private stream$?: Observable<TStreamResult>

    /** The request response that should be returned when a request is received on the url. */
    private mockedResponse?: TRequestResponse

    /** The options to further configure the response. */
    private responseOptions?: ResponseOptions

    /** Verification function executed during the verify function to allow developers to set expectations on the request. */
    private expectRequestFn: (request: TestRequest) => void = noop

    /** Verification function executed during the verify function to allow developers to set expectations on the result of the stream. */
    private expectStreamResultFn: (result: TStreamResult) => void = noop

    /** Verification function executed during the verify function to allow developers to set expectations on the error that is thrown. */
    private expectErrorFn: (error: unknown) => void = noop

    constructor(private readonly url: string) {}

    /** Creates a new instance of HttpCallTester that can be chained to verify an HTTP call. */
    public static expectOneCallToUrl<TRequestResponse, TStreamResult>(
        url: string
    ): HttpCallTester<TRequestResponse, TStreamResult> {
        return new HttpCallTester<TRequestResponse, TStreamResult>(url)
    }

    /**
     * Creates a new instance of HttpCallTester that has been set up to check the retrieval of a Blob.
     * It has been set up with an empty blob as the response result and expects that the stream result is the same blob.
     *
     * The expectation of the stream result can simply be overridden by calling `.expectStreamResultTo` again.
     *
     * @example
     * HttpCallTester.expectOneBlobFrom('https://api/export')
     *    .whenSubscribingTo(httpClient.get('https://api/export))
     *    .verify();
     * @param url The url that is expected to be called.
     * @returns An HttpCallTester instance ready to verify the call.
     */
    public static expectOneBlobFromUrl<TStreamResult = Blob>(url: string): HttpCallTester<Blob, TStreamResult> {
        const blob = new Blob()

        return new HttpCallTester<Blob, TStreamResult>(url).withResponse(blob).expectStreamResultTo((result) => {
            expect(result).toBe(blob as unknown as TStreamResult)
        })
    }

    /**
     * Creates a new instance of HttpCallTester that has been set up to check the retrieval of a file to download.
     * It has been set up with an empty blob as the response result and expects that the stream result is the same blob
     * with a file name.
     *
     * The expectation of the stream result can simply be overridden by calling `.expectStreamResultTo` again.
     *
     * @example
     * HttpCallTester.expectOneFileDownloadFrom('https://api/export', 'download.xlsx')
     *    .whenSubscribingTo(httpClient.get('https://api/export))
     *    .verify();
     * @param url The url that is expected to be called.
     * @param fileName The name of the file that is expected to be downloaded.
     * @returns An HttpCallTester instance ready to verify the call.
     */
    public static expectOneFileDownloadFromUrl<TStreamResult = FileDownload>(
        url: string,
        fileName?: string
    ): HttpCallTester<Blob, TStreamResult> {
        // When a file name is passed, this should be mocked in the Content-Disposition response header.
        // The default implementation is to extract the file name from this header.
        const headers: Record<string, string> = {}
        if (fileName) {
            headers['Content-Disposition'] = `filename=${fileName}`
        }

        return new HttpCallTester<Blob, TStreamResult>(url)
            .withResponse(new Blob(), { headers })
            .expectStreamResultTo((result) => {
                expect(result).toEqual({
                    blob: new Blob(),
                    fileName: fileName
                } as TStreamResult)
            })
    }

    /** Set the stream that will be subscribed to in the verify function. The stream should have an HTTP call as consequence. */
    public whenSubscribingTo(stream$: Observable<TStreamResult>): HttpCallTester<TRequestResponse, TStreamResult> {
        this.stream$ = stream$

        return this
    }

    /** Set a function that will be executed in the verify function to check whether the request matches certain conditions. */
    public expectRequestTo(
        expectRequestFn: (request: TestRequest) => void
    ): HttpCallTester<TRequestResponse, TStreamResult> {
        this.expectRequestFn = expectRequestFn

        return this
    }

    /** Set the response that will be sent by the HttpTestingController when flushing the request. */
    public withResponse(
        mockedResponse: TRequestResponse,
        responseOptions?: ResponseOptions
    ): HttpCallTester<TRequestResponse, TStreamResult> {
        this.mockedResponse = mockedResponse
        this.responseOptions = responseOptions

        return this
    }

    /** Set a function that will be executed in the verify function to check whether the stream result matches certain conditions. */
    public expectStreamResultTo(
        expectStreamResultFn: (result: TStreamResult) => void
    ): HttpCallTester<TRequestResponse, TStreamResult> {
        this.expectStreamResultFn = expectStreamResultFn

        return this
    }

    /** Set a function that will be executed in the verify function to check whether the error matches certain conditions. */
    public expectErrorTo(expectErrorFn: (error: unknown) => void): HttpCallTester<TRequestResponse, TStreamResult> {
        this.expectErrorFn = expectErrorFn

        return this
    }

    /**
     * Verifies if an HTTP call is made successfully and triggers the verification functions that have been set.
     * Also checks whether the given stream only emits once.
     * Handles cleanup to prevent any memory leaks during the process.
     * @throws Throws a ConditionViolation if no stream has been set.
     * @throws Throws a ConditionViolation if no mocked request response has been set.
     */
    public verify(): void {
        this.verifySubscription({ expectedSubscriptionHits: 1, expectedFailureHits: 0 })
    }

    /**
     * Verifies if an HTTP call is made unsuccessfully and triggers the verification functions that have been set.
     * Also checks whether the given stream only fails once.
     * Handles cleanup to prevent any memory leaks during the process.
     * @throws Throws a ConditionViolation if no stream has been set.
     * @throws Throws a ConditionViolation if no mocked request response has been set.
     */
    public verifyFailure(): void {
        this.verifySubscription({
            expectedSubscriptionHits: 0,
            expectedFailureHits: 1
        })
    }

    private verifySubscription({
        expectedSubscriptionHits,
        expectedFailureHits
    }: {
        expectedSubscriptionHits: number
        expectedFailureHits: number
    }): void {
        const stream$ = notUndefined(this.stream$)
        const response = notUndefined(this.mockedResponse)

        let subscriptionHits = 0
        let failureHits = 0
        const subscription = stream$.subscribe({
            next: (result: TStreamResult) => {
                this.expectStreamResultFn(result)
                subscriptionHits++
            },
            error: (error: unknown) => {
                this.expectErrorFn(error)
                failureHits++
            }
        })

        expectOneCallToUrl(this.url, response, this.expectRequestFn, this.responseOptions)

        subscription.unsubscribe()
        expect(
            subscriptionHits,
            `Expected ${expectedSubscriptionHits} successful http stream results but got ${subscriptionHits}`
        ).toEqual(expectedSubscriptionHits)
        expect(
            failureHits,
            `Expected ${expectedFailureHits} failed http stream results but got ${failureHits}`
        ).toEqual(expectedFailureHits)
    }
}
