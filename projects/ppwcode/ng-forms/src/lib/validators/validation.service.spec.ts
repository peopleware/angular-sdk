import { UntypedFormControl } from '@angular/forms'
import { ValidationService } from '@ppwcode/ng-forms'

describe('ValidationService should work properly', () => {
    describe('notOnlySpacesValidator should work properly', () => {
        it('notOnlySpacesValidator should be valid for correct value', () => {
            expect(ValidationService.notOnlySpacesValidator(new UntypedFormControl('123'))).toBeNull()
        })
        it('notOnlySpacesValidator should be valid for correct zero value', () => {
            expect(ValidationService.notOnlySpacesValidator(new UntypedFormControl(0))).toBeNull()
        })
        it('notOnlySpacesValidator should be valid for correct numeric value', () => {
            expect(ValidationService.notOnlySpacesValidator(new UntypedFormControl(10))).toBeNull()
        })
        it('notOnlySpacesValidator should be valid for no value', () => {
            expect(ValidationService.notOnlySpacesValidator(new UntypedFormControl(''))).toBeNull()
        })
        it('notOnlySpacesValidator should be valid for undefined', () => {
            expect(ValidationService.notOnlySpacesValidator(new UntypedFormControl(undefined))).toBeNull()
        })
        it('notOnlySpacesValidator should be valid for null', () => {
            expect(ValidationService.notOnlySpacesValidator(new UntypedFormControl(null))).toBeNull()
        })
        it('notOnlySpacesValidator should be invalid for only spaces value', () => {
            expect(ValidationService.notOnlySpacesValidator(new UntypedFormControl('   '))).toEqual({
                notOnlySpaces: true
            })
        })
    })
})
