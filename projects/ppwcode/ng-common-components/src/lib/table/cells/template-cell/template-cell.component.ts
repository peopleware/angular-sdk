import { CommonModule } from '@angular/common'
import { mixinCellComponent } from '../mixins/cell-component.mixin'
import { Component, TemplateRef } from '@angular/core'
import { TemplateColumn } from '../../columns/template-column'

// Boilerplate for applying mixins to TemplateCellComponent.
class TemplateCellComponentBase {}

const _TemplateCellComponentBase = mixinCellComponent<
    TemplateColumn<any>,
    typeof TemplateCellComponentBase,
    TemplateRef<any>
>(TemplateCellComponentBase)

@Component({
    selector: 'ppw-template-cell',
    template: `<ng-container *ngTemplateOutlet="value; context: context"></ng-container>`,
    standalone: true,
    imports: [CommonModule]
})
export class TemplateCellComponent extends _TemplateCellComponentBase {
    public get context() {
        return { record: this.record, rowIndex: this.rowIndex, $implicit: this.record }
    }
}
