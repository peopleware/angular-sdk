import { defineContainer, defineRoute } from './define-route'
import { getFullRouteMapUrls } from './testing/get-full-route-map-urls'

describe('defineRoute', () => {
    it('should be possible to define a route map with defineRoute and defineContainer', () => {
        const ROUTE_MAP = [
            defineContainer('students', {
                all: defineRoute('list'),
                detail: defineRoute(':id')
            })
        ]

        expect(getFullRouteMapUrls(ROUTE_MAP)).toEqual(['/students/:id', '/students/list'])
    })
})
