# `DisablePasswordFillDirective`

## When To Use

Use `DisablePasswordFillDirective` only when browser autofill or password managers are actively breaking the intended UX of a field.

## Usage Guidelines

-   Apply it sparingly and only on fields where autofill causes concrete problems.
-   Validate the accessibility and browser behavior after using it.
-   Prefer solving the underlying form structure issue first if the autofill problem comes from misleading field names or layout.
