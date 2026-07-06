import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { verifyA11y } from '@ppwcode/ng-unit-testing'
import ComponentsPageContainerComponent from './components-page-container.component'

describe('ComponentsPageContainerComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [ComponentsPageContainerComponent, RouterTestingModule]
        })
    )

    it('should create', () => {
        const fixture = TestBed.createComponent(ComponentsPageContainerComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    verifyA11y(ComponentsPageContainerComponent)
})
