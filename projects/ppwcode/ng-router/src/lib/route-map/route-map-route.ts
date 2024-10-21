/**
 * Interface describing the structure of a route in the route map.
 */
export type RouteMapRoute = {
    /** Internal. The segment for the subroute in the full route. */
    __path: string
    /** Internal. Reference to the parent route map route. */
    __parent?: RouteMapRoute
    [key: string]: RouteMapRoute | RouteMapNestedRoute | string | undefined
}

/**
 * Interface describing the structure of a nested route in the route map.
 */
export interface RouteMapNestedRoute {
    [key: string]: RouteMapRoute | RouteMapNestedRoute
}
