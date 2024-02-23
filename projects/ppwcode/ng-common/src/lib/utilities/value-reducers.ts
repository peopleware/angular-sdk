import { isSignal, Signal } from '@angular/core'
import { toObservable } from '@angular/core/rxjs-interop'
import { combineLatest, isObservable, map, Observable, of, startWith } from 'rxjs'

export type ObservableConvertableValue<T> = T | Signal<T> | Observable<T>

export const invert = (observable$: ObservableConvertableValue<boolean>) =>
    ensureObservable(observable$).pipe(map((value) => !value))

export const oneTrue = (...observables$: ObservableConvertableValue<boolean>[]) =>
    combineLatest(ensureObservables(observables$)).pipe(map((values) => values.some((value) => value)))

const ensureObservable = <T>(value: ObservableConvertableValue<T>): Observable<T> =>
    isObservable(value) ? value : isSignal(value) ? toObservable(value).pipe(startWith(value())) : of(value)

const ensureObservables = <T>(
    values: ObservableConvertableValue<T> | Array<ObservableConvertableValue<T>>
): Observable<T>[] => (Array.isArray(values) ? values.map(ensureObservable) : [ensureObservable(values)])
