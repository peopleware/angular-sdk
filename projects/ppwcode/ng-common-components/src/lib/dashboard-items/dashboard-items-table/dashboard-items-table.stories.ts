import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { DashboardItemsTableComponent } from './dashboard-items-table.component'
import { provideTranslateService } from '@ngx-translate/core'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { DashboardItem } from '../models/dashboard-item.model'

const meta: Meta<DashboardItemsTableComponent> = {
    title: 'ng-common-components/DashboardItemsTable',
    component: DashboardItemsTableComponent,
    decorators: [
        moduleMetadata({
            imports: [DashboardItemsTableComponent]
        }),
        applicationConfig({
            providers: [provideNoopAnimations(), provideTranslateService()]
        })
    ],
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
### When to use
Use the Dashboard Items Table to display a grid of interactive 'cards' on a dashboard. It is ideal for:
- High-level navigation where each card represents a distinct functional area or entity.
- Displaying summary metrics or status indicators for different modules.
- Providing quick access to common actions related to specific application areas.
                `
            }
        }
    },
    argTypes: {
        dashboardItems: {
            description: 'The list of items to display in the dashboard table.',
            control: 'object',
            table: { category: 'Inputs' }
        },
        dashboardOptions: {
            description: 'Global configuration options for the dashboard table.',
            control: 'object',
            table: { category: 'Inputs' }
        },
        executeAction: {
            description: 'Event emitted when an action (default or button) is triggered.',
            action: 'executeAction',
            table: { category: 'Outputs' }
        }
    }
}

export default meta
type Story = StoryObj<DashboardItemsTableComponent>

const mockItems: DashboardItem[] = [
    {
        titleKey: 'Users',
        descriptionKey: 'Manage your application users and their roles.',
        iconClass: 'fa-solid fa-users',
        badgeContent: '5',
        actions: [
            { labelKey: 'View All', clickFn: () => {} },
            { labelKey: 'Add New', clickFn: () => {} }
        ],
        defaultAction: { labelKey: 'Default', clickFn: () => {} }
    },
    {
        titleKey: 'Settings',
        descriptionKey: 'Configure your application preferences.',
        iconClass: 'fa-solid fa-gear',
        actions: [{ labelKey: 'Edit Settings', clickFn: () => {} }],
        defaultAction: { labelKey: 'Default', clickFn: () => {} }
    },
    {
        titleKey: 'Reports',
        descriptionKey: 'View detailed analytics and reports.',
        iconClass: 'fa-solid fa-chart-line',
        badgeContent: 'NEW',
        actions: [{ labelKey: 'Download PDF', clickFn: () => {} }],
        defaultAction: { labelKey: 'Default', clickFn: () => {} }
    }
]

export const Default: Story = {
    args: {
        dashboardItems: mockItems
    }
}

export const LeftAligned: Story = {
    args: {
        dashboardItems: mockItems,
        dashboardOptions: {
            cardsAlignment: 'left'
        }
    }
}

export const ColumnActions: Story = {
    args: {
        dashboardItems: mockItems.map((item) => ({
            ...item,
            actionsDirection: 'column',
            actionsAlignment: 'start'
        }))
    }
}

export const CustomTemplate: Story = {
    args: {
        dashboardItems: [
            {
                titleKey: 'Custom Content',
                descriptionKey: 'This item uses a custom template instead of an icon.',
                badgeContent: '!',
                actions: [{ labelKey: 'Action', clickFn: () => {} }],
                defaultAction: { labelKey: 'Default', clickFn: () => {} }
            }
        ]
    },
    render: (args) => ({
        props: {
            ...args,
            noop: () => {}
        },
        template: `
            <ng-template #customTmpl>
                <div style="height: 120px; display: flex; align-items: center; justify-content: center; background: linear-gradient(45deg, #009b3e, #005a24); color: white; border-radius: 4px;">
                    <div style="text-align: center;">
                        <div style="font-size: 24px; font-weight: bold;">85%</div>
                        <div style="font-size: 12px;">Efficiency</div>
                    </div>
                </div>
            </ng-template>
            <ppw-dashboard-items-table
                [dashboardItems]="[{
                    titleKey: 'Custom Content',
                    descriptionKey: 'This item uses a custom template instead of an icon.',
                    badgeContent: '!',
                    template: customTmpl,
                    actions: [{ labelKey: 'Action', clickFn: noop }],
                    defaultAction: { labelKey: 'Default', clickFn: noop }
                }]"
                [dashboardOptions]="dashboardOptions"
                (executeAction)="executeAction($event)">
            </ppw-dashboard-items-table>
        `
    })
}

export const Empty: Story = {
    args: {
        dashboardItems: []
    }
}
