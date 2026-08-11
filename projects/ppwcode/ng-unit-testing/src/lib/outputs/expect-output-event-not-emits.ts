import { OutputEmitterRef } from '@angular/core'

interface ExpectOutputEventNotEmitsOptions<TValue, TWhen extends void | Promise<void> = void> {
    outputEvent: OutputEmitterRef<TValue>
    when: () => TWhen
}

/**
 * Asserts that invoking `when` makes an Angular output not emit.
 *
 * The helper subscribes before invoking `when` and supports both synchronous and asynchronous interactions. Await the
 * returned promise when `when` returns a promise.
 *
 * @param options Output under test and the interaction that must not emit.
 */
export function expectOutputEventNotEmits<TValue>(
    options: ExpectOutputEventNotEmitsOptions<TValue, Promise<void>>
): Promise<void>
export function expectOutputEventNotEmits<TValue>(options: ExpectOutputEventNotEmitsOptions<TValue>): void
export function expectOutputEventNotEmits<TValue>(
    options: ExpectOutputEventNotEmitsOptions<TValue, void | Promise<void>>
): void | Promise<void> {
    const { outputEvent, when } = options

    const verify = () => {
        expect(eventHandler).not.toHaveBeenCalled()
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
