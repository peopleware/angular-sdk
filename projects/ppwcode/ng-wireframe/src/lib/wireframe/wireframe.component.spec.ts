import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter, Router } from '@angular/router'
import { provideTranslateService } from '@ngx-translate/core'
import { WireframeComponent } from './wireframe.component'

@Component({
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
class VisibleRouteComponent {}

@Component({
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
class HiddenToolbarRouteComponent {}

describe('WireframeComponent', () => {
    let component: WireframeComponent
    let fixture: ComponentFixture<WireframeComponent>
    let router: Router

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WireframeComponent],
            providers: [
                provideTranslateService({}),
                provideRouter([
                    {
                        path: 'visible',
                        component: VisibleRouteComponent,
                        title: 'Visible page'
                    },
                    {
                        path: 'hidden-toolbar',
                        component: HiddenToolbarRouteComponent,
                        title: 'Hidden toolbar page',
                        data: {
                            showToolbar: false
                        }
                    }
                ])
            ]
        }).compileComponents()

        router = TestBed.inject(Router)
        fixture = TestBed.createComponent(WireframeComponent)
        component = fixture.componentInstance
    })

    it('should show the toolbar by default', async () => {
        await router.navigateByUrl('/visible')
        fixture.detectChanges()

        expect(component.showToolbar()).toBe(true)
        expect(fixture.nativeElement.querySelector('ppw-toolbar')).toBeTruthy()
    })

    it('should hide the toolbar when the activated route data disables it', async () => {
        await router.navigateByUrl('/hidden-toolbar')
        fixture.detectChanges()

        expect(component.showToolbar()).toBe(false)
        expect(fixture.nativeElement.querySelector('ppw-toolbar')).toBeFalsy()
    })
})
