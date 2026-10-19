import { TestBed } from '@angular/core/testing'
import { FormControl, FormGroup } from '@angular/forms'
import { mixinDetectFormChanges } from './form-changes-detection'

describe('mixinDetectFormChanges value comparison', () => {
    type Value = string | number | boolean | null | undefined

    const createTracker = () => {
        const form = new FormGroup({
            value: new FormControl<Value>(null),
            nested: new FormGroup({ value: new FormControl<Value>(null) })
        })
        const tracker = TestBed.runInInjectionContext(() => new (mixinDetectFormChanges())())
        tracker.detectFormChanges(form)
        return { form, tracker }
    }

    it.each(['', null, undefined])('should ignore %s in top-level and nested fields', (value) => {
        const { form, tracker } = createTracker()

        form.controls.value.setValue(value)
        form.controls.nested.controls.value.setValue(value)

        expect(tracker.hasFormChangesSig()).toBe(false)
    })

    it.each([0, false])('should retain %s in top-level and nested fields', (value) => {
        const { form, tracker } = createTracker()

        form.setValue({ value, nested: { value: null } })
        expect(tracker.hasFormChangesSig()).toBe(true)

        form.setValue({ value: null, nested: { value } })
        expect(tracker.hasFormChangesSig()).toBe(true)

        form.setValue({ value: null, nested: { value: null } })
        expect(tracker.hasFormChangesSig()).toBe(false)
    })
})
