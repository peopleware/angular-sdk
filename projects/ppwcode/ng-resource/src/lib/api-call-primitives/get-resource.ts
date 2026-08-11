import { HttpResourceRef, HttpResourceRequest, httpResource } from '@angular/common/http'
import { BaseResourceOptions, BaseResourceOptionsWithDefaultValue } from './base/base-resource-options'
import { generateBaseHttpResourceOptions } from './base/generate-base-http-resource-options'
import { generateBaseResourceRequest } from './base/generate-base-resource-request'

/**
 * The options for executing the getResource function.
 */
export type GetResourceOptions<TResultDto, TResultEntity = TResultDto> = BaseResourceOptions<TResultDto, TResultEntity>

export type GetResourceOptionsWithDefaultValue<
    TResultDto,
    TResultEntity = TResultDto
> = BaseResourceOptionsWithDefaultValue<TResultDto, TResultEntity>

/**
 * Function to generate a get resource request based on the provided options.
 * @privateRemarks
 * The only reason this function is exported is to allow for testing.
 * @param options The options to generate the get resource request.
 */
export const _generateGetResourceRequest =
    <TResultDto, TResultEntity>(
        options: GetResourceOptions<TResultDto, TResultEntity>
    ): (() => HttpResourceRequest | undefined) =>
    () =>
        generateBaseResourceRequest(options)

interface GetResourceFn {
    /**
     * Gets a resource at the given URL and maps the response using the given mapper.
     * The url parameter is a function to allow for dynamic URL generation based on signals. When a signal is used,
     * the httpResource will track changes to the signal and automatically update the URL and execute the request.
     * @param options The execution options for the get resource function.
     */
    <TResultDto, TResultEntity>(
        options: GetResourceOptionsWithDefaultValue<TResultDto, TResultEntity>
    ): HttpResourceRef<TResultEntity>

    /**
     * Gets a resource at the given URL and maps the response using the given mapper.
     * The url parameter is a function to allow for dynamic URL generation based on signals. When a signal is used,
     * the httpResource will track changes to the signal and automatically update the URL and execute the request.
     * @param options The execution options for the get resource function.
     */
    <TResultDto, TResultEntity>(
        options: GetResourceOptions<TResultDto, TResultEntity>
    ): HttpResourceRef<TResultEntity | undefined>

    /**
     * Gets a resource at the given URL and maps the response using the given mapper.
     * Reads the body as text.
     * The url parameter is a function to allow for dynamic URL generation based on signals. When a signal is used,
     * the httpResource will track changes to the signal and automatically update the URL and execute the request.
     * @param options The execution options for the get resource function.
     */
    text: {
        <TResultEntity = string>(
            options: GetResourceOptionsWithDefaultValue<string, TResultEntity>
        ): HttpResourceRef<TResultEntity>

        <TResultEntity = string>(
            options: GetResourceOptions<string, TResultEntity>
        ): HttpResourceRef<TResultEntity | undefined>
    }

    /**
     * Gets a resource at the given URL and maps the response using the given mapper.
     * Reads the body as blob.
     * The url parameter is a function to allow for dynamic URL generation based on signals. When a signal is used,
     * the httpResource will track changes to the signal and automatically update the URL and execute the request.
     * @param options The execution options for the get resource function.
     */
    blob: {
        <TResultEntity = Blob>(
            options: GetResourceOptionsWithDefaultValue<Blob, TResultEntity>
        ): HttpResourceRef<TResultEntity>

        <TResultEntity = Blob>(
            options: GetResourceOptions<Blob, TResultEntity>
        ): HttpResourceRef<TResultEntity | undefined>
    }
}

export const getResource: GetResourceFn = ((): GetResourceFn => {
    const getFn = (<TResultDto, TResultEntity>(
        options: GetResourceOptions<TResultDto, TResultEntity>
    ): HttpResourceRef<TResultEntity | undefined> =>
        httpResource<TResultEntity>(
            _generateGetResourceRequest(options),
            generateBaseHttpResourceOptions(options)
        )) as GetResourceFn

    getFn.text = (<TResultEntity = string>(
        options: GetResourceOptions<string, TResultEntity>
    ): HttpResourceRef<TResultEntity | undefined> =>
        httpResource.text<TResultEntity>(
            _generateGetResourceRequest(options),
            generateBaseHttpResourceOptions(options)
        )) as GetResourceFn['text']

    getFn.blob = (<TResultEntity = Blob>(
        options: GetResourceOptions<Blob, TResultEntity>
    ): HttpResourceRef<TResultEntity | undefined> =>
        httpResource.blob<TResultEntity>(
            _generateGetResourceRequest(options),
            generateBaseHttpResourceOptions(options)
        )) as GetResourceFn['blob']

    return getFn
})()
