import { ComponentRef, Directive, input, InputSignal, OnInit, Type, ViewContainerRef } from '@angular/core'

import { Column, ColumnType } from '../../columns/column'
import { DateCellComponent } from '../date-cell/date-cell.component'
import { IsCellComponent } from '../mixins/cell-component.mixin'
import { NumberCellComponent } from '../number-cell/number-cell.component'
import { TemplateCellComponent } from '../template-cell/template-cell.component'
import { TextCellComponent } from '../text-cell/text-cell.component'

@Directive({
    selector: '[ppwDynamicCell]',
    standalone: true
})
export class DynamicCellDirective<TRecord> implements OnInit {
    // Inputs
    public column: InputSignal<Column<TRecord, any>> = input.required()
    public record: InputSignal<Record<string, unknown>> = input.required()
    public value: InputSignal<any> = input.required()
    public rowIndex: InputSignal<number> = input.required()

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
        this._instantiateComponent(this._componentTypeMap[this.column().type ?? ColumnType.Text])

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
