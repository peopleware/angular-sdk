# route map

## What It Is For

Use the route-map surface to define route structure once and reuse it across navigation, linking, and tests.

Primary public exports:

-   `defineRoute`
-   container route helper
-   route-map route types
-   route retrieval helpers
-   route-map pipes
-   testing helper for full URLs

## Usage Guidelines

-   Use `defineRoute` and container definitions to create a central route tree for a feature or app.
-   Use retrieval helpers and pipes instead of hardcoding path concatenation in templates or services.
-   Keep route-map definitions close to route configuration and feature navigation code so they evolve together.
-   Use the testing helper when assertions depend on full generated URLs.
