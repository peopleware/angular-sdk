import { Component, computed, inject } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { mixinResponsiveObservers } from '@ppwcode/ng-common'
import { SidebarOptions } from '@ppwcode/ng-wireframe'
import { getNavigationItems } from './app.navigation'

@Component({
    selector: 'ppw-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent extends mixinResponsiveObservers() {
    private translate: TranslateService = inject(TranslateService)
    public title = 'ppwcode'
    public sidebarOptions: SidebarOptions = {
        closedByDefaultOnLargerDevice: false,
        logoUrl: './assets/ppwcode_logo.png',
        centerLogo: false,
        showPageTitle: true
    }
    public showToolbarLogo = false
    public showToolbarBackground = false
    public flatWireframeStyle = true
    public closedByDefaultOnLargerDevice = false
    public toolbarLogoUrl = './assets/peopleware_logo.png'
    public toolbarLogoWidth = 190
    public toolbarLogoHeight = 40
    public toolbarHeightPx = 60

    public navigationItems = computed(() => {
        // Even though this a function that is being called, the items array will only change if a reactive property
        // on the navigation items changes. For example, depending on permissions, you'd typically use an if statement
        // using a (computed) signal to determine whether a navigation item should be included or not. If that (computed)
        // signal changes, then this `navigationItems` computed signal will also be updated and getNavigationItems will
        // be called again.

        // You can pass any dependencies (like services) to this function as a parameter to use them in the function.
        return getNavigationItems()
    })

    constructor() {
        super()
        this.translate.setDefaultLang('en')
        this.translate.use('en')
    }

    getSidebarOptions(): SidebarOptions {
        return { ...this.sidebarOptions, closedByDefaultOnLargerDevice: this.closedByDefaultOnLargerDevice }
    }
}
