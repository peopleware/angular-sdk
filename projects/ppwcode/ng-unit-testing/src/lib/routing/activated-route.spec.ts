import { TestBed } from '@angular/core/testing'
import {
    expectData,
    expectParamMapValue,
    expectParams,
    expectQueryParamMapValue,
    expectQueryParams,
    expectSnapshotData,
    expectSnapshotParams,
    expectSnapshotQueryParams,
    provideActivatedRoute,
    updateActivatedRouteData,
    updateActivatedRouteParams,
    updateActivatedRouteQueryParams
} from './activated-route'

describe('activated route', () => {
    describe('provideActivatedRoute', () => {
        it('should provide the activated route without any options', async () => {
            TestBed.configureTestingModule({
                providers: [provideActivatedRoute()]
            })

            expectSnapshotData({})
            expectSnapshotParams({})
            expectSnapshotQueryParams({})

            await expectData({})
            await expectParams({})
            await expectQueryParams({})
        })

        it('should provide the activated route with route params', async () => {
            TestBed.configureTestingModule({
                providers: [provideActivatedRoute({ routeParams: { id: '1' } })]
            })

            expectSnapshotData({})
            expectSnapshotParams({ id: '1' })
            expectSnapshotQueryParams({})

            await expectData({})
            await expectParams({ id: '1' })
            await expectQueryParams({})

            await expectParamMapValue('id', '1')
        })

        it('should provide the activated route with query params', async () => {
            TestBed.configureTestingModule({
                providers: [provideActivatedRoute({ queryParams: { id: '1' } })]
            })

            expectSnapshotData({})
            expectSnapshotParams({})
            expectSnapshotQueryParams({ id: '1' })

            await expectData({})
            await expectParams({})
            await expectQueryParams({ id: '1' })

            await expectQueryParamMapValue('id', '1')
        })

        it('should provide the activated route with data', async () => {
            TestBed.configureTestingModule({
                providers: [provideActivatedRoute({ data: { id: '1' } })]
            })

            expectSnapshotData({ id: '1' })
            expectSnapshotParams({})
            expectSnapshotQueryParams({})

            await expectData({ id: '1' })
            await expectParams({})
            await expectQueryParams({})
        })

        it('should provide the activated route with combine query params, route params and data', async () => {
            TestBed.configureTestingModule({
                providers: [
                    provideActivatedRoute({
                        routeParams: { id: '1' },
                        queryParams: { id: '2' },
                        data: { id: '3' }
                    })
                ]
            })

            expectSnapshotData({ id: '3' })
            expectSnapshotParams({ id: '1' })
            expectSnapshotQueryParams({ id: '2' })

            await expectData({ id: '3' })
            await expectParams({ id: '1' })
            await expectQueryParams({ id: '2' })

            await expectParamMapValue('id', '1')
            await expectQueryParamMapValue('id', '2')
        })

        it('should add activated route params', async () => {
            TestBed.configureTestingModule({
                providers: [provideActivatedRoute({ routeParams: { id: '1' } })]
            })

            expectSnapshotParams({ id: '1' })
            await expectParams({ id: '1' })

            updateActivatedRouteParams({ name: 'test' })

            expectSnapshotParams({ id: '1', name: 'test' })
            await expectParams({ id: '1', name: 'test' })
        })

        it('should update the activated route params', async () => {
            TestBed.configureTestingModule({
                providers: [provideActivatedRoute({ routeParams: { id: '1' } })]
            })

            expectSnapshotParams({ id: '1' })
            await expectParams({ id: '1' })

            updateActivatedRouteParams({ id: '2' })

            expectSnapshotParams({ id: '2' })
            await expectParams({ id: '2' })
        })

        it('should add activated route query params', async () => {
            TestBed.configureTestingModule({
                providers: [provideActivatedRoute({ queryParams: { id: '1' } })]
            })

            expectSnapshotQueryParams({ id: '1' })
            await expectQueryParams({ id: '1' })

            updateActivatedRouteQueryParams({ name: 'test' })

            expectSnapshotQueryParams({ id: '1', name: 'test' })
            await expectQueryParams({ id: '1', name: 'test' })
        })

        it('should update the activated route query params', async () => {
            TestBed.configureTestingModule({
                providers: [provideActivatedRoute({ queryParams: { id: '1' } })]
            })

            expectSnapshotQueryParams({ id: '1' })
            await expectQueryParams({ id: '1' })

            updateActivatedRouteQueryParams({ id: '2' })

            expectSnapshotQueryParams({ id: '2' })
            await expectQueryParams({ id: '2' })
        })

        it('should add activated route data', async () => {
            TestBed.configureTestingModule({
                providers: [provideActivatedRoute({ data: { id: '1' } })]
            })

            expectSnapshotData({ id: '1' })
            await expectData({ id: '1' })

            updateActivatedRouteData({ name: 'test' })

            expectSnapshotData({ id: '1', name: 'test' })
            await expectData({ id: '1', name: 'test' })
        })

        it('should update the activated route data', async () => {
            TestBed.configureTestingModule({
                providers: [provideActivatedRoute({ data: { id: '1' } })]
            })

            expectSnapshotData({ id: '1' })
            await expectData({ id: '1' })

            updateActivatedRouteData({ id: '2' })

            expectSnapshotData({ id: '2' })
            await expectData({ id: '2' })
        })
    })
})
