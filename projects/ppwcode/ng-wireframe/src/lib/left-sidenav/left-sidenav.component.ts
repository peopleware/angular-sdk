import { CommonModule, NgOptimizedImage } from '@angular/common'
import {
    ChangeDetectionStrategy,
    Component,
    computed,
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
import { toSignal } from '@angular/core/rxjs-interop'
import { NavigationEnd, Router } from '@angular/router'
import { TranslatePipe } from '@ngx-translate/core'
import { filter, map, startWith } from 'rxjs'
import { NavigationItem } from '../navigation-item/navigation-item.model'

interface NavigationItemWithActiveState extends NavigationItem {
    children?: Array<NavigationItemWithActiveState>
    isActive: boolean
    hasActiveChild: boolean
}

@Component({
    selector: 'ppw-left-sidenav',
    imports: [CommonModule, MatIconModule, MatListModule, TranslatePipe, NgOptimizedImage],
    templateUrl: './left-sidenav.component.html',
    styleUrls: ['./left-sidenav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
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
    private _currentUrl = toSignal(
        this._router.events.pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd),
            map((event) => event.urlAfterRedirects),
            startWith(this._router.url)
        )
    )
    private _openedNavigationItems: Array<string> = []

    protected navigationItemsWithActiveState = computed<Array<NavigationItemWithActiveState>>(() =>
        this.addActiveStateToNavigationItems(this.navigationItems() ?? [], this._currentUrl())
    )

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['navigationItems']) {
            this.validateNavigationItems(this.navigationItems())
        }
    }

    public navigationItemIsOpened(navigationItem: NavigationItem): boolean {
        return (
            this._openedNavigationItems.includes(this.getNavigationItemKey(navigationItem)) ||
            this.navigationItemHasActiveChild(navigationItem)
        )
    }

    public navigationItemIsActive(
        navigationItem: NavigationItem,
        currentUrl: string | undefined = this._currentUrl()
    ): boolean {
        if (!currentUrl || navigationItem.isExternalLink || !navigationItem.fullRouterPath) {
            return false
        }

        return this._router.isActive(navigationItem.fullRouterPath, {
            paths: 'exact',
            queryParams: 'ignored',
            matrixParams: 'ignored',
            fragment: 'ignored'
        })
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
        return this.getNavigationItemKey(navigationItem)
    }

    private toggleNavigationItemOpened(navigationItem: NavigationItem): void {
        if (this.navigationItemIsOpened(navigationItem)) {
            this.closeNavigationItem(navigationItem)
        } else {
            this.openNavigationItem(navigationItem)
        }
    }

    private closeNavigationItem(navigationItem: NavigationItem): void {
        this._openedNavigationItems = this._openedNavigationItems.filter(
            (ni) => ni !== this.getNavigationItemKey(navigationItem)
        )
    }

    private openNavigationItem(navigationItem: NavigationItem): void {
        this._openedNavigationItems.push(this.getNavigationItemKey(navigationItem))
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

    private addActiveStateToNavigationItems(
        navigationItems: Array<NavigationItem>,
        currentUrl: string | undefined
    ): Array<NavigationItemWithActiveState> {
        return navigationItems.map((navigationItem) => this.addActiveStateToNavigationItem(navigationItem, currentUrl))
    }

    private addActiveStateToNavigationItem(
        navigationItem: NavigationItem,
        currentUrl: string | undefined
    ): NavigationItemWithActiveState {
        const children = navigationItem.children?.map((childNavigationItem) =>
            this.addActiveStateToNavigationItem(childNavigationItem, currentUrl)
        )
        const isActive = this.navigationItemIsActive(navigationItem, currentUrl)

        return {
            ...navigationItem,
            children,
            isActive,
            hasActiveChild:
                children?.some(
                    (childNavigationItem) => childNavigationItem.isActive || childNavigationItem.hasActiveChild
                ) ?? false
        }
    }

    private navigationItemHasActiveChild(navigationItem: NavigationItem): boolean {
        if (this.navigationItemHasActiveState(navigationItem)) {
            return navigationItem.hasActiveChild
        }

        return (
            navigationItem.children?.some((childNavigationItem) => {
                return (
                    this.navigationItemIsActive(childNavigationItem) ||
                    this.navigationItemHasActiveChild(childNavigationItem)
                )
            }) ?? false
        )
    }

    private navigationItemHasActiveState(
        navigationItem: NavigationItem
    ): navigationItem is NavigationItemWithActiveState {
        return 'isActive' in navigationItem && 'hasActiveChild' in navigationItem
    }

    private getNavigationItemKey(navigationItem: NavigationItem): string {
        return JSON.stringify({
            label: navigationItem.label,
            icon: navigationItem.icon,
            fullRouterPath: navigationItem.fullRouterPath,
            isEnabled: navigationItem.isEnabled,
            isExternalLink: navigationItem.isExternalLink,
            children: navigationItem.children?.map((childNavigationItem) =>
                this.getNavigationItemKey(childNavigationItem)
            )
        })
    }
}
