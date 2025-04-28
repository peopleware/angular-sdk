import { RouteMapRoute } from './route-map-route'

/**
 * Options for route path generation.
 */
export interface RoutePathOptions {
    /**
     * Whether to include the leading slash in the generated path.
     * @default true
     */
    includeLeadingSlash?: boolean
}

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
 * @param options Optional configuration for path generation.
 */
export const getFullRoutePath = (route: RouteMapRoute, options: RoutePathOptions = {}): string => {
    const { includeLeadingSlash = true } = options
    const path = !route.__parent
        ? getRouteSegment(route)
        : `${getFullRoutePath(route.__parent, { includeLeadingSlash: false })}/${getRouteSegment(route)}`

    return includeLeadingSlash ? `/${path}` : path
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
 * @param options Optional configuration for path generation.
 */
export const interpolateRoutePath = (
    route: RouteMapRoute,
    interpolationParams: Array<unknown>,
    options: RoutePathOptions = {}
): string => {
    const path = getFullRoutePath(route, options)

    // Create a copy to ensure that we are not modifying the parameter using the .shift method.
    const params = [...interpolationParams]

    return path.replace(/:\w+/g, () => `${params.shift()}`)
}
