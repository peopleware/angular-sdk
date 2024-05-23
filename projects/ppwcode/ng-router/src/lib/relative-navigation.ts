import { Constructor } from '@ppwcode/ng-common'
import { getRelativeNavigator, RelativeNavigator } from './routing'

/**
 * Interface describing something that support navigation relative to the current instance.
 */
export interface CanNavigateRelatively {
    /** The function to invoke when relative navigation should occur. */
    relativeNavigation: RelativeNavigator
}

/** A constructable type that implements the CanNavigateRelatively interface. */
export type RelativeNavigationCtor = Constructor<CanNavigateRelatively>

/**
 * Enhances an optional base class with functionality to support relative navigation.
 * @param base An optional base class.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const mixinRelativeNavigation = <T extends Constructor<{}>>(base?: T): T & RelativeNavigationCtor => {
    const baseClass = base ?? (class {} as T)

    return class extends baseClass implements CanNavigateRelatively {
        public relativeNavigation: RelativeNavigator = getRelativeNavigator()
    }
}
