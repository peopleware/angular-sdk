import { Component } from '@angular/core'
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { mixinHandleSubscriptions } from '@ppwcode/ng-common'
import { interval } from 'rxjs'

describe('Handle subscriptions mixin', () => {
    let fixture: ComponentFixture<TestComponent>
    let component: TestComponent

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent]
        })

        fixture = TestBed.createComponent(TestComponent)
        component = fixture.componentInstance
    })

    it('should extend the given class definitions', () => {
        expect(component.stopOnDestroy).toBeDefined()
    })

    it('should stop listening to the stream when the class is destroyed', fakeAsync(() => {
        const interval$ = interval(1000)
        let subscriptionHits = 0

        const subscription = component.stopOnDestroy(interval$).subscribe(() => subscriptionHits++)
        expect(subscriptionHits).toBe(0)

        tick(999)
        expect(subscriptionHits).toBe(0)

        tick(2)
        expect(subscriptionHits).toBe(1)

        fixture.destroy()
        tick(1000)
        expect(subscriptionHits).toBe(1)

        subscription.unsubscribe()
    }))
})

@Component({
    template: ''
})
class TestComponent extends mixinHandleSubscriptions() {}
