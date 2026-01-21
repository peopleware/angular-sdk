import {
    booleanAttribute,
    computed,
    contentChild,
    Directive,
    inject,
    input,
    InputSignal,
    InputSignalWithTransform,
    Signal,
    TemplateRef
} from '@angular/core'
import { notUndefined } from '@ppwcode/ng-utils'
import { Column, ColumnType } from '../columns/column'
import { DateColumn } from '../columns/date-column'
import { NumberColumn } from '../columns/number-column'
import { TemplateColumn } from '../columns/template-column'
import { TextColumn } from '../columns/text-column'
import { PPW_TABLE_DEFAULT_OPTIONS, PpwTableDefaultOptions } from '../providers'
import { PpwColumnCellDirective } from './ppw-column-cell.directive'
import { PpwColumnHeaderDirective } from './ppw-column-header.directive'

/**
 * This directive represents what a column should look like in the table.
 *
 * It can be used in the template, between the `ppw-table` tags.
 * @example
 * `<ppw-table [data]="myDataArray">
 *     <ppw-column name="name" label="Name" type="Text"></ppw-column>
 * </ppw-table>`
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'ppw-column',
    standalone: false
})
export class PpwColumnDirective<TRecord> {
    #tableDefaultOptions: PpwTableDefaultOptions | null = inject(PPW_TABLE_DEFAULT_OPTIONS, { optional: true })

    // Inputs
    /** The name of the column, this should be unique within the table. */
    public name: InputSignal<string | keyof TRecord> = input.required()

    /** The type of the column, this determines the way its value is rendered and is optional if a cell template is set. */
    public type: InputSignal<ColumnType | Lowercase<keyof typeof ColumnType>> = input.required()

    /** The label of the column, this is shown in the header of the column if no header template is set. */
    public label: InputSignal<string | undefined> = input<string | undefined>(undefined)

    /** Whether the column should be sticky. */
    public sticky: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })

    /** Whether the column should be sticky at the end of the row. */
    public stickyEnd: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })

    /** The formatting function to format number values. When not provided, the default from PPW_TABLE_OPTIONS is used. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public numberFormatFn: InputSignal<((value: any) => string) | undefined> = input<
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((value: any) => string) | undefined
    >(undefined)

    /** The formatting function to format date values. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public dateFormatFn: InputSignal<((value: any) => string) | undefined> = input<
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((value: any) => string) | undefined
    >(undefined)

    /** The name of the property to get the value from, or a custom function providing the value. */
    public valueRetrieval: InputSignal<string | ((record: TRecord) => unknown) | undefined> = input<
        string | ((record: TRecord) => unknown) | undefined
    >(undefined)

    /** Whether the column is sortable. */
    public sortable: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })

    /** Whether the sort clear should be disabled. */
    public disableSortClear: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })

    // Content children
    /** Reference to the optional header cell template. */
    private headerCellDirective: Signal<PpwColumnHeaderDirective | undefined> = contentChild(PpwColumnHeaderDirective)

    /** Reference to the optional row cell template. */
    private columnCellDirective: Signal<PpwColumnCellDirective | undefined> = contentChild(PpwColumnCellDirective)

    /** Gets the template reference from the found header cell directive. */
    public get headerTemplate(): TemplateRef<unknown> | undefined {
        return this.headerCellDirective()?.templateRef
    }

    /** Gets the number formatting function to use. This is the `numberFormatFn` input or the default from PPW_TABLE_OPTIONS. */
    private get numberFormatter(): ((value: unknown) => string) | undefined {
        return this.numberFormatFn() ?? this.#tableDefaultOptions?.numberColumnFormatter
    }

    /** Gets the date formatting function to use. This is the `dateFormatFn` input or the default from PPW_TABLE_OPTIONS. */
    private get dateFormatter(): ((value: unknown) => string) | undefined {
        return this.dateFormatFn() ?? this.#tableDefaultOptions?.dateColumnFormatter
    }

    public columnDefinition: Signal<Column<TRecord, unknown> | undefined> = computed(() => {
        /**
         * When a column cell is given, the column should always be a TemplateColumn. Other columns have no support
         * for custom templates to be used.
         */
        if (this.columnCellDirective()) {
            if (this.type() !== ColumnType.Template) {
                throw new Error(
                    `When providing a cell template for column ${
                        this.name() as string
                    }, the column type should be set to ${ColumnType.Template}}`
                )
            }
            return new TemplateColumn(
                this.name() as string,
                this.label() ?? '',
                this.sticky(),
                this.stickyEnd(),
                this.sortable,
                this.disableSortClear,
                () => notUndefined(this.columnCellDirective()).templateRef
            )
        }

        switch (this.type()) {
            case ColumnType.Date:
                if (!this.dateFormatter) {
                    throw new Error(
                        `There is no date formatter available. Either pass one or use the ${PPW_TABLE_DEFAULT_OPTIONS} provider to provide one.`
                    )
                }

                return new DateColumn(
                    this.name() as string,
                    this.label() ?? '',
                    this.sticky(),
                    this.stickyEnd(),
                    this.dateFormatter,
                    this.sortable,
                    this.disableSortClear,
                    this.valueRetrieval() ?? (this.name() as string)
                )
            case ColumnType.Number:
                return new NumberColumn(
                    this.name() as string,
                    this.label() ?? '',
                    this.sticky(),
                    this.stickyEnd(),
                    this.sortable,
                    this.disableSortClear,
                    (this.valueRetrieval() as string | ((record: TRecord) => number)) ?? (this.name() as string),
                    this.numberFormatter
                )
            case ColumnType.Template:
                return new TemplateColumn(
                    this.name() as string,
                    this.label() ?? '',
                    this.sticky(),
                    this.stickyEnd(),
                    this.sortable,
                    this.disableSortClear,
                    () => notUndefined(this.columnCellDirective()).templateRef
                )
            case ColumnType.Text:
                return new TextColumn(
                    this.name() as string,
                    this.label() ?? '',
                    this.sticky(),
                    this.stickyEnd(),
                    this.sortable,
                    this.disableSortClear,
                    (this.valueRetrieval() as string | ((record: TRecord) => string)) ?? (this.name() as string)
                )
            default:
                throw new Error(`Unsupported column type ${this.type}`)
        }
    })
}
