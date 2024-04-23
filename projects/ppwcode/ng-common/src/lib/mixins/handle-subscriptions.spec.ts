import { fakeAsync, tick } from '@angular/core/testing'
import { CanHandleSubscriptions, mixinHandleSubscriptions } from '@ppwcode/ng-common'
import { interval } from 'rxjs'

describe('Handle subscriptions mixin', () => {
    class BaseClass {
        property = 'value'
    }

    let instanceOfExtendedClass: CanHandleSubscriptions & BaseClass

    const destroyInstance = (instance: CanHandleSubscriptions & BaseClass) => {
        instance.ngOnDestroy()
    }

    beforeEach(() => {
        const extendedClass = mixinHandleSubscriptions(BaseClass)
        instanceOfExtendedClass = new extendedClass()
    })

    it('should extend the given class definitions', () => {
        expect(instanceOfExtendedClass.ngOnDestroy).toBeDefined()
        expect(instanceOfExtendedClass.stopOnDestroy).toBeDefined()
    })

    it('should stop listening to the stream when the class is destroyed', fakeAsync(() => {
        const interval$ = interval(1000)
        let subscriptionHits = 0

        const subscription = instanceOfExtendedClass.stopOnDestroy(interval$).subscribe(() => subscriptionHits++)
        expect(subscriptionHits).toBe(0)

        tick(999)
        expect(subscriptionHits).toBe(0)

        tick(2)
        expect(subscriptionHits).toBe(1)

        destroyInstance(instanceOfExtendedClass)
        tick(1000)
        expect(subscriptionHits).toBe(1)

        subscription.unsubscribe()
    }))
})
