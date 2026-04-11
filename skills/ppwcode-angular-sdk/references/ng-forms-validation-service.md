# `ValidationService`

## When To Use

Use `ValidationService` when form validation logic should come from the shared SDK surface instead of being redefined per feature.

## Usage Guidelines

-   Reach for it before introducing feature-local validators that solve a common problem.
-   Keep feature-specific business rules outside the shared validation service unless they are broadly reusable.
-   Prefer composing SDK validators with local business validation rather than replacing them wholesale.

## Available Validators

-   `notOnlySpacesValidator`: rejects string values that contain only spaces and returns `{ notOnlySpaces: true }` when invalid.
