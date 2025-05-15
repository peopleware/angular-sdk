import { AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms'

export type ControlGeneratorValidatorOptions = {
    validators?: Array<ValidatorFn>
    asyncValidators?: Array<AsyncValidatorFn>
}

/**
 * Creates a non-nullable FormControl with the given value and validators.
 * A non-nullable control cannot have a null value.
 *
 * @param value - The initial value of the control
 * @param validatorsOrOptions - An array of validators OR an object containing validators and asyncValidators
 * @param disabled - Whether the control should be disabled
 * @returns A new FormControl instance
 *
 * @example
 * const control1 = createNonNullableControl('test', [Validators.required]);
 *
 * @example
 * const control2 = createNonNullableControl('test', {
 *   validators: [Validators.required],
 *   asyncValidators: [asyncValidator()]
 * });
 */
export const createNonNullableControl = <T>(
    value: T,
    validatorsOrOptions: Array<ValidatorFn> | ControlGeneratorValidatorOptions = [],
    disabled = false
) => {
    const options = Array.isArray(validatorsOrOptions) ? { validators: validatorsOrOptions } : validatorsOrOptions

    return new FormControl<T>(
        {
            value,
            disabled
        },
        {
            validators: options.validators,
            asyncValidators: options.asyncValidators,
            nonNullable: true
        }
    )
}

/**
 * Creates a nullable FormControl with the given value and validators.
 * A nullable control can have a null value.
 *
 * @param value - The initial value of the control
 * @param validatorsOrOptions - An array of validators OR an object containing validators and asyncValidators
 * @param disabled - Whether the control should be disabled
 * @returns A new FormControl instance
 *
 * @example
 * const control1 = createNullableControl('test', [Validators.required]);
 *
 * @example
 * const control2 = createNullableControl('test', {
 *   validators: [Validators.required],
 *   asyncValidators: [asyncValidator()]
 * });
 *
 * @example
 * // With null value
 * const control3 = createNullableControl(null);
 */
export const createNullableControl = <T>(
    value: T,
    validatorsOrOptions: Array<ValidatorFn> | ControlGeneratorValidatorOptions = [],
    disabled = false
) => {
    const options = Array.isArray(validatorsOrOptions) ? { validators: validatorsOrOptions } : validatorsOrOptions

    return new FormControl<T>(
        {
            value,
            disabled
        },
        {
            validators: options.validators,
            asyncValidators: options.asyncValidators
        }
    )
}
