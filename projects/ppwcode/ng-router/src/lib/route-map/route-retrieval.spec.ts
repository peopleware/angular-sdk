import { defineRoute } from './define-route'
import { getRouteSegment, getFullRoutePath, interpolateRouteSegment, interpolateRoutePath } from './route-retrieval'

describe('Route Retrieval Functions', () => {
    describe('path retrieval', () => {
        const rootRoute = defineRoute('root', {
            childRoute: defineRoute('child', {
                grandChildRoute: defineRoute('grandchild')
            })
        })
        describe('getRouteSegment', () => {
            it('should return the path segment of a route', () => {
                expect(getRouteSegment(rootRoute.childRoute)).toBe('child')
            })
        })

        describe('getFullRoutePath', () => {
            it('should return the full path with leading slash by default', () => {
                expect(getFullRoutePath(rootRoute)).toBe('/root')
                expect(getFullRoutePath(rootRoute.childRoute)).toBe('/root/child')
                expect(getFullRoutePath(rootRoute.childRoute.grandChildRoute)).toBe('/root/child/grandchild')
            })

            it('should return the full path without leading slash when specified', () => {
                expect(getFullRoutePath(rootRoute, { includeLeadingSlash: false })).toBe('root')
                expect(getFullRoutePath(rootRoute.childRoute, { includeLeadingSlash: false })).toBe('root/child')
            })
        })
    })

    describe('interpolateRouteSegment', () => {
        it('should replace parameters in the path segment', () => {
            const route = defineRoute('users/:userId/posts/:postId')
            const result = interpolateRouteSegment(route, [123, 456])
            expect(result).toBe('users/123/posts/456')
        })

        it('should handle paths without parameters', () => {
            const route = defineRoute('users/posts')
            const result = interpolateRouteSegment(route, [])
            expect(result).toBe('users/posts')
        })
    })

    describe('interpolateRoutePath', () => {
        it('should replace parameters in the full path with leading slash by default', () => {
            const rootRoute = defineRoute('api', {
                childRoute: defineRoute('users/:userId')
            })

            const result = interpolateRoutePath(rootRoute.childRoute, [123])
            expect(result).toBe('/api/users/123')
        })

        it('should replace parameters in the full path without leading slash when specified', () => {
            const rootRoute = defineRoute('api', {
                childRoute: defineRoute('users/:userId')
            })

            const result = interpolateRoutePath(rootRoute.childRoute, [123], { includeLeadingSlash: false })
            expect(result).toBe('api/users/123')
        })

        it('should handle nested routes with multiple parameters', () => {
            const rootRoute = defineRoute('api', {
                childRoute: defineRoute('users/:userId', {
                    grandChildRoute: defineRoute('posts/:postId')
                })
            })

            const result = interpolateRoutePath(rootRoute.childRoute.grandChildRoute, [123, 456])
            expect(result).toBe('/api/users/123/posts/456')
        })
    })
})
