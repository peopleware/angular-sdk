import { Directive } from '@angular/core'

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[ppw-async-result-initial]'
})
export class PpwAsyncResultInitialDirective {}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[ppw-async-result-success]'
})
export class PpwAsyncResultSuccessDirective {}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[ppw-async-result-empty]'
})
export class PpwAsyncResultEmptyDirective {}
