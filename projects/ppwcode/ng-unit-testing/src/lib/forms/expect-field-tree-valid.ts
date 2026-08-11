import { FieldTree } from '@angular/forms/signals'

/**
 * Asserts that a signal-form field or form tree is valid.
 */
export const expectFieldTreeValid = <TModel, TKey extends string | number, TMode extends 'writable' | 'readonly'>(
    field: FieldTree<TModel, TKey, TMode>
): void => {
    expect(field().valid()).toBe(true)
}
