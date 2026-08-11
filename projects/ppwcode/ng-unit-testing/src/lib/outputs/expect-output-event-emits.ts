import { OutputEmitterRef } from '@angular/core'

interface ExpectOutputEventEmitsOptions<TValue, TWhen extends void | Promise<void> = void> {
    outputEvent: OutputEmitterRef<TValue>
    when: () => TWhen
    expectedValue: TValue
}

/**
 * Asserts that invoking `when` makes an Angular output emit `expectedValue` exactly once.
 */
export function expectOutputEventEmits<TValue>(
    options: ExpectOutputEventEmitsOptions<TValue, Promise<void>>
): Promise<void>
export function expectOutputEventEmits<TValue>(options: ExpectOutputEventEmitsOptions<TValue>): void
export function expectOutputEventEmits<TValue>(
    options: ExpectOutputEventEmitsOptions<TValue, void | Promise<void>>
): void | Promise<void> {
    const { outputEvent, when, expectedValue } = options

    const verify = () => {
        expect(eventHandler).toHaveBeenCalledOnce()
        expect(eventHandler).toHaveBeenCalledWith(expectedValue)
    }
    const eventHandler = vi.fn()

    outputEvent.subscribe(eventHandler)

    // It is possible that the `when` lambda is an async function or a returned Promise. If that's the case, we need
    // to wait with the verifications until that Promise resolves. Otherwise, we can immediately verify in a sync way.
    const possiblePromise = when()
    if (possiblePromise) {
        return possiblePromise.then(verify)
    }

    verify()
}
