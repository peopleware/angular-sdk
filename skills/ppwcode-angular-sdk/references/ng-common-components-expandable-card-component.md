# ExpandableCardComponent

## Quick Use

Import the component and pass the title and description as inputs:

```ts
import { Component } from '@angular/core'
import { ExpandableCardComponent } from '@ppwcode/ng-common-components'

@Component({
    selector: 'app-example',
    standalone: true,
    imports: [ExpandableCardComponent],
    template: `
        <ppw-expandable-card cardTitle="Order details" cardDescription="Review before submitting">
            <p>Projected card content goes here.</p>
        </ppw-expandable-card>
    `
})
export class ExampleComponent {}
```

## Inputs

-   `cardTitle` is optional. Pass a string when a plain text title is enough.
-   `cardDescription` is optional. Pass a string when a plain text description is enough.
-   `canBeCollapsed` defaults to `true`. Set it to `false` to keep the panel fixed in its initial state.
-   `openAsExpanded` defaults to `true`. Set it to `false` to render the card collapsed initially.

## Content Projection

When the title or description needs markup instead of plain text, project custom content into the header slots:

```html
<ppw-expandable-card [canBeCollapsed]="true" [openAsExpanded]="false">
    <span ppw-expandable-card-title>
        <strong>Advanced filters</strong>
    </span>
    <span ppw-expandable-card-description>Optional criteria for narrowing results</span>

    <form>
        <!-- Card body content -->
    </form>
</ppw-expandable-card>
```

Use the unqualified projected content as the card body.

## Behavior Notes

-   `canBeCollapsed` controls whether users can toggle the expansion panel at all.
-   When `canBeCollapsed` is `false`, the card remains locked in the initial state from `openAsExpanded`.
-   `openAsExpanded` sets the initial expanded state when the component initializes.

## Guidance

-   Prefer `cardTitle` and `cardDescription` for simple text-only headers.
-   Prefer the `ppw-expandable-card-title` and `ppw-expandable-card-description` projection slots when the header needs formatting or richer markup.
-   Use `canBeCollapsed="false"` for always-open summary cards, or together with `[openAsExpanded]="false"` for fixed collapsed sections.
