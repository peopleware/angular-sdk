import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { CommonModule } from '@angular/common'
import { Component, computed, effect, inject, input, InputSignal, Signal, viewChild } from '@angular/core'
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop'
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router'
import { notUndefined } from '@ppwcode/js-ts-oddsandends/lib/conditional-assert'
import { filter } from 'rxjs'
import { LeftSidenavComponent } from '../left-sidenav/left-sidenav.component'
import { SidebarOptions } from '../model/sidebar-options'
import { NavigationItem } from '../navigation-item/navigation-item.model'
import { ToolbarComponent } from '../toolbar/toolbar.component'

@Component({
    selector: 'ppw-wireframe',
    standalone: true,
    imports: [CommonModule, MatSidenavModule, LeftSidenavComponent, ToolbarComponent, RouterOutlet],
    templateUrl: './wireframe.component.html',
    styleUrls: ['./wireframe.component.scss']
})
export class WireframeComponent {
    #observer: BreakpointObserver = inject(BreakpointObserver)
    #router: Router = inject(Router)

    #breakpointChange = toSignal(
        this.#observer.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(takeUntilDestroyed())
    )
    #navigationEnd = toSignal(this.#router.events.pipe(filter((event) => event instanceof NavigationEnd)))

    // Inputs
    public navigationItems: InputSignal<Array<NavigationItem> | null> = input<Array<NavigationItem> | null>([])
    public sidebarOptions: InputSignal<SidebarOptions | undefined> = input()
    public toolbarHeightPx: InputSignal<number | undefined> = input()
    public hideSidenavWhenNoNavigationItems: InputSignal<boolean> = input(false)

    // View children
    public matDrawer: Signal<MatDrawer | undefined> = viewChild(MatDrawer)

    public get sidebarIsOpen(): boolean {
        const drawer = this.matDrawer()
        if (drawer) {
            if (!drawer.opened) {
                return (
                    !this.isSmallDevice() &&
                    !this.isXSmallDevice() &&
                    !this.sidebarOptions()?.closedByDefaultOnLargerDevice
                )
            }
            return drawer.opened
        }

        // When the drawer is not available it could mean two things:
        // 1. The drawer is forced to be not available.
        // 2. The drawer is not yet initialized.

        // In the first case the drawer is closed.
        if (this.forceHiddenSidenav()) {
            return false
        }

        // In the second case the drawer is open or closed depending on the device size.
        return !this.isSmallDevice() && !this.isXSmallDevice()
    }

    // Computed properties
    public showWireframe: Signal<boolean> = computed(() => {
        // This acts as a trigger for the computed property.
        this.#navigationEnd()

        let child: ActivatedRouteSnapshot = this.#router.routerState.snapshot.root
        while (child.firstChild) {
            child = child.firstChild
        }

        return child.data['showWireframe'] ?? true
    })

    public sidenavMode: Signal<'over' | 'side'> = computed(() => {
        const options = this.sidebarOptions()
        return this.isXSmallDevice() || !!options?.closedByDefaultOnLargerDevice ? 'over' : 'side'
    })

    public forceHiddenSidenav: Signal<boolean> = computed(() => {
        const navigationItems = this.navigationItems()
        return this.hideSidenavWhenNoNavigationItems() && (!navigationItems || navigationItems.length === 0)
    })

    public isSmallDevice: Signal<boolean> = this.#getComputedBreakpoint([Breakpoints.Small])
    public isXSmallDevice: Signal<boolean> = this.#getComputedBreakpoint([Breakpoints.XSmall])
    public isLargerDevice: Signal<boolean> = this.#getComputedBreakpoint([
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
    ])

    // Effects
    #autoCloseSidebar = effect(() => {
        const result = this.#breakpointChange()
        if (!this.matDrawer() || !result) {
            return
        }

        const drawer: MatDrawer = notUndefined(this.matDrawer())
        if (result.matches && drawer.opened) {
            drawer.close()
        } else if (!result.matches && !drawer.opened && !this.sidebarOptions()?.closedByDefaultOnLargerDevice) {
            drawer.open()
        }
    })

    // Methods
    public async onNavigate(): Promise<void> {
        // Automatically close the sidebar when the navigation is started on a small device where the sidebar is opened
        // as an overlay.
        if (this.sidenavMode() === 'over') {
            await this.closeSidebar()
        }
    }

    public async toggleSidebar(): Promise<void> {
        await this.matDrawer()?.toggle()
    }

    public async closeSidebar(): Promise<void> {
        await this.matDrawer()?.close()
    }

    #getComputedBreakpoint(breakpoints: Array<string>): Signal<boolean> {
        return computed(() => {
            this.#breakpointChange()
            return this.#observer.isMatched(breakpoints)
        })
    }
}
