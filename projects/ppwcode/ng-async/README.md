# @ppwcode/ng-async

## Override default error extraction

The SDK comes with a default implementation to extract an error from a response. To override this, add an implementation for
`window.ppwcodeHttpErrorExtractor` in your application's `main.ts` file. For example:

```typescript
window.ppwcodeHttpErrorExtractor = (response: HttpErrorResponse): Error => {
    return new Error(response.statusText)
}
```

## Custom error handling

The SDK handles errors generically for all error codes present in the DEFAULT_ERROR_CODES constant. When such an error occurs,
the SDK will create a failed async result with the error and a null entity.

If you want to handle errors for specific error codes,
you can use the `expectHttpError` operator in combination with the `expectAsyncResultHttpError` operator.

The below facade example shows how to handle a 404 error using `expectHttpError` for a service that returns an AuditInfo object.
This facade method returns an AsyncResult with status `success` and fallback value `undefined` when the audit info is not found.

The `expectAsyncResultHttpError` operator will handle the other error codes present in the DEFAULT_HTTP_ERROR_CODES constant,
excluding what was already handled above.
Its fallback value is `null`, which will trigger the SDK to create a failed async result which will show the default error message.

```typescript
return this.#service.getAuditInfo().pipe(
    map((result: AuditInfo | null) => createSuccessAsyncResult(result)),
    expectHttpError([HttpStatusCode.NotFound], () => createSuccessAsyncResult(undefined), true),
    expectAsyncResultHttpError(DEFAULT_HTTP_ERROR_CODES, null)
)
```
