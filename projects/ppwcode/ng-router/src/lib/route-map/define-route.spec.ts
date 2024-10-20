import { defineRoute } from './define-route'
import { getFullRouteMapUrls } from './testing/get-full-route-map-urls'

describe('defineRoute', () => {
    it('should be possible to define a route map with defineRoute', () => {
        const ROUTE_MAP = [
            defineRoute('students', {
                all: defineRoute('list'),
                detail: defineRoute(':id')
            })
        ]

        expect(getFullRouteMapUrls(ROUTE_MAP)).toEqual(['/students', '/students/:id', '/students/list'])
    })
})
