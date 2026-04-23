import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter, Route, Router } from '@angular/router'
import { provideTranslateService } from '@ngx-translate/core'
import { provideBreadcrumbOptions } from '@ppwcode/ng-router'
import { provideWireframeOptions, WireframeOptions } from '../model/wireframe-options'
import { WireframeComponent } from './wireframe.component'

@Component({
    selector: 'ppw-visible-route',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
class VisibleRouteComponent {}

@Component({
    selector: 'ppw-hidden-toolbar-route',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
class HiddenToolbarRouteComponent {}

@Component({
    selector: 'ppw-toolbar-override-route',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
class ToolbarOverrideRouteComponent {}

@Component({
    selector: 'ppw-hidden-breadcrumb-route',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
class HiddenBreadcrumbRouteComponent {}

const routes: Route[] = [
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
            showToolbar: false,
            showBreadcrumb: true
        }
    },
    {
        path: 'toolbar-override',
        component: ToolbarOverrideRouteComponent,
        title: 'Toolbar override page',
        data: {
            showToolbar: true
        }
    },
    {
        path: 'hidden-breadcrumb',
        component: HiddenBreadcrumbRouteComponent,
        title: 'Hidden breadcrumb page',
        data: {
            showBreadcrumb: false
        }
    }
]

describe('WireframeComponent', () => {
    let component: WireframeComponent
    let fixture: ComponentFixture<WireframeComponent>
    let router: Router

    const setup = async (wireframeOptions?: WireframeOptions): Promise<void> => {
        TestBed.resetTestingModule()

        await TestBed.configureTestingModule({
            imports: [WireframeComponent],
            providers: [
                provideTranslateService({}),
                provideBreadcrumbOptions(),
                provideRouter(routes),
                ...(wireframeOptions ? [provideWireframeOptions(wireframeOptions)] : [])
            ]
        }).compileComponents()

        router = TestBed.inject(Router)
        fixture = TestBed.createComponent(WireframeComponent)
        component = fixture.componentInstance
        fixture.componentRef.setInput('showBreadcrumb', true)
    }

    it('should show the toolbar by default', async () => {
        await setup()
        await router.navigateByUrl('/visible')
        fixture.detectChanges()

        expect(component.showToolbar()).toBe(true)
        expect(fixture.nativeElement.querySelector('ppw-toolbar')).toBeTruthy()
    })

    it('should hide the toolbar when the activated route data disables it', async () => {
        await setup()
        await router.navigateByUrl('/hidden-toolbar')
        fixture.detectChanges()

        expect(component.showToolbar()).toBe(false)
        expect(fixture.nativeElement.querySelector('ppw-toolbar')).toBeFalsy()
    })

    it('should hide the toolbar when wireframe options disable it by default', async () => {
        await setup({ showToolbar: false })
        await router.navigateByUrl('/visible')
        fixture.detectChanges()

        expect(component.showToolbar()).toBe(false)
        expect(fixture.nativeElement.querySelector('ppw-toolbar')).toBeFalsy()
    })

    it('should show the toolbar when route data overrides the global default', async () => {
        await setup({ showToolbar: false })
        await router.navigateByUrl('/toolbar-override')
        fixture.detectChanges()

        expect(component.showToolbar()).toBe(true)
        expect(fixture.nativeElement.querySelector('ppw-toolbar')).toBeTruthy()
    })

    it('should keep the breadcrumb visible when the toolbar is hidden by route data', async () => {
        await setup()
        await router.navigateByUrl('/hidden-toolbar')
        fixture.detectChanges()

        expect(component.showToolbar()).toBe(false)
        expect(component.resolvedShowBreadcrumb()).toBe(true)
        expect(fixture.nativeElement.querySelector('ppw-toolbar')).toBeFalsy()
        expect(fixture.nativeElement.querySelector('ppw-breadcrumb')).toBeTruthy()
    })

    it('should let route data hide the breadcrumb even when the input enables it', async () => {
        await setup()
        await router.navigateByUrl('/hidden-breadcrumb')
        fixture.detectChanges()

        expect(component.resolvedShowBreadcrumb()).toBe(false)
        expect(fixture.nativeElement.querySelector('ppw-breadcrumb')).toBeFalsy()
    })
})
