import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ExpandableCardDemoComponent } from './expandable-card-demo.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { ExpandableCardComponent } from '../../../projects/ppwcode/ng-common-components/src/lib/expandable-card/expandable-card.component'

describe('ExpandableCardDemoComponent', () => {
    let component: ExpandableCardDemoComponent
    let fixture: ComponentFixture<ExpandableCardDemoComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, TranslateModule.forRoot(), ExpandableCardComponent],
            declarations: []
        })
        fixture = TestBed.createComponent(ExpandableCardDemoComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
