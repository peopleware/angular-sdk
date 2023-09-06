import { OnDestroy } from '@angular/core'
import { Observable, Subject, takeUntil } from 'rxjs'
import { Constructor } from './constructor'

/**
 * Defines that subscriptions can be handled.
 */
export interface CanHandleSubscriptions extends OnDestroy {
    /** Called when Angular destroys the directive, pipe or service. */
    ngOnDestroy(): void

    /** Function to be used to wrap a stream with subscription handling. */
    stopOnDestroy<T>(stream$: Observable<T>): Observable<T>
}

/** Constructable type that can handle subscriptions. */
export type CanHandleSubscriptionsCtor = Constructor<CanHandleSubscriptions>

/**
 * Mixin to extend the given constructable with functionality to manage subscriptions.
 * Provides the following:
 * - A function to wrap a stream with the PPW way of subscription handling.
 * - An ngOnDestroy implementation to automatically unsubscribe to all known subscriptions.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const mixinHandleSubscriptions = <T extends Constructor<{}>>(base?: T): CanHandleSubscriptionsCtor & T => {
    const baseClass: T = base ?? (class {} as T)

    return class extends baseClass implements CanHandleSubscriptions {
        private readonly onDestroy$: Subject<void> = new Subject()

        public ngOnDestroy(): void {
            this.onDestroy$.next()
            this.onDestroy$.complete()
        }

        public stopOnDestroy<TStreamResult>(stream$: Observable<TStreamResult>): Observable<TStreamResult> {
            return stream$.pipe(takeUntil(this.onDestroy$))
        }
    }
}
