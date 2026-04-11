# `NavigationService`

## When To Use

Use `NavigationService` when feature code needs the SDK's shared routing abstraction rather than talking to Angular Router directly everywhere.

Primary public methods:

-   `openUrl`
-   `openExternalUrlInNewTab`

## Usage Guidelines

-   Prefer it when several features share the same navigation patterns and benefit from one reusable service contract.
-   Keep app-specific orchestration out of the SDK service layer unless it is genuinely reusable.
