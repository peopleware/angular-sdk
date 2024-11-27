import { Component, computed, inject, input, InputSignal, output, OutputEmitterRef, Signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { filter, startWith } from 'rxjs'

@Component({
    selector: 'ppw-toolbar',
    imports: [MatIconModule, MatMenuModule, MatButtonModule],
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
    #translateService: TranslateService = inject(TranslateService)
    #router: Router = inject(Router)

    #languageChange = toSignal(this.#translateService.onLangChange.pipe(startWith(null)))
    #navigationEnd = toSignal(this.#router.events.pipe(filter((event) => event instanceof NavigationEnd)))

    // Inputs
    public showMenuToggle: InputSignal<boolean> = input(true)
    public isSidenavOpen: InputSignal<boolean> = input(true)
    public showPageTitle: InputSignal<boolean> = input(true)
    public toolbarHeightPx: InputSignal<number | undefined> = input()

    // Outputs
    public toggleSidebar: OutputEmitterRef<void> = output()

    public title: Signal<string | null> = computed(() => {
        // These act as triggers for the computed property.
        this.#languageChange()
        this.#navigationEnd()

        // Navigate to the last child route definition to get its title.
        let child: ActivatedRouteSnapshot = this.#router.routerState.snapshot.root
        while (child.firstChild) {
            child = child.firstChild
        }

        return child.title ? this.#translateService.instant(child.title) : null
    })
}
