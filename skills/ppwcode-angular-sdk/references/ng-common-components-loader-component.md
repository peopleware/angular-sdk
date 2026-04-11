# LoaderComponent

## Quick Use

Import the component and bind the `loading` input to your pending state:

```ts
import { Component, signal } from '@angular/core'
import { LoaderComponent } from '@ppwcode/ng-common-components'

@Component({
    selector: 'app-example',
    standalone: true,
    imports: [LoaderComponent],
    template: `
        <ppw-loader [loading]="loading()">
            <section>Content stays visible while loading.</section>
        </ppw-loader>
    `
})
export class ExampleComponent {
    protected readonly loading = signal(true)
}
```

## Inputs

-   `loading` defaults to `false`. Set it to `true` to show the indeterminate progress bar and loading styling.

## Content Projection

Project the content that should remain in place while loading is active:

```html
<ppw-loader [loading]="isSaving">
    <form>
        <!-- Form content -->
    </form>
</ppw-loader>
```

When `loading` is `false`, the component keeps a placeholder element so the layout does not jump when the progress bar disappears.

## Behavior Notes

-   The loader renders an Angular Material `mat-progress-bar` in `indeterminate` mode when `loading` is truthy.
-   The projected content remains rendered while the loader is active.
-   The component accepts `boolean | null`; `null` is treated the same as a falsy value.

## Guidance

-   Use `LoaderComponent` when the user should keep context of the current content while background work is in progress.
-   Prefer binding `loading` to request pending state, async resource state, or save progress flags.
-   If you need to completely replace the content with a loading state, use a higher-level conditional outside `LoaderComponent` instead.
