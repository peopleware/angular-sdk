import { CommonModule } from '@angular/common'
import { Component, TemplateRef } from '@angular/core'
import { Constructor } from '@ppwcode/ng-common'
import { TemplateColumn } from '../../columns/template-column'
import { mixinCellComponent } from '../mixins/cell-component.mixin'

@Component({
    selector: 'ppw-template-cell',
    template: `<ng-container *ngTemplateOutlet="value; context: context"></ng-container>`,
    standalone: true,
    imports: [CommonModule]
})
export class TemplateCellComponent extends mixinCellComponent<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TemplateColumn<any>,
    // eslint-disable-next-line @typescript-eslint/ban-types
    Constructor<{}>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TemplateRef<any>
>() {
    public get context() {
        return { record: this.record, rowIndex: this.rowIndex, $implicit: this.record }
    }
}
