# mixins

## What They Are For

Use the public mixins when class-based Angular code still benefits from reusable lifecycle or state behavior.

Primary public exports:

-   `Constructor`
-   subscription-handling mixin
-   responsive observer mixin
-   pending-state mixin

## Usage Guidelines

-   Use the subscription-handling mixin for older class-based components or services that still manage explicit subscriptions.
-   Use the pending-state mixin when a class needs a simple shared pending flag pattern.
-   Use responsive observer helpers when class logic depends on breakpoint observation.
-   Prefer Angular’s newer signal and composition patterns in new code when they are simpler than mixins.
