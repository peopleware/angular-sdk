import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { ToolbarComponent } from './toolbar.component'
import { Router } from '@angular/router'
import { of } from 'rxjs'

const meta: Meta<ToolbarComponent> = {
    title: 'ng-wireframe/Toolbar',
    component: ToolbarComponent,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
### When to use
Use the Toolbar component at the top of the application or a specific module. It is ideal for:
- Displaying the current page title and branding.
- Providing access to global actions (like the sidenav toggle).
- Hosting application-wide controls or user identity information.
                `
            }
        }
    },
    argTypes: {
        showMenuToggle: {
            description: 'Whether to show the hamburger menu toggle button.',
            control: 'boolean',
            table: { category: 'Inputs' }
        },
        isSidenavOpen: {
            description: 'The current state of the sidebar (open or closed). affects the toggle icon.',
            control: 'boolean',
            table: { category: 'Inputs' }
        },
        showPageTitle: {
            description: 'Whether to display the title derived from the current route.',
            control: 'boolean',
            table: { category: 'Inputs' }
        },
        toolbarHeightPx: {
            description: 'The height of the toolbar in pixels.',
            control: 'number',
            table: { category: 'Inputs' }
        },
        toggleSidebar: {
            description: 'Emitted when the menu toggle button is clicked.',
            action: 'toggleSidebar',
            table: { category: 'Outputs' }
        }
    },
    decorators: [
        moduleMetadata({
            providers: [
                {
                    provide: Router,
                    useValue: {
                        events: of(),
                        routerState: {
                            snapshot: {
                                root: {
                                    firstChild: null,
                                    title: 'Page Title'
                                }
                            }
                        }
                    }
                }
            ]
        })
    ]
}

export default meta
type Story = StoryObj<ToolbarComponent>

export const Default: Story = {
    args: {
        showMenuToggle: true,
        isSidenavOpen: true,
        showPageTitle: true,
        toolbarHeightPx: 64
    }
}

export const SidenavClosed: Story = {
    args: {
        showMenuToggle: true,
        isSidenavOpen: false,
        showPageTitle: true
    }
}

export const NoTitle: Story = {
    args: {
        showMenuToggle: true,
        isSidenavOpen: true,
        showPageTitle: false
    }
}
