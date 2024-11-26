import { Directive } from '@angular/core'

/**
 * Directive used to identify the template for when the table has an empty page.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[ppw-empty-page]',
    standalone: false
})
export class PpwEmptyTablePageDirective {}
