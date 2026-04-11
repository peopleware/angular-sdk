# HTTP testing helpers

## What They Are For

Use the lower-level HTTP testing exports when `HttpCallTester` is not flexible enough:

-   HTTP client testing controller helpers
-   `throwErrorResponse`
-   related test constants

## Usage Guidelines

-   Reach for these helpers when a test needs finer control than the fluent `HttpCallTester` path.
-   Keep low-level HTTP test wiring localized so most tests can still use the higher-level helper.
-   Use the shared error-response helper instead of rebuilding the same error objects repeatedly.
