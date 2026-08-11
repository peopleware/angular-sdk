import { HttpResourceRef, HttpResourceRequest, httpResource } from '@angular/common/http'
import { generateBaseHttpResourceOptions } from './base/generate-base-http-resource-options'
import { generateBaseResourceRequest } from './base/generate-base-resource-request'
import { PostResourceOptions, PostResourceOptionsWithDefaultValue } from './post-resource'

/**
 * The options for executing the putResource function.
 */
export type PutResourceOptions<TBodyEntity, TBodyDto, TResultDto, TResultEntity> = PostResourceOptions<
    TBodyEntity,
    TBodyDto,
    TResultDto,
    TResultEntity
>

export type PutResourceOptionsWithDefaultValue<TBodyEntity, TBodyDto, TResultDto, TResultEntity> =
    PostResourceOptionsWithDefaultValue<TBodyEntity, TBodyDto, TResultDto, TResultEntity>

/**
 * Function to generate a put resource request based on the provided options.
 * @privateRemarks
 * The only reason this function is exported is to allow for testing.
 * @param options The options to generate the put resource request.
 */
export const _generatePutResourceRequest =
    <TBodyEntity, TBodyDto, TResultDto, TResultEntity>(
        options: PutResourceOptions<TBodyEntity, TBodyDto, TResultDto, TResultEntity>
    ): (() => HttpResourceRequest | undefined) =>
    () => {
        const request = generateBaseResourceRequest(options)
        const body = options.body()

        if (request && body !== undefined) {
            return {
                ...request,
                method: 'PUT',
                body: options.bodyMapper(body)
            }
        }

        return undefined
    }

interface PutResourceFn {
    <TBodyEntity, TBodyDto, TResultDto, TResultEntity>(
        options: PutResourceOptionsWithDefaultValue<TBodyEntity, TBodyDto, TResultDto, TResultEntity>
    ): HttpResourceRef<TResultEntity>

    <TBodyEntity, TBodyDto, TResultDto, TResultEntity>(
        options: PutResourceOptions<TBodyEntity, TBodyDto, TResultDto, TResultEntity>
    ): HttpResourceRef<TResultEntity | undefined>

    text: {
        <TBodyEntity, TBodyDto, TResultEntity>(
            options: PutResourceOptionsWithDefaultValue<TBodyEntity, TBodyDto, string, TResultEntity>
        ): HttpResourceRef<TResultEntity>

        <TBodyEntity, TBodyDto, TResultEntity>(
            options: PutResourceOptions<TBodyEntity, TBodyDto, string, TResultEntity>
        ): HttpResourceRef<TResultEntity | undefined>
    }

    blob: {
        <TBodyEntity, TBodyDto, TResultEntity>(
            options: PutResourceOptionsWithDefaultValue<TBodyEntity, TBodyDto, Blob, TResultEntity>
        ): HttpResourceRef<TResultEntity>

        <TBodyEntity, TBodyDto, TResultEntity>(
            options: PutResourceOptions<TBodyEntity, TBodyDto, Blob, TResultEntity>
        ): HttpResourceRef<TResultEntity | undefined>
    }
}

export const putResource: PutResourceFn = ((): PutResourceFn => {
    /**
     * Puts a resource to the given URL, maps the body and optionally the response using the given mappers.
     * The url parameter is a function to allow for dynamic URL generation based on signals. When a signal is used,
     * the httpResource will track changes to the signal and automatically update the URL and execute the request.
     * @param options The execution options for the put resource function.
     */
    const putFn = (<TBodyEntity, TBodyDto, TResultDto, TResultEntity>(
        options: PutResourceOptions<TBodyEntity, TBodyDto, TResultDto, TResultEntity>
    ): HttpResourceRef<TResultEntity | undefined> =>
        httpResource<TResultEntity>(
            _generatePutResourceRequest(options),
            generateBaseHttpResourceOptions(options)
        )) as PutResourceFn

    /**
     * Puts a resource to the given URL, maps the body and optionally the response using the given mappers.
     * Reads the result as text.
     * The url parameter is a function to allow for dynamic URL generation based on signals. When a signal is used,
     * the httpResource will track changes to the signal and automatically update the URL and execute the request.
     * @param options The execution options for the put resource function.
     */
    putFn.text = (<TBodyEntity, TBodyDto, TResultEntity>(
        options: PutResourceOptions<TBodyEntity, TBodyDto, string, TResultEntity>
    ): HttpResourceRef<TResultEntity | undefined> =>
        httpResource.text<TResultEntity>(
            _generatePutResourceRequest(options),
            generateBaseHttpResourceOptions(options)
        )) as PutResourceFn['text']

    putFn.blob = (<TBodyEntity, TBodyDto, TResultEntity>(
        options: PutResourceOptions<TBodyEntity, TBodyDto, Blob, TResultEntity>
    ): HttpResourceRef<TResultEntity | undefined> =>
        httpResource.blob<TResultEntity>(
            _generatePutResourceRequest(options),
            generateBaseHttpResourceOptions(options)
        )) as PutResourceFn['blob']

    return putFn
})()
