import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FilterTableComponent } from './filter-table.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { TableComponent } from '../../../projects/ppwcode/ng-common-components/src/lib/table/table.component'

describe('DemoComponent', () => {
    let component: FilterTableComponent
    let fixture: ComponentFixture<FilterTableComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, TranslateModule.forRoot(), TableComponent],
            declarations: []
        })
        fixture = TestBed.createComponent(FilterTableComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
