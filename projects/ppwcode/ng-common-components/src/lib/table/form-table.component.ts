import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core'
import { FormArray, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table'
import { AbstractTableComponent } from './abstract-table.component'
import { Column } from './columns/column'
import { TableRecord } from './models/table-record.model'

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
        const formGroups = this.data() as FormArray<FormGroup>
        formGroups.push(control)
        this.refreshDataSource(formGroups)
    }

    public removeControl(control: FormGroup): void {
        const formGroups = (this.data() as FormArray<FormGroup>) ?? []
        formGroups.removeAt(formGroups.controls.findIndex((fg) => fg === control))
        this.refreshDataSource(formGroups)
    }

    private refreshDataSource(control: FormArray<FormGroup>): void {
        const localRecords = this._mapToLocalKeyValuePairs(control, this.columns())
        this.dataSource.set(new MatTableDataSource(localRecords))
    }
}
