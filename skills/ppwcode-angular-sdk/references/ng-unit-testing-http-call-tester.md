# `HttpCallTester`

## When To Use

Use `HttpCallTester` as the default fluent API for HTTP unit tests built on `HttpTestingController`.

## How To Use It Well

-   Start with `expectOneCallToUrl(...)` for normal requests.
-   Use the blob or file-download helpers for export endpoints.
-   Chain request expectations, mocked responses, and result assertions in one readable test flow.
-   Use `verify()` for success flows and `verifyFailure()` for failing flows.
-   Keep each tester focused on one HTTP expectation to preserve readable tests.
