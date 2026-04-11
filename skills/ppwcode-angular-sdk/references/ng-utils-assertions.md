# assertions

## What They Are For

Use the assertion helpers for small reusable predicates such as:

-   numeric assertions like `natural`
-   collection assertions like `noDuplicates`

## Usage Guidelines

-   Use them where the predicate name makes the call site clearer than inline logic.
-   Prefer these shared helpers over copying the same assertion logic into multiple packages.
-   Keep additions to this surface tiny, framework-agnostic, and broadly reusable.
