import { RouteMapRoute } from '../route-map-route'
import { RouteMapRoutePipe } from './route-map-route.pipe'

describe('RouteMapRoutePipe', () => {
    let pipe: RouteMapRoutePipe

    beforeEach(() => {
        pipe = new RouteMapRoutePipe()
    })

    it('should interpolate the full route path', () => {
        const listRoute: RouteMapRoute = { __path: 'students', __isContainer: false }
        const detailRoute: RouteMapRoute = { __path: ':id', __parent: listRoute, __isContainer: false }

        expect(pipe.transform(detailRoute, {})).toBe('/students/:id') // no value given for :id
        expect(pipe.transform(detailRoute, { id: 16 })).toBe('/students/16')
    })
})
