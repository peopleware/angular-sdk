import { HttpParams } from '@angular/common/http'
import { getQueryParamsString } from './get-query-params-string'

/**
 * Defines the configuration for a request URL.
 *
 * This type can either be a string representing the URL directly,
 * or a function that returns a string or undefined. The function
 * allows for dynamic URL generation at runtime based on specific
 * requirements or conditions, allowing for recreation based on
 * signal changes.
 */
export type RequestUrlConfig = string | (() => string | undefined)

/**
 * Represents a configuration for handling query parameters in an HTTP request.
 * This type defines a function that, when invoked, returns either an instance of `HttpParams` to configure
 * query parameters for the request or `undefined` if no query parameters are needed.
 *
 * Use this configuration to dynamically construct or conditionally supply query parameters
 * for HTTP requests within an application.
 */
export type RequestQueryParamsConfig = () => HttpParams | undefined

export const getRequestUrl = (config: RequestUrlConfig, queryParams?: RequestQueryParamsConfig): string | undefined => {
    const url = typeof config === 'function' ? config() : config
    if (!url) {
        return undefined
    }

    // Angular currently has no support for reactive query parameters. Converting them to a string allows
    // us to use them in the URL. This is a workaround until Angular supports reactive query parameters.
    const queryParamsString = getQueryParamsString(queryParams?.())
    return url + queryParamsString
}
