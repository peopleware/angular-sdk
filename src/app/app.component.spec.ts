import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { TranslateModule } from '@ngx-translate/core'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MatIconModule } from '@angular/material/icon'
import { WireframeComponent } from '@ppwcode/ng-wireframe'

describe('AppComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                RouterTestingModule,
                MatIconModule,
                TranslateModule.forRoot(),
                WireframeComponent
            ],
            declarations: [AppComponent]
        })
    )

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent)
        const app = fixture.componentInstance
        expect(app).toBeTruthy()
    })

    it(`should have as title 'ppwcode'`, () => {
        const fixture = TestBed.createComponent(AppComponent)
        const app = fixture.componentInstance
        expect(app.title).toEqual('ppwcode')
    })
})
