import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { interval } from 'rxjs'
import { mixinHandleSubscriptions } from './handle-subscriptions'

describe('Handle subscriptions mixin', () => {
    let fixture: ComponentFixture<TestComponent>
    let component: TestComponent

    beforeEach(() => {
        jasmine.clock().install()
        jasmine.clock().mockDate(new Date())

        TestBed.configureTestingModule({
            declarations: [TestComponent]
        })

        fixture = TestBed.createComponent(TestComponent)
        component = fixture.componentInstance
    })

    afterEach(() => {
        jasmine.clock().uninstall()
    })

    it('should extend the given class definitions', () => {
        expect(component.stopOnDestroy).toBeDefined()
    })

    it('should stop listening to the stream when the class is destroyed', () => {
        const interval$ = interval(1000)
        let subscriptionHits = 0

        const subscription = component.stopOnDestroy(interval$).subscribe(() => subscriptionHits++)
        expect(subscriptionHits).toBe(0)

        jasmine.clock().tick(999)
        expect(subscriptionHits).toBe(0)

        jasmine.clock().tick(2)
        expect(subscriptionHits).toBe(1)

        fixture.destroy()
        jasmine.clock().tick(1000)
        expect(subscriptionHits).toBe(1)

        subscription.unsubscribe()
    })
})

@Component({
    template: '',
    /* eslint-disable @angular-eslint/prefer-standalone */
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent extends mixinHandleSubscriptions() {}
