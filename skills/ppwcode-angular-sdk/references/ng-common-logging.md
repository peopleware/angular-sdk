# logging

## What It Is For

Use the exported logging contracts when multiple parts of the app should speak the same logging language.

Primary public exports:

-   `Logger`
-   `LoggerOptions`
-   `InMemoryLogger`

## Usage Guidelines

-   Depend on the logger abstraction in shared or cross-cutting code instead of hardcoding `console.*`.
-   Use `InMemoryLogger` when tests, demos, or diagnostics need to inspect logged output after the fact.
-   Keep logging focused on diagnostics and supportability, not business behavior.
