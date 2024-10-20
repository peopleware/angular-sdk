import { Pipe, PipeTransform } from '@angular/core'
import { RouteMapRoute } from '../route-map-route'
import { interpolateRouteSegment } from '../route-retrieval'

/**
 * Gets the interpolated route segment for the given route.
 * @example
 * <a [routerLink]="ROUTE_MAP.student.create | ppwRouteMapSegment">Navigate relatively</a>
 * @example
 * <a [routerLink]="ROUTE_MAP.student.edit | ppwRouteMapSegment:[student.id]">Navigate relatively with parameters replaced</a>
 * @param route The route to interpolate.
 * @param interpolationParams The parameters to interpolate the path with.
 */
@Pipe({
    name: 'ppwRouteMapSegment',
    standalone: true
})
export class RouteMapSegmentPipe implements PipeTransform {
    public transform(route: RouteMapRoute, ...interpolationParams: Array<unknown>): string {
        return interpolateRouteSegment(route, interpolationParams)
    }
}
