import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { interval } from 'rxjs'
import { mixinHandleSubscriptions } from './handle-subscriptions'
import { tickAsync } from '@ppwcode/ng-unit-testing'

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

    it('should stop listening to the stream when the class is destroyed', async () => {
        const interval$ = interval(100)
        let subscriptionHits = 0

        const subscription = component.stopOnDestroy(interval$).subscribe(() => subscriptionHits++)
        expect(subscriptionHits).toBe(0)

        await tickAsync(10)
        expect(subscriptionHits).toBe(0)

        await tickAsync(100) // 110ms
        expect(subscriptionHits).toBe(1)

        fixture.destroy()
        await tickAsync(1000) // 210ms
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
