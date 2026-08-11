import { FieldTree } from '@angular/forms/signals'

/**
 * Asserts that a signal-form field is not marked as required.
 */
export const expectFieldTreeNotRequired = <TModel, TKey extends string | number, TMode extends 'writable' | 'readonly'>(
    field: FieldTree<TModel, TKey, TMode>
): void => {
    expect(field().required()).toBe(false)
}
