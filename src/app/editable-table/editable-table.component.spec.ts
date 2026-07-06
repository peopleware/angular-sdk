import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { provideTranslateService } from '@ngx-translate/core'
import { verifyA11y } from '@ppwcode/ng-unit-testing'
import EditableTableComponent from './editable-table.component'

describe('EditableTableComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [EditableTableComponent, NoopAnimationsModule],
            providers: [provideTranslateService({})]
        })
    )

    it('should create', () => {
        const fixture = TestBed.createComponent(EditableTableComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    verifyA11y(EditableTableComponent)
})
