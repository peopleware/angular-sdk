# storage and utilities

## What They Are For

Use these exports for thin browser abstractions and small reusable utility behavior.

Primary public exports:

-   local storage wrapper
-   session storage wrapper
-   value reducers
-   global window helper

## Usage Guidelines

-   Use the storage wrappers instead of talking to browser storage APIs directly all over the app.
-   Keep browser-specific calls behind these utilities so tests and SSR-sensitive code stay easier to reason about.
-   Reuse the exported value reducers when combining optional values or reducing collections in a common way.
-   Use the global window abstraction wherever direct global access would otherwise make code harder to test or port.
