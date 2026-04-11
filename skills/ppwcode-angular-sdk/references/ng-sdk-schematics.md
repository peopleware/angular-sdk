# schematics

## What It Is For

`@ppwcode/ng-sdk` is a schematics package. Use it to add the SDK to a workspace through:

-   `ng add @ppwcode/ng-sdk`

## Usage Guidelines

-   Treat this package as setup tooling only.
-   Use it when bootstrapping a workspace that should adopt the PPWCode Angular SDK conventions.
-   Do not generate runtime imports from this package because its TypeScript public API is intentionally empty.
