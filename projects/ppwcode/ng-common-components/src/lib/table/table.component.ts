import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { AbstractTableComponent } from './abstract-table.component'
import { Column } from './columns/column'
import { TableRecord } from './models/table-record.model'

@Component({
    selector: 'ppw-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TableComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TableComponent<TRecord>
    extends AbstractTableComponent<TRecord, Array<Record<string, unknown>>>
    implements OnInit
{
    /**
     * Maps the given items into a local key-value pair to be used within
     * the template. The original record is left intact so that it can still
     * be passed along where necessary.
     * @param items The items to map.
     */
    protected _mapToLocalKeyValuePairs(
        items: Array<Record<string, unknown>>,
        columns: Array<Column<TRecord, unknown>>
    ): Array<TableRecord<TRecord>> {
        const records: Array<Record<string, unknown>> = items ?? []

        return records.map((record, index) => {
            const mappedValues: Record<string, unknown> = {}
            for (const column of columns) {
                mappedValues[column.name] = this.mapValue(column, record)
            }

            // Ensure that properties that have no corresponding column are still available in the mapped local record.
            return {
                initialRecord: record,
                mappedValues,
                trackByValue: this.trackBy()(index, record as TRecord)
            } as TableRecord<TRecord>
        })
    }
}
