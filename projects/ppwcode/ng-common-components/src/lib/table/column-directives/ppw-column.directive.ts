import { AfterContentInit, ContentChild, Directive, inject, Input, TemplateRef } from '@angular/core'
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
    selector: 'ppw-column'
})
export class PpwColumnDirective<TRecord> implements AfterContentInit {
    #columnDefinition!: Column<TRecord, unknown>
    #tableDefaultOptions: PpwTableDefaultOptions | null = inject(PPW_TABLE_DEFAULT_OPTIONS, { optional: true })

    /** The name of the column, this should be unique within the table. */
    @Input({ required: true }) public name!: string | keyof TRecord

    /** The type of the column, this determines the way its value is rendered and is optional if a cell template is set. */
    @Input({ required: true }) public type!: ColumnType | Lowercase<keyof typeof ColumnType>

    /** The label of the column, this is shown in the header of the column if no header template is set. */
    @Input() public label?: string

    /** The formatting function to format number values. When not provided, the default from PPW_TABLE_OPTIONS is used. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Input() public numberFormatFn?: (value: any) => string

    /** The formatting function to format date values. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Input() public dateFormatFn?: (value: any) => string

    /** The name of the property to get the value from, or a custom function providing the value. */
    @Input() public valueRetrieval?: string | ((record: TRecord) => unknown)

    /** Reference to the optional header cell template. */
    @ContentChild(PpwColumnHeaderDirective, { static: true }) private headerCellDirective!: PpwColumnHeaderDirective

    /** Reference to the optional row cell template. */
    @ContentChild(PpwColumnCellDirective, { static: true }) private columnCellDirective!: PpwColumnCellDirective

    /** Gets the column definition that is determined by the input bindings and content children. */
    public get columnDefinition(): Column<TRecord, unknown> {
        return this.#columnDefinition
    }

    /** Gets the template reference from the found header cell directive. */
    public get headerTemplate(): TemplateRef<unknown> | undefined {
        return this.headerCellDirective?.templateRef
    }

    /** Gets the number formatting function to use. This is the `numberFormatFn` input or the default from PPW_TABLE_OPTIONS. */
    private get numberFormatter(): ((value: unknown) => string) | undefined {
        return this.numberFormatFn ?? this.#tableDefaultOptions?.numberColumnFormatter
    }

    /** Gets the date formatting function to use. This is the `dateFormatFn` input or the default from PPW_TABLE_OPTIONS. */
    private get dateFormatter(): ((value: unknown) => string) | undefined {
        return this.dateFormatFn ?? this.#tableDefaultOptions?.dateColumnFormatter
    }

    public ngAfterContentInit(): void {
        /**
         * When a column cell is given, the column should always be a TemplateColumn. Other columns have no support
         * for custom templates to be used.
         */
        if (this.columnCellDirective) {
            if (this.type !== ColumnType.Template) {
                throw new Error(
                    `When providing a cell template for column ${
                        this.name as string
                    }, the column type should be set to ${ColumnType.Template}}`
                )
            }
            this.#columnDefinition = new TemplateColumn(
                this.name as string,
                this.label ?? '',
                () => this.columnCellDirective.templateRef
            )
            return
        }

        switch (this.type) {
            case ColumnType.Date:
                if (!this.dateFormatter) {
                    throw new Error(
                        `There is no date formatter available. Either pass one or use the ${PPW_TABLE_DEFAULT_OPTIONS} provider to provide one.`
                    )
                }

                this.#columnDefinition = new DateColumn(
                    this.name as string,
                    this.label ?? '',
                    this.dateFormatter,
                    this.valueRetrieval ?? (this.name as string)
                )
                break
            case ColumnType.Number:
                this.#columnDefinition = new NumberColumn(
                    this.name as string,
                    this.label ?? '',
                    (this.valueRetrieval as string | ((record: TRecord) => number)) ?? (this.name as string),
                    this.numberFormatter
                )
                break
            case ColumnType.Template:
                this.#columnDefinition = new TemplateColumn(
                    this.name as string,
                    this.label ?? '',
                    () => this.columnCellDirective.templateRef
                )
                break
            case ColumnType.Text:
                this.#columnDefinition = new TextColumn(
                    this.name as string,
                    this.label ?? '',
                    (this.valueRetrieval as string | ((record: TRecord) => string)) ?? (this.name as string)
                )
                break
            default:
                throw new Error(`Unsupported column type ${this.type}`)
        }
    }
}
