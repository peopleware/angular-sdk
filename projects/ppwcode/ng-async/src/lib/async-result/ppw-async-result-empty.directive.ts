import { Directive } from '@angular/core'

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[ppw-async-result-empty]',
    /* eslint-disable @angular-eslint/prefer-standalone */
    standalone: false
})
export class PpwAsyncResultEmptyDirective {}
