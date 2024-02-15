import { Signal } from '@angular/core'
import { Observable } from 'rxjs'
import { AsyncResult } from '../models/async-result'

export interface PpwAsyncResultSuccessContext<TResult, TFilters> {
    $implicit: AsyncResult<TResult, TFilters>
    contextTyper:
        | Observable<AsyncResult<TResult, TFilters> | null>
        | Signal<AsyncResult<TResult, TFilters> | null>
        | AsyncResult<TResult, TFilters>
        | null
    entity: TResult
}
