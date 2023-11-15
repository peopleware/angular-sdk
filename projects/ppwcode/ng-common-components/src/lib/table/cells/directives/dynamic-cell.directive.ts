import { ComponentRef, Directive, Input, OnInit, Type, ViewContainerRef } from '@angular/core'

import { Column, ColumnType } from '../../columns/column'
import { IsCellComponent } from '../mixins/cell-component.mixin'
import { DateCellComponent } from '../date-cell/date-cell.component'
import { NumberCellComponent } from '../number-cell/number-cell.component'
import { TextCellComponent } from '../text-cell/text-cell.component'
import { TemplateCellComponent } from '../template-cell/template-cell.component'

@Directive({
    selector: '[ppwDynamicCell]',
    standalone: true
})
export class DynamicCellDirective<TRecord> implements OnInit, IsCellComponent<any> {
    @Input() public column!: Column<TRecord, any>
    @Input() public record!: Record<string, unknown>
    @Input() public value!: any
    @Input() public rowIndex!: number

    /** A reference to the instantiated component. */
    public componentRef!: ComponentRef<IsCellComponent<Column<TRecord, any>>>

    private _componentTypeMap = {
        [ColumnType.Date]: DateCellComponent,
        [ColumnType.Text]: TextCellComponent,
        [ColumnType.Number]: NumberCellComponent,
        [ColumnType.Template]: TemplateCellComponent
    }

    public constructor(private _viewContainerRef: ViewContainerRef) {}

    public ngOnInit(): void {
        this._instantiateComponent(this._componentTypeMap[this.column.type ?? ColumnType.Text])

        this.componentRef.instance.rowIndex = this.rowIndex
        this.componentRef.instance.column = this.column
        this.componentRef.instance.record = this.record
        this.componentRef.instance.value = this.value
    }

    /**
     * Creates a new instance of the component on the view container.
     */
    private _instantiateComponent(component: Type<any>): void {
        this.componentRef = this._viewContainerRef.createComponent(component)
    }
}
