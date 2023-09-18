import { Observable, OperatorFunction } from 'rxjs'
import { first, map } from 'rxjs/operators'

export function truthyFirst<T>(): OperatorFunction<T | null | undefined, T> {
    return (source$: Observable<T | null | undefined>): Observable<T> =>
        source$.pipe(
            first<T | null | undefined>(Boolean),
            map((res: T | null | undefined) => res as T)
        )
}
