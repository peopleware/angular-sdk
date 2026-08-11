import { HttpResourceRef, HttpResourceRequest, httpResource } from '@angular/common/http'
import { BaseResourceOptions, BaseResourceOptionsWithDefaultValue } from './base/base-resource-options'
import { generateBaseHttpResourceOptions } from './base/generate-base-http-resource-options'
import { generateBaseResourceRequest } from './base/generate-base-resource-request'

/**
 * The options for executing the postResource function.
 */
export interface PostResourceOptions<TBodyEntity, TBodyDto, TResultDto, TResultEntity>
    extends BaseResourceOptions<TResultDto, TResultEntity> {
    /** The body to send with the request. */
    body: () => TBodyEntity | undefined
    /** The mapper to map the body to the desired DTO format. */
    bodyMapper: (body: TBodyEntity) => TBodyDto
}

export interface PostResourceOptionsWithDefaultValue<TBodyEntity, TBodyDto, TResultDto, TResultEntity>
    extends PostResourceOptions<TBodyEntity, TBodyDto, TResultDto, TResultEntity> {
    resourceOptions: BaseResourceOptionsWithDefaultValue<TResultDto, TResultEntity>['resourceOptions']
}

/**
 * Function to generate a post resource request based on the provided options.
 * @privateRemarks
 * The only reason this function is exported is to allow for testing.
 * @param options The options to generate the post resource request.
 */
export const _generatePostResourceRequest =
    <TBodyEntity, TBodyDto, TResultDto, TResultEntity>(
        options: PostResourceOptions<TBodyEntity, TBodyDto, TResultDto, TResultEntity>
    ): (() => HttpResourceRequest | undefined) =>
    () => {
        const request = generateBaseResourceRequest(options)
        const body = options.body()

        if (request && body !== undefined) {
            return {
                ...request,
                method: 'POST',
                body: options.bodyMapper(body)
            }
        }

        return undefined
    }

interface PostResourceFn {
    <TBodyEntity, TBodyDto, TResultDto, TResultEntity>(
        options: PostResourceOptionsWithDefaultValue<TBodyEntity, TBodyDto, TResultDto, TResultEntity>
    ): HttpResourceRef<TResultEntity>

    <TBodyEntity, TBodyDto, TResultDto, TResultEntity>(
        options: PostResourceOptions<TBodyEntity, TBodyDto, TResultDto, TResultEntity>
    ): HttpResourceRef<TResultEntity | undefined>

    text: {
        <TBodyEntity, TBodyDto, TResultEntity>(
            options: PostResourceOptionsWithDefaultValue<TBodyEntity, TBodyDto, string, TResultEntity>
        ): HttpResourceRef<TResultEntity>

        <TBodyEntity, TBodyDto, TResultEntity>(
            options: PostResourceOptions<TBodyEntity, TBodyDto, string, TResultEntity>
        ): HttpResourceRef<TResultEntity | undefined>
    }

    blob: {
        <TBodyEntity, TBodyDto, TResultEntity>(
            options: PostResourceOptionsWithDefaultValue<TBodyEntity, TBodyDto, Blob, TResultEntity>
        ): HttpResourceRef<TResultEntity>

        <TBodyEntity, TBodyDto, TResultEntity>(
            options: PostResourceOptions<TBodyEntity, TBodyDto, Blob, TResultEntity>
        ): HttpResourceRef<TResultEntity | undefined>
    }
}

export const postResource: PostResourceFn = ((): PostResourceFn => {
    /**
     * Posts a resource to the given URL, maps the body and optionally the response using the given mappers.
     * The url parameter is a function to allow for dynamic URL generation based on signals. When a signal is used,
     * the httpResource will track changes to the signal and automatically update the URL and execute the request.
     * @param options The execution options for the post resource function.
     */
    const postFn = (<TBodyEntity, TBodyDto, TResultDto, TResultEntity>(
        options: PostResourceOptions<TBodyEntity, TBodyDto, TResultDto, TResultEntity>
    ): HttpResourceRef<TResultEntity | undefined> =>
        httpResource<TResultEntity>(
            _generatePostResourceRequest(options),
            generateBaseHttpResourceOptions(options)
        )) as PostResourceFn

    /**
     * Posts a resource to the given URL, maps the body and optionally the response using the given mappers.
     * Reads the result as text.
     * The url parameter is a function to allow for dynamic URL generation based on signals. When a signal is used,
     * the httpResource will track changes to the signal and automatically update the URL and execute the request.
     * @param options The execution options for the post resource function.
     */
    postFn.text = (<TBodyEntity, TBodyDto, TResultEntity>(
        options: PostResourceOptions<TBodyEntity, TBodyDto, string, TResultEntity>
    ): HttpResourceRef<TResultEntity | undefined> =>
        httpResource.text<TResultEntity>(
            _generatePostResourceRequest(options),
            generateBaseHttpResourceOptions(options)
        )) as PostResourceFn['text']

    postFn.blob = (<TBodyEntity, TBodyDto, TResultEntity>(
        options: PostResourceOptions<TBodyEntity, TBodyDto, Blob, TResultEntity>
    ): HttpResourceRef<TResultEntity | undefined> =>
        httpResource.blob<TResultEntity>(
            _generatePostResourceRequest(options),
            generateBaseHttpResourceOptions(options)
        )) as PostResourceFn['blob']

    return postFn
})()
