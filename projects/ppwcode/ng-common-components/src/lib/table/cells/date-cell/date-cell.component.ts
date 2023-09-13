import { Component } from '@angular/core'
import { DateColumn } from '../../columns/date-column'
import { mixinCellComponent } from '../mixins/cell-component.mixin'

// Boilerplate for applying mixins to DateCellComponent.
class DateCellComponentBase {}

const _DateCellComponentBase = mixinCellComponent<DateColumn<any, any>, typeof DateCellComponentBase, string>(
    DateCellComponentBase
)

/**
 * This component acts as a cell within a table. It's purpose is to display
 * the value that it was given as a date representation.
 *
 * No transformation will be applied to the given value.
 */
@Component({
    template: `{{ value }}`,
    standalone: true
})
export class DateCellComponent extends _DateCellComponentBase {}
