import { Component, inject } from '@angular/core'
import { NavigationItem } from '@ppwcode/ng-wireframe'
import { TranslateService } from '@ngx-translate/core'
import { SidebarOptions } from '../../projects/ppwcode/ng-wireframe/src/lib/model/sidebar-options'

@Component({
    selector: 'ppw-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private translate: TranslateService = inject(TranslateService)
    public title = 'ppwcode'
    public sidebarOptions: SidebarOptions = {
        logoUrl: './assets/ppwcode_logo.png',
        centerLogo: false,
        navigationItemFontSize: '15px',
        showPageTitle: true
    }
    public showToolbarLogo = false
    public toolbarLogoUrl = './assets/peopleware_logo.png'
    public toolbarLogoWidth = 190
    public toolbarLogoHeight = 40
    public toolbarHeightPx = 60

    constructor() {
        this.translate.setDefaultLang('en')
        this.translate.use('en')
    }

    public getNavigationItems(): NavigationItem[] {
        return [
            {
                label: this.translate.instant('navigation.expandable_card'),
                icon: 'fa-solid fa-house',
                fullRouterPath: '/expandable-card'
            },
            {
                label: this.translate.instant('navigation.filter_table'),
                icon: 'fa-solid fa-laptop-code',
                fullRouterPath: '/filter-table'
            }
        ]
    }
}
