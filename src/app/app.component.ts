import { Component, inject } from '@angular/core'
import { NavigationItem } from '@ppwcode/ng-wireframe'
import { TranslateService } from '@ngx-translate/core'
import { SidebarOptions } from '../../projects/ppwcode/ng-wireframe/src/lib/model/sidebar-options'
import { mixinResponsiveObservers } from '../../projects/ppwcode/ng-common/src/lib/mixins/responsive-observers'

@Component({
    selector: 'ppw-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
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
                fullRouterPath: '/confirmation-dialog'
            },
            {
                label: this.translate.instant('navigation.expandable_card'),
                icon: 'fa-solid fa-house',
                fullRouterPath: '/expandable-card'
            },
            {
                label: this.translate.instant('navigation.filter_table'),
                icon: 'fa-solid fa-laptop-code',
                fullRouterPath: '/filter-table'
            },
            {
                label: this.translate.instant('navigation.message_bar'),
                icon: 'fa-solid fa-triangle-exclamation',
                fullRouterPath: '/message-bar'
            },
            {
                label: this.translate.instant('navigation.in_memory_logging'),
                icon: 'fa-solid fa-file-code',
                fullRouterPath: '/in-memory-logging'
            },
            {
                label: this.translate.instant('navigation.global_error_handler'),
                icon: 'fa-solid fa-bug',
                fullRouterPath: '/global-error-handler'
            }
        ]
    }
}
