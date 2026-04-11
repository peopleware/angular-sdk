# NgCommonComponents Theming

## Quick Use

Define the variables in a global stylesheet:

```scss
body {
    --ppw-expandable-card-header-background-color: #17324d;
    --ppw-expandable-card-header-indicator-color: #f4c542;
    --ppw-expandable-card-header-text-color: #ffffff;

    --ppw-message-bar-info-background-color: #d8ebff;
    --ppw-message-bar-info-text-color: #0c3d6b;
    --ppw-message-bar-success-background-color: #d8f2e3;
    --ppw-message-bar-success-text-color: #175c33;
    --ppw-message-bar-warning-background-color: #fff3cd;
    --ppw-message-bar-warning-text-color: #7a5200;
    --ppw-message-bar-error-background-color: #fde1df;
    --ppw-message-bar-error-text-color: #8a1f17;
    --ppw-message-bar-margin: 0 0 1rem;
    --ppw-message-bar-spacing: 0.75rem;

    --ppw-table-height: 32rem;
    --ppw-table-row-highlight-background-color: #eef6ff;
    --ppw-table-row-highlight-sticky-background-color: #dcecff;

    --ppw-dashboard-items-table-width: 100%;
    --ppw-dashboard-item-card-margin: 12px;
    --ppw-dashboard-items-table-primary-color: #17324d;
    --ppw-dashboard-items-table-background-color: #f7f9fc;
}
```

## Expandable Card

Available variables for `ppw-expandable-card`:

-   `--ppw-expandable-card-header-background-color`
-   `--ppw-expandable-card-header-indicator-color`
-   `--ppw-expandable-card-header-text-color`
-   `--ppw-expandable-card-header-height-collapsed`
    Defaults to `32px`.
-   `--ppw-expandable-card-header-height-expanded`
    Defaults to `32px`.

## Message Bar

Available variables for `ppw-message-bar`:

-   `--ppw-message-bar-error-background-color`
-   `--ppw-message-bar-error-text-color`
-   `--ppw-message-bar-info-background-color`
-   `--ppw-message-bar-info-text-color`
-   `--ppw-message-bar-margin`
    Adds extra margin to the outer section of the message bar.
-   `--ppw-message-bar-spacing`
    Adds extra spacing to the inner section of the message bar.
-   `--ppw-message-bar-success-background-color`
-   `--ppw-message-bar-success-text-color`
-   `--ppw-message-bar-warning-background-color`
-   `--ppw-message-bar-warning-text-color`

## Table

Available variables for `ppw-table`:

-   `--ppw-table-height`
-   `--ppw-table-row-highlight-background-color`
-   `--ppw-table-row-highlight-sticky-background-color`
    This should not be transparent, otherwise overlapping sticky content can show through.

## Dashboard Items Table

Available variables for `ppw-dashboard-items-table`:

-   `--ppw-dashboard-wrapper-container-vertical-margin`
    Default: `0`.
-   `--ppw-dashboard-items-table-width`
    Default: `800px`. Set this to `100%` when the dashboard should span the available width.
-   `--ppw-dashboard-item-card-margin`
    Default: `8px`.
-   `--ppw-dashboard-item-card-image-vertical-padding`
    Default: `32px`. On screens up to `425px`, this becomes `16px`.
-   `--ppw-dashboard-item-card-image-horizontal-padding`
    Default: `32px`. On screens up to `840px`, this becomes `0`.
-   `--ppw-dashboard-item-card-image-font-size`
    Default: `140px`. On screens up to `425px`, this becomes `60px`.
-   `--ppw-dashboard-item-card-header-text-align`
    Default: `start`. On screens up to `425px`, this becomes `center`.
-   `--ppw-dashboard-items-table-primary-color`
-   `--ppw-dashboard-items-table-background-color`

## Guidance

-   Put these variables in a global stylesheet so every instance of the component library sees the same theme.
-   Start from the brand colors and spacing tokens your app already uses, then map only the variables you need.
-   When theming sticky table rows, keep `--ppw-table-row-highlight-sticky-background-color` opaque.
-   For dashboard layouts, prefer `--ppw-dashboard-items-table-width: 100%` when the cards should fill the container.
