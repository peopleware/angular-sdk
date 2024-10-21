import { Pipe, PipeTransform } from '@angular/core'
import { RouteMapRoute } from '../route-map-route'
import { interpolateRoutePath } from '../route-retrieval'

/**
 * Gets the fully interpolated path for the given route.
 * @example
 * <a [routerLink]="ROUTE_MAP.students | ppwRouteMapRoute">Navigate to the full url</a>
 * @example
 * <a [routerLink]="ROUTE_MAP.students.detail | ppwRouteMapRoute:[student.id]">Navigate to the full url with parameters replaced</a>
 * @param route The route to interpolate.
 * @param interpolationParams The parameters to interpolate the full path with.
 */
@Pipe({
    name: 'ppwRouteMapRoute',
    standalone: true
})
export class RouteMapRoutePipe implements PipeTransform {
    public transform(route: RouteMapRoute, ...interpolationParams: Array<unknown>): string {
        return interpolateRoutePath(route, interpolationParams)
    }
}
