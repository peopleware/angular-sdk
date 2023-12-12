import { HttpHeaders } from '@angular/common/http'
import { HttpTestingController, TestRequest } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

/**
 * Function that leverages the HttpTestingController to verify that a url is called once. When the request
 * is flushed, the passed `mockedResponse` value will be set as the request response value.
 *
 * If you want to do some checks, pass a `requestExpectations` function that will be called before flushing
 * the request with the response.
 * @param url The url that is expected to be called once.
 * @param mockedResponse The response that should be sent when flushing the request.
 * @param requestExpectations A function taking the request instance to allow verifying the request.
 * @param responseOptions Optionally specify extra options for the response like status code.
 */
export const expectOneCallToUrl = <TResponse>(
    url: string,
    mockedResponse: TResponse,
    requestExpectations?: (request: TestRequest) => void,
    responseOptions?: ResponseOptions
): void => {
    const httpTestingController = TestBed.inject(HttpTestingController)

    const request = httpTestingController.expectOne(url)

    requestExpectations?.(request)

    request.flush(
        mockedResponse as
            | string
            | number
            | boolean
            | NonNullable<unknown>
            | ArrayBuffer
            | Blob
            | Array<string | number | boolean | NonNullable<unknown> | null>
            | null,
        responseOptions
    )
}

/**
 * Verifies on the HttpTestingController that there are no outstanding requests left.
 */
export const expectNoOutstandingRequests = (): void => {
    const httpTestingController = TestBed.inject(HttpTestingController)
    httpTestingController.verify()
}

export interface ResponseOptions {
    headers?:
        | HttpHeaders
        | {
              [name: string]: string | Array<string>
          }
    status?: number
    statusText?: string
}
