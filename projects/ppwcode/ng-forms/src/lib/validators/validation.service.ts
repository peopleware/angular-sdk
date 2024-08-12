import { Injectable } from '@angular/core'
import { AbstractControl } from '@angular/forms'

@Injectable({
    providedIn: 'root'
})
export class ValidationService {
    /**
     * A validator to check if a string with a minimum length of 1 character consists of spaces only.
     * An empty string, undefined and null are considered to have no spaces.
     * @param control The control of which the value should be checked to consist of spaces only.
     */
    public static notOnlySpacesValidator(control: AbstractControl): { notOnlySpaces?: boolean } | null {
        if (!!String(control.value) && !String(control.value).trim().length) {
            return { notOnlySpaces: true }
        }
        return null
    }
}
