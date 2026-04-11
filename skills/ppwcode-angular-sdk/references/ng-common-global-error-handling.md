# global error handling

## What It Is For

Use the global error handling surface when the app needs one consistent place to react to unexpected runtime errors.

Primary public exports:

-   `provideGlobalErrorHandler`
-   `GlobalErrorHandler`
-   `GlobalErrorDialogComponent`
-   `GlobalErrorDialogOptions`

## Usage Guidelines

-   Register it during app bootstrap with `provideGlobalErrorHandler(...)`.
-   Pass complete dialog options, including translation keys for every enabled action.
-   Add extra `ErrorHandler` classes through the provider helper when the app needs logging, telemetry, or custom side effects in addition to the SDK dialog.
-   Let the provider compose handlers instead of wiring `ErrorHandler` manually in multiple places.
-   Keep feature-level recoverable errors out of the global handler.
