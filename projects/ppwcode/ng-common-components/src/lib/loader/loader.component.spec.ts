import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideTranslateService } from '@ngx-translate/core'

import { LoaderComponent } from './loader.component'

describe('LoaderComponent', () => {
    let component: LoaderComponent
    let fixture: ComponentFixture<LoaderComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoaderComponent],
            providers: [provideTranslateService({})]
        }).compileComponents()

        fixture = TestBed.createComponent(LoaderComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
