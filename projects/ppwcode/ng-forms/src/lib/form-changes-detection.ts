import { signal, Signal } from '@angular/core'
import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { Constructor } from '@ppwcode/ng-common'
import { startWith, Subscription } from 'rxjs'

export interface DetectFormChanges {
    /** A signal indicating whether the form has changes since the change detection has been initialised. */
    hasFormChangesSig: Signal<boolean>

    /**
     * Start detecting form value changes on the given form.
     * This function looks at the current value of the form and compares it with changes to the form that are emitted over
     * the valueChanges observable. This approach is different from the dirty flag approach because it also takes into account
     * that a user reverts changes they have made. The dirty flag approach would still indicate that the form has changes.
     *
     * Passing the `resetInitialValue` parameter as `false` is useful when the form group or array is updated (adds or removes),
     * but you still want to compare to the initial value of the form group or array.
     */
    detectFormChanges(form: FormGroup | FormControl | FormArray, resetInitialValue?: boolean): void

    ngOnDestroy(): void
}

export type DetectFormChangesCtor = Constructor<DetectFormChanges>

export const mixinDetectFormChanges = <T extends Constructor<Record<string, unknown>>>(
    base?: T
): T & DetectFormChangesCtor => {
    const baseClass = base ?? (class {} as T)

    return class extends baseClass implements DetectFormChanges {
        public hasFormChangesSig = signal(false)
        private stringifiedInitialValue = ''
        private _subscription?: Subscription

        public detectFormChanges(form: FormGroup | FormControl | FormArray, resetInitialValue = true): void {
            // At some points in code, the form group or array is updated.
            // E.g. when an item is added or removed from the form array.
            // In such cases, we don't want to reset the initial value. It is up to the developer to decide when to reset.
            if (resetInitialValue) {
                this.stringifiedInitialValue = this.getFormStringifiedValue(form)
            }

            // Manual unsubscribes are necessary here because this function can be called multiple times.
            // A takeUntil operator is therefore not sufficient.
            this._subscription?.unsubscribe()
            this._subscription = form.valueChanges.pipe(startWith(form.getRawValue())).subscribe(() => {
                this.hasFormChangesSig.set(this.stringifiedInitialValue !== this.getFormStringifiedValue(form))
            })
        }

        public ngOnDestroy(): void {
            this._subscription?.unsubscribe()
        }

        private getFormStringifiedValue(form: FormGroup | FormControl | FormArray): string {
            // Stringify the raw value. This bypasses any possibility of incorrect "it is equal" conclusions because of object
            // references. The raw value is taken because it also contains the value of disabled form controls.
            return JSON.stringify(form.getRawValue())
        }
    }
}
