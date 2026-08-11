import { FieldTree } from '@angular/forms/signals'
import { getFieldTreeErrorKinds } from './get-field-tree-error-kinds'

/**
 * Asserts that a signal-form field does not contain an error with the given kind.
 */
export const expectFieldTreeNotHasError = <TModel, TKey extends number | string, TMode extends 'writable' | 'readonly'>(
    field: FieldTree<TModel, TKey, TMode>,
    expectedErrorKind: string
): void => {
    const errorKinds = getFieldTreeErrorKinds(field)
    expect(errorKinds).not.toContain(expectedErrorKind)
}
