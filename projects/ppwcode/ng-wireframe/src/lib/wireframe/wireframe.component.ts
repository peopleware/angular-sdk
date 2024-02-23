import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router'
import { filter, map, Subject, takeUntil } from 'rxjs'
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
export class WireframeComponent implements AfterViewInit, OnDestroy, OnInit {
    public observer: BreakpointObserver = inject(BreakpointObserver)
    private cdRef: ChangeDetectorRef = inject(ChangeDetectorRef)
    private destroy$: Subject<void> = new Subject<void>()
    private router: Router = inject(Router)

    @Input() public navigationItems: Array<NavigationItem> | null = []
    @Input() public sidebarOptions?: SidebarOptions
    @Input() public toolbarHeightPx?: number
    @Input() public hideSidenavWhenNoNavigationItems: boolean = false
    @ViewChild(MatDrawer) public matDrawer?: MatDrawer

    public sidebarIsOpen = false
    public showWireframe = true

    public get sidenavMode(): 'over' | 'side' {
        return this.isXSmallDevice || !!this.sidebarOptions?.closedByDefaultOnLargerDevice ? 'over' : 'side'
    }

    public get isSmallDevice(): boolean {
        return this.observer.isMatched([Breakpoints.Small])
    }

    public get isXSmallDevice(): boolean {
        return this.observer.isMatched([Breakpoints.XSmall])
    }

    public get isLargerDevice(): boolean {
        return this.observer.isMatched([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    }

    public get isSidenavOpen(): boolean {
        return this.matDrawer?.opened ?? (!this.isSmallDevice && !this.isXSmallDevice)
    }

    public get forceHiddenSidenav(): boolean {
        return this.hideSidenavWhenNoNavigationItems && (!this.navigationItems || this.navigationItems.length === 0)
    }

    public trackSidenavVisibility(): void {
        this.observer
            .observe([Breakpoints.XSmall, Breakpoints.Small])
            .pipe(takeUntil(this.destroy$))
            .subscribe((result) => {
                if (!this.matDrawer) {
                    return
                }

                if (result.matches && this.matDrawer.opened) {
                    this.sidebarIsOpen = false
                    this.matDrawer.close()
                } else if (!result.matches && !this.matDrawer.opened) {
                    this.sidebarIsOpen = true
                    this.matDrawer.open()
                }
                this.cdRef.markForCheck()
            })
    }

    public ngOnInit(): void {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => {
                    let child: ActivatedRouteSnapshot = this.router.routerState.snapshot.root
                    while (child.firstChild) {
                        child = child.firstChild
                    }
                    return child.data['showWireframe'] ?? null
                }),
                map((showWireframe: boolean | null) => showWireframe !== false)
            )
            .subscribe((showWireframe: boolean) => {
                this.showWireframe = showWireframe
            })
    }

    public ngAfterViewInit(): void {
        if (!this.sidebarOptions?.closedByDefaultOnLargerDevice) {
            this.trackSidenavVisibility()
        }
    }

    public ngOnDestroy(): void {
        this.destroy$.next()
        this.destroy$.complete()
    }

    public async onNavigate(): Promise<void> {
        // Automatically close the sidebar when the navigation is started on a small device where the sidebar is opened
        // as an overlay.
        if (this.sidenavMode === 'over') {
            await this.closeSidebar()
        }
    }

    public async toggleSidebar(): Promise<void> {
        await this.matDrawer?.toggle()
    }

    public async closeSidebar(): Promise<void> {
        await this.matDrawer?.close()
    }

    public sidebarOpened(): void {
        this.sidebarIsOpen = !this.isSmallDevice && !this.isXSmallDevice
    }

    public sidebarClosed(): void {
        this.sidebarIsOpen = false
    }
}
