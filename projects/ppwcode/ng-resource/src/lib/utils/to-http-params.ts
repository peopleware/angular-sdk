import { HttpParams } from '@angular/common/http'

type HttpParamValue = string | number | boolean

/** Narrows values to the primitive types Angular accepts for HttpParams. */
const isHttpParamValue = (value: unknown): value is HttpParamValue =>
    typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'

/** Treats only plain object-like values as nested params; arrays use repeated keys instead. */
const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value)

/** Uses bracket notation because the backend expects form-style nested parameter names. */
const toNestedKey = (parentKey: string, key: string): string => `${parentKey}[${key}]`

/** Recursively flattens supported values while omitting nullish and unsupported values. */
const appendValue = (httpParams: HttpParams, key: string, value: unknown): HttpParams => {
    if (value === null || value === undefined) {
        return httpParams
    }

    if (Array.isArray(value)) {
        return value.reduce((params: HttpParams, item: unknown) => appendValue(params, key, item), httpParams)
    }

    if (isRecord(value)) {
        return Object.entries(value).reduce(
            (params: HttpParams, [nestedKey, nestedValue]: [string, unknown]) =>
                appendValue(params, toNestedKey(key, nestedKey), nestedValue),
            httpParams
        )
    }

    if (isHttpParamValue(value)) {
        return httpParams.append(key, value)
    }

    return httpParams
}

/**
 * Converts a plain object to Angular HttpParams.
 *
 * Nested objects are flattened with bracket notation, arrays are appended as
 * repeated keys, and null or undefined values are skipped.
 */
export const toHttpParams = (record?: object): HttpParams => {
    record ??= {}
    return Object.entries(record).reduce(
        (httpParams: HttpParams, [key, value]: [string, unknown]) => appendValue(httpParams, key, value),
        new HttpParams()
    )
}

/**
 * Creates a query-params function for resource request options.
 *
 * Use this helper when the service receives application-facing params entities
 * that must be mapped to backend-facing params DTOs before conversion to
 * Angular HttpParams. The returned function keeps the params and mapper lazy, so
 * resources can re-evaluate signal-backed params when Angular rebuilds the
 * request.
 *
 * When the params function returns `undefined`, the mapper is not called and the
 * resulting query-params function returns empty HttpParams.
 *
 * @param params Function that returns the current application-facing params entity.
 * @param mapper Pure mapper that converts the params entity to the backend DTO shape.
 * @returns Function that can be assigned directly to `requestOptions.queryParams`.
 *
 * @example
 * ```ts
 * public getDishes(
 *     params: () => MealplanParamsEntity | undefined
 * ): HttpResourceRef<MealplanDishResponseEntity | undefined> {
 *     return getResource<MealplanDishResponseDto, MealplanDishResponseEntity>({
 *         url: () => (params() ? '/api/mealplan/dish' : undefined),
 *         requestOptions: {
 *             queryParams: paramsToHttpParams(params, mealplanParamsEntityToDto)
 *         },
 *         responseMapper: mealplanDishResponseDtoToEntity
 *     })
 * }
 * ```
 */
export const paramsToHttpParams =
    <TParamsEntity extends object, TParamsDto extends object>(
        params: () => TParamsEntity | undefined,
        mapper: (entity: TParamsEntity) => TParamsDto
    ): (() => HttpParams) =>
    () => {
        const paramsEntity = params()
        return toHttpParams(paramsEntity ? mapper(paramsEntity) : undefined)
    }
