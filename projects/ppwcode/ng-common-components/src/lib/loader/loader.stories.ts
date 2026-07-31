import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { LoaderComponent } from './loader.component'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'

const meta: Meta<LoaderComponent> = {
    title: 'ng-common-components/Loader',
    component: LoaderComponent,
    decorators: [
        moduleMetadata({
            imports: [LoaderComponent, MatProgressBarModule]
        }),
        applicationConfig({
            providers: [provideNoopAnimations()]
        })
    ],
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
### When to use
Use the Loader component to provide visual feedback during asynchronous data fetching or long-running operations. It is ideal for:
- Wrapping content areas that are currently being updated or fetched from a server.
- Preventing user interaction with a specific section of the UI while a process is in progress.
- Indicating that a specific part of the page is "alive" and working, rather than frozen.
                `
            }
        }
    },
    argTypes: {
        loading: {
            description: 'Whether the loading indicator and overlay are shown.',
            control: 'boolean',
            table: { category: 'Inputs' }
        }
    }
}

export default meta
type Story = StoryObj<LoaderComponent>

export const Default: Story = {
    args: {
        loading: false
    },
    render: (args) => ({
        props: args,
        template: `
            <div style="position: relative;">
                <ppw-loader [loading]="loading">
                    <div style="padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px; background: white;">
                        <h3 style="margin-top: 0;">Protected Content</h3>
                        <p>This content is wrapped by the loader. When <code>loading</code> is true, a progress bar appears above and an overlay covers this area.</p>
                        <p>The container needs <code>position: relative</code> for the overlay to align correctly.</p>
                    </div>
                </ppw-loader>
            </div>
        `
    })
}

export const LoadingState: Story = {
    args: {
        loading: true
    },
    render: (args) => ({
        props: args,
        template: `
            <div style="position: relative; max-width: 500px;">
                <ppw-loader [loading]="loading">
                    <div style="padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px; background: white;">
                        <h3 style="margin-top: 0;">Data is fetching...</h3>
                        <p>The overlay prevents interaction with this content while the progress bar indicates activity.</p>
                        <div style="height: 100px; display: flex; align-items: center; justify-content: center; background: #fafafa; border: 1px dashed #ccc;">
                            Placeholder for data
                        </div>
                    </div>
                </ppw-loader>
            </div>
        `
    })
}

export const SignalIntegration: Story = {
    decorators: [
        moduleMetadata({
            imports: [MatButtonModule]
        })
    ],
    render: () => {
        const isLoading = signal(false)
        return {
            props: {
                isLoading,
                toggle: () => isLoading.set(!isLoading())
            },
            template: `
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div>
                        <button mat-raised-button color="primary" (click)="toggle()">
                            Toggle Loading: {{ isLoading() ? 'ON' : 'OFF' }}
                        </button>
                    </div>
                    <div style="position: relative; width: 400px;">
                        <ppw-loader [loading]="isLoading()">
                            <div style="padding: 20px; border: 1px solid #ddd; border-radius: 4px; background: #fff;">
                                <strong>Interactive Signal Demo</strong>
                                <p>This loader is controlled by a local Angular Signal.</p>
                            </div>
                        </ppw-loader>
                    </div>
                </div>
            `
        }
    }
}
