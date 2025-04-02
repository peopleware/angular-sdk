import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideTranslateService } from '@ngx-translate/core'

import { DashboardItemDemoComponent } from './dashboard-item-demo.component'

describe('DashboardItemDemoComponent', () => {
    let component: DashboardItemDemoComponent
    let fixture: ComponentFixture<DashboardItemDemoComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DashboardItemDemoComponent],
            providers: [provideTranslateService({})]
        }).compileComponents()

        fixture = TestBed.createComponent(DashboardItemDemoComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
