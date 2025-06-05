import { RouteMapRoute } from './route-map-route'
import { Params } from '@angular/router'

/**
 * Options for route path generation.
 */
export interface RoutePathOptions {
    /**
     * Whether to include the leading slash in the generated path.
     * @default true
     */
    includeLeadingSlash?: boolean
    /**
     * Whether to skip checking if the route is a container route.
     * @default false
     */
    skipContainerCheck?: boolean
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
 * @throws Error if the route is a container and skipContainerCheck is false
 */
export const getFullRoutePath = (route: RouteMapRoute, options: RoutePathOptions = {}): string => {
    const { includeLeadingSlash = true, skipContainerCheck = false } = options

    if (!skipContainerCheck && route.__isContainer) {
        throw new Error('Cannot get path for a container route')
    }

    const path = !route.__parent
        ? getRouteSegment(route)
        : `${getFullRoutePath(route.__parent, {
              includeLeadingSlash: false,
              skipContainerCheck: true
          })}/${getRouteSegment(route)}`

    return includeLeadingSlash ? `/${path}` : path
}

/**
 * Gets the route segment for the given route map route and replaces the parameters with the provided values.
 * The parameters are expected to have properties matching the names of the path parameters.
 * @param route The route to get the path for.
 * @param interpolationParams The values for the parameters to replace in the path.
 * @throws Error if the route is a container
 */
export const interpolateRouteSegment = (route: RouteMapRoute, interpolationParams: Params): string => {
    if (route.__isContainer) {
        throw new Error('Cannot interpolate path for a container route')
    }

    let path = getRouteSegment(route)
    Object.keys(interpolationParams).forEach((key) => {
        path = path.replace(`:${key}`, interpolationParams[key])
    })
    return path
}

/**
 * Gets the route segment for the given route map route and replaces the parameters with the provided values.
 * The parameters are expected to have properties matching the names of the path parameters.
 * @param route The route to get the path for.
 * @param interpolationParams The values for the parameters to replace in the path.
 * @param options Optional configuration for path generation.
 * @throws Error if the route is a container
 */
export const interpolateRoutePath = (
    route: RouteMapRoute,
    interpolationParams: Params,
    options: RoutePathOptions = {}
): string => {
    if (route.__isContainer) {
        throw new Error('Cannot interpolate path for a container route')
    }

    let path = getFullRoutePath(route, { ...options, skipContainerCheck: true })
    Object.keys(interpolationParams).forEach((key) => {
        path = path.replace(`:${key}`, interpolationParams[key])
    })
    return path
}
