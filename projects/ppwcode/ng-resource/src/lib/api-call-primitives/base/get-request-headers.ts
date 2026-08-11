import { HttpHeaders } from '@angular/common/http'

/**
 * Represents the parameter used to construct HTTP headers.
 *
 * This type can be one of the following:
 * - A string: Typically used to pass raw header strings.
 * - An object: A key-value map where each key corresponds to a header name, and the value can be a string, a number, or an array of strings/numbers.
 * - An instance of the `Headers` class: Allows full utilization of the `Headers` API.
 */
type HttpHeadersConstructorParam = string | { [p: string]: string | number | (string | number)[] } | Headers

/**
 * Represents a configuration type for HTTP request headers.
 *
 * This type can be one of the following:
 * - An instance of `HttpHeaders`
 * - A `HttpHeadersConstructorParam`, which provides parameters for constructing `HttpHeaders`
 * - A function that returns an `HttpHeaders` instance
 * - A function that returns a `HttpHeadersConstructorParam`
 * - `undefined`, indicating no headers configuration is provided
 */
export type RequestHeadersConfig =
    | HttpHeaders
    | HttpHeadersConstructorParam
    | (() => HttpHeaders)
    | (() => HttpHeadersConstructorParam)
    | undefined

/**
 * Retrieves or constructs the HTTP headers based on the provided configuration.
 *
 * @param {RequestHeadersConfig} [config] - An optional configuration for HTTP headers.
 *                                          Can be an instance of HttpHeaders, an object, a string,
 *                                          or a function returning a valid configuration.
 * @returns {HttpHeaders | undefined} The constructed HttpHeaders instance or undefined if no configuration is provided.
 */
export const getRequestHeaders = (config?: RequestHeadersConfig): HttpHeaders | undefined => {
    if (config instanceof HttpHeaders) {
        return config
    }

    if (!config) {
        return undefined
    }

    if (typeof config === 'object' || typeof config === 'string') {
        return new HttpHeaders(config)
    }

    return getRequestHeaders(config())
}
