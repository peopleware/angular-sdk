import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

import { BreadcrumbComponent } from './breadcrumb.component'
import { provideBreadcrumbOptions } from './breadcrumb.service'

describe('BreadcrumbComponent', () => {
    let component: BreadcrumbComponent
    let fixture: ComponentFixture<BreadcrumbComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BreadcrumbComponent, TranslateModule.forRoot()],
            providers: [provideRouter([]), provideBreadcrumbOptions()]
        }).compileComponents()

        fixture = TestBed.createComponent(BreadcrumbComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
