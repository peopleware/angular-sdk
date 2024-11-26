import { CommonModule, NgOptimizedImage } from '@angular/common'
import {
    Component,
    inject,
    input,
    InputSignal,
    OnChanges,
    output,
    OutputEmitterRef,
    SimpleChanges
} from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { Router } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { NavigationItem } from '../navigation-item/navigation-item.model'

@Component({
    selector: 'ppw-left-sidenav',
    imports: [CommonModule, MatIconModule, MatListModule, TranslateModule, NgOptimizedImage],
    templateUrl: './left-sidenav.component.html',
    styleUrls: ['./left-sidenav.component.scss']
})
export class LeftSidenavComponent implements OnChanges {
    // Inputs
    public navigationItems: InputSignal<Array<NavigationItem> | null> = input.required()
    public showMenuCloseButton: InputSignal<boolean> = input(true)
    public logoUrl: InputSignal<string | undefined> = input()
    public logoHeight: InputSignal<number> = input(100)
    public logoWidth: InputSignal<number> = input(100)
    public centerLogo: InputSignal<boolean> = input(true)

    // Outputs
    public closeSidebar: OutputEmitterRef<void> = output()
    public navigated: OutputEmitterRef<NavigationItem> = output()

    private _router: Router = inject(Router)
    private _openedNavigationItems: Array<NavigationItem> = []

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['navigationItems']) {
            this.validateNavigationItems(this.navigationItems())
        }
    }

    public navigationItemIsOpened(navigationItem: NavigationItem): boolean {
        return this._openedNavigationItems.includes(navigationItem)
    }

    public onClickNavigationItem(navigationItem: NavigationItem): void {
        if (navigationItem.isEnabled === false) {
            return
        }

        if (navigationItem.isExternalLink) {
            window.open(navigationItem.fullRouterPath, '_blank')
            this.navigated.emit(navigationItem)
        } else if ((navigationItem.children?.length ?? 0) > 0) {
            this.toggleNavigationItemOpened(navigationItem)
        } else if (navigationItem.fullRouterPath) {
            this._router.navigateByUrl(navigationItem.fullRouterPath)
            this.navigated.emit(navigationItem)
        } else {
            throw new Error('Could not handle navigation item with no children or router path.')
        }
    }

    protected trackNavigationItem(navigationItem: NavigationItem): string {
        return JSON.stringify(navigationItem)
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

    private validateNavigationItems(navigationItems: Array<NavigationItem> | null): void {
        navigationItems ??= []
        navigationItems.forEach((item: NavigationItem) => {
            if (item.isExternalLink && (item.children?.length ?? 0) > 0) {
                throw new Error('External link navigation items cannot have children.')
            }

            this.validateNavigationItems(item.children ?? [])
        })
    }
}
