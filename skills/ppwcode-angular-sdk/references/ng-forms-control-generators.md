# control generators

## What They Are For

Use these helpers to create typed `FormControl` instances with less noise:

-   `createNonNullableControl`
-   `createNullableControl`

## Usage Guidelines

-   Use `createNonNullableControl` by default for fields that should never hold `null`.
-   Use `createNullableControl` only when `null` is a meaningful state in the form model.
-   Pass validators either as a simple validator array or through the options object when async validators are also needed.
-   Keep these helpers near form construction code.
