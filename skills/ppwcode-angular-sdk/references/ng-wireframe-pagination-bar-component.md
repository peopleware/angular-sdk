# `PaginationBarComponent`

## When To Use

Use `PaginationBarComponent` when a screen needs simple pagination controls that visually match the SDK shell.

## Usage Guidelines

-   Pair it with list state that already knows total items, current page, and page size.
-   Use it as a presentation control, while keeping pagination state and data loading in the feature store or facade.
-   Align it with `@ppwcode/ng-router` pagination helpers when page state should also live in the URL.
