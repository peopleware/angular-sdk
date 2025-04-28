import { RouteMapRoute } from '../route-map-route'
import { RouteMapSegmentPipe } from './route-map-segment.pipe'

describe('RouteMapSegmentPipe', () => {
    let pipe: RouteMapSegmentPipe

    beforeEach(() => {
        pipe = new RouteMapSegmentPipe()
    })

    it('should interpolate the route path segment with array parameters', () => {
        const listRoute: RouteMapRoute = { __path: 'students', __isContainer: false }
        const detailRoute: RouteMapRoute = { __path: ':id', __parent: listRoute, __isContainer: false }

        expect(pipe.transform(detailRoute)).toBe('undefined') // no value given for :id
        expect(pipe.transform(detailRoute, [16])).toBe('16')
    })

    it('should interpolate the route path segment with object parameters', () => {
        const listRoute: RouteMapRoute = { __path: 'students', __isContainer: false }
        const detailRoute: RouteMapRoute = { __path: ':id', __parent: listRoute, __isContainer: false }

        expect(pipe.transform(detailRoute, { id: 16 })).toBe('16')
    })
})
