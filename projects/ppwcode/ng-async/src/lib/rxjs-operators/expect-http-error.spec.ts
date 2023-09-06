import { HttpErrorResponse } from '@angular/common/http'
import { firstValueFrom, of, throwError } from 'rxjs'
import { expectHttpError } from './expect-http-error'

describe('expectHttpError', () => {
    it('should pass on the received value', async () => {
        const handler = jasmine.createSpy('handler', () => new Error()).and.callThrough()
        const source$ = of('source value')

        const result = await firstValueFrom(source$.pipe(expectHttpError([409], handler)))

        expect(result).not.toBeInstanceOf(Error)
        expect(result).toEqual('source value')
        expect(handler).not.toHaveBeenCalled()
    })

    it('should pass on exceptions that are not an HttpErrorResponse', async () => {
        const handler = jasmine.createSpy('handler', () => new Error()).and.callThrough()
        const source$ = throwError(() => new Error('ERROR_MESSAGE'))

        await expectAsync(firstValueFrom(source$.pipe(expectHttpError([409], handler)))).toBeRejectedWith(
            new Error('ERROR_MESSAGE')
        )

        expect(handler).not.toHaveBeenCalled()
    })

    it(`should pass on http errors that don't match the expected status code`, async () => {
        const handler = jasmine.createSpy('handler', () => new Error()).and.callThrough()
        const source$ = throwError(() => new HttpErrorResponse({ status: 400 }))

        await expectAsync(firstValueFrom(source$.pipe(expectHttpError([409], handler)))).toBeRejectedWith(
            new HttpErrorResponse({ status: 400 })
        )

        expect(handler).not.toHaveBeenCalled()
    })

    it('should handle http errors with the expected status code', async () => {
        const handler = jasmine.createSpy('handler', () => new Error()).and.callThrough()
        const source$ = throwError(() => new HttpErrorResponse({ status: 409 }))

        const result = await firstValueFrom(source$.pipe(expectHttpError([409], handler)))

        expect(result).toBeInstanceOf(Error)
        expect(handler).toHaveBeenCalled()
    })
})
