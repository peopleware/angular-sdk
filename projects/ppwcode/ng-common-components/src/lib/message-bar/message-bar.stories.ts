import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { MessageBarComponent } from './message-bar.component'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { Severity } from '../enum/severity'

const meta: Meta<MessageBarComponent> = {
    title: 'ng-common-components/MessageBar',
    component: MessageBarComponent,
    decorators: [
        moduleMetadata({
            imports: [MessageBarComponent, MatCardModule, MatButtonModule]
        })
    ],
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
### When to use
Use the Message Bar to provide contextual feedback or status information to the user. It is ideal for:
- Displaying success, error, warning, or informational alerts at the top of a page or section.
- Highlighting important system messages that require user attention.
- Providing inline feedback following a specific user action (e.g., "Settings saved").
                `
            }
        }
    },
    argTypes: {
        severity: {
            description: 'The visual style of the message bar, indicating the nature of the message.',
            control: 'select',
            options: Object.values(Severity),
            table: { category: 'Inputs' }
        },
        message: {
            description: 'The text message to display. If set to null, content projection is used instead.',
            control: 'text',
            table: { category: 'Inputs' }
        }
    }
}

export default meta
type Story = StoryObj<MessageBarComponent>

export const Success: Story = {
    args: {
        severity: Severity.success,
        message: 'The operation was successful!'
    }
}

export const Error: Story = {
    args: {
        severity: Severity.error,
        message: 'An error occurred while processing your request.'
    }
}

export const Warning: Story = {
    args: {
        severity: Severity.warning,
        message: 'Please be careful, this action is irreversible.'
    }
}

export const Info: Story = {
    args: {
        severity: Severity.info,
        message: 'New updates are available for your system.'
    }
}

export const AllVariants: Story = {
    render: () => ({
        template: `
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <ppw-message-bar severity="success" message="Success message: Your changes have been saved."></ppw-message-bar>
                <ppw-message-bar severity="info" message="Info message: A new version is available."></ppw-message-bar>
                <ppw-message-bar severity="warning" message="Warning message: Your subscription expires in 3 days."></ppw-message-bar>
                <ppw-message-bar severity="error" message="Error message: Failed to connect to the server."></ppw-message-bar>
            </div>
        `
    })
}

export const LongMessage: Story = {
    args: {
        severity: Severity.info,
        message:
            'This is a very long message to demonstrate how the message bar handles multiple lines of text. The content area should expand vertically to accommodate the text while maintaining its horizontal padding and alignment. This is useful for detailed instructions or descriptive error messages that cannot be summed up in a single short sentence.'
    }
}

export const WithContentProjection: Story = {
    args: {
        severity: Severity.warning,
        message: null
    },
    render: (args) => ({
        props: args,
        template: `
            <ppw-message-bar [severity]="severity" [message]="message">
                <div style="display: flex; align-items: center; gap: 12px; width: 100%;">
                    <i class="fa-solid fa-triangle-exclamation" style="font-size: 20px;"></i>
                    <div style="flex-grow: 1;">
                        <div style="font-weight: bold;">Advanced Alert</div>
                        <div style="font-size: 0.9em;">This bar uses <strong>content projection</strong> to show a title, description, and an icon.</div>
                    </div>
                    <button mat-flat-button style="background: rgba(255,255,255,0.2); color: inherit; border: 1px solid currentColor;">
                        TAKE ACTION
                    </button>
                </div>
            </ppw-message-bar>
        `
    })
}
