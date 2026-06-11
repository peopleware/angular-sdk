type ColumnOptionMap<TRecord, TValue> = {
    [columnName in keyof Partial<TRecord> | string]?: TValue
}

type StyleValue = { [key: string]: unknown }

/**
 * Interface describing the options for a ppwcode table.
 */
export interface PpwTableOptions<TRecord> {
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
        styles?: ColumnOptionMap<TRecord, () => StyleValue>
    }
    /**
     * Configuration for the footer of the table.
     */
    footer?: {
        /** Whether the header should stick to the top of the table when scrolling. */
        sticky?: boolean
        /** CSS styles to conditionally apply to the header cells of the given columns. */
        styles?: Partial<Record<string, () => StyleValue>>
    }

    /**
     * Configuration for the columns of the table.
     */
    columns?: {
        /**
         * The widths of the columns in the table.
         * The keys are the column names. Any string is allowed because column names are not limited to the keys of a record,
         * because we can have columns that are calculated from other columns.
         * The values are the widths in CSS units: px, %, em, rem, ...
         */
        widths?: ColumnOptionMap<TRecord, string>
        /** CSS styles to conditionally apply to the cells of the given columns. */
        styles?: ColumnOptionMap<TRecord, (record: TRecord) => StyleValue>
        /** Column names to ignore the row click for. */
        ignoreClick?: string[]
    }

    /**
     * Configuration for the rows of the table.
     */
    rows?: {
        /** Whether the row should be highlighted on hover. */
        highlightOnHover?: boolean
        /** Function to be executed when the row is clicked. */
        onClick?: (row: TRecord) => void
        /** Function to be executed when the row is CTRL-clicked. */
        onCtrlClick?: (row: TRecord) => void
        /** Disable selection of the current row. */
        disableRowSelection?: (row: TRecord) => boolean
    }
}
