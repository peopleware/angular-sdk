import { defineRoute, defineContainer } from './define-route'
import { getRouteSegment, getFullRoutePath, interpolateRouteSegment, interpolateRoutePath } from './route-retrieval'

describe('Route Retrieval Functions', () => {
    describe('path retrieval', () => {
        const rootRoute = defineRoute('root', {
            childRoute: defineRoute('child', {
                grandChildRoute: defineRoute('grandchild')
            })
        })

        const containerRoute = defineContainer('container', {
            childRoute: defineRoute('child', {
                grandChildRoute: defineRoute('grandchild')
            })
        })

        describe('getRouteSegment', () => {
            it('should return the path segment of a route', () => {
                expect(getRouteSegment(rootRoute.childRoute)).toBe('child')
            })

            it('should return the path segment of a container route', () => {
                expect(getRouteSegment(containerRoute)).toBe('container')
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

            it('should throw an error when getting path for a container route', () => {
                expect(() => getFullRoutePath(containerRoute)).toThrow(
                    new Error('Cannot get path for a container route')
                )
            })

            it('should still work for child routes of a container when skipContainerCheck is true', () => {
                expect(getFullRoutePath(containerRoute.childRoute, { skipContainerCheck: true })).toBe(
                    '/container/child'
                )
                expect(getFullRoutePath(containerRoute.childRoute.grandChildRoute, { skipContainerCheck: true })).toBe(
                    '/container/child/grandchild'
                )
            })

            it('should not throw an error for child routes of a container when skipContainerCheck is false', () => {
                expect(() => getFullRoutePath(containerRoute.childRoute)).not.toThrow()
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

        it('should throw an error when interpolating a container route', () => {
            const container = defineContainer('users/:userId')
            expect(() => interpolateRouteSegment(container, [123])).toThrow(
                new Error('Cannot interpolate path for a container route')
            )
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

        it('should throw an error when interpolating a container route', () => {
            const container = defineContainer('api', {
                childRoute: defineRoute('users/:userId')
            })

            expect(() => interpolateRoutePath(container, [])).toThrow(
                new Error('Cannot interpolate path for a container route')
            )
        })

        it('should still work for child routes of a container', () => {
            const container = defineContainer('api', {
                childRoute: defineRoute('users/:userId')
            })

            const result = interpolateRoutePath(container.childRoute, [123])
            expect(result).toBe('/api/users/123')
        })

        it('should handle nested routes with container parents', () => {
            const container = defineContainer('api', {
                childRoute: defineRoute('users/:userId', {
                    grandChildRoute: defineRoute('posts/:postId')
                })
            })

            const result = interpolateRoutePath(container.childRoute.grandChildRoute, [123, 456])
            expect(result).toBe('/api/users/123/posts/456')
        })
    })
})
