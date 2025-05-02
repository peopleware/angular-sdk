import { RouteMapRoute } from '../route-map-route'
import { getFullRoutePath } from '../route-retrieval'

export const getFullRouteMapUrls = (routeMap: Array<RouteMapRoute>) => {
    const allPaths: Array<string> = []

    const getRoutePaths = (routes: Array<RouteMapRoute>): void => {
        routes.forEach((routeItem) => {
            // Only add routes that are not containers.
            if (!routeItem.__isContainer) {
                allPaths.push(getFullRoutePath(routeItem))
            }

            // A sub route is a key in the route definition that is not _path or _parent.
            // Its value should be an object with a _path key.
            const subRoutes = Object.keys(routeItem)
                .filter((key) => key !== '__path' && key !== '__parent' && key !== '__isContainer')
                .map((key) => routeItem[key] as RouteMapRoute)
                .filter((value) => typeof value === 'object' && '__path' in value)

            // Recursively call this function to retrieve all sub routes.
            if (subRoutes.length > 0) {
                getRoutePaths(subRoutes)
            }
        })
    }

    getRoutePaths(routeMap)

    return allPaths.sort()
}
