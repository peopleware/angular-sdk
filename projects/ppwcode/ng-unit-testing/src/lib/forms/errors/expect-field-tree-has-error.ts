import { FieldTree } from '@angular/forms/signals'
import { getFieldTreeErrorKinds } from './get-field-tree-error-kinds'

/**
 * Asserts that a signal-form field contains an error with the expected kind.
 */
export const expectFieldTreeHasError = <TModel, TKey extends number | string, TMode extends 'writable' | 'readonly'>(
    field: FieldTree<TModel, TKey, TMode>,
    expectedErrorKind: string
): void => {
    const errorKinds = getFieldTreeErrorKinds(field)
    expect(errorKinds).toContain(expectedErrorKind)
}
