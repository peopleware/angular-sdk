# `ConfirmationDialogComponent`

## When To Use

Use `ConfirmationDialogComponent` for standard confirm/cancel flows such as delete actions, irreversible updates, and confirmation before leaving a destructive path.

## How To Use It Well

-   Import from `@ppwcode/ng-dialogs`.
-   Pass dialog content through `ConfirmationDialogData`.
-   Prefer the modern `confirm` and `cancel` button option objects for labels, icons, appearance, and colors.
-   Use translation keys and params instead of hardcoded copy.
-   Omit cancel options when the UX should be confirm-only instead of relying on deprecated fields.
-   Keep the body concise.

## Avoid

-   Do not add new code that depends on deprecated fields like `confirmationKey`, `cancelKey`, or `allowConfirmOnly`.
-   Do not use this component for multi-step forms or rich workflows.
