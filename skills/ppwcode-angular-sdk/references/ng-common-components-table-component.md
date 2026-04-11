# TableComponent

## Quick Use

`TableComponent` is exported through `PpwTableModule`, so import the module instead of the component class directly.

```ts
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common'
import { Component, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { Sort } from '@angular/material/sort'
import {
    PPW_TABLE_DEFAULT_OPTIONS,
    PpwTableModule,
    PpwTableOptions,
    SortChange,
    TableRecord
} from '@ppwcode/ng-common-components'

type Order = {
    id: number
    customer: {
        firstName: string
        lastName: string
    }
    createdAt: Date
    total: number
    status: 'Draft' | 'Confirmed' | 'Cancelled'
    canSelect: boolean
    note?: string
}

@Component({
    selector: 'app-example',
    standalone: true,
    imports: [CommonModule, PpwTableModule, MatButtonModule, MatIconModule],
    providers: [
        CurrencyPipe,
        DatePipe,
        {
            provide: PPW_TABLE_DEFAULT_OPTIONS,
            deps: [CurrencyPipe, DatePipe],
            useFactory: (currencyPipe: CurrencyPipe, datePipe: DatePipe) => ({
                numberColumnFormatter: (value: unknown) =>
                    currencyPipe.transform(value, 'EUR', 'symbol', '1.2-2') ?? '',
                dateColumnFormatter: (value: unknown) => datePipe.transform(value, 'dd/MM/yyyy') ?? ''
            })
        }
    ],
    template: `
        <ppw-table
            [data]="orders()"
            [footerData]="footerData"
            [trackBy]="trackByOrder"
            [enableRowSelection]="true"
            [enableRowDrag]="true"
            [options]="tableOptions"
            [sort]="sort()"
            (selectionChanged)="onSelectionChanged($event)"
            (orderChanged)="onOrderChanged($event)"
            (sortChanged)="onSortChanged($event)"
        >
            <ppw-column name="customer" label="Customer" type="text" sortable [valueRetrieval]="fullName"></ppw-column>

            <ppw-column name="createdAt" label="Created" type="date" sortable disableSortClear></ppw-column>

            <ppw-column name="total" label="Total" type="number" sortable></ppw-column>

            <ppw-column name="status" label="Status" type="template" [sortable]="true">
                <ng-template ppw-column-cell let-record>
                    <span [style.font-weight]="record.status === 'Cancelled' ? 700 : 500">
                        {{ record.status }}
                    </span>
                </ng-template>
            </ppw-column>

            <ppw-column name="actions" type="template" stickyEnd>
                <ng-template ppw-column-header>
                    <button mat-icon-button aria-label="Add order" (click)="addDraftOrder()">
                        <mat-icon>add</mat-icon>
                    </button>
                </ng-template>
                <ng-template ppw-column-cell let-record>
                    <button mat-button type="button" (click)="openOrder(record)">Open</button>
                </ng-template>
            </ppw-column>

            <ng-template ppw-empty-page>
                <p>No orders found for the current filter.</p>
            </ng-template>
        </ppw-table>

        <p>Selected ids: {{ selectedIds().join(', ') || 'none' }}</p>
    `
})
export class ExampleComponent {
    private nextId = 4

    protected readonly orders = signal<Order[]>([
        {
            id: 1,
            customer: { firstName: 'Ada', lastName: 'Lovelace' },
            createdAt: new Date('2026-03-12'),
            total: 1240,
            status: 'Confirmed',
            canSelect: true,
            note: 'Priority customer'
        },
        {
            id: 2,
            customer: { firstName: 'Grace', lastName: 'Hopper' },
            createdAt: new Date('2026-03-14'),
            total: 340,
            status: 'Draft',
            canSelect: true
        },
        {
            id: 3,
            customer: { firstName: 'Katherine', lastName: 'Johnson' },
            createdAt: new Date('2026-03-18'),
            total: 0,
            status: 'Cancelled',
            canSelect: false,
            note: 'Cancelled before payment'
        }
    ])

    protected readonly selectedIds = signal<number[]>([])
    protected readonly sort = signal<Sort>({
        active: 'createdAt',
        direction: 'desc'
    })

    protected readonly fullName = (order: Order): string => `${order.customer.firstName} ${order.customer.lastName}`

    protected readonly trackByOrder = (_index: number, order: Order): number => order.id

    protected readonly footerData: Partial<Record<keyof Order | string, unknown>> = {
        customer: 'Total',
        total: this.orders().reduce((sum, order) => sum + order.total, 0)
    }

    protected readonly tableOptions: PpwTableOptions<Order> = {
        header: {
            sticky: true,
            styles: {
                total: () => ({ 'text-align': 'right' })
            }
        },
        footer: {
            sticky: true,
            styles: {
                customer: () => ({ 'font-weight': 700 }),
                total: () => ({ 'font-weight': 700, 'text-align': 'right' })
            }
        },
        columns: {
            widths: {
                createdAt: '140px',
                total: '120px',
                status: '160px',
                actions: '110px'
            },
            styles: {
                total: () => ({ 'text-align': 'right' }),
                status: (order) => ({
                    color: order.status === 'Cancelled' ? '#b3261e' : 'inherit'
                })
            },
            ignoreClick: ['actions']
        },
        rows: {
            highlightOnHover: true,
            onClick: (order) => this.openOrder(order),
            onCtrlClick: (order) => console.log('Ctrl-clicked order', order.id),
            disableRowSelection: (order) => !order.canSelect
        }
    }

    protected onSelectionChanged(records: TableRecord<Order>[]): void {
        this.selectedIds.set(records.map((record) => record.initialRecord.id))
    }

    protected onOrderChanged(records: TableRecord<Order>[]): void {
        this.orders.set(records.map((record) => record.initialRecord))
        this.updateFooter()
    }

    protected onSortChanged(sort: SortChange): void {
        this.sort.set({ active: sort.column, direction: sort.direction })
    }

    protected addDraftOrder(): void {
        this.orders.update((orders) => [
            ...orders,
            {
                id: this.nextId++,
                customer: { firstName: 'New', lastName: 'Customer' },
                createdAt: new Date(),
                total: 0,
                status: 'Draft',
                canSelect: true
            }
        ])
        this.updateFooter()
    }

    protected openOrder(order: Order): void {
        console.log('Open order', order.id)
    }

    private updateFooter(): void {
        this.footerData.total = this.orders().reduce((sum, order) => sum + order.total, 0)
    }
}
```

## Public APIs For Columns

Use only the exported table APIs from `@ppwcode/ng-common-components` when defining columns:

-   `PpwTableModule` to make `ppw-table`, `ppw-column`, `ppw-column-header`, `ppw-column-cell`, and `ppw-empty-page` available.
-   `ppw-column` with public inputs such as `name`, `type`, `label`, `sortable`, `disableSortClear`, `sticky`, `stickyEnd`, `valueRetrieval`, `dateFormatFn`, and `numberFormatFn`.
-   `ppw-column-header` for a custom header template.
-   `ppw-column-cell` for a custom cell template. When you use it, the column `type` must be `"template"`.
-   `ppw-empty-page` for custom empty-page content.

Avoid relying on internal table classes such as `TextColumn`, `NumberColumn`, `DateColumn`, or `TemplateColumn` in consumer code.

## Common Patterns

-   Use `valueRetrieval` when the displayed value comes from nested data or needs to be derived from the record.
-   Use `PPW_TABLE_DEFAULT_OPTIONS` to provide shared date and number formatting for all tables in a feature.
-   Use `PpwTableOptions` for widths, alignment, row click behavior, sticky header/footer, and selection rules.
-   Use `TableRecord<T>` in event handlers like `selectionChanged` and `orderChanged` when you need access to the original row object.
-   Bind the `sort` input and handle `sortChanged` if the sorted state lives outside the table component.

## Guidance

-   Import `PpwTableModule` instead of trying to import `TableComponent` directly in a standalone component.
-   Always provide a stable `trackBy` function so selection and drag behavior remain predictable.
-   Use `ignoreClick` for action columns so row click handlers do not fire when users press inline buttons.
-   Prefer `valueRetrieval` for text, number, and date columns; prefer `ppw-column-cell` only when the cell needs custom markup.
-   If you enable row selection, consider `disableRowSelection` for rows that should never be selectable.
