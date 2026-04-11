# breadcrumbs

## What They Are For

Use these exports for translated breadcrumb navigation:

-   `BreadcrumbComponent`
-   `BreadcrumbService`
-   `Breadcrumb`
-   `BreadcrumbProviderOptions`
-   `provideBreadcrumbOptions`

## Usage Guidelines

-   Use `BreadcrumbComponent` in layouts or feature shells that should expose the current navigation path.
-   Configure breadcrumb behavior through route `title` or breadcrumb data and `provideBreadcrumbOptions`.
-   Use the service as the source of breadcrumb state; do not duplicate breadcrumb-building logic in features.
-   Use detail-title resolvers when breadcrumb labels depend on loaded entity data.
