import { BehaviorSubject, map, MonoTypeOperatorFunction, Observable, of, switchMap, tap } from 'rxjs'
import { Constructor } from './constructor'

/**
 * Interface describing something that supports "pending" tracking.
 */
export interface CanTrackPending {
    /** Tracks the pending state. */
    pending$: Observable<boolean>

    /* eslint-disable @typescript-eslint/no-explicit-any */
    startPending: (trackingName?: string) => MonoTypeOperatorFunction<any>
    stopPending: (trackingName?: string) => MonoTypeOperatorFunction<any>
    /* eslint-enable @typescript-eslint/no-explicit-any */

    /** Wraps the given observable with the startPending and stopPending tracking functions. */
    trackPending<T>(stream$: Observable<T>, trackingName?: string): Observable<T>

    /** Gets an observable emitting the pending state of the tracker. */
    isPending: (trackingName?: string) => Observable<boolean>
}

/** A constructable type that implements the CanPage interface. */
export type CanTrackPendingCtor = Constructor<CanTrackPending>

/**
 * Enhances the given base class with functionality for tracking a "pending" state.
 * The initial state of the pending situation is "true".
 * @param isInitiallyPending Whether the pending state is true on initial creation of the class.
 * @param base An optional base class.
 */
export const mixinTrackPending = <T extends Constructor<Record<string, unknown>>>(
    isInitiallyPending = true,
    base?: T
): T & CanTrackPendingCtor => {
    base ??= class {} as T
    return class extends base implements CanTrackPending {
        private pendingTrackers$: BehaviorSubject<{ [key: string]: boolean }> = new BehaviorSubject<{
            [key: string]: boolean
        }>({
            pending: isInitiallyPending
        })

        public pending$: Observable<boolean> = this.isPending()

        /* eslint-disable @typescript-eslint/no-explicit-any */
        public startPending = (trackingName = 'pending'): MonoTypeOperatorFunction<any> =>
            tap(() => {
                this.pendingTrackers$.next({
                    ...this.pendingTrackers$.value,
                    [trackingName]: true
                })
            })
        public stopPending = (trackingName = 'pending'): MonoTypeOperatorFunction<any> =>
            tap(() => {
                this.pendingTrackers$.next({
                    ...this.pendingTrackers$.value,
                    [trackingName]: false
                })
            })
        /* eslint-enable @typescript-eslint/no-explicit-any */

        public trackPending<T>(stream$: Observable<T>, trackingName = 'pending'): Observable<T> {
            return of(null).pipe(
                this.startPending(trackingName),
                switchMap(() => stream$),
                this.stopPending(trackingName)
            )
        }

        public isPending(trackingName = 'pending'): Observable<boolean> {
            return this.pendingTrackers$.pipe(map((trackers) => trackers[trackingName]))
        }
    }
}
