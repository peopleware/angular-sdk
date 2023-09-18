import { Observable, OperatorFunction } from 'rxjs'
import { filter, map } from 'rxjs/operators'

export function truthyFilter<T>(): OperatorFunction<T | null | undefined, T> {
    return (source$: Observable<T | null | undefined>): Observable<T> =>
        source$.pipe(
            filter<T | null | undefined>(Boolean),
            map((res: T | null | undefined) => res as T)
        )
}
