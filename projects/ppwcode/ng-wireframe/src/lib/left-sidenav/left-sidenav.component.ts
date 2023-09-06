import { CommonModule, NgOptimizedImage } from '@angular/common'
import { Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { Router, RouterLink } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { NavigationItem } from '../navigation-item/navigation-item.model'

@Component({
    selector: 'ppw-left-sidenav',
    standalone: true,
    imports: [CommonModule, MatIconModule, MatListModule, RouterLink, TranslateModule, NgOptimizedImage],
    templateUrl: './left-sidenav.component.html',
    styleUrls: ['./left-sidenav.component.scss']
})
export class LeftSidenavComponent {
    @Input({ required: true }) public navigationItems: Array<NavigationItem> | null = []
    @Input() public showMenuCloseButton = true
    @Input() public logoUrl?: string
    @Output() public closeSidebar: EventEmitter<void> = new EventEmitter()

    private _router: Router = inject(Router)
    private _openedNavigationItems: Array<NavigationItem> = []

    public navigationItemIsOpened(navigationItem: NavigationItem): boolean {
        return this._openedNavigationItems.includes(navigationItem)
    }

    public onClickNavigationItem(navigationItem: NavigationItem): void {
        if (navigationItem.isEnabled === false) {
            return
        }

        if ((navigationItem.children?.length ?? 0) > 0) {
            this.toggleNavigationItemOpened(navigationItem)
        } else if (navigationItem.fullRouterPath) {
            this._router.navigateByUrl(navigationItem.fullRouterPath)
        } else {
            throw new Error('Could not handle navigation item with no children or router path.')
        }
    }

    private toggleNavigationItemOpened(navigationItem: NavigationItem): void {
        if (this.navigationItemIsOpened(navigationItem)) {
            this.closeNavigationItem(navigationItem)
        } else {
            this.openNavigationItem(navigationItem)
        }
    }

    private closeNavigationItem(navigationItem: NavigationItem): void {
        this._openedNavigationItems = this._openedNavigationItems.filter((ni) => ni !== navigationItem)
    }

    private openNavigationItem(navigationItem: NavigationItem): void {
        this._openedNavigationItems.push(navigationItem)
    }
}
