# conditional assertions

## What They Are For

Use the conditional assertion helpers when code should fail fast or narrow types based on a runtime condition.

## Usage Guidelines

-   Use them at boundaries where a missing or invalid value should immediately stop execution.
-   Keep the failure reason clear so debugging stays straightforward.
-   Prefer them over repetitive hand-written guard blocks when the shared helper expresses the intent better.
