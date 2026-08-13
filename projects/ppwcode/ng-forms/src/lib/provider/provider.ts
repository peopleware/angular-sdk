import { ValidationError } from '@angular/forms/signals'
import { InjectionToken } from '@angular/core'

export declare type FieldErrorsErrorTranslator = (firstError: ValidationError.WithFieldTree) => string

export interface PpwcodeNgFormsProviderOptions {
    errorTranslator: FieldErrorsErrorTranslator
}

export const FIELD_ERRORS_ERROR_TRANSLATOR = new InjectionToken<FieldErrorsErrorTranslator>(
    'Field errors error translator'
)

export const providePpwcodeNgForms = ({ errorTranslator }: PpwcodeNgFormsProviderOptions) => {
    return [{ provide: FIELD_ERRORS_ERROR_TRANSLATOR, useValue: errorTranslator }]
}
