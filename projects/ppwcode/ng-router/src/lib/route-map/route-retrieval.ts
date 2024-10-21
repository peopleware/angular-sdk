import { RouteMapRoute } from './route-map-route'

/**
 * Gets only the path segment of the given RouteMapRoute.
 * @param route The route to get the path segment for.
 */
export const getRouteSegment = (route: RouteMapRoute): string => {
    return route.__path
}

/**
 * Gets the full path to the given route, starting from the root of the application.
 * @param route The route to get the full path for.
 */
export const getFullRoutePath = (route: RouteMapRoute): string => {
    if (!route.__parent) {
        return `/${getRouteSegment(route)}`
    }

    return `${getFullRoutePath(route.__parent)}/${getRouteSegment(route)}`
}

/**
 * Gets the route segment for the given route map route and replaces the parameters with the provided values.
 * The parameters are expected to be in the same order as they appear in the path.
 * @param route The route to get the path for.
 * @param interpolationParams The values for the parameters to replace in the path.
 */
export const interpolateRouteSegment = (route: RouteMapRoute, interpolationParams: Array<unknown>): string => {
    const path = getRouteSegment(route)

    // Create a copy to ensure that we are not modifying the parameter using the .shift method.
    const params = [...interpolationParams]

    return path.replace(/:\w+/g, () => `${params.shift()}`)
}

/**
 * Gets the route segment for the given route map route and replaces the parameters with the provided values.
 * The parameters are expected to be in the same order as they appear in the path.
 * @param route The route to get the path for.
 * @param interpolationParams The values for the parameters to replace in the path.
 */
export const interpolateRoutePath = (route: RouteMapRoute, interpolationParams: Array<unknown>): string => {
    const path = getFullRoutePath(route)

    // Create a copy to ensure that we are not modifying the parameter using the .shift method.
    const params = [...interpolationParams]

    return path.replace(/:\w+/g, () => `${params.shift()}`)
}
