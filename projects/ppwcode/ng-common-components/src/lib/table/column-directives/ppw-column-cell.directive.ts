import { Directive, inject, TemplateRef } from '@angular/core'

/**
 * Directive used to identify the template for the cell of a column.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[ppw-column-cell]',
    standalone: false
})
export class PpwColumnCellDirective {
    public templateRef: TemplateRef<unknown> = inject(TemplateRef)
}
