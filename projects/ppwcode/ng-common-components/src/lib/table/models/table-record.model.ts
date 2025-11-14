export interface TableRecord<T = unknown> {
    /** The initial record that was passed. */
    initialRecord: T
    /** A local mapped representation of the record. */
    mappedValues: Record<string, unknown>
    /** The value generated for the trackBy function. */
    trackByValue: unknown
    /** Whether the record can be selected. */
    selectable: boolean
}
