import { inject, Injectable, InjectionToken, Signal, ValueProvider } from '@angular/core'
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { distinctUntilChanged, filter, map, startWith } from 'rxjs'
import { BreadcrumbProviderOptions } from './breadcrumb-provider-options.model'
import { Breadcrumb } from './breadcrumb.model'

export const BREADCRUMB_KEY = 'breadcrumb'
export const RESOLVED_BREADCRUMB_LABEL = 'detailTitle'
export const URL_SEGMENT_SEPARATOR = '/'

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {
    #router: Router = inject(Router)
    #translate: TranslateService = inject(TranslateService)
    #options: BreadcrumbProviderOptions = inject(BREADCRUMB_PROVIDER_OPTIONS)

    #navigationEndEvents$ = this.#router.events.pipe(
        takeUntilDestroyed(),
        distinctUntilChanged(),
        filter((event) => event instanceof NavigationEnd)
    )
    public breadcrumbs: Signal<Breadcrumb[]> = toSignal(
        this.#navigationEndEvents$.pipe(
            map(() => this.#router.routerState.snapshot.root),
            startWith(this.#router.routerState.snapshot.root),
            map((root) => this.#createBreadcrumbsFromRootSnapshot(root))
        ),
        { initialValue: [] }
    )

    #createBreadcrumbsFromRootSnapshot(root: ActivatedRouteSnapshot): Breadcrumb[] {
        const breadcrumbs: Breadcrumb[] = []

        let route: ActivatedRouteSnapshot | null = root
        let parentUrl: string[] = []

        while (route !== null) {
            const routeUrl = parentUrl.concat(route.url.map((url) => url.path))

            let breadcrumbLabel: string | undefined = undefined
            if (this.#options.preferLabelFromRouteData) {
                const breadcrumbKey = route.data[BREADCRUMB_KEY]
                breadcrumbLabel = breadcrumbKey ? this.#translate.instant(breadcrumbKey) : undefined
            } else {
                breadcrumbLabel = route.title ? this.#translate.instant(route.title) : undefined
            }
            const detailTitle: string | undefined = route.data[RESOLVED_BREADCRUMB_LABEL]
            const isSameLabel = breadcrumbs[breadcrumbs.length - 1]?.label === breadcrumbLabel
            if (detailTitle) {
                breadcrumbs.push({
                    label: detailTitle,
                    url: URL_SEGMENT_SEPARATOR + routeUrl.join(URL_SEGMENT_SEPARATOR)
                })
            } else if (route.pathFromRoot.length > 1 && breadcrumbLabel && (!breadcrumbs || !isSameLabel)) {
                breadcrumbs.push({
                    url: URL_SEGMENT_SEPARATOR + routeUrl.join(URL_SEGMENT_SEPARATOR),
                    label: breadcrumbLabel
                })
            }

            route = route.firstChild
            parentUrl = routeUrl
        }

        return breadcrumbs
    }
}

export const BREADCRUMB_PROVIDER_OPTIONS = new InjectionToken<BreadcrumbProviderOptions>('BreadcrumbProviderOptions')

export const provideBreadcrumbOptions = (options?: BreadcrumbProviderOptions): ValueProvider => ({
    provide: BREADCRUMB_PROVIDER_OPTIONS,
    useValue: options ? options : { preferLabelFromRouteData: false, enableAnimations: true }
})
