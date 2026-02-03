import { Component } from '@angular/core'
import { Constructor } from '@ppwcode/ng-common'
import { DateColumn } from '../../columns/date-column'
import { mixinCellComponent } from '../mixins/cell-component.mixin'

/**
 * This component acts as a cell within a table. Its purpose is to display
 * the value that it was given as a date representation.
 *
 * No transformation will be applied to the given value.
 */
@Component({
    selector: 'ppw-date-cell',
    template: '{{ value() }}',
    standalone: true
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DateCellComponent extends mixinCellComponent<DateColumn<any, any>, Constructor<object>, string>() {}
