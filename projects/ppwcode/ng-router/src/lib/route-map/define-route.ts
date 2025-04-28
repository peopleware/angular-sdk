import { RouteMapNestedRoute, RouteMapRoute } from './route-map-route'

/**
 * Creates an object defining a private property __path with the segment for the path of that route.
 * When nested routes are provided, they are added as keys to the same object. The nested routes receive
 * a private property __parent linking it to the parent route.
 * @param pathSegment The path segment of the route.
 * @param nestedRoutes The nested routes of the route.
 */
export const defineRoute = <TNested extends Record<string, RouteMapRoute | RouteMapNestedRoute>>(
    pathSegment: string,
    nestedRoutes?: TNested
): RouteMapRoute & TNested => {
    const route: RouteMapRoute = { __path: pathSegment, __isContainer: false }
    const nested = nestedRoutes ?? ({} as TNested)

    Object.keys(nested).forEach((key) => {
        nested[key].__parent = route
    })

    return Object.assign(route, nestedRoutes ?? ({} as TNested))
}

/**
 * Creates a container route that cannot be navigated to, but can contain nested routes.
 * @param pathSegment The path segment of the container.
 * @param nestedRoutes The nested routes of the container.
 */
export const defineContainer = <TNested extends Record<string, RouteMapRoute | RouteMapNestedRoute>>(
    pathSegment: string,
    nestedRoutes?: TNested
): RouteMapRoute & TNested => {
    const route: RouteMapRoute = { __path: pathSegment, __isContainer: true }
    const nested = nestedRoutes ?? ({} as TNested)

    Object.keys(nested).forEach((key) => {
        nested[key].__parent = route
    })

    return Object.assign(route, nestedRoutes ?? ({} as TNested))
}
