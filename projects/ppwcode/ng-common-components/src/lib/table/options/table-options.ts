import { TemplateRef } from '@angular/core'

/**
 * Interface describing the options for a ppwcode table.
 */
export interface PpwTableOptions<TRecord> {
    /**
     * The widths of the columns in the table.
     * The keys are the column names. Any string is allowed because column names are not limited to the keys of a record,
     * because we can have columns that are calculated from other columns.
     * The values are the widths in CSS units: px, %, em, rem, ...
     */
    columnWidths?: Record<keyof Partial<TRecord> | string, string>

    ignoreClickColumns?: string[]

    rowClickAction?: (row: TRecord) => void

    rowHighlightOnHover?: boolean

    /**
     * Configuration for the header of the table.
     */
    header?: {
        /** Whether the header should stick to the top of the table when scrolling. */
        sticky?: boolean
        /** Whether the header should be hidden. */
        hidden?: boolean
        /** Whether the first row should have a top border. This is only applied when the header is hidden. */
        showFirstRowTopBorder?: boolean
        /** CSS styles to conditionally apply to the header cells of the given columns. */
        styles?: Record<keyof Partial<TRecord> | string, () => { [key: string]: unknown }>
    }

    columnStyles?: Record<keyof Partial<TRecord> | string, (record: TRecord) => { [key: string]: unknown }>

    columnHeaderTemplates?: Record<keyof Partial<TRecord> | string, () => TemplateRef<any>>
}
