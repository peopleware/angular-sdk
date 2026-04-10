import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { BreadcrumbComponent } from './breadcrumb.component'
import { provideRouter } from '@angular/router'
import { provideTranslateService } from '@ngx-translate/core'
import { BreadcrumbService, provideBreadcrumbOptions } from './breadcrumb.service'
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core'
import { Breadcrumb } from './breadcrumb.model'

@Component({
    selector: 'ppw-breadcrumb-wrapper',
    template: `
        <ppw-breadcrumb [class.no-animations]="!enableAnimations()">
            @if (showHome()) {
                <div ppw-breadcrumb-home>
                    <i class="fa fa-home"></i>
                </div>
            }
        </ppw-breadcrumb>
    `,
    imports: [BreadcrumbComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class BreadcrumbWrapperComponent {
    showHome = input<boolean>(true)
    enableAnimations = input<boolean>(true)
}

const meta: Meta<BreadcrumbWrapperComponent> = {
    title: 'ng-router/Breadcrumb',
    component: BreadcrumbWrapperComponent,
    decorators: [
        moduleMetadata({
            imports: [BreadcrumbWrapperComponent],
            providers: [
                {
                    provide: BreadcrumbService,
                    useValue: {
                        breadcrumbs: signal<Breadcrumb[]>([
                            { label: 'Home', url: '/' },
                            { label: 'Products', url: '/products' },
                            { label: 'Category', url: '/products/category' },
                            { label: 'Detail', url: '/products/category/detail' }
                        ])
                    }
                }
            ]
        }),
        applicationConfig({
            providers: [
                provideRouter([]),
                provideTranslateService(),
                provideBreadcrumbOptions({
                    enableAnimations: true,
                    preferLabelFromRouteData: false
                })
            ]
        })
    ],
    tags: ['autodocs'],
    argTypes: {
        showHome: {
            description: 'Whether to show the home icon at the start of the breadcrumb trail.',
            control: 'boolean',
            table: { category: 'Inputs' }
        },
        enableAnimations: {
            description: 'Whether to enable transition animations when breadcrumbs change.',
            control: 'boolean',
            table: { category: 'Inputs' }
        }
    },
    parameters: {
        docs: {
            description: {
                component: `
### When to use
Use the Breadcrumb component to indicate the user's location within the application's hierarchy. It is ideal for:
- Applications with deep navigational structures.
- Providing a secondary navigation path back to parent pages.
- Helping users understand the relationship between the current page and its ancestors.
                `
            }
        }
    }
}

export default meta
type Story = StoryObj<BreadcrumbWrapperComponent>

export const Default: Story = {
    args: {
        showHome: true
    }
}

export const WithoutHome: Story = {
    args: {
        showHome: false
    }
}

export const AnimationsDisabled: Story = {
    args: {
        showHome: true,
        enableAnimations: false
    }
}
