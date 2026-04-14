import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core'
import { JsonPipe } from '@angular/common'
import { AsyncResultModule } from './async-result.module'
import { AsyncResult } from '../models/async-result'
import { provideTranslateService } from '@ngx-translate/core'
import { MatButtonModule } from '@angular/material/button'

@Component({
    selector: 'ppw-async-result-wrapper',
    template: `
        <ppw-async-result [asyncResult]="asyncResult()" [pending]="pending()">
            <ng-template ppw-async-result-success [contextTyper]="asyncResult()" let-record let-entity="entity">
                <h3>Success!</h3>
                <p>Entity: {{ entity | json }}</p>
            </ng-template>
            <ng-template ppw-async-result-initial [contextTyper]="asyncResult()">
                <p>Please trigger the operation...</p>
            </ng-template>
            <ng-template ppw-async-result-empty>
                <p>No results found for your query.</p>
            </ng-template>
        </ppw-async-result>
    `,
    imports: [AsyncResultModule, JsonPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class AsyncResultWrapperComponent {
    asyncResult = input<AsyncResult<unknown, unknown> | null>(null)
    pending = input<boolean | null>(null)
}

@Component({
    selector: 'ppw-async-result-demo',
    template: `
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; gap: 8px;">
                <button mat-raised-button color="primary" (click)="runSuccess()">Simulate Success</button>
                <button mat-raised-button color="warn" (click)="runError()">Simulate Error</button>
                <button mat-button (click)="reset()">Reset</button>
            </div>
            <div style="border: 1px solid #ddd; padding: 16px; min-height: 150px;">
                <ppw-async-result [asyncResult]="state()" [pending]="pending()">
                    <ng-template ppw-async-result-success let-entity="entity" [contextTyper]="state()">
                        <div style="color: green;">
                            <strong>Loaded successfully:</strong>
                            <pre>{{ entity | json }}</pre>
                        </div>
                    </ng-template>
                    <ng-template ppw-async-result-initial [contextTyper]="state()">
                        <p>Click a button above to start the simulation...</p>
                    </ng-template>
                    <ng-template ppw-async-result-failed let-error="error">
                        <div style="color: red;">
                            <strong>Operation failed:</strong>
                            <p>{{ error.message }}</p>
                        </div>
                    </ng-template>
                </ppw-async-result>
            </div>
        </div>
    `,
    imports: [AsyncResultModule, JsonPipe, MatButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class AsyncResultDemoComponent {
    public state = signal<AsyncResult<{ id: number; label: string } | null, unknown>>({
        status: 'initial',
        entity: null,
        filters: null
    })
    public pending = signal(false)

    public async runSuccess(): Promise<void> {
        this.pending.set(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        this.pending.set(false)
        this.state.set({ status: 'success', entity: { id: 123, label: 'Loaded via Storybook' }, filters: null })
    }

    public async runError(): Promise<void> {
        this.pending.set(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        this.pending.set(false)
        this.state.set({ status: 'failed', error: new Error('Simulated API Timeout'), entity: null, filters: null })
    }

    public reset(): void {
        this.pending.set(false)
        this.state.set({ status: 'initial', entity: null, filters: null })
    }
}

const meta: Meta<AsyncResultWrapperComponent> = {
    title: 'ng-async/AsyncResult',
    component: AsyncResultWrapperComponent,
    decorators: [
        moduleMetadata({
            imports: [AsyncResultWrapperComponent, AsyncResultDemoComponent]
        }),
        applicationConfig({
            providers: [provideTranslateService()]
        })
    ],
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
### When to use
Use the Async Result component to manage the presentation of asynchronous operations. It is ideal for:
- Standardizing how 'initial', 'pending', 'success', 'failed', and 'empty' states are rendered across the application.
- Decoupling the data fetching logic from the UI representation of its various states.
- Providing a consistent user experience for loading indicators and error messages.
                `
            }
        }
    }
}

export default meta
type Story = StoryObj<AsyncResultWrapperComponent>

export const Initial: Story = {
    args: {
        asyncResult: {
            status: 'initial',
            entity: null,
            filters: null
        },
        pending: false
    }
}

export const Pending: Story = {
    args: {
        asyncResult: {
            status: 'initial',
            entity: null,
            filters: null
        },
        pending: true
    }
}

export const Success: Story = {
    args: {
        asyncResult: {
            status: 'success',
            entity: { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
            filters: null
        },
        pending: false
    }
}

export const Empty: Story = {
    args: {
        asyncResult: {
            status: 'success',
            entity: null,
            filters: null
        },
        pending: false
    }
}

export const Failed: Story = {
    args: {
        asyncResult: {
            status: 'failed',
            error: new Error('Something went wrong while fetching data.'),
            entity: null,
            filters: null
        },
        pending: false
    }
}

export const LifecycleDemo: Story = {
    render: () => ({
        template: `<ppw-async-result-demo></ppw-async-result-demo>`
    })
}
