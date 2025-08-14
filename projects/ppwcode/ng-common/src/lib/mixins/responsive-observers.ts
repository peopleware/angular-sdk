import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { inject, Signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { map, Observable, shareReplay } from 'rxjs'
import { Constructor } from './constructor'

/**
 * Defines helper functions to make responsive designed screen layouts.
 * For screensizes see here: https://material.angular.dev/cdk/layout/overview#predefined-breakpoints
 */
export interface CanResponsiveObservers {
    /** Observable to see if screen size is at least Small.
     * @deprecated It is advised to start using the isAtLeastSmall signal instead.
     */
    isSmallScreen$: Observable<boolean>
    /** Observable to see if screen size is at least XSmall.
     * @deprecated It is advised to start using the isAtLeastXSmall signal instead.
     */
    isXSmallScreen$: Observable<boolean>
    /** Observable to see if screen size is at least Medium.
     * @deprecated It is advised to start using the isAtLeastMedium signal instead.
     */
    isMediumScreen$: Observable<boolean>
    /** Observable to see if screen size is at least Large.
     * @deprecated It is advised to start using the isAtLeastLarge signal instead.
     */
    isLargeScreen$: Observable<boolean>
    /** Observable to see if screen size is at least XLarge.
     * @deprecated It is advised to start using the isAtLeastXLarge signal instead.
     */
    isXLargeScreen$: Observable<boolean>
    /** Signal to see if screen size is at least XSmall. */
    isAtLeastXSmall: Signal<boolean>
    /** Signal to see if screen size is at least Small. */
    isAtLeastSmall: Signal<boolean>
    /** Signal to see if screen size is at least Medium. */
    isAtLeastMedium: Signal<boolean>
    /** Signal to see if screen size is at least Large. */
    isAtLeastLarge: Signal<boolean>
    /** Signal to see if screen size is at least XLarge. */
    isAtLeastXLarge: Signal<boolean>
}

/** Constructable type that offers responsive observers helper functions. */
export type CanResponsiveObserversCtor = Constructor<CanResponsiveObservers>

/**
 * Mixin to extend the given constructable with functionality to implement responsive design.
 * Provides the following:
 * - functions to know the current screensize.
 */
export const mixinResponsiveObservers = <T extends Constructor<object>>(base?: T): CanResponsiveObserversCtor & T => {
    const baseClass: T = base ?? (class {} as T)

    return class extends baseClass implements CanResponsiveObservers {
        private breakpointObserver: BreakpointObserver = inject(BreakpointObserver)

        private observeBreakpoint = (breakpoints: Array<string> | string) => {
            return toSignal(
                this.breakpointObserver.observe(breakpoints).pipe(
                    map((state) => state.matches),
                    shareReplay()
                ),
                { requireSync: true }
            )
        }

        public isXSmallScreen$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(
            map((state) => state.matches),
            shareReplay()
        )
        public isSmallScreen$: Observable<boolean> = this.breakpointObserver
            .observe([Breakpoints.XSmall, Breakpoints.Small])
            .pipe(
                map((state) => state.matches),
                shareReplay()
            )
        public isMediumScreen$: Observable<boolean> = this.breakpointObserver
            .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
            .pipe(
                map((state) => state.matches),
                shareReplay()
            )
        public isLargeScreen$: Observable<boolean> = this.breakpointObserver
            .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
            .pipe(
                map((state) => state.matches),
                shareReplay()
            )
        public isXLargeScreen$: Observable<boolean> = this.breakpointObserver
            .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
            .pipe(
                map((state) => state.matches),
                shareReplay()
            )
        public isAtLeastXSmall: Signal<boolean> = this.observeBreakpoint([Breakpoints.XSmall])
        public isAtLeastSmall: Signal<boolean> = this.observeBreakpoint([Breakpoints.XSmall, Breakpoints.Small])
        public isAtLeastMedium: Signal<boolean> = this.observeBreakpoint([
            Breakpoints.XSmall,
            Breakpoints.Small,
            Breakpoints.Medium
        ])
        public isAtLeastLarge: Signal<boolean> = this.observeBreakpoint([
            Breakpoints.XSmall,
            Breakpoints.Small,
            Breakpoints.Medium,
            Breakpoints.Large
        ])
        public isAtLeastXLarge: Signal<boolean> = this.observeBreakpoint([
            Breakpoints.XSmall,
            Breakpoints.Small,
            Breakpoints.Medium,
            Breakpoints.Large,
            Breakpoints.XLarge
        ])
    }
}
