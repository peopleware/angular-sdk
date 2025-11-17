import { Component, inject, Signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { TranslatePipe } from '@ngx-translate/core'
import { BreadcrumbProviderOptions } from './breadcrumb-provider-options.model'
import { Breadcrumb } from './breadcrumb.model'
import { BREADCRUMB_PROVIDER_OPTIONS, BreadcrumbService } from './breadcrumb.service'

@Component({
    selector: 'ppw-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    imports: [RouterLink, TranslatePipe],
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
    #breadcrumbService: BreadcrumbService = inject(BreadcrumbService)
    protected readonly options: BreadcrumbProviderOptions = inject(BREADCRUMB_PROVIDER_OPTIONS)
    protected readonly breadcrumbs: Signal<Breadcrumb[]> = this.#breadcrumbService.breadcrumbs
}
