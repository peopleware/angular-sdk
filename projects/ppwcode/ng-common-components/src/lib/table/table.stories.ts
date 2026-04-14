import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { ChangeDetectionStrategy, Component, input, output, TrackByFunction } from '@angular/core'
import { DatePipe } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatRippleModule } from '@angular/material/core'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { PpwTableModule } from './table.module'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { PPW_TABLE_DEFAULT_OPTIONS } from './providers'
import { PpwTableOptions } from './options/table-options'

@Component({
    selector: 'ppw-table-wrapper',
    template: `
        <ppw-table
            [data]="data()"
            [trackBy]="trackByFn()"
            [enableRowSelection]="enableRowSelection()"
            [enableRowDrag]="enableRowDrag()"
            [expandable]="expandable()"
            [expandableTemplate]="expTemplate"
            [disableAnimations]="disableAnimations()"
            [footerData]="footerData()"
            [options]="options()"
            (sortChanged)="sortChanged.emit($event)"
        >
            <ppw-column name="name" label="Name" type="text" [sortable]="true"></ppw-column>
            <ppw-column name="age" label="Age" type="number" [sortable]="true"></ppw-column>
            <ppw-column name="city" label="City" type="template" [sortable]="true">
                <ng-template ppw-column-cell let-record="record">
                    <span style="color: blue; font-weight: bold;">
                        <i class="fa-solid fa-location-dot"></i> {{ record.city }}
                    </span>
                </ng-template>
            </ppw-column>

            <ng-template ppw-empty-page>
                <div style="padding: 40px; text-align: center; background: #fffbe6; border: 1px dashed #ffe58f;">
                    <mat-icon style="font-size: 48px; height: 48px; width: 48px; color: #faad14;">info</mat-icon>
                    <p style="margin-top: 16px; font-size: 18px;">No data available to display.</p>
                </div>
            </ng-template>

            <ng-template #expTemplate let-record>
                <div style="padding: 16px; background: #f9f9f9; border-left: 4px solid #009b3e;">
                    <strong>Details for {{ record.name }}:</strong>
                    <p>Joined on: {{ record.joined | date }}</p>
                    <p>This is an expanded detail view for {{ record.city }}.</p>
                </div>
            </ng-template>
        </ppw-table>
    `,
    imports: [
        PpwTableModule,
        DatePipe,
        MatIconModule,
        MatButtonModule,
        MatRippleModule,
        MatSortModule,
        MatTableModule,
        MatCheckboxModule,
        DragDropModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class TableWrapperComponent {
    data = input<Record<string, unknown>[]>([])
    trackByFn = input<TrackByFunction<Record<string, unknown>>>(
        (index: number, item: Record<string, unknown>) => item['id']
    )
    enableRowSelection = input(false)
    enableRowDrag = input(false)
    expandable = input(false)
    disableAnimations = input(false)
    footerData = input<Record<string, unknown> | undefined>(undefined)
    options = input<PpwTableOptions<Record<string, unknown>> | undefined>(undefined)
    sortChanged = output<unknown>()
}

const meta: Meta<TableWrapperComponent> = {
    title: 'ng-common-components/Table',
    component: TableWrapperComponent,
    decorators: [
        moduleMetadata({
            imports: [TableWrapperComponent]
        }),
        applicationConfig({
            providers: [
                provideNoopAnimations(),
                {
                    provide: PPW_TABLE_DEFAULT_OPTIONS,
                    useValue: {
                        dateColumnFormatter: (v: unknown) =>
                            v instanceof Date ? v.toLocaleDateString() : (v as object)?.toString(),
                        numberColumnFormatter: (v: unknown) => (v as number)?.toLocaleString()
                    }
                }
            ]
        })
    ],
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
### When to use
Use the Table component to display structured datasets. It is ideal for:
- Data-heavy views where users need to scan, sort, and compare information.
- Situations requiring complex row features like selection, drag-and-drop, or expansion for detail views.
- Displaying summaries or aggregates using the footer functionality.
                `
            }
        }
    },
    argTypes: {
        data: {
            description: 'The data array to be displayed in the table.',
            control: 'object',
            table: { category: 'Inputs' }
        },
        enableRowSelection: {
            description: 'If true, shows checkboxes for selecting one or multiple rows.',
            control: 'boolean',
            table: { category: 'Inputs' }
        },
        enableRowDrag: {
            description: 'If true, allows users to reorder rows via drag-and-drop.',
            control: 'boolean',
            table: { category: 'Inputs' }
        },
        expandable: {
            description: 'If true, enables a detail view that expands when a row is clicked.',
            control: 'boolean',
            table: { category: 'Inputs' }
        },
        disableAnimations: {
            description: 'If true, disables CSS animations for row expansion.',
            control: 'boolean',
            table: { category: 'Inputs' }
        },
        footerData: {
            description: 'Optional data to be displayed in a sticky footer row.',
            control: 'object',
            table: { category: 'Inputs' }
        },
        options: {
            description: 'Configuration for styling, behavior, and formatting.',
            control: 'object',
            table: { category: 'Inputs' }
        },
        sortChanged: {
            description: 'Emitted when a sortable column header is clicked.',
            action: 'sortChanged',
            table: { category: 'Outputs' }
        }
    }
}

export default meta
type Story = StoryObj<TableWrapperComponent>

const MOCK_DATA = [
    { id: 1, name: 'John Doe', age: 30, city: 'New York', joined: new Date(2020, 1, 15), status: 'Active' },
    { id: 2, name: 'Jane Smith', age: 25, city: 'London', joined: new Date(2021, 5, 20), status: 'Pending' },
    { id: 3, name: 'Bob Johnson', age: 45, city: 'Paris', joined: new Date(2019, 11, 10), status: 'Inactive' },
    { id: 4, name: 'Alice Brown', age: 35, city: 'Berlin', joined: new Date(2022, 3, 5), status: 'Active' }
]

export const Basic: Story = {
    args: {
        data: MOCK_DATA
    }
}

export const SelectionAndDrag: Story = {
    args: {
        data: MOCK_DATA,
        enableRowSelection: true,
        enableRowDrag: true
    }
}

export const ExpandableRows: Story = {
    args: {
        data: MOCK_DATA,
        expandable: true
    }
}

export const CustomStyling: Story = {
    args: {
        data: MOCK_DATA,
        options: {
            rows: {
                highlightOnHover: true,
                onClick: (record: Record<string, unknown>) => alert(`Clicked on ${record['name']}`),
                onCtrlClick: (record: Record<string, unknown>) => console.log('Control + Click on:', record)
            },
            header: {
                sticky: true,
                styles: {
                    name: () => ({ color: '#009b3e', 'font-weight': 'bold' })
                }
            },
            columns: {
                styles: {
                    status: (record: Record<string, unknown>) => {
                        if (record['status'] === 'Inactive') {
                            return { 'background-color': '#fff0f0', color: '#cf000f', 'font-weight': 'bold' }
                        }
                        if (record['status'] === 'Pending') {
                            return { 'background-color': '#fffbe6', color: '#faad14' }
                        }
                        return { 'background-color': '#f6ffed', color: '#52c41a' }
                    }
                }
            }
        }
    }
}

export const EmptyState: Story = {
    args: {
        data: []
    }
}

export const FullFeatured: Story = {
    args: {
        data: MOCK_DATA,
        enableRowSelection: true,
        enableRowDrag: true,
        expandable: true,
        footerData: {
            name: 'Average Age:',
            age: 33.75
        },
        options: {
            rows: {
                highlightOnHover: true
            },
            header: {
                sticky: true
            }
        }
    }
}
