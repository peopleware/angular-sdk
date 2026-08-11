import { computed, Signal, signal } from '@angular/core'
import { FieldTree } from '@angular/forms/signals'

type Valuable<T> = { [K in keyof T as T[K] extends null | undefined ? never : K]: T[K] }

/**
 * Interface describing the returned structure of `detectFormChanges`.
 */
export interface FormTracker {
    // Signal indicating whether the tracked form has changes when compared to its initial value.
    hasChanges: Signal<boolean>
    // Signal indicating whether the tracked form is invalid or has no changes when compared to its initial value.
    invalidOrNoChanges: Signal<boolean>
    // Memorizes the current value as the new initial value of the form to verify whether changes are made against the current value.
    resetChangeTracking: () => void
}

/**
 * Tracks changes on the given Signal form FieldTree.
 * @example
 * ```ts
 * @Component({...})
 * export class AuthenticationForm {
 *  protected readonly form = form(signal({ username: '', password: ''}))
 *  protected readonly formTracker = detectFormChanges(this.form)
 * }
 * ```
 * @param fieldTree
 * @returns FormTracker An object providing information about the change tracking.
 */
export const detectFormChanges = <T extends object>(fieldTree: FieldTree<T>): FormTracker => {
    // Function that will clean the given value and stringify it for easy comparison.
    // This is backwards compatible with how we detected form changes on AbstractControl forms.
    const stringifyValue = (value: T) => JSON.stringify(getValuable(value))

    // Keep track of the initial value for detecting changes.
    const initialValue = signal(fieldTree().value() as T)
    const initialStringifiedValue = computed(() => stringifyValue(initialValue()))

    // Computes whether the new FieldTree value is different from the initial value. Note that the initial value is the value
    // of the FieldTree when this function was invoked, or after calling resetChangeTracking. This means that it is not specifically
    // the value of the signal the FieldTree was created with on initialization.
    const hasChanges = computed(() => stringifyValue(fieldTree().value()) !== initialStringifiedValue())

    // Computes whether the FieldTree is currently invalid or has no pending changes. This can be useful for situations
    // where developers want to conditionally enable elements based on the form state.
    const invalidOrNoChanges = computed(() => fieldTree().invalid() || !hasChanges())

    return {
        hasChanges,
        invalidOrNoChanges,
        resetChangeTracking: () => initialValue.set(fieldTree().value())
    }
}

const getValuable = <T extends object, V = Valuable<T>>(obj: T): V =>
    Object.fromEntries(
        Object.entries(obj)
            .map(([key, value]) => {
                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    // Recursively clean nested objects
                    const valuable: V | undefined = Object.keys(value).length ? getValuable(value) : undefined
                    return [key, valuable]
                }
                return [key, value]
            })
            .filter(([, v]) => !((typeof v === 'string' && !v.length) || v === null || typeof v === 'undefined'))
    ) as V
