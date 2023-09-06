import { inject } from '@angular/core'
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router'
import { map, Observable } from 'rxjs'

/**
 * Watches for changes to the given `paramName` in the query string of the activated route.
 * @param paramName The name of the parameter to watch.
 */
export const watchQueryParam = (paramName: string): Observable<string | null> => {
    const activatedRoute = inject(ActivatedRoute)
    return activatedRoute.queryParamMap.pipe(map((params: ParamMap) => params.get(paramName)))
}

/**
 * Watches for changes to the given `paramName` in the query string of the activated route.
 * Converts the value for the parameter to a number.
 * @param paramName The name of the parameter to watch.
 */
export const watchNumberQueryParam = (paramName: string): Observable<number> => {
    return watchQueryParam(paramName).pipe(map(Number))
}

/**
 * Watches for changes to the given `paramName` in the route of the activated route.
 * @param paramName The name of the parameter to watch.
 */
export const watchRouteParam = (paramName: string): Observable<string | null> => {
    const activatedRoute = inject(ActivatedRoute)
    return activatedRoute.paramMap.pipe(map((params: ParamMap) => params.get(paramName)))
}

/**
 * Watches for changes to the given `paramName` in the route of the activated route.
 * Converts the value for the parameter to a number.
 * @param paramName The name of the parameter to watch.
 */
export const watchNumberRouteParam = (paramName: string): Observable<number> => {
    return watchRouteParam(paramName).pipe(map(Number))
}

export type RelativeNavigator = (commands: unknown[], extras?: NavigationExtras) => Promise<boolean>

/**
 * Gets a function that can be called to navigate relatively to the currently activated route.
 */
export const getRelativeNavigator = (): RelativeNavigator => {
    const router = inject(Router)
    const activatedRoute = inject(ActivatedRoute)

    return (commands: unknown[], extras?: NavigationExtras): Promise<boolean> => {
        return router.navigate(commands, { relativeTo: activatedRoute, ...(extras ?? {}) })
    }
}
