import { HttpErrorResponse } from '@angular/common/http'
import { createEmptyPagedEntities, createPagedEntitiesMock } from '@ppwcode/ng-async'
import { firstValueFrom, of, throwError } from 'rxjs'
import { handleAsyncResult, handleAsyncResultIgnoreEntity, handlePagedAsyncResult } from './default-handling'

describe('default async result handling', () => {
    describe('async result', () => {
        it('should convert a successful result to an async result', async () => {
            const source$ = of({ a: 123 })

            const asyncResult = await firstValueFrom(handleAsyncResult(source$))
            expect(asyncResult).toEqual({
                status: 'success',
                entity: { a: 123 },
                filters: null
            })
        })

        it('should convert an expected http error to an async result', async () => {
            const source$ = throwError(() => new HttpErrorResponse({ status: 409 }))

            const asyncResult = await firstValueFrom(handleAsyncResult(source$, [409]))
            expect(asyncResult).toEqual({
                status: 'failed',
                entity: null,
                filters: null,
                error: new Error('Conflict')
            })
        })

        it('should pass on unexpected http errors', async () => {
            const httpErrorResponse = new HttpErrorResponse({ status: 400 })
            const source$ = throwError(() => httpErrorResponse)

            await expectAsync(firstValueFrom(handleAsyncResult(source$, [409]))).toBeRejectedWith(httpErrorResponse)
        })

        it('should pass on unexpected errors', async () => {
            const source$ = throwError(() => new Error('ERROR_MESSAGE'))

            await expectAsync(firstValueFrom(handleAsyncResult(source$, [409]))).toBeRejectedWith(
                new Error('ERROR_MESSAGE')
            )
        })
    })

    describe('async result ignore value', () => {
        it('should convert a successful result to an async result with undefined entity', async () => {
            const source$ = of({ a: 123 })

            const asyncResult = await firstValueFrom(handleAsyncResultIgnoreEntity(source$))
            expect(asyncResult).toEqual({
                status: 'success',
                entity: undefined,
                filters: null
            })
        })

        it('should convert an expected http error to an async result', async () => {
            const source$ = throwError(() => new HttpErrorResponse({ status: 409 }))

            const asyncResult = await firstValueFrom(handleAsyncResultIgnoreEntity(source$, [409]))
            expect(asyncResult).toEqual({
                status: 'failed',
                entity: undefined,
                filters: null,
                error: new Error('Conflict')
            })
        })

        it('should pass on unexpected http errors', async () => {
            const httpErrorResponse = new HttpErrorResponse({ status: 400 })
            const source$ = throwError(() => httpErrorResponse)

            await expectAsync(firstValueFrom(handleAsyncResultIgnoreEntity(source$, [409]))).toBeRejectedWith(
                httpErrorResponse
            )
        })

        it('should pass on unexpected errors', async () => {
            const source$ = throwError(() => new Error('ERROR_MESSAGE'))

            await expectAsync(firstValueFrom(handleAsyncResultIgnoreEntity(source$, [409]))).toBeRejectedWith(
                new Error('ERROR_MESSAGE')
            )
        })
    })

    describe('paged async result', () => {
        it('should convert a successful result to a paged async result', async () => {
            const source$ = of(createPagedEntitiesMock([{ a: 123 }]))

            const asyncResult = await firstValueFrom(handlePagedAsyncResult(source$))
            expect(asyncResult).toEqual({
                status: 'success',
                entity: createPagedEntitiesMock([{ a: 123 }]),
                filters: null
            })
        })

        it('should convert an expected http error to a paged async result', async () => {
            const source$ = throwError(() => new HttpErrorResponse({ status: 409 }))

            const asyncResult = await firstValueFrom(handlePagedAsyncResult(source$, [409]))
            expect(asyncResult).toEqual({
                status: 'failed',
                entity: createEmptyPagedEntities(),
                filters: null,
                error: new Error('Conflict')
            })
        })

        it('should pass on unexpected http errors', async () => {
            const httpErrorResponse = new HttpErrorResponse({ status: 400 })
            const source$ = throwError(() => httpErrorResponse)

            await expectAsync(firstValueFrom(handlePagedAsyncResult(source$, [409]))).toBeRejectedWith(
                httpErrorResponse
            )
        })

        it('should pass on unexpected errors', async () => {
            const source$ = throwError(() => new Error('ERROR_MESSAGE'))

            await expectAsync(firstValueFrom(handlePagedAsyncResult(source$, [409]))).toBeRejectedWith(
                new Error('ERROR_MESSAGE')
            )
        })
    })
})
