import { HttpErrorResponse } from '@angular/common/http'
import { ResourceSnapshot, resourceFromSnapshots, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { PPW_RESOURCE_ERROR_EXTRACTOR } from '../error-handling/extractor'
import { PpwResourceExecution, PpwResourceExecutionOptions } from './ppw-resource-execution'
import { PpwResourceSource } from './ppw-resource-source'

type TestResult = string | undefined

interface FakeHttpResource<TValue> {
    resource: PpwResourceSource<TValue>
    reload: ReturnType<typeof vi.fn<() => boolean>>
    snapshot: ReturnType<typeof signal<ResourceSnapshot<TValue>>>
}

const createFakeHttpResource = <TValue>(initial: ResourceSnapshot<TValue>): FakeHttpResource<TValue> => {
    const snapshot = signal(initial)
    const reload = vi.fn(() => true)
    const resource = Object.assign(resourceFromSnapshots(snapshot), { reload })

    return { resource, reload, snapshot }
}

const idleSnapshot = (): ResourceSnapshot<TestResult> => ({ status: 'idle', value: undefined })
const loadingSnapshot = (value?: string): ResourceSnapshot<TestResult> => ({ status: 'loading', value })
const resolvedSnapshot = (value: string): ResourceSnapshot<TestResult> => ({ status: 'resolved', value })
const errorSnapshot = (error: Error): ResourceSnapshot<TestResult> => ({ status: 'error', error })

describe('PpwResourceExecution state', () => {
    let errorExtractor: ReturnType<typeof vi.fn<(error: HttpErrorResponse) => Error>>

    beforeEach(() => {
        vi.useFakeTimers()
        errorExtractor = vi.fn((error: HttpErrorResponse) => new Error(`Extracted ${error.status}`))

        TestBed.configureTestingModule({
            providers: [{ provide: PPW_RESOURCE_ERROR_EXTRACTOR, useValue: errorExtractor }]
        })
    })

    afterEach(() => {
        vi.runOnlyPendingTimers()
        vi.useRealTimers()
        TestBed.resetTestingModule()
    })

    const createExecution = (
        resource: PpwResourceSource<TestResult>,
        options?: Partial<PpwResourceExecutionOptions<TestResult>>
    ): PpwResourceExecution<TestResult> =>
        TestBed.runInInjectionContext(
            () =>
                new PpwResourceExecution(resource, {
                    isTrackingBody: false,
                    ...options
                })
        )

    it('should expose whether the execution is tracking the body', () => {
        const { resource } = createFakeHttpResource(idleSnapshot())

        const execution = createExecution(resource, { isTrackingBody: true })

        expect(execution.isTrackingBody).toBe(true)
    })

    it('should reload the underlying http resource', () => {
        const { resource, reload } = createFakeHttpResource(idleSnapshot())
        const execution = createExecution(resource)

        execution.reload()

        expect(reload).toHaveBeenCalledOnce()
    })

    it('should expose the wrapped resource status, loading state, resolved state, value and error', () => {
        const { resource, snapshot } = createFakeHttpResource(idleSnapshot())
        const execution = createExecution(resource)

        expect(execution.status()).toBe('idle')
        expect(execution.isLoading()).toBe(false)
        expect(execution.isResolved()).toBe(false)
        expect(execution.value()).toBeUndefined()
        expect(execution.error()).toBeUndefined()

        snapshot.set(loadingSnapshot())
        TestBed.tick()

        expect(execution.status()).toBe('loading')
        expect(execution.isLoading()).toBe(true)
        expect(execution.isResolved()).toBe(false)
        expect(execution.value()).toBeUndefined()

        snapshot.set(resolvedSnapshot('result'))
        TestBed.tick()

        expect(execution.status()).toBe('resolved')
        expect(execution.isLoading()).toBe(false)
        expect(execution.isResolved()).toBe(true)
        expect(execution.value()).toBe('result')

        const error = new Error('Failed')
        snapshot.set(errorSnapshot(error))
        TestBed.tick()

        expect(execution.status()).toBe('error')
        expect(execution.isResolved()).toBe(false)
        expect(execution.error()).toBe(error)
    })

    it('should allow the exposed value to be manually overwritten', () => {
        const { resource, snapshot } = createFakeHttpResource(resolvedSnapshot('resource value'))
        const execution = createExecution(resource)
        TestBed.tick()

        execution.value.set('manual value')

        expect(execution.value()).toBe('manual value')

        snapshot.set(resolvedSnapshot('next resource value'))
        TestBed.tick()

        expect(execution.value()).toBe('next resource value')
    })

    it('should call success callbacks in resource-success, resource-finally, execution-success, execution-finally order', () => {
        const { resource, snapshot } = createFakeHttpResource(idleSnapshot())
        const calls: Array<string> = []
        createExecution(resource, {
            resourceOnSuccess: (value) => calls.push(`resource success ${value}`),
            resourceOnFinally: () => calls.push('resource finally'),
            onSuccess: (value) => calls.push(`execution success ${value}`),
            onFinally: () => calls.push('execution finally')
        })

        snapshot.set(resolvedSnapshot('result'))
        TestBed.tick()

        expect(calls).toEqual([])

        vi.runOnlyPendingTimers()

        expect(calls).toEqual([
            'resource success result',
            'resource finally',
            'execution success result',
            'execution finally'
        ])
    })

    it('should call error callbacks in resource-error, resource-finally, execution-error, execution-finally order', () => {
        const { resource, snapshot } = createFakeHttpResource(idleSnapshot())
        const error = new Error('Failed')
        const calls: Array<string> = []
        createExecution(resource, {
            resourceOnError: (value) => calls.push(`resource error ${value.message}`),
            resourceOnFinally: () => calls.push('resource finally'),
            onError: (value) => calls.push(`execution error ${value.message}`),
            onFinally: () => calls.push('execution finally')
        })

        snapshot.set(errorSnapshot(error))
        TestBed.tick()

        expect(calls).toEqual([])

        vi.runOnlyPendingTimers()

        expect(calls).toEqual([
            'resource error Failed',
            'resource finally',
            'execution error Failed',
            'execution finally'
        ])
    })

    it('should not call lifecycle callbacks while status is idle or loading', () => {
        const { resource, snapshot } = createFakeHttpResource(idleSnapshot())
        const onSuccess = vi.fn<(value: Exclude<TestResult, undefined>) => void>()
        const onError = vi.fn<(error: Error) => void>()
        const onFinally = vi.fn<() => void>()
        createExecution(resource, { onSuccess, onError, onFinally })

        TestBed.tick()
        vi.runOnlyPendingTimers()

        snapshot.set(loadingSnapshot())
        TestBed.tick()
        vi.runOnlyPendingTimers()

        expect(onSuccess).not.toHaveBeenCalled()
        expect(onError).not.toHaveBeenCalled()
        expect(onFinally).not.toHaveBeenCalled()
    })

    it('should not fail when optional lifecycle callbacks are omitted', () => {
        const { resource, snapshot } = createFakeHttpResource(idleSnapshot())
        createExecution(resource)

        snapshot.set(resolvedSnapshot('result'))
        TestBed.tick()

        expect(() => vi.runOnlyPendingTimers()).not.toThrow()
    })

    it('should not rerun success callbacks when only the exposed value changes', () => {
        const { resource, snapshot } = createFakeHttpResource(idleSnapshot())
        const onSuccess = vi.fn<(value: Exclude<TestResult, undefined>) => void>()
        const execution = createExecution(resource, { onSuccess })

        snapshot.set(resolvedSnapshot('result'))
        TestBed.tick()
        vi.runOnlyPendingTimers()

        execution.value.set('manual value')
        TestBed.tick()
        vi.runOnlyPendingTimers()

        expect(onSuccess).toHaveBeenCalledTimes(1)
        expect(onSuccess).toHaveBeenCalledWith('result')
    })

    it('should not rerun error callbacks when only the error object changes without a status change', () => {
        const { resource, snapshot } = createFakeHttpResource(idleSnapshot())
        const onError = vi.fn<(error: Error) => void>()
        createExecution(resource, { onError })

        snapshot.set(errorSnapshot(new Error('First')))
        TestBed.tick()
        vi.runOnlyPendingTimers()

        snapshot.set(errorSnapshot(new Error('Second')))
        TestBed.tick()
        vi.runOnlyPendingTimers()

        expect(onError).toHaveBeenCalledTimes(1)
        expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: 'First' }))
    })

    it('should destroy the status effect after the first terminal state for non-tracking executions', () => {
        const { resource, snapshot } = createFakeHttpResource(idleSnapshot())
        const onSuccess = vi.fn<(value: Exclude<TestResult, undefined>) => void>()
        createExecution(resource, { isTrackingBody: false, onSuccess })

        snapshot.set(resolvedSnapshot('first'))
        TestBed.tick()
        vi.runOnlyPendingTimers()

        snapshot.set(loadingSnapshot())
        TestBed.tick()
        snapshot.set(resolvedSnapshot('second'))
        TestBed.tick()
        vi.runOnlyPendingTimers()

        expect(onSuccess).toHaveBeenCalledTimes(1)
        expect(onSuccess).toHaveBeenCalledWith('first')
    })

    it('should keep the status effect alive across repeated terminal states for tracking executions', () => {
        const { resource, snapshot } = createFakeHttpResource(idleSnapshot())
        const onSuccess = vi.fn<(value: Exclude<TestResult, undefined>) => void>()
        createExecution(resource, { isTrackingBody: true, onSuccess })

        snapshot.set(resolvedSnapshot('first'))
        TestBed.tick()
        vi.runOnlyPendingTimers()

        snapshot.set(loadingSnapshot())
        TestBed.tick()
        snapshot.set(resolvedSnapshot('second'))
        TestBed.tick()
        vi.runOnlyPendingTimers()

        expect(onSuccess).toHaveBeenCalledTimes(2)
        expect(onSuccess).toHaveBeenNthCalledWith(1, 'first')
        expect(onSuccess).toHaveBeenNthCalledWith(2, 'second')
    })

    it('should convert an HttpErrorResponse through PPW_RESOURCE_ERROR_EXTRACTOR before exposing the error', () => {
        const { resource, snapshot } = createFakeHttpResource(idleSnapshot())
        const extractedError = new Error('Extracted error')
        errorExtractor.mockReturnValue(extractedError)
        const execution = createExecution(resource)
        const httpError = new HttpErrorResponse({ status: 422, statusText: 'Unprocessable Entity' })

        TestBed.tick()
        snapshot.set(errorSnapshot(httpError))
        TestBed.tick()

        expect(errorExtractor).toHaveBeenCalledWith(httpError)
        expect(execution.error()).toBe(extractedError)
    })

    it('should pass the extracted error to resource-level and execution-level error handlers', () => {
        const { resource, snapshot } = createFakeHttpResource(idleSnapshot())
        const extractedError = new Error('Extracted error')
        errorExtractor.mockReturnValue(extractedError)
        const resourceOnError = vi.fn<(error: Error) => void>()
        const onError = vi.fn<(error: Error) => void>()
        createExecution(resource, { resourceOnError, onError })

        TestBed.tick()
        snapshot.set(errorSnapshot(new HttpErrorResponse({ status: 500 })))
        TestBed.tick()
        vi.runOnlyPendingTimers()

        expect(resourceOnError).toHaveBeenCalledWith(extractedError)
        expect(onError).toHaveBeenCalledWith(extractedError)
    })

    it('should leave non-HttpErrorResponse errors unchanged', () => {
        const { resource, snapshot } = createFakeHttpResource(idleSnapshot())
        const error = new Error('Domain error')
        const execution = createExecution(resource)

        snapshot.set(errorSnapshot(error))
        TestBed.tick()

        expect(errorExtractor).not.toHaveBeenCalled()
        expect(execution.error()).toBe(error)
    })

    it('should not re-extract an error when the previous snapshot was already an error', () => {
        const { resource, snapshot } = createFakeHttpResource(idleSnapshot())
        const execution = createExecution(resource)
        const firstHttpError = new HttpErrorResponse({ status: 400 })
        const secondHttpError = new HttpErrorResponse({ status: 401 })
        const extractedError = new Error('Extracted once')
        errorExtractor.mockReturnValue(extractedError)

        TestBed.tick()
        snapshot.set(errorSnapshot(firstHttpError))
        TestBed.tick()

        expect(execution.error()).toBe(extractedError)

        snapshot.set(errorSnapshot(secondHttpError))
        TestBed.tick()

        expect(errorExtractor).toHaveBeenCalledTimes(1)
        expect(execution.error()).toBe(secondHttpError)
    })

    describe('executeTogether', () => {
        it('should create executions lazily and start the group only when a factory returns an execution', () => {
            const { resource } = createFakeHttpResource(idleSnapshot())
            const calls: Array<string> = []
            const executionFactory = vi.fn(() => {
                calls.push('create first execution')

                return createExecution(resource)
            })
            const secondExecutionFactory = vi.fn(() => {
                calls.push('create second execution')

                return createExecution(createFakeHttpResource(idleSnapshot()).resource)
            })
            const skippedFactory = vi.fn(() => undefined)
            const onStart = vi.fn(() => calls.push('start group'))

            expect(executionFactory).not.toHaveBeenCalled()

            PpwResourceExecution.executeTogether([skippedFactory, executionFactory, secondExecutionFactory], {
                onStart
            })

            expect(skippedFactory).toHaveBeenCalledOnce()
            expect(executionFactory).toHaveBeenCalledOnce()
            expect(secondExecutionFactory).toHaveBeenCalledOnce()
            expect(onStart).toHaveBeenCalledOnce()
            expect(calls).toEqual(['create first execution', 'start group', 'create second execution'])
        })

        it('should not start a group when every factory is skipped', () => {
            const onStart = vi.fn()
            const onAllSuccess = vi.fn()
            const onAnyError = vi.fn()

            PpwResourceExecution.executeTogether([() => undefined], {
                onStart,
                onAllSuccess,
                onAnyError
            })

            expect(onStart).not.toHaveBeenCalled()
            expect(onAllSuccess).not.toHaveBeenCalled()
            expect(onAnyError).not.toHaveBeenCalled()
        })

        it('should report success only after every started execution succeeds', () => {
            const firstResource = createFakeHttpResource(idleSnapshot())
            const secondResource = createFakeHttpResource(idleSnapshot())
            const onAllSuccess = vi.fn()
            const onAnyError = vi.fn()

            PpwResourceExecution.executeTogether(
                [() => createExecution(firstResource.resource), () => createExecution(secondResource.resource)],
                { onAllSuccess, onAnyError }
            )

            firstResource.snapshot.set(resolvedSnapshot('first'))
            TestBed.tick()
            vi.runOnlyPendingTimers()

            expect(onAllSuccess).not.toHaveBeenCalled()
            expect(onAnyError).not.toHaveBeenCalled()

            secondResource.snapshot.set(resolvedSnapshot('second'))
            TestBed.tick()
            vi.runOnlyPendingTimers()

            expect(onAllSuccess).toHaveBeenCalledOnce()
            expect(onAnyError).not.toHaveBeenCalled()
        })

        it('should wait for every started execution before reporting an error', () => {
            const firstResource = createFakeHttpResource(idleSnapshot())
            const secondResource = createFakeHttpResource(idleSnapshot())
            const onAllSuccess = vi.fn()
            const onAnyError = vi.fn()

            PpwResourceExecution.executeTogether(
                [() => createExecution(firstResource.resource), () => createExecution(secondResource.resource)],
                { onAllSuccess, onAnyError }
            )

            firstResource.snapshot.set(errorSnapshot(new Error('Failed')))
            TestBed.tick()
            vi.runOnlyPendingTimers()

            expect(onAllSuccess).not.toHaveBeenCalled()
            expect(onAnyError).not.toHaveBeenCalled()

            secondResource.snapshot.set(resolvedSnapshot('second'))
            TestBed.tick()
            vi.runOnlyPendingTimers()

            expect(onAllSuccess).not.toHaveBeenCalled()
            expect(onAnyError).toHaveBeenCalledOnce()
        })

        it('should treat a business failure reported by a success handler as an aggregate error', () => {
            const { resource, snapshot } = createFakeHttpResource(idleSnapshot())
            const onAllSuccess = vi.fn()
            const onAnyError = vi.fn()

            PpwResourceExecution.executeTogether(
                [
                    ({ treatAsFailure }) =>
                        createExecution(resource, {
                            onSuccess: () => treatAsFailure()
                        })
                ],
                { onAllSuccess, onAnyError }
            )

            snapshot.set(resolvedSnapshot('incomplete result'))
            TestBed.tick()
            vi.runOnlyPendingTimers()

            expect(onAllSuccess).not.toHaveBeenCalled()
            expect(onAnyError).toHaveBeenCalledOnce()
        })
    })
})
