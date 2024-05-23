import { Component } from '@angular/core'
import { Constructor } from '@ppwcode/ng-common'

import { TextColumn } from '../../columns/text-column'
import { mixinCellComponent } from '../mixins/cell-component.mixin'

/**
 * This component acts as a cell within a table. It's purpose is to display
 * the value that it was given as a textual representation.
 *
 * No transformation will be applied to the given value.
 */
@Component({
    selector: 'ppw-text-cell',
    template: `{{ value }}`,
    standalone: true
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/ban-types
export class TextCellComponent extends mixinCellComponent<TextColumn<any>, Constructor<{}>, string>() {}
