# route parameter helpers

## What They Are For

Use these helpers for observable-based route parameter access:

-   `watchQueryParam`
-   `watchNumberQueryParam`
-   `watchRouteParam`
-   `watchNumberRouteParam`

## Usage Guidelines

-   Prefer Angular router component input binding for new code.
-   Use these helpers mainly when integrating with existing observable-based components or services.
-   Use the numeric variants only when the route value is genuinely numeric and the feature is ready to handle `Number(...)` conversion behavior.
