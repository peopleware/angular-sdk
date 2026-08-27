import { HttpErrorResponse } from '@angular/common/http'
import {
    computed,
    effect,
    EffectRef,
    inject,
    Injector,
    linkedSignal,
    Resource,
    resourceFromSnapshots,
    ResourceSnapshot,
    runInInjectionContext,
    untracked
} from '@angular/core'
import { notUndefined } from '@ppwcode/ng-utils'
import { PPW_RESOURCE_ERROR_EXTRACTOR } from '../error-handling/extractor'
import {
    PpwResourceErrorHandler,
    PpwResourceFinallyHandler,
    PpwResourceSuccessHandler
} from '../error-handling/handler'
import { PpwResourceSource } from './ppw-resource-source'

export interface PpwResourceExecutionHandling<TResult> {
    onSuccess?: PpwResourceSuccessHandler<TResult>
    onError?: PpwResourceErrorHandler
    onFinally?: PpwResourceFinallyHandler
}

/**
 * Internal options used to configure a single execution of a PpwResource.
 *
 * PpwResourceExecutionHandling contains the hooks supplied by the consumer that starts an execution. The extra
 * resourceOn... hooks are the hooks configured on the PpwResource definition itself. Keeping both sets of hooks here
 * lets the execution be the one place that owns callback ordering:
 * 1. PpwResource onSuccess or onError
 * 2. PpwResource onFinally
 * 3. PpwResourceExecution onSuccess or onError
 * 4. PpwResourceExecution onFinally
 *
 * isTrackingBody distinguishes executions created by PpwResource.track from executions created by PpwResource.execute.
 * Tracking executions keep listening to the underlying resource because the request body can change and trigger new
 * resource states. Non-tracking executions are one-shot operations, so their effect can be destroyed after the first
 * terminal state.
 */
export interface PpwResourceExecutionOptions<TResult> extends PpwResourceExecutionHandling<TResult> {
    isTrackingBody: boolean
    resourceOnSuccess?: PpwResourceSuccessHandler<TResult>
    resourceOnError?: PpwResourceErrorHandler
    resourceOnFinally?: PpwResourceFinallyHandler
}

/**
 * A PpwResourceExecution represents one concrete run of a PpwResource. Where PpwResource is the reusable API
 * definition, PpwResourceExecution is the stateful object that exposes the result, loading state, error state and
 * lifecycle callbacks for a single reloadable Resource instance.
 *
 * This wrapper intentionally does a bit more than pass through Angular's ResourceRef:
 * - It exposes a writable linked value so feature code can optimistically or manually adjust the current result.
 * - It keeps the previous resolved value visible while a tracked resource reloads.
 * - It converts HttpErrorResponse instances to the application error shape before exposing them.
 * - It centralizes callback execution so resource-level hooks always run before execution-level hooks.
 * - It tears down one-shot executions after success or failure, while tracked executions remain active for later body
 *   changes and reloads.
 *
 * The class is intended to be created by PpwResource rather than directly by feature code. PpwResource creates each
 * execution inside the right injection context and supplies the shared resource hooks and default error handling.
 */
export class PpwResourceExecution<TResult> {
    // Keep the injector from the construction context so status handling can enter the same Angular context later.
    // The execution can outlive the method that started it, but its effects and handlers still belong to this Angular
    // object graph.
    readonly #injector = inject(Injector)

    // Reference to the underlying reloadable Resource. This retains the reload API that would otherwise get lost when
    // using the base Resource contract.
    readonly #sourceResource: PpwResourceSource<TResult>

    // The wrapped resource is typed as the generic Resource interface because withPreviousValue returns a derived
    // Resource created from snapshots. Consumers should not need ResourceRef mutation APIs here; execution exposes only
    // the state that is meaningful to the wrapper.
    readonly #resourceRef: Resource<TResult>

    // Store the complete lifecycle configuration for this execution. This includes both resource-level hooks and
    // execution-level hooks so #handleStatusChanges can enforce a single callback order.
    readonly #options: PpwResourceExecutionOptions<TResult>

    // One-shot observers registered by executeTogether. They run after the regular resource and execution callbacks,
    // allowing an execution-level onSuccess callback to classify an incomplete business result before the group
    // determines its aggregate outcome.
    readonly #completionHandlers = new Set<(hasFailed: boolean) => void>()

    /**
     * Indicates whether this execution should keep reacting to body changes.
     *
     * Tracking executions are read-style flows such as "reload when the route id changes". Non-tracking executions are
     * write-style flows such as "submit this form once". The distinction controls whether the status effect is kept
     * alive after the first terminal state.
     */
    public get isTrackingBody(): boolean {
        return this.#options.isTrackingBody
    }

    /**
     * Creates a PpwResourceExecution around one reloadable Angular Resource.
     *
     * The resource is wrapped immediately, so all public state reads go through the same semantics:
     * previous values survive reloads and HttpErrorResponse instances are converted through the configured extractor.
     * Status handling starts during construction because Angular effects must be created while an injection context is
     * available.
     */
    public constructor(resource: PpwResourceSource<TResult>, options: PpwResourceExecutionOptions<TResult>) {
        this.#sourceResource = resource
        this.#resourceRef = withPreviousValue(this.#sourceResource)
        this.#options = options

        this.#handleStatusChanges()
    }

    /**
     * The value returned by the loader.
     *
     * This is a linkedSignal instead of a computed signal on purpose. Consumers can set the value manually, for example
     * to apply an optimistic update or to adapt the result after a successful child operation. Whenever the underlying
     * resource resolves again, the linkedSignal computation runs again and the resource value becomes authoritative.
     */
    public readonly value = linkedSignal(() => this.#resourceRef.value())

    /** Whether the underlying resource is currently loading. */
    public readonly isLoading = computed(() => this.#resourceRef.isLoading())

    /**
     * Gets the error of loading the resource.
     *
     * When the original resource failed with an HttpErrorResponse, this value has already been converted by
     * withPreviousValue through PPW_RESOURCE_ERROR_EXTRACTOR.
     */
    public readonly error = computed(() => this.#resourceRef.error())

    /** Gets the status of the resource after the wrapper snapshot semantics have been applied. */
    public readonly status = computed(() => this.#resourceRef.status())

    /** Returns true if the resource has status resolved. */
    public readonly isResolved = computed(() => this.status() === 'resolved')

    /** Reloads the underlying resource. Executes the last call again. */
    public reload(): void {
        this.#sourceResource.reload()
    }

    /**
     * Registers a one-shot observer for the terminal result of this execution.
     *
     * Completion observers run after the configured lifecycle callbacks. This allows an onSuccess callback to classify
     * a technically successful response as a business failure before an execution group determines its final result.
     */
    public onComplete(handler: (hasFailed: boolean) => void): void {
        this.#completionHandlers.add(handler)
    }

    /**
     * Converts the current operation into a Promise that resolves or rejects
     * based on the operation's completion state.
     *
     * @return {Promise<TResult>} A Promise that resolves with the result of
     * the operation if successful, or rejects with the error if it fails.
     */
    public toPromise(): Promise<TResult> {
        // Start by instantiating a new Promise to be returned at the end, so we can capture the resolve and reject callbacks.
        let resolve: (value: TResult) => void
        let reject: (reason?: unknown) => void

        const promise = new Promise<TResult>((res, rej) => {
            resolve = res
            reject = rej
        })

        // Register a completion handler that will be triggered when the resource state changes to resolved or error.
        // This handler will be invoked with a boolean indicating whether the call was successful, allowing us to
        // invoke the captured resolve or reject Promise callbacks with either the resource value or error.
        this.#completionHandlers.add((hasFailed) => {
            if (hasFailed) {
                reject(this.error())
            } else {
                resolve(this.value())
            }
        })

        return promise
    }

    /**
     * Starts a set of optional executions and reports their aggregate result.
     *
     * Factories are invoked inside this method so no request starts before the group lifecycle begins. A factory can
     * return undefined when its state slice has no changes. The group completes only after every started execution has
     * reached a terminal state.
     */
    public static executeTogether(
        factories: ReadonlyArray<
            (context: { treatAsFailure: () => void }) =>
                | {
                      onComplete: (handler: (hasFailed: boolean) => void) => void
                  }
                | undefined
        >,
        handling: {
            onStart?: () => void
            onAllSuccess?: () => void
            onAnyError?: () => void
        } = {}
    ): void {
        let executionCount = 0
        const completionResults: Array<boolean> = []

        for (const factory of factories) {
            let isTreatedAsFailure = false
            const execution = factory({
                treatAsFailure: () => {
                    isTreatedAsFailure = true
                }
            })

            if (!execution) {
                continue
            }

            executionCount += 1
            if (executionCount === 1) {
                handling.onStart?.()
            }
            execution.onComplete((hasFailed) => {
                completionResults.push(hasFailed || isTreatedAsFailure)

                if (completionResults.length !== executionCount) {
                    return
                }

                if (completionResults.some((executionFailed) => executionFailed)) {
                    handling.onAnyError?.()
                } else {
                    handling.onAllSuccess?.()
                }
            })
        }
    }

    /**
     * Handles status changes and executes appropriate callbacks.
     *
     * The effect tracks only the resource status. Values and errors are read with untracked, so a manual value change,
     * error-object change, or other state read does not re-run the callback pipeline. Once the resource reaches a
     * terminal state, callbacks are deferred with setTimeout to avoid the Angular issue linked below and to keep
     * callback side effects outside the current reactive evaluation.
     *
     * For one-shot executions the effect is destroyed after success or failure. For tracking executions it remains
     * alive, allowing later request-body changes to drive the resource through loading, resolved and error states again.
     */
    #handleStatusChanges(): void {
        const statusChangeEffect = effect(() => {
            const status = this.status()
            runInInjectionContext(this.#injector, () => {
                switch (status) {
                    case 'resolved': {
                        // We only want to rely on the status change for the effect to run, not the value change.
                        const value = untracked(() => notUndefined(this.value())) as Exclude<TResult, undefined>

                        // Because of an issue in angular, we need to use a setTimeout.
                        // https://github.com/angular/angular/issues/62822#issuecomment-3127178466
                        setTimeout(() => {
                            runInInjectionContext(this.#injector, () => {
                                this.#options.resourceOnSuccess?.(value)
                                this.#options.resourceOnFinally?.()
                                this.#options.onSuccess?.(value)
                                this.#options.onFinally?.()
                            })
                            this.#notifyCompletion(false)
                            this.#destroyEffectWhenNotTrackingBody(statusChangeEffect)
                        })
                        break
                    }
                    case 'error': {
                        // We only want to rely on the status change for the effect to run, not the error change.
                        const error = untracked(() => notUndefined(this.error()))

                        // Because of an issue in angular, we need to use a setTimeout.
                        // https://github.com/angular/angular/issues/62822#issuecomment-3127178466
                        setTimeout(() => {
                            runInInjectionContext(this.#injector, () => {
                                this.#options.resourceOnError?.(error)
                                this.#options.resourceOnFinally?.()
                                this.#options.onError?.(error)
                                this.#options.onFinally?.()
                            })
                            this.#notifyCompletion(true)
                            this.#destroyEffectWhenNotTrackingBody(statusChangeEffect)
                        })
                        break
                    }
                    default:
                        break
                }
            })
        })
    }

    /**
     * When we are not tracking the body, we can already destroy the effect to save browser resources. A body that is
     * not tracked means that the resource execution is only run once.
     * @param effect The effect to destroy.
     */
    #destroyEffectWhenNotTrackingBody(effect: EffectRef): void {
        if (!this.isTrackingBody) {
            effect.destroy()
        }
    }

    /**
     * Notifies the observers waiting for this execution's terminal result.
     *
     * Completion handlers are cleared after notification because execute creates one-shot executions. This also
     * prevents an execution from accidentally contributing to an aggregate result more than once.
     * @param hasFailed Whether the execution ended in an error state.
     */
    #notifyCompletion(hasFailed: boolean): void {
        for (const handler of this.#completionHandlers) {
            handler(hasFailed)
        }
        this.#completionHandlers.clear()
    }
}

/**
 * Wraps a resource so it behaves better for feature screens than the raw ResourceRef.
 *
 * The main intention is to prevent reload flicker for tracked resources. When a previously resolved resource enters
 * loading again, the derived snapshot keeps the previous value while still reporting status loading. This lets a screen
 * show the current data and a loading indicator at the same time instead of dropping back to an empty value.
 *
 * The helper also normalizes HttpErrorResponse errors into the application-level error shape. This keeps callers from
 * needing to know whether an error came from Angular HTTP internals or from the ppw resource wrapper.
 *
 * Error snapshots are not used as a previous value source. After an error, the next loading state is forwarded as-is so
 * stale failed data does not accidentally get kept alive through a retry.
 */
function withPreviousValue<TValue>(input: Resource<TValue>): Resource<TValue> {
    const errorExtractor = inject(PPW_RESOURCE_ERROR_EXTRACTOR)

    const derived = linkedSignal<ResourceSnapshot<TValue>, ResourceSnapshot<TValue>>({
        source: input.snapshot,
        computation: (snap, previous) => {
            if (snap.status === 'loading' && previous && previous.value.status !== 'error') {
                // When the input resource enters loading state, we keep the value
                // from its previous state, if any.
                return { status: 'loading' as const, value: previous.value.value }
            }

            if (
                snap.status === 'error' &&
                previous &&
                previous.value.status !== 'error' &&
                'error' in snap &&
                snap.error instanceof HttpErrorResponse
            ) {
                // When the input resource enters the error state, we extract the error from the HttpErrorResponse.
                // Note that this doesn't keep the previous value.
                const error = errorExtractor(snap.error)
                return { ...snap, error }
            }

            // Otherwise we simply forward the state of the input resource.
            return { ...snap }
        }
    })

    return resourceFromSnapshots(derived)
}
