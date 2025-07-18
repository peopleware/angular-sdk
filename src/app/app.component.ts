import { Component, computed, inject, signal, Signal } from '@angular/core'
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
    readonly #translate: TranslateService = inject(TranslateService)

    protected readonly showToolbarLogo = signal(false)
    protected readonly showToolbarBackground = signal(false)
    protected readonly showPageTitle = signal(true)
    protected readonly flatWireframeStyle = signal(true)
    protected readonly closedByDefaultOnLargerDevice = signal(false)

    protected readonly sidebarOptions: Signal<SidebarOptions> = computed(() => {
        return {
            logoUrl: './assets/ppwcode_logo.png',
            centerLogo: false,
            closedByDefaultOnLargerDevice: this.closedByDefaultOnLargerDevice(),
            showPageTitle: this.showPageTitle()
        }
    })

    protected readonly toolbarLogoUrl = signal('./assets/peopleware_logo.png')
    protected readonly toolbarLogoWidth = signal(190)
    protected readonly toolbarLogoHeight = signal(40)
    protected readonly toolbarHeightPx = signal(60)

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
        this.#translate.setDefaultLang('en')
        this.#translate.use('en')
    }
}
