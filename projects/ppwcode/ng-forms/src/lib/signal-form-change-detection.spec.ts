import { signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { FieldTree, form, required } from '@angular/forms/signals'
import { detectFormChanges } from './signal-form-change-detection'

interface TestFormModel {
    unit: string
    comment: string | null
    nested: {
        code: string | null
    }
}

describe('detectFormChanges', () => {
    const createForm = (): FieldTree<TestFormModel> =>
        TestBed.runInInjectionContext(() =>
            form(
                signal<TestFormModel>({
                    unit: 'Piece',
                    comment: null,
                    nested: {
                        code: null
                    }
                }),
                (schema) => required(schema.unit)
            )
        )

    it('should start without changes', () => {
        const testForm = createForm()
        const tracker = detectFormChanges(testForm)

        expect(tracker.hasChanges()).toBe(false)
        expect(tracker.invalidOrNoChanges()).toBe(true)
    })

    it('should detect changes and reset the current value as the new initial value', () => {
        const testForm = createForm()
        const tracker = detectFormChanges(testForm)

        testForm.unit().value.set('Box')

        expect(tracker.hasChanges()).toBe(true)
        expect(tracker.invalidOrNoChanges()).toBe(false)

        tracker.resetChangeTracking()

        expect(tracker.hasChanges()).toBe(false)
        expect(tracker.invalidOrNoChanges()).toBe(true)
    })

    it('should ignore empty strings and null values when comparing form values', () => {
        const testForm = createForm()
        const tracker = detectFormChanges(testForm)

        testForm.comment().value.set('')
        testForm.nested.code().value.set('')

        expect(tracker.hasChanges()).toBe(false)
    })

    it('should report invalid or unchanged when the form is invalid after a change', () => {
        const testForm = createForm()
        const tracker = detectFormChanges(testForm)

        testForm.unit().value.set('')

        expect(testForm().invalid()).toBe(true)
        expect(tracker.hasChanges()).toBe(true)
        expect(tracker.invalidOrNoChanges()).toBe(true)
    })
})
