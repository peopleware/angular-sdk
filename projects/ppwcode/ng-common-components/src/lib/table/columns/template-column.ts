import { TemplateRef } from '@angular/core'
import { Column, ColumnType } from './column'

/**
 * Represents a column with text inside.
 */
export class TemplateColumn<TRecord> implements Column<TRecord, TemplateRef<any>> {
    public readonly type = ColumnType.Template

    public constructor(
        /**
         * The unique name of the column within a set of columns.
         */
        public name: string,

        /**
         * The label to show in the header of the column.
         */
        public label: string,

        /**
         * The name of the property to get the value from or a function that can be called
         * to retrieve the value from the current record.
         */
        public value?: string | ((record: TRecord) => TemplateRef<any>)
    ) {}
}
