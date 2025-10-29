import {
    AsyncResult,
    createFailedAsyncResult,
    createSuccessAsyncResult,
    executeAsyncOperation,
    isAsyncResult
} from './async-result'
import { BehaviorSubject, Subject } from 'rxjs'

describe('AsyncResult', () => {
    it('should detect invalid async result models', () => {
        expect(isAsyncResult(null)).toBe(false)
        expect(isAsyncResult(undefined)).toBe(false)
        expect(isAsyncResult('')).toBe(false)
        expect(isAsyncResult(0)).toBe(false)
        expect(isAsyncResult({})).toBe(false)
        expect(isAsyncResult({ status: 'success' })).toBe(false)
    })

    it('should detect valid async result models', () => {
        expect(isAsyncResult({ status: 'success', entity: null })).toBe(true)
        expect(isAsyncResult({ status: 'success', entity: {} })).toBe(true)
        expect(isAsyncResult({ status: 'success', entity: {}, filters: null })).toBe(true)
        expect(isAsyncResult({ status: 'failed', error: new Error(), entity: null, filters: null })).toBe(true)
    })
})

describe('executeAsyncOperation', () => {
    it('should execute success handler on successful async operation', async () => {
        const operation$ = new Subject<AsyncResult<string>>()
        const isExecuting$ = new BehaviorSubject<boolean>(false)
        const onSuccess = jasmine.createSpy('onSuccess')
        const onError = jasmine.createSpy('onError')
        const operationValue = createSuccessAsyncResult('operation result')

        const promise = executeAsyncOperation(
            operation$,
            {
                success: onSuccess,
                error: onError
            },
            isExecuting$
        )

        expect(isExecuting$.value).toBeTrue()
        operation$.next(operationValue)
        await promise

        expect(isExecuting$.value).toBeFalse()
        expect(onSuccess).toHaveBeenCalledWith(operationValue)
        expect(onError).not.toHaveBeenCalled()
    })

    it('should execute error handler on failed async operation', async () => {
        const operation$ = new Subject<AsyncResult<string>>()
        const isExecuting$ = new BehaviorSubject<boolean>(false)
        const onSuccess = jasmine.createSpy('onSuccess')
        const onError = jasmine.createSpy('onError')

        const operationValue: AsyncResult<string> = createFailedAsyncResult(new Error('operation failed'), 'it failed')

        const promise = executeAsyncOperation(
            operation$,
            {
                success: onSuccess,
                error: onError
            },
            isExecuting$
        )

        expect(isExecuting$.value).toBeTrue()
        operation$.next(operationValue)
        await promise

        expect(isExecuting$.value).toBeFalse()
        expect(onError).toHaveBeenCalledWith(operationValue)
        expect(onSuccess).not.toHaveBeenCalled()
    })
})
