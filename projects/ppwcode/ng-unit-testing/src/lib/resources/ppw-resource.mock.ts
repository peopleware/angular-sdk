import { HttpErrorResponse } from '@angular/common/http'
import {
    Injector,
    resourceFromSnapshots,
    ResourceSnapshot,
    runInInjectionContext,
    signal,
    WritableSignal
} from '@angular/core'
import { TestBed } from '@angular/core/testing'
import {
    PPW_RESOURCE_DEFAULT_ERROR_HANDLER,
    PPW_RESOURCE_ERROR_EXTRACTOR,
    PpwResource,
    PpwResourceExecution,
    PpwResourceExecutionHandling,
    PpwResourceSource
} from '@ppwcode/ng-resource'

export type PpwResourceMockResult<TResult> = TResult | undefined

/**
 * Metadata for a single PpwResource execution created through a PpwResourceMock.
 */
export interface PpwResourceMockExecution<TBody, TResult> {
    /** Function passed to the underlying ResourceRef factory. Execute calls expose a stable value function. */
    body: () => TBody
    /** Whether this execution was created through PpwResource.track instead of PpwResource.execute. */
    isTrackingBody: boolean
    /** Number of times reload was called on the fake ResourceRef backing this execution. */
    reloadCount: number
    /** Fake reloadable Resource backing the real PpwResourceExecution for this call. */
    resourceRef: PpwResourceSource<PpwResourceMockResult<TResult>>
}

interface PpwResourceMockController<TBody, TResult> extends PpwResourceMockExecution<TBody, TResult> {
    snapshot: WritableSignal<ResourceSnapshot<PpwResourceMockResult<TResult>>>
}

const idleSnapshot = <TResult>(): ResourceSnapshot<PpwResourceMockResult<TResult>> => ({
    status: 'idle',
    value: undefined
})

const loadingSnapshot = <TResult>(
    value?: PpwResourceMockResult<TResult>
): ResourceSnapshot<PpwResourceMockResult<TResult>> => ({
    status: 'loading',
    value
})

const resolvedSnapshot = <TResult>(
    value: PpwResourceMockResult<TResult>
): ResourceSnapshot<PpwResourceMockResult<TResult>> => ({
    status: 'resolved',
    value
})

const errorSnapshot = <TResult>(error: Error): ResourceSnapshot<PpwResourceMockResult<TResult>> => ({
    status: 'error',
    error
})

/**
 * Test-library agnostic controller for a PpwResource.
 *
 * The exposed resource is a real PpwResource backed by signal-driven ResourceRef instances. Tests can return it
 * from mocked facades or services, then drive each execution through loading, success, or error states manually.
 *
 * The helper intentionally avoids Vitest, Jasmine, Karma, or spy APIs. It only depends on Angular's testing runtime
 * because the wrapped PpwResource creates Angular effects internally.
 *
 * @example
 * ```ts
 * const loginResourceMock = PpwResourceMock.create<LoginEntity, LoginResponseEntity>(loginResponse)
 * authFacade.login = () => loginResourceMock.resource
 *
 * component.submit(loginEntity)
 * await loginResourceMock.flushSuccess()
 * ```
 */
export class PpwResourceMock<TBody, TResult> {
    readonly #resolveValue?: TResult | HttpErrorResponse
    readonly #controllers: Array<PpwResourceMockController<TBody, TResult>> = []
    #isCreatingTrackingExecution = false

    /** Real PpwResource instance to return from mocked facades or services. */
    public readonly resource: PpwResource<PpwResourceMockResult<TResult>, TBody>

    public constructor(resolveValue?: TResult | HttpErrorResponse) {
        this.#resolveValue = resolveValue

        const injector = Injector.create({
            providers: [
                { provide: PPW_RESOURCE_DEFAULT_ERROR_HANDLER, useValue: () => undefined },
                { provide: PPW_RESOURCE_ERROR_EXTRACTOR, useValue: (error: HttpErrorResponse) => error }
            ],
            parent: TestBed.inject(Injector)
        })

        this.resource = runInInjectionContext(injector, () =>
            PpwResource.fromHttpResource<PpwResourceMockResult<TResult>, TBody>((body) => this.#createResourceRef(body))
        )
        this.#captureExecutionKind()
    }

    /**
     * Executions created so far, in call order.
     *
     * Use this to inspect which body was passed to execute or track, or to select a specific execution index when
     * flushing parallel operations.
     */
    public get executions(): Array<PpwResourceMockExecution<TBody, TResult>> {
        return this.#controllers.map(({ body, resourceRef, isTrackingBody, reloadCount }) => ({
            body,
            resourceRef,
            isTrackingBody,
            reloadCount
        }))
    }

    /**
     * Moves the selected execution to loading.
     *
     * Defaults to the latest execution. Pass an index when testing parallel calls.
     */
    public startLoading(index = this.#latestExecutionIndex()): this {
        const controller = this.#getController(index)
        controller.snapshot.set(loadingSnapshot(controller.resourceRef.value()))

        return this
    }

    /**
     * Resolves the selected execution and waits for PpwResource's deferred lifecycle handlers.
     *
     * When no value is provided, the value passed to create or the constructor is used.
     */
    public async flushSuccess(value?: TResult, index = this.#latestExecutionIndex()): Promise<this> {
        this.#getController(index).snapshot.set(resolvedSnapshot(value ?? this.#successValue()))
        TestBed.tick()
        await waitForPpwResourceHandlers()

        return this
    }

    /**
     * Errors the selected execution and waits for PpwResource's deferred lifecycle handlers.
     *
     * When no error is provided, an HttpErrorResponse passed to create or the constructor is used. Otherwise a default
     * Error is emitted.
     */
    public async flushError(error?: Error, index = this.#latestExecutionIndex()): Promise<this> {
        this.#getController(index).snapshot.set(errorSnapshot(error ?? this.#errorValue()))
        TestBed.tick()
        await waitForPpwResourceHandlers()

        return this
    }

    /**
     * Flushes the selected execution using the constructor value.
     *
     * HttpErrorResponse values become error states. All other values become success states.
     */
    public async flush(index = this.#latestExecutionIndex()): Promise<this> {
        if (this.#resolveValue instanceof HttpErrorResponse) {
            return this.flushError(this.#resolveValue, index)
        }

        return this.flushSuccess(this.#successValue(), index)
    }

    #createResourceRef(body: () => TBody): PpwResourceSource<PpwResourceMockResult<TResult>> {
        const snapshot = signal<ResourceSnapshot<PpwResourceMockResult<TResult>>>(idleSnapshot())
        const resourceRef = Object.assign(resourceFromSnapshots(snapshot), {
            reload: () => {
                controller.reloadCount += 1

                return true
            }
        })
        const controller: PpwResourceMockController<TBody, TResult> = {
            body,
            snapshot,
            resourceRef,
            reloadCount: 0,
            isTrackingBody: this.#isCreatingTrackingExecution
        }

        this.#controllers.push(controller)

        return resourceRef
    }

    #captureExecutionKind(): void {
        const execute = this.resource.execute.bind(this.resource)
        const track = this.resource.track.bind(this.resource)

        this.resource.execute = (
            body: TBody,
            handling?: PpwResourceExecutionHandling<PpwResourceMockResult<TResult>>
        ): PpwResourceExecution<PpwResourceMockResult<TResult>> => {
            this.#isCreatingTrackingExecution = false

            return execute(body, handling)
        }

        this.resource.track = (
            body: () => TBody,
            handling: PpwResourceExecutionHandling<PpwResourceMockResult<TResult>>
        ): PpwResourceExecution<PpwResourceMockResult<TResult>> => {
            this.#isCreatingTrackingExecution = true

            try {
                return track(body, handling)
            } finally {
                this.#isCreatingTrackingExecution = false
            }
        }
    }

    #getController(index: number): PpwResourceMockController<TBody, TResult> {
        const controller = this.#controllers[index]

        if (!controller) {
            throw new Error(`No PpwResourceMock execution exists at index ${index}.`)
        }

        return controller
    }

    #latestExecutionIndex(): number {
        return this.#controllers.length - 1
    }

    #successValue(): PpwResourceMockResult<TResult> {
        if (this.#resolveValue instanceof HttpErrorResponse) {
            return undefined
        }

        return this.#resolveValue
    }

    #errorValue(): Error {
        return this.#resolveValue instanceof HttpErrorResponse ? this.#resolveValue : new Error('PpwResourceMock error')
    }

    /**
     * Creates a PpwResourceMock with an optional default success value or HttpErrorResponse.
     */
    public static create<TBody, TResult>(resolveValue?: TResult | HttpErrorResponse): PpwResourceMock<TBody, TResult> {
        return new PpwResourceMock<TBody, TResult>(resolveValue)
    }
}

const waitForPpwResourceHandlers = (): Promise<void> => new Promise((resolve) => setTimeout(resolve))
