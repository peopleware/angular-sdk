import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideTranslateService } from '@ngx-translate/core'

import { LoaderComponent } from './loader.component'
import { providePpwcodeCommonComponents } from '../providers'

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

    it('should use the default loading translation', () => {
        fixture.componentRef.setInput('loading', true)
        fixture.detectChanges()

        const progressBar = fixture.nativeElement.querySelector('mat-progress-bar')

        expect(progressBar.getAttribute('aria-label')).toBe('Loading')
    })
})

describe('LoaderComponent with custom translation keys', () => {
    let fixture: ComponentFixture<LoaderComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoaderComponent],
            providers: [
                provideTranslateService({}),
                providePpwcodeCommonComponents({
                    translationKeys: {
                        loader: {
                            loading: 'ppwcode.common-components.loader.loading'
                        }
                    }
                })
            ]
        }).compileComponents()

        fixture = TestBed.createComponent(LoaderComponent)
        fixture.componentRef.setInput('loading', true)
        fixture.detectChanges()
    })

    it('should use the provided loading translation key', () => {
        const progressBar = fixture.nativeElement.querySelector('mat-progress-bar')

        expect(progressBar.getAttribute('aria-label')).toBe('ppwcode.common-components.loader.loading')
    })
})
