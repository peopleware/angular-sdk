import { CommonModule, NgOptimizedImage } from '@angular/common'
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
    InputSignal,
    output,
    OutputEmitterRef
} from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { toSignal } from '@angular/core/rxjs-interop'
import { NavigationEnd, Router, RouterLink, UrlTree } from '@angular/router'
import { TranslatePipe } from '@ngx-translate/core'
import { filter, map, startWith } from 'rxjs'
import { NavigationItem } from '../navigation-item/navigation-item.model'

interface NavigationItemWithActiveState extends NavigationItem {
    children?: Array<NavigationItemWithActiveState>
    isActive: boolean
    hasActiveChild: boolean
    urlTree: UrlTree | null
}

@Component({
    selector: 'ppw-left-sidenav',
    imports: [CommonModule, MatIconModule, MatListModule, TranslatePipe, NgOptimizedImage, RouterLink],
    templateUrl: './left-sidenav.component.html',
    styleUrls: ['./left-sidenav.component.scss'],
    host: {
        '[class.ppw-sidenav-scroll-navigation-wrapper-only]': 'scrollNavigationWrapperOnly()'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftSidenavComponent {
    // Inputs
    public navigationItems: InputSignal<Array<NavigationItem> | null> = input.required()
    public showMenuCloseButton: InputSignal<boolean> = input(true)
    public logoUrl: InputSignal<string | undefined> = input()
    public logoHeight: InputSignal<number> = input(100)
    public logoWidth: InputSignal<number> = input(100)
    public centerLogo: InputSignal<boolean> = input(true)
    public scrollNavigationWrapperOnly: InputSignal<boolean> = input(false)
    /** Opt in to native leaf and external links with hrefs and browser new-tab gestures instead of legacy buttons. */
    public useNativeLinks: InputSignal<boolean> = input(false)

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
    private _closedNavigationItems: Array<string> = []

    protected navigationItemsWithActiveState = computed<Array<NavigationItemWithActiveState>>(() =>
        this.addActiveStateToNavigationItems(this.navigationItems() ?? [], this._currentUrl())
    )

    public navigationItemIsOpened(navigationItem: NavigationItem): boolean {
        const navigationItemKey = this.getNavigationItemKey(navigationItem)

        return (
            !this._closedNavigationItems.includes(navigationItemKey) &&
            (this._openedNavigationItems.includes(navigationItemKey) ||
                this.navigationItemHasActiveChild(navigationItem))
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

    /**
     * Handles legacy button activation and programmatic navigation, regardless of useNativeLinks.
     */
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

    protected onClickNavigationButton(navigationItem: NavigationItem): void {
        // Native pathless leaves have no href and must remain inert, unlike legacy activation.
        if (this.useNativeLinks() && !navigationItem.children?.length && !navigationItem.fullRouterPath) {
            return
        }

        this.onClickNavigationItem(navigationItem)
    }

    protected onActivateNavigationLink(navigationItem: NavigationItem, event: MouseEvent): void {
        // RouterLink or the browser owns navigation; only ordinary activation closes overlays.
        if (
            navigationItem.isEnabled !== false &&
            navigationItem.fullRouterPath &&
            (navigationItem.isExternalLink || !navigationItem.children?.length) &&
            event.button === 0 &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.shiftKey &&
            !event.altKey
        ) {
            this.navigated.emit(navigationItem)
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
        const navigationItemKey = this.getNavigationItemKey(navigationItem)

        this._openedNavigationItems = this._openedNavigationItems.filter((ni) => ni !== navigationItemKey)
        this._closedNavigationItems.push(navigationItemKey)
    }

    private openNavigationItem(navigationItem: NavigationItem): void {
        const navigationItemKey = this.getNavigationItemKey(navigationItem)

        this._closedNavigationItems = this._closedNavigationItems.filter((ni) => ni !== navigationItemKey)
        this._openedNavigationItems.push(navigationItemKey)
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
            urlTree:
                this.useNativeLinks() &&
                navigationItem.isEnabled !== false &&
                !navigationItem.isExternalLink &&
                !children?.length &&
                navigationItem.fullRouterPath
                    ? this._router.parseUrl(navigationItem.fullRouterPath)
                    : null,
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
