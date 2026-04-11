# activated route helpers

## What They Are For

Use these helpers to provide and manipulate `ActivatedRoute` state in tests:

-   `provideActivatedRoute`
-   update helpers for route params, query params, and data
-   assertion helpers for snapshots and observables

## Usage Guidelines

-   Use `provideActivatedRoute(...)` in `TestBed` setup to establish the initial route state.
-   Use the update helpers to change params or query params during a test without rebuilding providers.
-   Use the assertion helpers when test intent is specifically about route state behavior.
-   Keep route-state setup explicit so tests stay easy to read.
