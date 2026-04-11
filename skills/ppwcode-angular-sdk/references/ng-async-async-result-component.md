# `AsyncResultComponent`

## When To Use

Use `AsyncResultComponent` when a container or smart component needs to render one async state model with consistent handling for:

-   `pending`
-   `failed`
-   `initial`
-   `success`
-   an empty successful result

This is the default choice for feature screens that load data through a facade returning `AsyncResult<TEntity>`.

## How To Use It Well

-   Import from `@ppwcode/ng-async`.
-   Always provide the required success template through `ppwAsyncResultSuccess`.
-   Add `ppwAsyncResultInitial` only when the UX needs a distinct pre-load state.
-   Add `ppwAsyncResultEmpty` when a successful response can legitimately contain no entity or no items and that deserves a custom empty-state message.
-   Pass the optional `pending` input only when loading state is tracked outside the `AsyncResult` itself.
-   Prefer configuring shared empty-state behavior through `PPW_ASYNC_RESULT_DEFAULT_OPTIONS` rather than repeating the same empty template across many features.

## Avoid

-   Do not deep-import internal templates or contexts.
-   Do not create parallel local async-state components unless the SDK behavior is clearly unsuitable.
-   Do not use it for purely synchronous content.
