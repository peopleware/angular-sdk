import { CommonModule } from '@angular/common'
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { Title } from '@angular/platform-browser'
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { combineLatest, filter, map, startWith } from 'rxjs'

@Component({
    selector: 'ppw-toolbar',
    standalone: true,
    imports: [CommonModule, MatIconModule, MatMenuModule, TranslateModule, MatButtonModule],
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    @Input() public showMenuToggle = true
    @Input() public isSidenavOpen = true
    @Output() public toggleSidebar: EventEmitter<void> = new EventEmitter<void>()

    public title: string | null = null

    private translateService: TranslateService = inject(TranslateService)
    private router: Router = inject(Router)

    public ngOnInit(): void {
        combineLatest([
            this.translateService.onLangChange.pipe(startWith(null)),
            this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
        ])
            .pipe(
                map(() => {
                    let child: ActivatedRouteSnapshot = this.router.routerState.snapshot.root
                    while (child.firstChild) {
                        child = child.firstChild
                    }
                    return child.title ?? null
                }),
                map((title: string | null) => (title ? this.translateService.instant(title) : null))
            )
            .subscribe((title: string | null) => {
                this.title = title
            })
    }
}
