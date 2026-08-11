import { FieldTree } from '@angular/forms/signals'
import { getFieldTreeErrorKinds } from './get-field-tree-error-kinds'

/**
 * Asserts the exact ordered list of error kinds on a signal-form field.
 */
export const expectFieldTreeHasErrors = <TModel, TKey extends number | string, TMode extends 'writable' | 'readonly'>(
    field: FieldTree<TModel, TKey, TMode>,
    expectedErrorKinds: Array<string>
): void => {
    const errorKinds = getFieldTreeErrorKinds(field)
    expect(errorKinds).toEqual(expectedErrorKinds)
}
