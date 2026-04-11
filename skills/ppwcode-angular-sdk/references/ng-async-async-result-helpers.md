# `AsyncResult` helpers

## What They Are For

Use these helpers to keep feature state consistent:

-   `createSuccessAsyncResult`
-   `createFailedAsyncResult`
-   `isAsyncResult`
-   `executeAsyncOperation`

## Usage Guidelines

-   Use `createSuccessAsyncResult` and `createFailedAsyncResult` instead of hand-writing result objects.
-   Use `executeAsyncOperation` when a button click or command flow needs a temporary executing flag plus centralized success and error callbacks.
-   Use `isAsyncResult` only as a type guard at boundaries where the incoming value is uncertain.
-   Keep `AsyncResult` creation near the facade or state layer. Presentation components should usually consume these objects, not construct them.

## Avoid

-   Do not mix many incompatible result object shapes in the same feature.
-   Do not overuse `executeAsyncOperation` inside purely reactive streams.
