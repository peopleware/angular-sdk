import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { verifyA11y } from '@ppwcode/ng-unit-testing'
import { EmptyAsyncResultComponent } from './empty-async-result.component'

describe('EmptyAsyncResultComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [EmptyAsyncResultComponent, NoopAnimationsModule]
        })
    )

    it('should create', () => {
        const fixture = TestBed.createComponent(EmptyAsyncResultComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    verifyA11y(EmptyAsyncResultComponent)
})
