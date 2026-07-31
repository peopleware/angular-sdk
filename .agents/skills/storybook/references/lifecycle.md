# Lifecycle and Realistic Mock Data

Simulate async operations and state transitions within a story.

```typescript
import { signal } from '@angular/core'

export const LifecycleDemo: Story = {
    render: () => {
        const state = signal({ status: 'initial', data: null })
        const pending = signal(false)

        const fetchData = async () => {
            pending.set(true)
            await new Promise((r) => setTimeout(r, 2000))
            pending.set(false)
            state.set({ status: 'success', data: { id: 1 } })
        }

        return {
            props: { state, pending, fetchData },
            template: `
                <button (click)="fetchData()">Fetch Data</button>
                <my-async-comp [data]="state().data" [loading]="pending()"></my-async-comp>
            `
        }
    }
}
```
