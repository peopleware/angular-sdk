import { Component, inject } from '@angular/core'
import { NavigationItem } from '@ppwcode/ng-wireframe'
import { TranslateService } from '@ngx-translate/core'
import { getRelativeNavigator } from '@ppwcode/ng-router'

@Component({
    selector: 'ppw-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private translate: TranslateService = inject(TranslateService)
    title = 'ppwcode'

    public getNavigationItems(): NavigationItem[] {
        return [
            {
                label: this.translate.instant('navigation.home'),
                icon: 'fa-solid fa-hand-holding-dollar',
                fullRouterPath: '/home'
            },
            {
                label: this.translate.instant('navigation.demo'),
                icon: 'fa-solid fa-hand-holding-dollar',
                fullRouterPath: '/demo'
            }
        ]
    }

    protected readonly navigator = navigator
    protected readonly getRelativeNavigator = getRelativeNavigator
}
