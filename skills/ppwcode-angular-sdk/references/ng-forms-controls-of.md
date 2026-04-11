# `ControlsOf<T>`

## What It Is For

Use `ControlsOf<T>` to derive the control typing of a `FormGroup` from a DTO-like object shape.

## Usage Guidelines

-   Use it when you want one canonical model type and a matching typed `FormGroup`.
-   It works especially well for nested object shapes that map cleanly to nested `FormGroup`s.
-   It is a typing helper, not a runtime form generator.
-   Combine it with the control generators for concise and strongly typed form setup.
