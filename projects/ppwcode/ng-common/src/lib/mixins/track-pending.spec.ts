import { fakeAsync, tick } from '@angular/core/testing'
import { CanTrackPending, CanTrackPendingCtor, mixinTrackPending } from '@ppwcode/ng-common'
import { delay, firstValueFrom, of } from 'rxjs'

describe('Track pending mixin', () => {
    class BaseClass {
        property = 'value'
    }

    let extendedClass: typeof BaseClass & CanTrackPendingCtor
    let instanceOfExtendedClass: BaseClass & CanTrackPending

    beforeEach(() => {
        extendedClass = mixinTrackPending(false, BaseClass)
        instanceOfExtendedClass = new extendedClass()
    })

    it('should extend the base implementation', () => {
        expect(instanceOfExtendedClass.pending$).toBeDefined()
        expect(instanceOfExtendedClass.startPending).toBeDefined()
        expect(instanceOfExtendedClass.stopPending).toBeDefined()
        expect(instanceOfExtendedClass.trackPending).toBeDefined()
        expect(instanceOfExtendedClass.isPending).toBeDefined()
    })

    it('should track the pending state of a single stream', fakeAsync(async () => {
        const stream$ = of('value').pipe(delay(100))

        const trackedStream$ = instanceOfExtendedClass.trackPending(stream$)
        const subscription = trackedStream$.subscribe()

        expect(await firstValueFrom(instanceOfExtendedClass.pending$)).toBeTrue()
        expect(await firstValueFrom(instanceOfExtendedClass.isPending())).toBeTrue()

        tick(100)
        expect(await firstValueFrom(instanceOfExtendedClass.pending$)).toBeFalse()
        expect(await firstValueFrom(instanceOfExtendedClass.isPending())).toBeFalse()

        subscription.unsubscribe()
    }))

    it('should track the pending state of multiple streams by name', fakeAsync(async () => {
        const stream1$ = of('value').pipe(delay(100))
        const stream2$ = of('value').pipe(delay(100))

        const trackedStream1$ = instanceOfExtendedClass.trackPending(stream1$, 'stream1')
        const trackedStream2$ = instanceOfExtendedClass.trackPending(stream2$, 'stream2')

        const subscription1 = trackedStream1$.subscribe()
        const subscription2 = trackedStream2$.subscribe()

        expect(await firstValueFrom(instanceOfExtendedClass.isPending('stream1'))).toBeTrue()
        expect(await firstValueFrom(instanceOfExtendedClass.isPending('stream2'))).toBeTrue()

        tick(100)
        expect(await firstValueFrom(instanceOfExtendedClass.isPending('stream1'))).toBeFalse()
        expect(await firstValueFrom(instanceOfExtendedClass.isPending('stream2'))).toBeFalse()

        subscription1.unsubscribe()
        subscription2.unsubscribe()
    }))

    it('should track the pending state of unnamed and named streams', fakeAsync(async () => {
        const stream$ = of('value').pipe(delay(100))

        const trackedStream$ = instanceOfExtendedClass.trackPending(stream$)
        const trackedNamedStream$ = instanceOfExtendedClass.trackPending(stream$, 'named')

        const subscription = trackedStream$.subscribe()
        const namedSubscription = trackedNamedStream$.subscribe()

        expect(await firstValueFrom(instanceOfExtendedClass.isPending())).toBeTrue()
        expect(await firstValueFrom(instanceOfExtendedClass.isPending('named'))).toBeTrue()

        tick(100)
        expect(await firstValueFrom(instanceOfExtendedClass.isPending())).toBeFalse()
        expect(await firstValueFrom(instanceOfExtendedClass.isPending('named'))).toBeFalse()

        subscription.unsubscribe()
        namedSubscription.unsubscribe()
    }))

    it('should support manual pending tracking on the default name', async () => {
        const isPending$ = instanceOfExtendedClass.pending$

        expect(await firstValueFrom(isPending$)).toBeFalse()

        await firstValueFrom(of(null).pipe(instanceOfExtendedClass.startPending()))
        expect(await firstValueFrom(isPending$)).toBeTrue()

        await firstValueFrom(of(null).pipe(instanceOfExtendedClass.stopPending()))
        expect(await firstValueFrom(isPending$)).toBeFalse()
    })

    it('should support manual pending tracking on a custom name', async () => {
        const isPending$ = instanceOfExtendedClass.isPending('custom')

        expect(await firstValueFrom(isPending$)).toBeFalse()

        await firstValueFrom(of(null).pipe(instanceOfExtendedClass.startPending('custom')))
        expect(await firstValueFrom(isPending$)).toBeTrue()

        await firstValueFrom(of(null).pipe(instanceOfExtendedClass.stopPending('custom')))
        expect(await firstValueFrom(isPending$)).toBeFalse()
    })

    it('should have true as the default pending state', async () => {
        const extendedClass = mixinTrackPending()
        const instanceOfExtendedClass = new extendedClass()

        expect(await firstValueFrom(instanceOfExtendedClass.pending$)).toBeTrue()
    })
})
