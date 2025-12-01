import { Signal } from '@angular/core'

/**
 * Enum containing the different column types supported by the DataTablesModule.
 */
export enum ColumnType {
    /** A column that will display the value as it is given. */
    Text = 'text',
    Date = 'date',
    Number = 'number',
    Template = 'template'
}

/**
 * The representation of a column.
 * TRecord is the type of object in the items array.
 * TValue is the type of the resulting value.
 */
export interface Column<TRecord, TValue> {
    /** The type of the column. */
    readonly type: ColumnType
    /** The unique name of the column within a set of columns. */
    name: string

    /** The label to display in the column header. */
    label: string

    /** Whether the column should be sticky. */
    sticky: boolean

    /** Whether the column should be sticky at the end of the row. */
    stickyEnd: boolean

    /** Whether the column is sortable. */
    sortable: Signal<boolean>

    /** Whether the sort clear should be disabled. */
    disableSortClear: Signal<boolean>

    value?: string | ((record: TRecord) => TValue)
}
