import { TestBed } from '@angular/core/testing'
import { verifyA11y } from '@ppwcode/ng-unit-testing'
import { EmptyTablePageComponent } from './empty-page.component'

describe('EmptyTablePageComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [EmptyTablePageComponent]
        })
    )

    it('should create', () => {
        const fixture = TestBed.createComponent(EmptyTablePageComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    verifyA11y(EmptyTablePageComponent)
})
