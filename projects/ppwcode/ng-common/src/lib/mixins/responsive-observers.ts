import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { inject } from '@angular/core'
import { map, Observable, shareReplay } from 'rxjs'
import { Constructor } from './constructor'

/**
 * Defines helper functions to make responsive designed screen layouts.
 */
export interface CanResponsiveObservers {
    /** Observable to see if screen size is Small. */
    isSmallScreen$: Observable<boolean>
    /** Observable to see if screen size is XSmall. */
    isXSmallScreen$: Observable<boolean>
    /** Observable to see if screen size is Medium. */
    isMediumScreen$: Observable<boolean>
    /** Observable to see if screen size is Large. */
    isLargeScreen$: Observable<boolean>
    /** Observable to see if screen size is XLarge. */
    isXLargeScreen$: Observable<boolean>
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
    }
}
