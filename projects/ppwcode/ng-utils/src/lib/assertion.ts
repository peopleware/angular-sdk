/**
 * Assertion that expresses that the {@code number} argument is âˆˆ â„•, or `undefined`
 */
export const natural = (i?: number) => i === undefined || (Number.isInteger(i) && i >= 0)

/**
 * The given array does not contain duplicate entries according to `===`.
 */
export const noDuplicates = <T>(arr: Array<T>): boolean => arr.every((el, i) => arr.indexOf(el) === i)
