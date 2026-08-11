import { HttpErrorResponse } from '@angular/common/http'
import { InjectionToken, ResourceSnapshot, inject, resourceFromSnapshots, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { PPW_RESOURCE_ERROR_EXTRACTOR } from '../error-handling/extractor'
import { PPW_RESOURCE_DEFAULT_ERROR_HANDLER } from '../error-handling/handler'
import { PpwResource } from './ppw-resource'
import { PpwResourceSource } from './ppw-resource-source'

type TestBody = { id: number }
type TestResult = string | undefined

interface FakeHttpResource<TValue> {
    resource: PpwResourceSource<TValue>
    snapshot: ReturnType<typeof signal<ResourceSnapshot<TValue>>>
}

const createFakeHttpResource = <TValue>(initial: ResourceSnapshot<TValue>): FakeHttpResource<TValue> => {
    const snapshot = signal(initial)
    const resource = Object.assign(resourceFromSnapshots(snapshot), { reload: () => true })

    return { resource, snapshot }
}

const idleSnapshot = (): ResourceSnapshot<TestResult> => ({ status: 'idle', value: undefined })
const loadingSnapshot = (): ResourceSnapshot<TestResult> => ({ status: 'loading', value: undefined })
const resolvedSnapshot = (value: string): ResourceSnapshot<TestResult> => ({ status: 'resolved', value })
const errorSnapshot = (error: Error): ResourceSnapshot<TestResult> => ({ status: 'error', error })

describe('PpwResource.fromHttpResource', () => {
    let defaultOnError: ReturnType<typeof vi.fn<(error: Error) => void>>
    let controllers: Array<FakeHttpResource<TestResult>>
    let bodyFunctions: Array<() => TestBody>

    beforeEach(() => {
        vi.useFakeTimers()
        defaultOnError = vi.fn()
        controllers = []
        bodyFunctions = []

        TestBed.configureTestingModule({
            providers: [
                { provide: PPW_RESOURCE_DEFAULT_ERROR_HANDLER, useValue: defaultOnError },
                {
                    provide: PPW_RESOURCE_ERROR_EXTRACTOR,
                    useValue: (error: HttpErrorResponse): Error => new Error(`Extracted ${error.status}`)
                }
            ]
        })
    })

    afterEach(() => {
        vi.runOnlyPendingTimers()
        vi.useRealTimers()
        TestBed.resetTestingModule()
    })

    const createResourceFactory = (
        initialSnapshot: () => ResourceSnapshot<TestResult> = idleSnapshot
    ): ((body: () => TestBody) => PpwResourceSource<TestResult>) =>
        vi.fn((body: () => TestBody) => {
            bodyFunctions.push(body)
            const controller = createFakeHttpResource(initialSnapshot())
            controllers.push(controller)

            return controller.resource
        })

    const flushStatusChange = (): void => {
        TestBed.tick()
        vi.runOnlyPendingTimers()
    }

    it('should create a PpwResource from a resource factory function', () => {
        const resourceFactory = createResourceFactory()
        const resource = TestBed.runInInjectionContext(() =>
            PpwResource.fromHttpResource<TestResult, TestBody>(resourceFactory)
        )

        resource.execute({ id: 1 })

        expect(resourceFactory).toHaveBeenCalledTimes(1)
    })

    it('should create a PpwResource from an options object', () => {
        const resourceFactory = createResourceFactory()
        const onSuccess = vi.fn<(value: Exclude<TestResult, undefined>) => void>()
        const resource = TestBed.runInInjectionContext(() =>
            PpwResource.fromHttpResource<TestResult, TestBody>({
                resourceFactory,
                onSuccess
            })
        )

        resource.execute({ id: 1 })
        controllers[0].snapshot.set(resolvedSnapshot('result'))
        flushStatusChange()

        expect(resourceFactory).toHaveBeenCalledTimes(1)
        expect(onSuccess).toHaveBeenCalledWith('result')
    })

    it('should create a new execution for the provided body value', () => {
        const resourceFactory = createResourceFactory()
        const resource = TestBed.runInInjectionContext(() =>
            PpwResource.fromHttpResource<TestResult, TestBody>(resourceFactory)
        )
        const body = { id: 1 }

        const execution = resource.execute(body)

        expect(execution.isTrackingBody).toBe(false)
        expect(bodyFunctions[0]()).toBe(body)
    })

    it('should pass a stable body function to the resource factory', () => {
        const resourceFactory = createResourceFactory()
        const resource = TestBed.runInInjectionContext(() =>
            PpwResource.fromHttpResource<TestResult, TestBody>(resourceFactory)
        )
        let body = { id: 1 }

        resource.execute(body)
        body = { id: 2 }

        expect(bodyFunctions[0]()).toEqual({ id: 1 })
        expect(bodyFunctions[0]()).not.toBe(body)
    })

    it('should create a fresh resource for every execute call', () => {
        const resourceFactory = createResourceFactory()
        const resource = TestBed.runInInjectionContext(() =>
            PpwResource.fromHttpResource<TestResult, TestBody>(resourceFactory)
        )

        const firstExecution = resource.execute({ id: 1 })
        const secondExecution = resource.execute({ id: 2 })

        expect(resourceFactory).toHaveBeenCalledTimes(2)
        expect(controllers).toHaveLength(2)
        expect(firstExecution).not.toBe(secondExecution)
    })

    it('should run the resource factory inside the captured injection context for execute', () => {
        const token = new InjectionToken<string>('test token')
        TestBed.resetTestingModule()
        TestBed.configureTestingModule({
            providers: [
                { provide: PPW_RESOURCE_DEFAULT_ERROR_HANDLER, useValue: defaultOnError },
                { provide: PPW_RESOURCE_ERROR_EXTRACTOR, useValue: (error: HttpErrorResponse): Error => error },
                { provide: token, useValue: 'from injector' }
            ]
        })
        const resourceFactory = vi.fn(() => {
            expect(inject(token)).toBe('from injector')
            const controller = createFakeHttpResource(idleSnapshot())
            controllers.push(controller)

            return controller.resource
        })
        const resource = TestBed.runInInjectionContext(() =>
            PpwResource.fromHttpResource<TestResult, TestBody>(resourceFactory)
        )

        resource.execute({ id: 1 })

        expect(resourceFactory).toHaveBeenCalledTimes(1)
    })

    it('should use the default error handler when no execution error handler is provided', () => {
        const resourceFactory = createResourceFactory()
        const resource = TestBed.runInInjectionContext(() =>
            PpwResource.fromHttpResource<TestResult, TestBody>(resourceFactory)
        )
        const error = new Error('Failed')

        resource.execute({ id: 1 })
        controllers[0].snapshot.set(errorSnapshot(error))
        flushStatusChange()

        expect(defaultOnError).toHaveBeenCalledWith(error)
    })

    it('should use the execution error handler instead of the default error handler when provided', () => {
        const resourceFactory = createResourceFactory()
        const resource = TestBed.runInInjectionContext(() =>
            PpwResource.fromHttpResource<TestResult, TestBody>(resourceFactory)
        )
        const onError = vi.fn<(error: Error) => void>()
        const error = new Error('Failed')

        resource.execute({ id: 1 }, { onError })
        controllers[0].snapshot.set(errorSnapshot(error))
        flushStatusChange()

        expect(onError).toHaveBeenCalledWith(error)
        expect(defaultOnError).not.toHaveBeenCalled()
    })

    it('should create a tracking execution for the provided body function', () => {
        const resourceFactory = createResourceFactory()
        const resource = TestBed.runInInjectionContext(() =>
            PpwResource.fromHttpResource<TestResult, TestBody>(resourceFactory)
        )
        const body = signal({ id: 1 })

        const execution = resource.track(() => body(), {})

        expect(execution.isTrackingBody).toBe(true)
        expect(bodyFunctions[0]()).toEqual({ id: 1 })

        body.set({ id: 2 })

        expect(bodyFunctions[0]()).toEqual({ id: 2 })
    })

    it('should run the resource factory inside the captured injection context for track', () => {
        const token = new InjectionToken<string>('test token')
        TestBed.resetTestingModule()
        TestBed.configureTestingModule({
            providers: [
                { provide: PPW_RESOURCE_DEFAULT_ERROR_HANDLER, useValue: defaultOnError },
                { provide: PPW_RESOURCE_ERROR_EXTRACTOR, useValue: (error: HttpErrorResponse): Error => error },
                { provide: token, useValue: 'from injector' }
            ]
        })
        const resourceFactory = vi.fn(() => {
            expect(inject(token)).toBe('from injector')
            const controller = createFakeHttpResource(idleSnapshot())
            controllers.push(controller)

            return controller.resource
        })
        const resource = TestBed.runInInjectionContext(() =>
            PpwResource.fromHttpResource<TestResult, TestBody>(resourceFactory)
        )

        resource.track(() => ({ id: 1 }), {})

        expect(resourceFactory).toHaveBeenCalledTimes(1)
    })

    it('should invoke resource-level success hooks before execution-level success hooks', () => {
        const resourceFactory = createResourceFactory()
        const calls: Array<string> = []
        const resource = TestBed.runInInjectionContext(() =>
            PpwResource.fromHttpResource<TestResult, TestBody>({
                resourceFactory,
                onSuccess: (value) => calls.push(`resource success ${value}`),
                onFinally: () => calls.push('resource finally')
            })
        )

        resource.execute(
            { id: 1 },
            {
                onSuccess: (value) => calls.push(`execution success ${value}`),
                onFinally: () => calls.push('execution finally')
            }
        )
        controllers[0].snapshot.set(resolvedSnapshot('result'))
        flushStatusChange()

        expect(calls).toEqual([
            'resource success result',
            'resource finally',
            'execution success result',
            'execution finally'
        ])
    })

    it('should invoke resource-level error hooks before execution-level error hooks', () => {
        const resourceFactory = createResourceFactory()
        const calls: Array<string> = []
        const resource = TestBed.runInInjectionContext(() =>
            PpwResource.fromHttpResource<TestResult, TestBody>({
                resourceFactory,
                onError: (error) => calls.push(`resource error ${error.message}`),
                onFinally: () => calls.push('resource finally')
            })
        )

        resource.execute(
            { id: 1 },
            {
                onError: (error) => calls.push(`execution error ${error.message}`),
                onFinally: () => calls.push('execution finally')
            }
        )
        controllers[0].snapshot.set(errorSnapshot(new Error('Failed')))
        flushStatusChange()

        expect(calls).toEqual([
            'resource error Failed',
            'resource finally',
            'execution error Failed',
            'execution finally'
        ])
    })

    it('should call execution finally after removing the execution from active executions', () => {
        const resourceFactory = createResourceFactory(loadingSnapshot)
        const resource = TestBed.runInInjectionContext(() =>
            PpwResource.fromHttpResource<TestResult, TestBody>(resourceFactory)
        )
        let isAnyLoadingDuringFinally: boolean | undefined

        resource.execute(
            { id: 1 },
            {
                onFinally: () => {
                    isAnyLoadingDuringFinally = resource.isAnyLoading()
                }
            }
        )

        expect(resource.isAnyLoading()).toBe(true)

        controllers[0].snapshot.set(resolvedSnapshot('result'))
        flushStatusChange()

        expect(isAnyLoadingDuringFinally).toBe(false)
    })

    it('should be false before any execution starts', () => {
        const resourceFactory = createResourceFactory(loadingSnapshot)
        const resource = TestBed.runInInjectionContext(() =>
            PpwResource.fromHttpResource<TestResult, TestBody>(resourceFactory)
        )

        expect(resource.isAnyLoading()).toBe(false)
    })

    it('should become true when an execution is loading and false after it finishes', () => {
        const resourceFactory = createResourceFactory(loadingSnapshot)
        const resource = TestBed.runInInjectionContext(() =>
            PpwResource.fromHttpResource<TestResult, TestBody>(resourceFactory)
        )

        resource.execute({ id: 1 })

        expect(resource.isAnyLoading()).toBe(true)

        controllers[0].snapshot.set(resolvedSnapshot('result'))
        flushStatusChange()

        expect(resource.isAnyLoading()).toBe(false)
    })

    it('should stay true while at least one parallel execution is still loading', () => {
        const resourceFactory = createResourceFactory(loadingSnapshot)
        const resource = TestBed.runInInjectionContext(() =>
            PpwResource.fromHttpResource<TestResult, TestBody>(resourceFactory)
        )

        resource.execute({ id: 1 })
        resource.execute({ id: 2 })

        expect(resource.isAnyLoading()).toBe(true)

        controllers[0].snapshot.set(resolvedSnapshot('first'))
        flushStatusChange()

        expect(resource.isAnyLoading()).toBe(true)

        controllers[1].snapshot.set(resolvedSnapshot('second'))
        flushStatusChange()

        expect(resource.isAnyLoading()).toBe(false)
    })
})
