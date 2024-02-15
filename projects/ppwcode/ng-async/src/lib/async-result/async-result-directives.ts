import { Directive, Input, Signal } from '@angular/core'
import { Observable } from 'rxjs'
import { AsyncResult } from '../models/async-result'
import { PpwAsyncResultSuccessContext } from './async-result-success-context'

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[ppw-async-result-initial]'
})
export class PpwAsyncResultInitialDirective<TResult, TFilters> {
    @Input({ required: true }) public contextTyper!:
        | Observable<AsyncResult<TResult, TFilters> | null>
        | Signal<AsyncResult<TResult, TFilters> | null>
        | AsyncResult<TResult, TFilters>
        | null

    static ngTemplateContextGuard<TResult, TFilters>(
        dir: PpwAsyncResultSuccessDirective<TResult, TFilters>,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ctx: unknown
    ): dir is PpwAsyncResultSuccessContext<TResult, TFilters> {
        return true
    }
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[ppw-async-result-success]'
})
export class PpwAsyncResultSuccessDirective<T, U> {
    @Input({ required: true }) public contextTyper!:
        | Observable<AsyncResult<T, U> | null>
        | Signal<AsyncResult<T, U> | null>
        | AsyncResult<T, U>
        | null

    static ngTemplateContextGuard<TResult, TFilters>(
        dir: PpwAsyncResultSuccessDirective<TResult, TFilters>,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ctx: unknown
    ): dir is PpwAsyncResultSuccessContext<TResult, TFilters> {
        return true
    }
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[ppw-async-result-empty]'
})
export class PpwAsyncResultEmptyDirective {}
