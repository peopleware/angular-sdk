import { Directive, inject, TemplateRef } from '@angular/core'

/**
 * Directive used to identify the template for the header of a column.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[ppw-column-header]'
})
export class PpwColumnHeaderDirective {
    public templateRef: TemplateRef<unknown> = inject(TemplateRef)
}
