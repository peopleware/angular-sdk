import { FieldTree } from '@angular/forms/signals'

/**
 * Asserts that a signal-form field is marked as required.
 */
export const expectFieldTreeRequired = <TModel, TKey extends string | number, TMode extends 'writable' | 'readonly'>(
    field: FieldTree<TModel, TKey, TMode>
): void => {
    expect(field().required()).toBe(true)
}
