import { animate, style, transition, trigger } from '@angular/animations'
import { ChangeDetectionStrategy, Component, forwardRef, OnInit, signal } from '@angular/core'
import { FormArray, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms'
import { AbstractTableComponent, TableRecord } from './abstract-table.component'
import { MatTableDataSource } from '@angular/material/table'
import { Column } from './columns/column'

@Component({
    selector: 'ppw-form-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormTableComponent),
            multi: true
        }
    ],
    animations: [
        trigger('rowsAnimation', [
            transition(':enter', [
                style({ transform: 'translateY(-10%)', opacity: 0 }),
                animate('.25s ease-in-out', style({ transform: 'translateY(0)', opacity: 1 }))
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FormTableComponent<TRecord> extends AbstractTableComponent<TRecord> implements OnInit {
    /**
     * Maps the given items into a local key-value pair to be used within
     * the template. The original record is left intact so that it can still
     * be passed along where necessary.
     * @param items The items to map.
     */
    protected _mapToLocalKeyValuePairs(
        items: FormArray<FormGroup>,
        columns: Array<Column<TRecord, unknown>>
    ): Array<TableRecord<TRecord>> {
        const records: FormGroup[] = items.controls ?? []

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

    public addControl(control: FormGroup): void {
        const arr = this.data() as FormArray<FormGroup>
        arr.push(control)
        const localRecords = this._mapToLocalKeyValuePairs(arr, this.columns())
        this.dataSource = signal(new MatTableDataSource(localRecords))
    }

    public removeControl(control: FormGroup): void {
        const arr = (this.data() as FormArray<FormGroup>).controls ?? []
        const res = new FormArray(arr.filter((ctrl: FormGroup) => ctrl !== control))
        const localRecords = this._mapToLocalKeyValuePairs(res, this.columns())
        this.dataSource = signal(new MatTableDataSource(localRecords))
    }
}
