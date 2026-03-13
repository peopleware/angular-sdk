import { componentWrapperDecorator, Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { WireframeComponent } from './wireframe.component'
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router'
import { of } from 'rxjs'
import { BREADCRUMB_PROVIDER_OPTIONS, BreadcrumbService } from '@ppwcode/ng-router'
import { CommonModule } from '@angular/common'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { LeftSidenavComponent } from '../left-sidenav/left-sidenav.component'
import { ToolbarComponent } from '../toolbar/toolbar.component'
import { signal } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'

const meta: Meta<WireframeComponent> = {
    title: 'Components/Wireframe',
    component: WireframeComponent,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            story: {
                iframeHeight: 600
            }
        }
    },
    decorators: [
        moduleMetadata({
            imports: [
                CommonModule,
                MatSidenavModule,
                MatIconModule,
                RouterLink,
                RouterOutlet,
                LeftSidenavComponent,
                ToolbarComponent,
                TranslateModule.forRoot()
            ],
            providers: [
                {
                    provide: Router,
                    useValue: {
                        events: of(),
                        routerState: {
                            snapshot: {
                                root: {
                                    firstChild: null,
                                    data: { showWireframe: true },
                                    url: [],
                                    pathFromRoot: []
                                }
                            }
                        }
                    }
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            data: { showWireframe: true }
                        }
                    }
                },
                {
                    provide: BreadcrumbService,
                    useValue: {
                        breadcrumbs: signal([])
                    }
                },
                {
                    provide: BREADCRUMB_PROVIDER_OPTIONS,
                    useValue: { preferLabelFromRouteData: false, enableAnimations: true }
                }
            ]
        }),
        componentWrapperDecorator((story) => `<div style="height: 600px">${story}</div>`)
    ]
}

export default meta
type Story = StoryObj<WireframeComponent>

const navigationItems = [
    {
        label: 'Dashboard',
        icon: 'fa-solid fa-house',
        fullRouterPath: '/dashboard'
    },
    {
        label: 'Users',
        icon: 'fa-solid fa-users',
        fullRouterPath: '/users'
    }
]

export const Default: Story = {
    args: {
        navigationItems,
        sidebarOptions: {
            logoUrl: '/assets/ppwcode_logo.png',
            logoHeight: 60,
            logoWidth: 60,
            showPageTitle: true
        },
        toolbarHeightPx: 64,
        showBreadcrumb: true
    }
}

export const NoNavigation: Story = {
    args: {
        navigationItems: [],
        hideSidenavWhenNoNavigationItems: true,
        sidebarOptions: {
            showPageTitle: true
        },
        showBreadcrumb: true
    }
}
