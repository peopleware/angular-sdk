import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { ToolbarComponent } from './toolbar.component'
import { Router } from '@angular/router'
import { of } from 'rxjs'

const meta: Meta<ToolbarComponent> = {
    title: 'Components/Toolbar',
    component: ToolbarComponent,
    tags: ['autodocs'],
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
