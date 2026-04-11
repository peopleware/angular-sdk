# HTTP error operators

## What They Are For

Use these exports when HTTP streams should recover in a controlled, typed way instead of failing unpredictably:

-   `expectHttpError`
-   `expectAsyncResultHttpError`
-   `expectPagedAsyncResultHttpSuccess`
-   `expectPagedAsyncResultHttpError`
-   `extractHttpError`
-   exported error-code constants

## Usage Guidelines

-   Use `expectHttpError` when a specific HTTP status should map to a fallback stream value.
-   Use `expectAsyncResultHttpError` when the stream should stay in `AsyncResult` form even after an HTTP failure.
-   Use the paged variants for pageable data sets so fallback values stay compatible with paginated table components and search pages.
-   Handle the most specific HTTP cases first, then let the broader SDK operators cover the remaining statuses.
-   Use `extractHttpError` only when you need the SDK’s extraction logic outside these operators.
-   If the application needs custom extraction logic, define `window.ppwcodeHttpErrorExtractor` in bootstrap code instead of patching package internals.

## Avoid

-   Do not swallow every error code by default.
-   Do not mix raw `HttpErrorResponse` objects and SDK async-result failures in the same consumer-facing API without a clear reason.
