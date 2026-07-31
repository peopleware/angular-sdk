# Controls and Actions

## Controls via `argTypes`

Use `argTypes` in the `meta` object to document inputs and provide UI controls. Signal inputs are treated like regular inputs by Storybook's autodocs, but explicit `argTypes` offer more control.

```typescript
const meta: Meta<MyComponent> = {
    title: 'Components/MyComponent',
    component: MyComponent,
    argTypes: {
        cardTitle: {
            description: 'The title displayed in the card header.',
            control: 'text',
            table: { category: 'Inputs' }
        },
        openAsExpanded: {
            description: 'Whether the card should be expanded by default.',
            control: 'boolean',
            table: { category: 'Inputs' }
        }
    }
}
```

## Actions via Signal Outputs

To capture events in the Actions panel, use `action` in `argTypes`. Signal outputs (`output()`) are automatically captured by the Storybook Actions addon if the prop name matches an action.

```typescript
// Component with Signal Output
export class MyComponent {
    sortChanged = output<SortEvent>()
}

// In Meta
const meta: Meta<MyComponent> = {
    argTypes: {
        sortChanged: {
            description: 'Emitted when the table sorting changes.',
            action: 'sortChanged',
            table: { category: 'Actions' }
        }
    }
}
```

## Manual Action Mapping (Wrapper)

If using a wrapper component, avoid `any` and use proper types.

```typescript
@Component({
    standalone: true,
    template: `<my-comp (sortChanged)="onSortChanged($event)"></my-comp>`
})
class Wrapper {
    // Avoid any!
    onSortChanged(event: SortEvent) {
        console.log('Sort event captured:', event)
    }
}
```
