import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectorRef, Component, inject, Input, OnDestroy, ViewChild } from '@angular/core'
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'
import { RouterOutlet } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
import { LeftSidenavComponent } from '../left-sidenav/left-sidenav.component'
import { NavigationItem } from '../navigation-item/navigation-item.model'
import { ToolbarComponent } from '../toolbar/toolbar.component'
import { SidebarOptions } from '../model/sidebar-options'

@Component({
    selector: 'ppw-wireframe',
    standalone: true,
    imports: [CommonModule, MatSidenavModule, LeftSidenavComponent, ToolbarComponent, RouterOutlet],
    templateUrl: './wireframe.component.html',
    styleUrls: ['./wireframe.component.scss']
})
export class WireframeComponent implements AfterViewInit, OnDestroy {
    public observer: BreakpointObserver = inject(BreakpointObserver)
    private cdRef: ChangeDetectorRef = inject(ChangeDetectorRef)
    private destroy$: Subject<void> = new Subject<void>()

    @Input() public navigationItems: Array<NavigationItem> | null = []
    @Input() public sidebarOptions?: SidebarOptions
    @ViewChild(MatDrawer) public matDrawer!: MatDrawer

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

    public trackSidenavVisibility(): void {
        this.observer
            .observe([Breakpoints.XSmall, Breakpoints.Small])
            .pipe(takeUntil(this.destroy$))
            .subscribe((result) => {
                if (result.matches && this.matDrawer.opened) {
                    this.matDrawer.close()
                } else if (!result.matches && !this.matDrawer.opened) {
                    this.matDrawer.open()
                }
                this.cdRef.markForCheck()
            })
    }

    public ngAfterViewInit(): void {
        this.trackSidenavVisibility()
    }

    public ngOnDestroy(): void {
        this.destroy$.next()
        this.destroy$.complete()
    }

    public async toggleSidebar(): Promise<void> {
        await this.matDrawer.toggle()
    }

    public async closeSidebar(): Promise<void> {
        await this.matDrawer.close()
    }
}
