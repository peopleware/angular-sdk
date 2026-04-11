# `AbstractSearchFilterState`

## When To Use

Use `AbstractSearchFilterState` when a feature revolves around searchable or filterable collections and should align with the SDK’s search-state patterns.

## Usage Guidelines

-   Use it as the base for list features that manage filters, search requests, and result refreshes in a repeatable way.
-   Keep feature-specific filter fields in the derived class while reusing the shared search-state behavior.
-   Pair it with paged async results and table components when building search pages.
