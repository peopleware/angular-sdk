import { Component } from '@angular/core'
import { mixinCellComponent } from '../mixins/cell-component.mixin'
import { NumberColumn } from '../../columns/number-column'

// Boilerplate for applying mixins to TextCellComponent.
class NumberCellComponentBase {}
const _NumberCellComponentBase = mixinCellComponent<NumberColumn<any>, typeof NumberCellComponentBase, string>(
    NumberCellComponentBase
)

/**
 * This component acts as a cell within a table. It's purpose is to display
 * the value that it was given as a numeric representation.
 *
 * No transformation will be applied to the given value.
 */
@Component({
    selector: 'ppw-number-cell',
    template: `{{ value }}`,
    standalone: true
})
export class NumberCellComponent extends _NumberCellComponentBase {}
