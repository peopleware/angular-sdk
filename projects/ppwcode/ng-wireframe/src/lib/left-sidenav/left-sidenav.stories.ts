import { componentWrapperDecorator, Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { CommonModule } from '@angular/common'
import { LeftSidenavComponent } from './left-sidenav.component'
import { NavigationItem } from '../navigation-item/navigation-item.model'
import { TranslateModule } from '@ngx-translate/core'

const meta: Meta<LeftSidenavComponent> = {
    title: 'Components/LeftSidenav',
    component: LeftSidenavComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule, TranslateModule.forRoot()]
        }),
        componentWrapperDecorator(
            (story) => `<div style="background-color: #18428c; height: 100vh; width: 250px;">${story}</div>`
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

export const NoLogo: Story = {
    args: {
        navigationItems,
        showMenuCloseButton: true
    }
}

export const ManyItems: Story = {
    args: {
        navigationItems: [...navigationItems, ...navigationItems, ...navigationItems],
        showMenuCloseButton: true
    }
}
