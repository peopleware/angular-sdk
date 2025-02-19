import { Component, inject } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { mixinResponsiveObservers } from '@ppwcode/ng-common'
import { getFullRoutePath } from '@ppwcode/ng-router'
import { NavigationItem, SidebarOptions } from '@ppwcode/ng-wireframe'
import { ROUTE_MAP } from './app-routing.module'

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
        logoUrl: './assets/ppwcode_logo.png',
        centerLogo: false,
        showPageTitle: true
    }
    public showToolbarLogo = false
    public showToolbarBackground = false
    public flatWireframeStyle = true
    public toolbarLogoUrl = './assets/peopleware_logo.png'
    public toolbarLogoWidth = 190
    public toolbarLogoHeight = 40
    public toolbarHeightPx = 60

    constructor() {
        super()
        this.translate.setDefaultLang('en')
        this.translate.use('en')
    }

    public getNavigationItems(): NavigationItem[] {
        return [
            {
                label: this.translate.instant('navigation.confirmation_dialog'),
                icon: 'fa-solid fa-circle-question',
                fullRouterPath: getFullRoutePath(ROUTE_MAP.confirmationDialog)
            },
            {
                label: this.translate.instant('navigation.expandable_card'),
                icon: 'fa-solid fa-house',
                fullRouterPath: getFullRoutePath(ROUTE_MAP.expandableCard)
            },
            {
                label: this.translate.instant('navigation.filter_table'),
                icon: 'fa-solid fa-laptop-code',
                fullRouterPath: getFullRoutePath(ROUTE_MAP.filterTable)
            },
            {
                label: this.translate.instant('navigation.form_table'),
                icon: 'fa-solid fa-table-list',
                fullRouterPath: getFullRoutePath(ROUTE_MAP.formTable)
            },
            {
                label: this.translate.instant('navigation.message_bar'),
                icon: 'fa-solid fa-triangle-exclamation',
                fullRouterPath: getFullRoutePath(ROUTE_MAP.messageBar)
            },
            {
                label: this.translate.instant('navigation.in_memory_logging'),
                icon: 'fa-solid fa-file-code',
                fullRouterPath: getFullRoutePath(ROUTE_MAP.inMemoryLogging)
            },
            {
                label: this.translate.instant('navigation.global_error_handler'),
                icon: 'fa-solid fa-bug',
                fullRouterPath: getFullRoutePath(ROUTE_MAP.globalErrorHandler)
            },
            {
                label: this.translate.instant('navigation.peopleware_website'),
                icon: 'fa-solid fa-earth-europe',
                fullRouterPath: 'https://peopleware.be',
                isExternalLink: true
            }
        ]
    }
}
