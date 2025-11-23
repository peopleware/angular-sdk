/**
 * Zoneless replacement for fakeAsync and tick.
 *
 * Waits for the specified timeout using native Promises and async/await.
 *
 * NOTE THAT THIS WILL ACTUALLY SLOW DOWN TESTS for the provided number of ms.
 *
 * @param ms The number of milliseconds to wait.
 */
export const tickAsync = (ms: number = 0): Promise<void> => {
    return new Promise<void>((resolve) => setTimeout(resolve, ms))
}
