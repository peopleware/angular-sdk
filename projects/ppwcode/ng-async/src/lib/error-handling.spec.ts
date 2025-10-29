import { HttpErrorResponse } from '@angular/common/http'
import { firstValueFrom, of, throwError } from 'rxjs'
import { expectHttpError, extractHttpError } from './error-handling'

const constructErrorResponse = (status: number, error: unknown = null, statusText: string = ''): HttpErrorResponse => {
    return new HttpErrorResponse({
        status,
        error,
        statusText
    })
}

describe('extractHttpError', () => {
    it('should run the global extractor when defined', () => {
        window.ppwcodeHttpErrorExtractor = jasmine.createSpy('ppwcodeHttpErrorExtractor')

        const httpError = constructErrorResponse(400)
        extractHttpError(httpError)

        expect(window.ppwcodeHttpErrorExtractor).toHaveBeenCalledWith(httpError)

        window.ppwcodeHttpErrorExtractor = undefined
    })

    it('should not run the global extractor when skipCustomExtractor is true', () => {
        window.ppwcodeHttpErrorExtractor = jasmine.createSpy('ppwcodeHttpErrorExtractor')

        const httpError = constructErrorResponse(400)
        extractHttpError(httpError, true)

        expect(window.ppwcodeHttpErrorExtractor).not.toHaveBeenCalled()

        window.ppwcodeHttpErrorExtractor = undefined
    })

    it('should extract error from errors key', () => {
        const httpError = constructErrorResponse(400, {
            errors: {
                field1: 'Error message for field 1',
                field2: 'Error message for field 2'
            }
        })

        const error = extractHttpError(httpError)
        expect(error.message).toBe('Error message for field 1')
    })

    it('should extract error from messages array', () => {
        const httpError = constructErrorResponse(400, {
            messages: [
                { text: 'First error message', code: 'ERR001' },
                { text: 'Second error message', code: 'ERR002' }
            ]
        })

        const error = extractHttpError(httpError)
        expect(error.message).toBe('First error message')
    })

    it('should extract error from messages array when text is undefined', () => {
        const httpError = constructErrorResponse(400, {
            messages: [{ code: 'ERR001' }, { text: 'Second error message', code: 'ERR002' }]
        })

        const error = extractHttpError(httpError)
        expect(error.message).toBe('ERR001')
    })

    it('should extract DB_UQ_CONSTRAINT_VIOLATION error message', () => {
        const httpError = constructErrorResponse(400, {
            messages: [{ text: 'DB_UQ_CONSTRAINT_VIOLATION', parameters: ['UQ_USER_EMAIL', 'other_param'] }]
        })

        const error = extractHttpError(httpError)
        expect(error.message).toBe('UQ_USER_EMAIL')
    })

    it('should extract DB_UQ_CONSTRAINT_VIOLATION error message without UQ parameter', () => {
        const httpError = constructErrorResponse(400, {
            messages: [{ text: 'DB_UQ_CONSTRAINT_VIOLATION', parameters: ['other_param'] }]
        })

        const error = extractHttpError(httpError)
        expect(error.message).toBe('DB_UQ_CONSTRAINT_VIOLATION')
    })

    it('should extract title from error object', () => {
        const httpError = constructErrorResponse(400, { title: 'Error Title' })

        const error = extractHttpError(httpError)
        expect(error.message).toBe('Error Title')
    })

    it('should extract generic error message string', () => {
        const httpError = constructErrorResponse(400, 'A generic error message')

        const error = extractHttpError(httpError)
        expect(error.message).toBe('A generic error message')
    })

    it('should extract generic error based on status', () => {
        const httpError = constructErrorResponse(414)

        const error = extractHttpError(httpError)
        expect(error.message).toBe('URI Too Long')
    })

    it('should extract generic error based on statusText when status code is unknown', () => {
        const httpError = constructErrorResponse(999, null, 'Unknown Status')

        const error = extractHttpError(httpError)
        expect(error.message).toBe('Unknown Status')
    })
})

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
