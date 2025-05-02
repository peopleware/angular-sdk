/**
 * Interface describing the structure of a route in the route map.
 */
export type RouteMapRoute = {
    /** Internal. The segment for the subroute in the full route. */
    __path: string
    /** Internal. Reference to the parent route map route. */
    __parent?: RouteMapRoute
    /** Internal. Whether this route is a container that cannot be navigated to. */
    __isContainer: boolean
    [key: string]: RouteMapRoute | RouteMapNestedRoute | string | boolean | undefined
}

/**
 * Interface describing the structure of a nested route in the route map.
 */
export interface RouteMapNestedRoute {
    [key: string]: RouteMapRoute | RouteMapNestedRoute
}
