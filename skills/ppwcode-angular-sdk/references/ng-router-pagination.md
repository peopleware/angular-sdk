# pagination routing

## What It Is For

Use the exported pagination surface when list state should stay synchronized with the URL.

Primary public exports:

-   pagination mixin
-   `PaginationOptions`
-   `providePaginationOptions`

## Usage Guidelines

-   Use it for pageable list pages where reloads, links, and browser navigation should preserve page state.
-   Configure defaults through `providePaginationOptions` instead of scattering pagination constants through feature code.
-   Keep query-parameter naming and behavior consistent across list screens.
