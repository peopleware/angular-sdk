# MessageBarComponent

## Quick Use

Import the component and the `Severity` enum:

```ts
import { Component } from '@angular/core'
import { MessageBarComponent, Severity } from '@ppwcode/ng-common-components'

@Component({
    selector: 'app-example',
    standalone: true,
    imports: [MessageBarComponent],
    template: ` <ppw-message-bar [severity]="Severity.info" message="This is an info message"> </ppw-message-bar> `
})
export class ExampleComponent {
    protected readonly Severity = Severity
}
```

## Inputs

-   `severity` is required. Use one of `Severity.success`, `Severity.error`, `Severity.warning`, or `Severity.info`.
-   `message` is optional. Pass a string when plain text is enough.

## Content Projection

When `message` is omitted, project custom markup inside the component:

```html
<ppw-message-bar [severity]="Severity.warning">
    <strong>Be careful:</strong> this action cannot be undone.
</ppw-message-bar>
```

## Guidance

-   Prefer the `message` input for simple text-only messages.
-   Prefer projected content when the message needs formatting, icons, links, or multiple elements.
-   Expose `Severity` on the component class when the template needs enum members.
