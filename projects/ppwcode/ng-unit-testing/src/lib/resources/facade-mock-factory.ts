import { HttpErrorResponse } from '@angular/common/http'
import { ApplicationRef, FactoryProvider, Signal, Type } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { notUndefined } from '@ppwcode/ng-utils'
import { PpwResource, PpwResourceExecutionHandling } from '@ppwcode/ng-resource'
import { PpwResourceMock, PpwResourceMockResult } from './ppw-resource.mock'

/** Configuration for mocking facade methods returning PpwResource instances. */
type PpwResourceMethodMockConfig<U> = ['resource', U | HttpErrorResponse]
/** Configuration for mocking facade properties that are signals or computed values. */
type SignalPropertyMockConfig<U> = ['signal', U]
/** Configuration for mocking facade methods returning a value. */
type ValueMethodMockConfig<U> = ['method', U]

/** Configuration for mocking a facade method or signal property. */
type MethodMockConfig<U> = PpwResourceMethodMockConfig<U> | SignalPropertyMockConfig<U> | ValueMethodMockConfig<U>

/** Type returning the keys of the given generic that return a PpwResource instance. */
export type PpwResourceMethodKeys<T> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [K in keyof T]: T[K] extends (...args: Array<any>) => PpwResource<any, any> ? K : never
}[keyof T]

/**
 * Gets whether the given config is for a method returning a PpwResource instance.
 * @param config The config to check.
 */
const isPpwResourceMethodMockConfig = <U>(config: unknown): config is PpwResourceMethodMockConfig<U> =>
    Array.isArray(config) && config[0] === 'resource'

/**
 * Gets whether the given config is for a signal property.
 * @param config The config to check.
 */
const isSignalPropertyMockConfig = <U>(config: unknown): config is SignalPropertyMockConfig<U> =>
    Array.isArray(config) && config[0] === 'signal'

/**
 * Gets whether the given config is for a method returning a value.
 * @param config The config to check.
 */
const isValueMethodMockConfig = <U>(config: unknown): config is ValueMethodMockConfig<U> =>
    Array.isArray(config) && config[0] === 'method'

// eslint-disable-next-line no-secrets/no-secrets
/**
 * Configuration type for mocking a facade object.
 * Maps each property of the provided generic type `T` to a corresponding mock configuration type.
 *
 * The mapping logic is as follows:
 * - For properties that are functions returning a `PpwResource` type, the corresponding type is `PpwResourceMethodMockConfig<U>`, where `U` is the inferred type of the resource.
 * - For properties that match a computed `Signal` type, the corresponding type is `SignalPropertyMockConfig<V>`, where `V` is the inferred value type of the signal.
 * - For methods returning a value (but not a `PpwResource`), the corresponding type is `ValueMethodMockConfig<ReturnType<T[K]>>`, where `ReturnType<T[K]>` is the return type of the method.
 * - For all other properties, the corresponding type is `MethodMockConfig<T[K]>`.
 *
 * This type facilitates the creation of mock configurations tailored to the structure of the provided type `T`.
 *
 * @template T The facade type for which the configuration is being defined.
 */
type MockFacadeConfig<T> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [K in keyof T]: T[K] extends (...args: Array<any>) => PpwResource<infer U, any>
        ? PpwResourceMethodMockConfig<U>
        : T[K] extends Signal<infer V> // For computed signals
          ? SignalPropertyMockConfig<V>
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            T[K] extends (...args: Array<any>) => unknown
            ? ValueMethodMockConfig<ReturnType<T[K]>> // For methods returning a value
            : MethodMockConfig<T[K]> // For other properties like signals
}

/**
 * Options for creating a mock facade.
 */
export interface MockFacadeOptions {
    /** Whether the resources should be automatically flushed when the facade is created. Defaults to true. */
    autoFlush?: boolean
}

/**
 * Generates a PpwResourceMock based on the given resource type and return value.
 * @param returnValue The value that should be returned by the resource when it is flushed.
 * @param options Options for creating the mock facade.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFacadeResourceMock = (returnValue: unknown, options: MockFacadeOptions): PpwResourceMock<any, any> => {
    const resourceMock = PpwResourceMock.create(returnValue)
    const execute = resourceMock.resource.execute.bind(resourceMock.resource)
    const track = resourceMock.resource.track.bind(resourceMock.resource)

    // Spy on the execute and track method to allow for easy verification of calls.
    const executeSpy = vi.spyOn(resourceMock.resource, 'execute')
    const trackSpy = vi.spyOn(resourceMock.resource, 'track')

    if (options.autoFlush ?? true) {
        executeSpy.mockImplementation(
            (body: unknown, handling: PpwResourceExecutionHandling<PpwResourceMockResult<unknown>> | undefined) => {
                const execution = execute(body, handling)
                void resourceMock.flush()
                return execution
            }
        )
        trackSpy.mockImplementation(
            (
                body: (() => unknown) | undefined,
                handling: PpwResourceExecutionHandling<PpwResourceMockResult<unknown>> | undefined
            ) => {
                const execution = track(body, handling)
                void resourceMock.flush()
                return execution
            }
        )
    }

    return resourceMock
}

/**
 * Type mapping method names to their corresponding resource mock instances.
 */
type GeneratedResourceMocks = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [methodName: string]: PpwResourceMock<any, any>
}

/**
 * Generates a mock facade based on the given configuration.
 * @param config The configuration for the mock facade.
 * @param options Options for creating the mock facade.
 */
const mockFacade = <TFacade>(
    config: MockFacadeConfig<TFacade>,
    options: MockFacadeOptions
): {
    facade: TFacade
    resourceMocks: GeneratedResourceMocks
} => {
    const facade: TFacade = {} as TFacade

    const resourceMocks: GeneratedResourceMocks = {}

    for (const [methodName, methodConfig] of Object.entries(config)) {
        let returnValue: unknown

        if (isSignalPropertyMockConfig(methodConfig)) {
            const signalValue = methodConfig[1]
            Object.defineProperty(facade, methodName, {
                value: vi.fn().mockReturnValue(signalValue),
                writable: true
            })
            continue // Skip the resource mock creation for signals
        }

        if (isValueMethodMockConfig(methodConfig)) {
            const methodValue = methodConfig[1]
            Object.defineProperty(facade, methodName, {
                value: vi.fn().mockReturnValue(methodValue),
                writable: true
            })
            continue // Skip the resource mock creation for methods
        }

        if (isPpwResourceMethodMockConfig(methodConfig)) {
            returnValue = methodConfig[1]
        } else {
            throw new Error(`Invalid method mock configuration for ${String(methodName)}`)
        }

        const resourceMock = getFacadeResourceMock(returnValue, options)
        resourceMocks[methodName] = resourceMock
        Object.defineProperty(facade, methodName, {
            value: vi.fn().mockReturnValue(resourceMock.resource),
            writable: true
        })
    }

    return { facade, resourceMocks }
}

/**
 * Factory for creating mock facades with methods returning PpwResource instances.
 * The factory provides a provider for the mock facade, as well as methods for accessing
 * the mock facade instance and the underlying resource mocks.
 */
export class FacadeMockFactory<TFacade> {
    #resourceMockInstances?: GeneratedResourceMocks
    #overrideConfig: Partial<MockFacadeConfig<TFacade>> = {}

    public constructor(
        private readonly type: Type<TFacade>,
        private readonly config: () => MockFacadeConfig<TFacade>
    ) {}

    /**
     * Gets a provider that can be used to provide the mock facade in a testing module.
     */
    public getProvider(options: MockFacadeOptions = { autoFlush: true }): FactoryProvider {
        return {
            provide: this.type,
            useFactory: () => {
                const { facade, resourceMocks } = mockFacade({ ...this.config(), ...this.#overrideConfig }, options)
                // Reset the override config after creating the facade to ensure it doesn't affect further calls.
                // Subsequent calls are new tests, so they should start with a clean config.
                this.#overrideConfig = {}
                this.#resourceMockInstances = resourceMocks
                return facade
            }
        }
    }

    /**
     * Flushes all resources in the mock facade.
     * This will trigger all resources to return their configured values.
     * If a resource was configured with an HttpErrorResponse, it will throw that error when flushed.
     */
    public async flushAll(): Promise<void> {
        const methodNames: Array<PpwResourceMethodKeys<TFacade>> = Object.keys(
            notUndefined(this.#resourceMockInstances)
        ) as Array<PpwResourceMethodKeys<TFacade>>
        await Promise.all(methodNames.map((methodName) => this.flush(methodName, false)))

        if (vi.isFakeTimers()) {
            await vi.runAllTimersAsync()
        } else {
            await TestBed.inject(ApplicationRef).whenStable()
        }
    }

    /**
     * Flushes a specific resource in the mock facade.
     * This will trigger the resource to return its configured value.
     * If the resource was configured with an HttpErrorResponse, it will throw that error when flushed.
     * @param methodName The name of the method to flush.
     * @param awaitWhenStable Whether to await the application being stable after flushing. Defaults to true.
     */
    public async flush(methodName: PpwResourceMethodKeys<TFacade>, awaitWhenStable: boolean = true): Promise<void> {
        const resourceMock = notUndefined(this.#resourceMockInstances)[methodName as string]
        if (!resourceMock) {
            throw new Error(`No mock instance found for method: ${String(methodName)}`)
        }

        await resourceMock.flush()

        if (awaitWhenStable) {
            if (vi.isFakeTimers()) {
                await vi.runAllTimersAsync()
            } else {
                await TestBed.inject(ApplicationRef).whenStable()
            }
        }
    }

    /**
     * Overrides the default configuration for the mock facade.
     * This allows you to change the return values of specific methods for a specific test.
     * @param overrideConfig The configuration to override the default config with.
     */
    public override(overrideConfig: Partial<MockFacadeConfig<TFacade>>): void {
        // Object.assign is used to allow multiple calls to override to accumulate changes.
        Object.assign(this.#overrideConfig, overrideConfig)
    }

    /**
     * Gets the mock instance for a specific PpwResource method.
     * @param methodName The name of the method to get the mock for.
     */
    public mockedPpwResource<TMethodName extends PpwResourceMethodKeys<TFacade>>(
        methodName: TMethodName
    ): PpwResourceMock<unknown, unknown> {
        const mockInstance = notUndefined(this.#resourceMockInstances)[methodName as string]
        if (!mockInstance) {
            throw new Error(`No mock instance found for method: ${String(methodName)}`)
        }
        return notUndefined(mockInstance) as PpwResourceMock<unknown, unknown>
    }

    /**
     * Creates a factory function that can be used to provide the mock facade with the given default configuration.
     * This is a convenience method that allows you to create a provider without having to create an instance of the factory yourself.
     * @param type The type of the facade to mock.
     * @param config The default configuration for the mock facade.
     */
    public static create<TFacade>(
        type: Type<TFacade>,
        config: () => MockFacadeConfig<TFacade>
    ): () => FacadeMockFactory<TFacade> {
        return () => new FacadeMockFactory<TFacade>(type, config)
    }
}
