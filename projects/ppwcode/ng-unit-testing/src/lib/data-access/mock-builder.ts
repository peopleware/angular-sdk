import { DateTime } from 'luxon'

/**
 * Returns whether a value is a record that can be copied property by property.
 */
const isPlainObject = (value: object): boolean => {
    const prototype = Object.getPrototypeOf(value)

    return prototype === Object.prototype || prototype === null
}

/**
 * Creates an independent copy of the mutable structures that mock builders support.
 *
 * Immutable primitive values are returned unchanged. Luxon DateTime values receive a
 * new instance as well, so separate builds never share object references.
 */
const cloneMockValue = <T>(value: T): T => {
    if (Array.isArray(value)) {
        return value.map(cloneMockValue) as T
    }

    if (value instanceof Date) {
        return new Date(value.getTime()) as T
    }

    if (DateTime.isDateTime(value)) {
        return value.reconfigure({}) as T
    }

    if (typeof value === 'object' && value !== null && isPlainObject(value)) {
        return Object.fromEntries(
            Object.entries(value).map(([key, nestedValue]) => [key, cloneMockValue(nestedValue)])
        ) as T
    }

    return value
}

/**
 * Base class for mutable fluent mock builders.
 *
 * Subclasses initialize it through a static default factory, update its private draft
 * with fluent setters, and expose {@link buildValue} through their public `build` method.
 * Every supplied value and build result is cloned to keep mock object graphs independent.
 */
export abstract class MockBuilder<T extends object> {
    #value: T

    /**
     * Creates a builder with an independent copy of its default draft.
     */
    protected constructor(value: T) {
        this.#value = cloneMockValue(value)
    }

    /**
     * Provides subclasses with the current private draft for composing convenience setters.
     */
    protected get value(): T {
        return this.#value
    }

    /**
     * Creates a fresh result from the current draft for a subclass public `build` method.
     */
    protected buildValue(): T {
        return cloneMockValue(this.#value)
    }

    /**
     * Replaces one draft property with an independent copy and keeps fluent chaining on this builder.
     */
    protected withValue<TKey extends keyof T>(key: TKey, value: T[TKey]): this {
        this.#value = {
            ...this.#value,
            [key]: cloneMockValue(value)
        }

        return this
    }
}
