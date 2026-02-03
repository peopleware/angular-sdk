import { DestroyRef, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Observable } from 'rxjs'
import { Constructor } from './constructor'

/**
 * Defines that subscriptions can be handled.
 */
export interface CanHandleSubscriptions {
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
export const mixinHandleSubscriptions = <T extends Constructor<object>>(base?: T): CanHandleSubscriptionsCtor & T => {
    const baseClass: T = base ?? (class {} as T)

    return class extends baseClass implements CanHandleSubscriptions {
        #destroyRef: DestroyRef = inject(DestroyRef)

        public stopOnDestroy<TStreamResult>(stream$: Observable<TStreamResult>): Observable<TStreamResult> {
            return stream$.pipe(takeUntilDestroyed(this.#destroyRef))
        }
    }
}
