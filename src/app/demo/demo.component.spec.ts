import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DemoComponent } from './demo.component'
import { ExpandableCardComponent } from '@ppwcode/ng-common-components'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'

describe('DemoComponent', () => {
    let component: DemoComponent
    let fixture: ComponentFixture<DemoComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, TranslateModule.forRoot(), ExpandableCardComponent],
            declarations: []
        })
        fixture = TestBed.createComponent(DemoComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
