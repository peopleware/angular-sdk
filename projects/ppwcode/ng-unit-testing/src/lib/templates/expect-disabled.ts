import { FieldTree } from '@angular/forms/signals'

interface DisableableControl {
    readonly disabled: boolean
}

/**
 * Asserts that a signal-form field is disabled.
 */
export function expectDisabled<TModel, TKey extends string | number, TMode extends 'writable' | 'readonly'>(
    field: FieldTree<TModel, TKey, TMode>
): void
/**
 * Asserts that a native or Angular control is disabled.
 */
export function expectDisabled(control: DisableableControl): void
export function expectDisabled<TModel, TKey extends string | number, TMode extends 'writable' | 'readonly'>(
    target: DisableableControl | FieldTree<TModel, TKey, TMode>
): void {
    const disabled = typeof target === 'function' ? target().disabled() : target.disabled
    expect(disabled, 'Expected control or field to be disabled').toBe(true)
}
