import { SelectionModel } from '@angular/cdk/collections'
import { CommonModule } from '@angular/common'
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core'
import { FormArray, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { mixinHandleSubscriptions } from '@ppwcode/ng-common'

import { DynamicCellDirective } from './cells/directives/dynamic-cell.directive'
import { Column, ColumnType } from './columns/column'
import { DateColumn } from './columns/date-column'
import { NumberColumn } from './columns/number-column'
import { TemplateColumn } from './columns/template-column'
import { TextColumn } from './columns/text-column'
import { PpwTableOptions } from './options/table-options'

@Component({
    selector: 'ppw-table',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatCardModule, MatCheckboxModule, DynamicCellDirective],
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TableComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<TRecord> extends mixinHandleSubscriptions() implements OnInit, OnChanges {
    @Input() public columns: Array<Column<TRecord, unknown>> = []
    @Input() public data: Array<Record<string, unknown>> | FormArray<FormGroup> = []
    @Input() public enableRowSelection = false
    @Input() public options?: PpwTableOptions<TRecord>
    @Output() public selectionChanged: EventEmitter<TableRecord<TRecord>[]> = new EventEmitter<TableRecord<TRecord>[]>()

    /** The data source for the material table. */
    public dataSource!: MatTableDataSource<TableRecord<TRecord>>

    /** The names of the columns that are displayed. */
    public columnNames: Array<string> = []

    public selection = new SelectionModel<TableRecord<TRecord>>(true, [])

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length
        const numRows = this.dataSource.data.length
        return numSelected === numRows
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.dataSource.data.forEach((row: TableRecord<TRecord>) => this.selection.select(row))
    }

    public ngOnInit(): void {
        this.stopOnDestroy(this.selection.changed).subscribe(() => {
            this.selectionChanged.emit(this.selection.selected)
        })
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['columns']) {
            this.columnNames = this.columns.map((column) => column.name)
            if (this.enableRowSelection) {
                this.columnNames.unshift('rowSelection')
            }
        }

        // We need to set the data source in either case because we remap the records
        // to a local set of records. So if a new column is added we need to remap
        // the records again.
        // When adding a new binding to this component, reconsider whether the following
        // line should still be executed for each change to the input bindings.
        this.setDataSource(this.data)
    }

    /**
     * Initialises an entirely new data source and sets the necessary properties.
     * @param items The items for the data source.
     */
    private setDataSource(items: Array<Record<string, unknown>> | FormArray<FormGroup>): void {
        this.dataSource?.disconnect()
        const localRecords = this._mapToLocalKeyValuePairs(items)
        this.dataSource = new MatTableDataSource(localRecords)
    }

    /** Checks whether the given record is of type TableRecord. */
    public isTableRecord(record: any): record is TableRecord {
        return 'mappedValues' in record
    }

    /**
     * Maps the given items into a local key-value pair to be used within
     * the template. The original record is left intact so that it can still
     * be passed along where necessary.
     * @param items The items to map.
     */
    private _mapToLocalKeyValuePairs(
        items: Array<Record<string, unknown>> | FormArray<FormGroup>
    ): Array<TableRecord<TRecord>> {
        let records: Array<unknown>

        if (items instanceof FormArray) {
            records = items.controls
        } else {
            records = items ?? []
        }

        return records.map((record) => {
            const mappedValues: Record<string, unknown> = {}
            for (const column of this.columns) {
                switch (column.type) {
                    case ColumnType.Date:
                        const dateColumn = column as DateColumn<unknown, any>
                        const mappedDateValue: unknown | undefined = getColumnValue(dateColumn, record)

                        mappedValues[dateColumn.name] = mappedDateValue
                            ? dateColumn.formatFn(mappedDateValue)
                            : undefined
                        break
                    case ColumnType.Number:
                        const numberColumn = column as NumberColumn<unknown>
                        const mappedNumberValue: unknown | undefined = getColumnValue(numberColumn, record)

                        mappedValues[numberColumn.name] =
                            numberColumn.formatFn && mappedNumberValue !== null && mappedNumberValue !== undefined
                                ? numberColumn.formatFn(mappedNumberValue as number)
                                : mappedNumberValue !== null && mappedNumberValue !== undefined
                                ? mappedNumberValue
                                : undefined
                        break
                    case ColumnType.Template:
                        const templateColumn = column as TemplateColumn<unknown>
                        const mappedTemplateValue: unknown | undefined = getColumnValue(templateColumn, record)

                        mappedValues[templateColumn.name] = mappedTemplateValue
                        break
                    case ColumnType.Text:
                    default:
                        mappedValues[column.name] = getColumnValue(column as TextColumn<any>, record)
                        break
                }
            }

            // Ensure that properties that have no corresponding column are still available in the mapped local record.
            return {
                initialRecord: record,
                mappedValues
            } as TableRecord<TRecord>
        })
    }

    public executeRowClick(record: TRecord, columnName: string): void {
        this.options?.rowClickAction && (this.options?.ignoreClickColumns?.indexOf(columnName) ?? -1 < 0)
            ? this.options.rowClickAction(record)
            : null
    }
}

export interface TableRecord<T = unknown> {
    /** The initial record that was passed. */
    initialRecord: T
    /** A local mapped representation of the record. */
    mappedValues: Record<string, unknown>
}

/**
 * This function will search the record to see if there is a value nested within it.
 * @param record
 * @param selector
 */
export function getPossibleNestedValue(record: any, selector: any): any | undefined {
    selector = selector.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
    selector = selector.replace(/^\./, '') // strip a leading dot
    const a = selector.split('.')
    for (let i = 0, n = a.length; i < n; ++i) {
        const k = a[i]
        if (record != null && k in record) {
            record = record[k]
        } else {
            return
        }
    }
    return record
}

/**
 * This function wil get the value from the record to further map the values.
 * @param column
 * @param record
 */
export function getColumnValue<TRecord, TValue>(column: Column<TRecord, TValue>, record: TRecord): TValue | undefined {
    let mappedValue: TValue | undefined
    if (typeof column.value === 'undefined' || column.value === null) {
        mappedValue = getPossibleNestedValue(record, column.name)
    } else if (typeof column.value === 'string') {
        mappedValue = getPossibleNestedValue(record, column.value)
    } else {
        mappedValue = column.value(record)
    }

    return mappedValue
}
