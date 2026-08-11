import { OutputEmitterRef } from '@angular/core'

interface ExpectOutputEventEmitsSequenceOptions<TValue, TWhen extends void | Promise<void> = void> {
    outputEvent: OutputEmitterRef<TValue>
    when: () => TWhen
    expectedValues: Array<TValue>
}

/**
 * Asserts that invoking `when` makes an Angular output emit the complete expected value sequence.
 */
export function expectOutputEventEmitsSequence<TValue>(
    options: ExpectOutputEventEmitsSequenceOptions<TValue, Promise<void>>
): Promise<void>
export function expectOutputEventEmitsSequence<TValue>(options: ExpectOutputEventEmitsSequenceOptions<TValue>): void
export function expectOutputEventEmitsSequence<TValue>(
    options: ExpectOutputEventEmitsSequenceOptions<TValue, void | Promise<void>>
): void | Promise<void> {
    const { outputEvent, when, expectedValues } = options
    const emittedValues: Array<TValue> = []

    outputEvent.subscribe((value) => emittedValues.push(value))

    const verify = () => {
        expect(emittedValues).toEqual(expectedValues)
    }

    const possiblePromise = when()
    if (possiblePromise) {
        return possiblePromise.then(verify)
    }

    verify()
}
