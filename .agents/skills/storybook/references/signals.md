# Angular Signals Integration

Demonstrate how components behave with Angular Signals by using modern Signal-based APIs (inputs, outputs, and queries).

## Signal-Based Component Example

When generating components, use `input()`, `output()`, and `viewChild()`.

```typescript
import { ChangeDetectionStrategy, Component, ElementRef, input, output, viewChild } from '@angular/core'

@Component({
    selector: 'ppw-signal-demo',
    standalone: true,
    imports: [],
    template: `
        <div #container>
            <p>Value: {{ value() }}</p>
            <button (click)="notify()">Notify</button>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignalDemoComponent {
    // Signal Input
    value = input.required<string>()

    // Signal Output
    valueChanged = output<string>()

    // Signal Query
    container = viewChild<ElementRef<HTMLDivElement>>('container')

    notify() {
        this.valueChanged.emit(this.value())
    }
}
```

## Story with Signals

Demo how to use signals for state management within a story.

```typescript
import { signal } from '@angular/core'
import { SignalDemoComponent } from './signal-demo.component'

export const SignalDemoStory: Story = {
    render: () => {
        const count = signal(0)
        return {
            props: {
                count,
                increment: () => count.update((v) => v + 1),
                onChanged: (val: string) => console.log('Changed:', val)
            },
            template: `
                <div>
                  <p>Parent Count: {{ count() }}</p>
                  <button (click)="increment()">Increment</button>
                  <ppw-signal-demo 
                    [value]="'Count: ' + count()" 
                    (valueChanged)="onChanged($event)"
                  ></ppw-signal-demo>
                </div>
            `
        }
    }
}
```
