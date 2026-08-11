import { Injector, computed, inject, runInInjectionContext, signal } from '@angular/core'
import {
    PPW_RESOURCE_DEFAULT_ERROR_HANDLER,
    PpwResourceErrorHandler,
    PpwResourceFinallyHandler,
    PpwResourceSuccessHandler
} from '../error-handling/handler'
import {
    PpwResourceExecution,
    PpwResourceExecutionHandling,
    PpwResourceExecutionOptions
} from './ppw-resource-execution'
import { PpwResourceSource } from './ppw-resource-source'

/**
 * Options for a PpwResource.
 */
export interface PpwResourceOptions<TResult, TBody> {
    resourceFactory: (body: () => TBody) => PpwResourceSource<TResult>
    onSuccess?: PpwResourceSuccessHandler<TResult>
    onError?: PpwResourceErrorHandler
    onFinally?: PpwResourceFinallyHandler
}

/**
 * A PpwResource encapsulates the creation and execution of HTTP resource references. It provides a way to define
 * and manage the lifecycle of HTTP resources, including error handling and finalization. Look at a PpwResource
 * as your definition container for interaction with the API. A PpwResource will instantiate a PpwResourceExecution
 * when calling .create or .track and passing whatever configuration is necessary to that instance.
 *
 * Even though Angular documentation discourages using httpResource for mutation calls, we support this use case.
 * We have thought this through and considered this to be safe when using the .execute method to start an execution.
 * Running .execute twice will create a full new resource instance, meaning that it will be completely side by side
 * with the previous one. This avoids meddling with the previous execution and allows for parallel operations.
 *
 * The .track method supports reactive scenarios where data should be reloaded based on input changes
 * (like a changing id in the route). This allows for seamless data updates without the need for manual intervention.
 *
 * A PpwResource is intented to be created in the business logic layer of the application. It allows for setting three
 * hooks:
 * - onSuccess: A callback that is invoked when the resource execution is successful.
 * - onError: A callback that is invoked when the resource execution fails.
 * - onFinally: A callback that is invoked when the resource execution is either successful or fails.
 *
 * For running PpwResourceExecution instances of PpwResource, the hooks of the PpwResource definition are all executed
 * before the hooks of the PpwResourceExecution. This allows for a clean separation of concerns and a logical flow of
 * events:
 * 1. PpwResource onSuccess or onError
 * 2. PpwResource onFinally
 * 3. PpwResourceExecution onSuccess or onError
 * 4. PpwResourceExecution onFinally
 */
export class PpwResource<TResult, TBody> {
    // Injecting the injector requires the container to create the PpwResource instance during construction time,
    // just like Angular requires this for running httpResource. This means that we are not imposing an extra complexity
    // by this. The injector is used later to run the execution within the same injection context, allowing us to delay
    // resource creation and execution at places where we normally wouldn't be able to. An example of such a case is
    // the body of a component method.
    readonly #injector = inject(Injector)
    readonly #defaultOnErrorHandler = inject(PPW_RESOURCE_DEFAULT_ERROR_HANDLER)

    readonly #onSuccess?: PpwResourceSuccessHandler<TResult>
    readonly #onError?: PpwResourceErrorHandler
    readonly #onFinally?: PpwResourceFinallyHandler

    // Keep track of all executions that have been started. This allows us to execute batch scenarios in parallel and
    // track whether any of them is still executing without having to keep individual executions on the feature component itself.
    readonly #executions = signal<Array<PpwResourceExecution<TResult>>>([])

    // Function used to instantiate the reloadable Resource. This is provided during construction time but invoked in the
    // #createExecution method. This allows us to delay resource creation and execution at places where we normally
    // wouldn't be able to.
    readonly #resourceFactory: (body: () => TBody) => PpwResourceSource<TResult>

    protected constructor(
        options: PpwResourceOptions<TResult, TBody>['resourceFactory'] | PpwResourceOptions<TResult, TBody>
    ) {
        if (typeof options === 'function') {
            this.#resourceFactory = options
        } else {
            this.#resourceFactory = options.resourceFactory
            this.#onSuccess = options?.onSuccess
            this.#onError = options?.onError
            this.#onFinally = options?.onFinally
        }
    }

    /** Computed property indicating whether any of the started executions are still loading. */
    public readonly isAnyLoading = computed(() => this.#executions().some((execution) => execution.isLoading()))

    /**
     * Executes the resource for the given body function. This allows passing a signal, making it useful for
     * scenarios where the body is dynamically changed. Mostly useful for READING data based on selection
     * or route data.
     * @param body The body to use for the resource execution.
     * @param handling The handling options for the resource execution.
     * @example
     * ```ts
     * // route: /my-feature/:id
     * export class MyFeatureComponent {
     *   readonly #myFacade = inject(MyFacade);
     *
     *   protected readonly id = input.required<number>();
     *
     *   protected readonly myResource = this.#myFacade.getById(this.id).track();
     * }
     * ```
     */
    public track(
        body: () => TBody = () => undefined as TBody,
        handling: PpwResourceExecutionHandling<TResult> = {}
    ): PpwResourceExecution<TResult> {
        return this.#createExecution(body, { isTrackingBody: true }, handling)
    }

    /**
     * Executes the resource for the given value. This doesn't track any changes to a request body, making it useful
     * for scenarios where the request should only run once. Mostly useful for WRITING data.
     * @param body The value to use for the resource execution.
     * @param handling The handling options for the resource execution.
     * @example
     * ```ts
     * // route: /my-feature/:id
     * export class MyFeatureComponent {
     *   readonly #myFacade = inject(MyFacade);
     *
     *   protected readonly id = input.required<number>();
     *
     *   protected readonly myResource = this.#myFacade.getById(this.id).track();
     *   protected readonly updateResource = this.#myFacade.update(this.id);
     *
     *   protected executeUpdate(): void {
     *      const formValue = this.updateForm().value();
     *      this.updateResource.execute(formValue, {
     *          onSuccess: () => this.myResource.reload()
     *      });
     *   }
     * }
     */
    public execute(body: TBody, handling?: PpwResourceExecutionHandling<TResult>): PpwResourceExecution<TResult> {
        return this.#createExecution(() => body, { isTrackingBody: false }, handling)
    }

    #createExecution(
        body: () => TBody,
        options: PpwResourceExecutionOptions<TResult>,
        handling?: PpwResourceExecutionHandling<TResult>
    ): PpwResourceExecution<TResult> {
        // Instantiate the reloadable Resource and create a new PpwResourceExecution instance for it.
        // This is run in the injection context to ensure that any dependencies are properly resolved, allowing
        // invocation of the resource execution with the provided body outside construction time.
        const execution = runInInjectionContext(this.#injector, () => {
            const resourceRef = this.#resourceFactory(body)
            return new PpwResourceExecution(resourceRef, {
                ...options,
                resourceOnError: this.#onError,
                resourceOnFinally: this.#onFinally,
                resourceOnSuccess: this.#onSuccess,
                onSuccess: (value) => handling?.onSuccess?.(value),
                onError: (error) => (handling?.onError ?? this.#defaultOnErrorHandler)(error),
                onFinally: () => {
                    this.#removeExecution(execution)

                    handling?.onFinally?.()
                }
            })
        })

        // Add the current execution to the list of active executions so that the resource itself can keep track of the
        // status of any ongoing execution.
        this.#executions.update((executions) => [...executions, execution])

        return execution
    }

    /**
     * Removes the provided execution from the list of active executions.
     * @param execution The execution to remove.
     */
    #removeExecution(execution: PpwResourceExecution<TResult>): void {
        this.#executions.update((executions) => executions.filter((e) => e !== execution))
    }

    /**
     * Creates a new PpwResource instance from a lambda creating a reloadable Resource. This is useful for creating a
     * PpwResource instance from a resource that has already been created elsewhere, including an HttpResourceRef.
     * @param options The configuration options for the PpwResource instance.
     * @returns A new PpwResource instance.
     */
    public static fromHttpResource<TResult, TBody>(
        options: PpwResourceOptions<TResult, TBody>['resourceFactory'] | PpwResourceOptions<TResult, TBody>
    ): PpwResource<TResult, TBody> {
        return new PpwResource(options)
    }
}
