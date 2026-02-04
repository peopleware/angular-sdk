import { delay, firstValueFrom, of } from 'rxjs'
import { CanTrackPending, CanTrackPendingCtor, mixinTrackPending } from './track-pending'

describe('Track pending mixin', () => {
    class BaseClass {
        property = 'value'
    }

    let extendedClass: typeof BaseClass & CanTrackPendingCtor
    let instanceOfExtendedClass: BaseClass & CanTrackPending

    beforeEach(() => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date())

        extendedClass = mixinTrackPending(false, BaseClass)
        instanceOfExtendedClass = new extendedClass()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should extend the base implementation', () => {
        expect(instanceOfExtendedClass.pending$).toBeDefined()
        expect(instanceOfExtendedClass.startPending).toBeDefined()
        expect(instanceOfExtendedClass.stopPending).toBeDefined()
        expect(instanceOfExtendedClass.trackPending).toBeDefined()
        expect(instanceOfExtendedClass.isPending).toBeDefined()
    })

    it('should track the pending state of a single stream', async () => {
        const stream$ = of('value').pipe(delay(100))

        const trackedStream$ = instanceOfExtendedClass.trackPending(stream$)
        const subscription = trackedStream$.subscribe()

        expect(await firstValueFrom(instanceOfExtendedClass.pending$)).toBe(true)
        expect(await firstValueFrom(instanceOfExtendedClass.isPending())).toBe(true)

        vi.advanceTimersByTime(100)
        expect(await firstValueFrom(instanceOfExtendedClass.pending$)).toBe(false)
        expect(await firstValueFrom(instanceOfExtendedClass.isPending())).toBe(false)

        subscription.unsubscribe()
    })

    it('should track the pending state of multiple streams by name', async () => {
        const stream1$ = of('value').pipe(delay(100))
        const stream2$ = of('value').pipe(delay(100))

        const trackedStream1$ = instanceOfExtendedClass.trackPending(stream1$, 'stream1')
        const trackedStream2$ = instanceOfExtendedClass.trackPending(stream2$, 'stream2')

        const subscription1 = trackedStream1$.subscribe()
        const subscription2 = trackedStream2$.subscribe()

        expect(await firstValueFrom(instanceOfExtendedClass.isPending('stream1'))).toBe(true)
        expect(await firstValueFrom(instanceOfExtendedClass.isPending('stream2'))).toBe(true)

        vi.advanceTimersByTime(100)
        expect(await firstValueFrom(instanceOfExtendedClass.isPending('stream1'))).toBe(false)
        expect(await firstValueFrom(instanceOfExtendedClass.isPending('stream2'))).toBe(false)

        subscription1.unsubscribe()
        subscription2.unsubscribe()
    })

    it('should track the pending state of unnamed and named streams', async () => {
        const stream$ = of('value').pipe(delay(100))

        const trackedStream$ = instanceOfExtendedClass.trackPending(stream$)
        const trackedNamedStream$ = instanceOfExtendedClass.trackPending(stream$, 'named')

        const subscription = trackedStream$.subscribe()
        const namedSubscription = trackedNamedStream$.subscribe()

        expect(await firstValueFrom(instanceOfExtendedClass.isPending())).toBe(true)
        expect(await firstValueFrom(instanceOfExtendedClass.isPending('named'))).toBe(true)

        vi.advanceTimersByTime(100)
        expect(await firstValueFrom(instanceOfExtendedClass.isPending())).toBe(false)
        expect(await firstValueFrom(instanceOfExtendedClass.isPending('named'))).toBe(false)

        subscription.unsubscribe()
        namedSubscription.unsubscribe()
    })

    it('should support manual pending tracking on the default name', async () => {
        const isPending$ = instanceOfExtendedClass.pending$

        expect(await firstValueFrom(isPending$)).toBe(false)

        await firstValueFrom(of(null).pipe(instanceOfExtendedClass.startPending()))
        expect(await firstValueFrom(isPending$)).toBe(true)

        await firstValueFrom(of(null).pipe(instanceOfExtendedClass.stopPending()))
        expect(await firstValueFrom(isPending$)).toBe(false)
    })

    it('should support manual pending tracking on a custom name', async () => {
        const isPending$ = instanceOfExtendedClass.isPending('custom')

        expect(await firstValueFrom(isPending$)).toBe(false)

        await firstValueFrom(of(null).pipe(instanceOfExtendedClass.startPending('custom')))
        expect(await firstValueFrom(isPending$)).toBe(true)

        await firstValueFrom(of(null).pipe(instanceOfExtendedClass.stopPending('custom')))
        expect(await firstValueFrom(isPending$)).toBe(false)
    })

    it('should have true as the default pending state', async () => {
        const extendedClass = mixinTrackPending()
        const instanceOfExtendedClass = new extendedClass()

        expect(await firstValueFrom(instanceOfExtendedClass.pending$)).toBe(true)
    })
})
