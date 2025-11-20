export interface SortChange {
    /** The name of the column that was sorted. */
    column: string
    /** The direction of the sort. */
    direction: 'asc' | 'desc' | ''
}
