import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DashboardItemsTableComponent } from './dashboard-items-table.component'

describe('DashboardItemsTableComponent', () => {
    let component: DashboardItemsTableComponent
    let fixture: ComponentFixture<DashboardItemsTableComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DashboardItemsTableComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(DashboardItemsTableComponent)
        component = fixture.componentInstance
        fixture.componentRef.setInput('dashboardItems', [])
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
