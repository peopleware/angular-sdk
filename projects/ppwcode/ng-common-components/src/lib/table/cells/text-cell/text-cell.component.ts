import { Component } from '@angular/core'

import { TextColumn } from '../../columns/text-column'
import { mixinCellComponent } from '../mixins/cell-component.mixin'

// Boilerplate for applying mixins to TextCellComponent.
class TextCellComponentBase {}
const _TextCellComponentBase = mixinCellComponent<TextColumn<any>, typeof TextCellComponentBase, string>(
    TextCellComponentBase
)

/**
 * This component acts as a cell within a table. It's purpose is to display
 * the value that it was given as a textual representation.
 *
 * No transformation will be applied to the given value.
 */
@Component({
    template: `{{ value }}`,
    standalone: true
})
export class TextCellComponent extends _TextCellComponentBase {}
