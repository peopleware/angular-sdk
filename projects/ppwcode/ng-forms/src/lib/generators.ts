import { FormControl, ValidatorFn } from '@angular/forms'

export const createNonNullableControl = <T>(value: T, validators: Array<ValidatorFn> = [], disabled = false) => {
    return new FormControl<T>(
        {
            value,
            disabled
        },
        {
            validators,
            nonNullable: true
        }
    )
}

export const createNullableControl = <T>(value: T, validators: Array<ValidatorFn> = [], disabled = false) => {
    return new FormControl<T>(
        {
            value,
            disabled
        },
        {
            validators
        }
    )
}
