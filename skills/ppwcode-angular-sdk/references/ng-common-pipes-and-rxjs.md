# pipes and RxJS helpers

## What They Are For

Use this surface for small, reusable presentation and stream utilities.

Primary public exports:

-   `ApiTranslatePipe`
-   `SanitizeHtmlPipe`
-   `truthyFilter`
-   `truthyFirst`

## Usage Guidelines

-   Use `ApiTranslatePipe` for API-provided translation-map values instead of duplicating lookup logic in components.
-   Use `SanitizeHtmlPipe` only for trusted HTML that should be rendered safely in templates.
-   Use `truthyFilter` when a stream should continue only for truthy values while keeping the intent obvious.
-   Use `truthyFirst` when the first truthy emission is the real trigger and nullish or falsy setup emissions should be ignored.
