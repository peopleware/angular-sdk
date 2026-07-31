import { componentWrapperDecorator, Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { CommonModule } from '@angular/common'
import { LeftSidenavComponent } from './left-sidenav.component'
import { NavigationItem } from '../navigation-item/navigation-item.model'
import { TranslateModule } from '@ngx-translate/core'

const meta: Meta<LeftSidenavComponent> = {
    title: 'ng-wireframe/LeftSidenav',
    component: LeftSidenavComponent,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
### When to use
Use the Left Sidenav for the primary vertical navigation of the application. It is ideal for:
- Organizing hierarchical navigation links with support for nested children.
- Displaying the main application logo and branding.
- Providing a slide-out navigation menu for mobile or compact layouts.
                `
            }
        }
    },
    argTypes: {
        navigationItems: {
            description: 'The hierarchical list of navigation items to display.',
            control: 'object',
            table: { category: 'Inputs' }
        },
        showMenuCloseButton: {
            description: 'Whether to show the close button at the top (useful for mobile overlays).',
            control: 'boolean',
            table: { category: 'Inputs' }
        },
        logoUrl: {
            description: 'The URL of the logo image to display at the top.',
            control: 'text',
            table: { category: 'Inputs' }
        },
        logoHeight: {
            description: 'The height of the logo in pixels.',
            control: 'number',
            table: { category: 'Inputs' }
        },
        logoWidth: {
            description: 'The width of the logo in pixels.',
            control: 'number',
            table: { category: 'Inputs' }
        },
        centerLogo: {
            description: 'Whether to center the logo horizontally.',
            control: 'boolean',
            table: { category: 'Inputs' }
        },
        closeSidebar: {
            description: 'Emitted when the close button is clicked.',
            action: 'closeSidebar',
            table: { category: 'Outputs' }
        },
        navigated: {
            description: 'Emitted when a navigation item is clicked.',
            action: 'navigated',
            table: { category: 'Outputs' }
        }
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule, TranslateModule.forRoot()]
        }),
        componentWrapperDecorator(
            (story) =>
                `<div style="background-color: #18428c; height: 500px; width: 250px; overflow-y: auto;">${story}</div>`
        )
    ]
}

export default meta
type Story = StoryObj<LeftSidenavComponent>

const navigationItems: Array<NavigationItem> = [
    {
        label: 'Dashboard',
        icon: 'fa-solid fa-house',
        fullRouterPath: '/dashboard'
    },
    {
        label: 'Settings',
        icon: 'fa-solid fa-gear',
        children: [
            {
                label: 'Profile',
                icon: 'fa-solid fa-user',
                fullRouterPath: '/settings/profile'
            },
            {
                label: 'Security',
                icon: 'fa-solid fa-lock',
                fullRouterPath: '/settings/security'
            }
        ]
    },
    {
        label: 'External Link',
        icon: 'fa-solid fa-globe',
        fullRouterPath: 'https://storybook.js.org',
        isExternalLink: true
    }
]

export const Default: Story = {
    args: {
        navigationItems,
        showMenuCloseButton: true,
        logoUrl: '/assets/ppwcode_logo.png',
        logoHeight: 60,
        logoWidth: 60,
        centerLogo: true
    }
}

export const DeeplyNested: Story = {
    args: {
        navigationItems: [
            {
                label: 'Level 1',
                icon: 'fa-solid fa-folder',
                children: [
                    {
                        label: 'Level 2',
                        icon: 'fa-solid fa-folder-open',
                        children: [
                            {
                                label: 'Level 3 - Item A',
                                icon: 'fa-solid fa-file',
                                fullRouterPath: '/l1/l2/a'
                            },
                            {
                                label: 'Level 3 - Item B',
                                icon: 'fa-solid fa-file',
                                fullRouterPath: '/l1/l2/b'
                            }
                        ]
                    }
                ]
            }
        ],
        showMenuCloseButton: true
    }
}

export const WithDisabledItems: Story = {
    args: {
        navigationItems: [
            ...navigationItems,
            {
                label: 'Disabled Module',
                icon: 'fa-solid fa-ban',
                fullRouterPath: '/disabled',
                isEnabled: false
            }
        ],
        showMenuCloseButton: true
    }
}

export const NoLogo: Story = {
    args: {
        navigationItems,
        showMenuCloseButton: true
    }
}
