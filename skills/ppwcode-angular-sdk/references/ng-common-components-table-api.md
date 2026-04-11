# `TableComponent` API

## What It Is For

Use the public table surface for read-oriented grids with a consistent SDK structure.

Primary public exports:

-   `TableComponent`
-   `TableModule`
-   column directives
-   empty-page directive
-   table providers
-   `TableOptions`
-   `TableRecord`
-   `SortChange`

## Usage Guidelines

-   Use `TableComponent` for read-oriented datasets with sorting, selection, custom templates, and footer rows.
-   Define columns through the exported directives and models rather than by reaching into internal cell implementations.
-   Use the provider helpers and options model to configure shared table behavior in a supported way.
-   Use the empty-page directive when a table needs a custom empty-state block tied to the public API.
-   Keep feature-specific rendering inside public column templates instead of forking the component.
