# `Severity`

## What It Is For

`Severity` is the shared semantic level used by status and feedback components in `@ppwcode/ng-common-components`.

## Usage Guidelines

-   Use `Severity` with `MessageBarComponent` and any related feedback model that should align with SDK severity semantics.
-   Prefer the exported enum instead of duplicating `'error' | 'warning' | ...` string unions in app code.
-   Keep severity semantic, not stylistic.
