import { FormControl, ValidationErrors, Validators } from '@angular/forms'
import { Observable, of } from 'rxjs'
import { createNonNullableControl, createNullableControl } from './generators'

// Mock async validator
const mockAsyncValidator = (): Observable<ValidationErrors | null> => {
    return of(null)
}

describe('Form Control Generators', () => {
    describe('createNonNullableControl', () => {
        it('should create a control with array of validators (old style)', () => {
            const control = createNonNullableControl('test', [Validators.required])

            expect(control).toBeInstanceOf(FormControl)
            expect(control.value).toBe('test')
            expect(control.hasValidator(Validators.required)).toBe(true)
        })

        it('should create a control with validator options (new style)', () => {
            const control = createNonNullableControl('test', {
                validators: [Validators.required],
                asyncValidators: [mockAsyncValidator]
            })

            expect(control).toBeInstanceOf(FormControl)
            expect(control.value).toBe('test')
            expect(control.hasValidator(Validators.required)).toBe(true)
            expect(control.hasAsyncValidator(mockAsyncValidator)).toBe(true)
        })

        it('should create a disabled control', () => {
            const control = createNonNullableControl('test', [], true)

            expect(control.disabled).toBe(true)
        })
    })

    describe('createNullableControl', () => {
        it('should create a control with array of validators (old style)', () => {
            const control = createNullableControl('test', [Validators.required])

            expect(control).toBeInstanceOf(FormControl)
            expect(control.value).toBe('test')
            expect(control.hasValidator(Validators.required)).toBe(true)
        })

        it('should create a control with validator options (new style)', () => {
            const control = createNullableControl('test', {
                validators: [Validators.required],
                asyncValidators: [mockAsyncValidator]
            })

            expect(control).toBeInstanceOf(FormControl)
            expect(control.value).toBe('test')
            expect(control.hasValidator(Validators.required)).toBe(true)
            expect(control.hasAsyncValidator(mockAsyncValidator)).toBe(true)
        })

        it('should create a disabled control', () => {
            const control = createNullableControl('test', [], true)

            expect(control.disabled).toBe(true)
        })

        it('should create a control with null value', () => {
            const control = createNullableControl(null)

            expect(control.value).toBeNull()
        })
    })
})
