import { Directive, input, InputSignal, Signal } from '@angular/core'
import { Observable } from 'rxjs'

import { AsyncResult } from '../models/async-result'
import { PpwAsyncResultSuccessContext } from './async-result-success-context'
import { PpwAsyncResultSuccessDirective } from './ppw-async-result-success.directive'

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[ppw-async-result-initial]',
    /* eslint-disable @angular-eslint/prefer-standalone */
    standalone: false
})
export class PpwAsyncResultInitialDirective<TResult, TFilters> {
    public contextTyper: InputSignal<
        | Observable<AsyncResult<TResult, TFilters> | null>
        | Signal<AsyncResult<TResult, TFilters> | null>
        | AsyncResult<TResult, TFilters>
        | null
    > = input.required()

    static ngTemplateContextGuard<TResult, TFilters>(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        dir: PpwAsyncResultSuccessDirective<TResult, TFilters>,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ctx: unknown
    ): dir is PpwAsyncResultSuccessContext<TResult, TFilters> {
        return true
    }
}
