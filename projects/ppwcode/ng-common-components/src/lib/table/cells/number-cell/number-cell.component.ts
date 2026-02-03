import { Component } from '@angular/core'
import { Constructor } from '@ppwcode/ng-common'
import { NumberColumn } from '../../columns/number-column'
import { mixinCellComponent } from '../mixins/cell-component.mixin'

/**
 * This component acts as a cell within a table. It's purpose is to display
 * the value that it was given as a numeric representation.
 *
 * No transformation will be applied to the given value.
 */
@Component({
    selector: 'ppw-number-cell',
    template: '{{ value() }}',
    standalone: true
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class NumberCellComponent extends mixinCellComponent<NumberColumn<any>, Constructor<object>, string>() {}
