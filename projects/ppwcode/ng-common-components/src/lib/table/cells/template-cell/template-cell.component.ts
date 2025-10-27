import { CommonModule } from '@angular/common'
import { Component, computed, TemplateRef } from '@angular/core'
import { Constructor } from '@ppwcode/ng-common'
import { TemplateColumn } from '../../columns/template-column'
import { mixinCellComponent } from '../mixins/cell-component.mixin'

@Component({
    selector: 'ppw-template-cell',
    template: `<ng-container *ngTemplateOutlet="value(); context: context()"></ng-container>`,
    imports: [CommonModule]
})
export class TemplateCellComponent extends mixinCellComponent<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TemplateColumn<any>,
    Constructor<object>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TemplateRef<any>
>() {
    public readonly context = computed(() => ({
        record: this.record(),
        rowIndex: this.rowIndex(),
        $implicit: this.record()
    }))
}
