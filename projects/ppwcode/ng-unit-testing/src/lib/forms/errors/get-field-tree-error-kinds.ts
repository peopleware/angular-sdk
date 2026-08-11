import { FieldTree } from '@angular/forms/signals'

/**
 * Returns the validation error kinds currently present on a signal-form field.
 *
 * Prefer the focused error assertion helpers when the test only checks presence, absence, or an exact list.
 */
export const getFieldTreeErrorKinds = <TModel, TKey extends number | string, TMode extends 'writable' | 'readonly'>(
    field: FieldTree<TModel, TKey, TMode>
): Array<string> =>
    field()
        .errors()
        .map((error) => error.kind)
