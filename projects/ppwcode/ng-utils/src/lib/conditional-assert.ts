/**
 * Functions to be used as assertions in code. If the assertion.ts fails, a {@link ConditionViolation} is thrown.
 *
 * Assertions are only tested if {@link settings.enabled} is {@code true}.
 */

export const settings = {
    /**
     * Are the conditional assertions enabled?
     */
    enabled: true,

    /**
     * Should {@link assert} log violations on the console itself?s
     */
    logViolations: false
}

/**
 * Flags a violation of a condition.
 */
export class ConditionViolation extends Error {
    // istanbul ignore next MUDO Remove this line when we use es2015+ as target. This ignore is necessary as long as we work with es5.
    constructor(message: string) {
        super(message)

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ConditionViolation.prototype)
    }
}

export const baseViolationMessage = 'Condition Violation'
export const notUndefinedViolationMessage = 'value was asserted not to be `undefined`'
export const notNullViolationMessage = 'value was asserted not to be `null`'

// TODO support Symbols
// IDEA get a better string representation for all cases of `subject` and assertion.ts in the message (see @toryt/contrcts-)
export const violationMessage = <T>(subject: T, assertion: (subject: T) => boolean, message?: string): string =>
    `${baseViolationMessage}: Â«${message || assertion.toString().replace(/\s+/g, ' ')}Â» failed for Â«${String(
        subject
    )}Â»`

/**
 * Assert that {@code assertion.ts(subject)} is {@code true}.
 *
 * If successful, does nothing.
 *
 * Throws a {@code ConditionViolation} if {@code assertion.ts(subject)} is falsy.
 *
 * The intention is for this error to be caught eventually near the top of the stack, and logged or shown.
 *
 * In some cases however, notably when the error is thrown in badly written asynchronous code, the error is never
 * caught, and lost in limbo. Such occurrences are hard to debug. Therefor, this function can, if desired log the error itself
 * before it is thrown. This is done by setting {@link logViolations} to {@code true}.
 *
 * Assertions are only tested if {@link settings.enabled} is {@code true}.
 *
 * @Example:
 *
 * ```
 * function (a: number) {
 *   assert(a, Number.isInteger)
 *   assert(a, a => a >= 0)
 *
 *   â€¦
 * }
 */
export const assert = <T>(subject: T, assertion: (subject: T) => boolean, message?: string) => {
    if (settings.enabled && !assertion(subject)) {
        // IDEA add subject and condition to error for easy reference when it occurs; see, e.g., Node AssertionCondition
        const err = new ConditionViolation(violationMessage(subject, assertion, message))
        if (settings.logViolations) {
            console.error(err)
        }
        throw err
    }
}

/**
 * Assert that {@code t}, of type {@code T | undefined}, is not undefined, and thus of type {@code T}.
 *
 * If successful, returns the actual value of {@code t} with type {@code T}.
 *
 * Throws a {@code ConditionViolation} if {@code t} is `undefined`.
 *
 * Assertions are only tested if {@link settings.enabled} is {@code true}.
 *
 * Usage:
 *
 * ```
 * const optionalA?: A = â€¦
 * const a: A = notUndefined(optionalA)
 * ```
 *
 * This replaces
 *
 * ```
 * const optionalA?: A = â€¦
 * const a: A = optionalA as A
 * ```
 *
 * The difference is that with `as`, no {@code Error} is thrown if `optionalA` is `undefined`. The violation only turns up later, when, and
 * if `a` is actually accessed.
 */
export const notUndefined = <T>(t?: T): T => {
    assert(t, (u) => u !== undefined, notUndefinedViolationMessage)

    return t as T
}

/**
 * Assert that {@code t}, of type {@code T | null}, is not null, and thus of type {@code T}.
 *
 * If successful, returns the actual value of {@code t} with type {@code T}.
 *
 * Throws a {@code ConditionViolation} if {@code t} is `null`.
 *
 * Assertions are only tested if {@link settings.enabled} is {@code true}.
 *
 * Usage:
 *
 * ```
 * const nullableA: A | null = â€¦
 * const a: A = notNull(optionalA)
 * ```
 *
 * This replaces
 *
 * ```
 * const nullableA: A | null = â€¦
 * const a: A = nullableA!
 * ```
 *
 * The difference is that with `!`, no {@code Error} is thrown if `nullableA` is `null`. The violation only turns up later, when, and
 * if `a` is actually accessed.
 */
export const notNull = <T>(t: T | null): T => {
    assert(t, (u) => u !== null, notNullViolationMessage)

    // tslint:disable-next-line:no-non-null-assertion.ts
    return t!
}
