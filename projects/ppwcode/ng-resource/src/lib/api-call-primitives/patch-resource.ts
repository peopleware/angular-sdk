import { HttpResourceRef, HttpResourceRequest, httpResource } from '@angular/common/http'
import { generateBaseHttpResourceOptions } from './base/generate-base-http-resource-options'
import { generateBaseResourceRequest } from './base/generate-base-resource-request'
import { PostResourceOptions, PostResourceOptionsWithDefaultValue } from './post-resource'

/**
 * The options for executing the patchResource function.
 */
export type PatchResourceOptions<TBodyEntity, TBodyDto, TResultDto, TResultEntity> = PostResourceOptions<
    TBodyEntity,
    TBodyDto,
    TResultDto,
    TResultEntity
>

export type PatchResourceOptionsWithDefaultValue<TBodyEntity, TBodyDto, TResultDto, TResultEntity> =
    PostResourceOptionsWithDefaultValue<TBodyEntity, TBodyDto, TResultDto, TResultEntity>

/**
 * Function to generate a patch resource request based on the provided options.
 * @privateRemarks
 * The only reason this function is exported is to allow for testing.
 * @param options The options to generate the patch resource request.
 */
export const _generatePatchResourceRequest =
    <TBodyEntity, TBodyDto, TResultDto, TResultEntity>(
        options: PatchResourceOptions<TBodyEntity, TBodyDto, TResultDto, TResultEntity>
    ): (() => HttpResourceRequest | undefined) =>
    () => {
        const request = generateBaseResourceRequest(options)
        const body = options.body()

        if (request && body !== undefined) {
            return {
                ...request,
                method: 'PATCH',
                body: options.bodyMapper(body)
            }
        }

        return undefined
    }

interface PatchResourceFn {
    <TBodyEntity, TBodyDto, TResultDto, TResultEntity>(
        options: PatchResourceOptionsWithDefaultValue<TBodyEntity, TBodyDto, TResultDto, TResultEntity>
    ): HttpResourceRef<TResultEntity>

    <TBodyEntity, TBodyDto, TResultDto, TResultEntity>(
        options: PatchResourceOptions<TBodyEntity, TBodyDto, TResultDto, TResultEntity>
    ): HttpResourceRef<TResultEntity | undefined>

    text: {
        <TBodyEntity, TBodyDto, TResultEntity>(
            options: PatchResourceOptionsWithDefaultValue<TBodyEntity, TBodyDto, string, TResultEntity>
        ): HttpResourceRef<TResultEntity>

        <TBodyEntity, TBodyDto, TResultEntity>(
            options: PatchResourceOptions<TBodyEntity, TBodyDto, string, TResultEntity>
        ): HttpResourceRef<TResultEntity | undefined>
    }

    blob: {
        <TBodyEntity, TBodyDto, TResultEntity>(
            options: PatchResourceOptionsWithDefaultValue<TBodyEntity, TBodyDto, Blob, TResultEntity>
        ): HttpResourceRef<TResultEntity>

        <TBodyEntity, TBodyDto, TResultEntity>(
            options: PatchResourceOptions<TBodyEntity, TBodyDto, Blob, TResultEntity>
        ): HttpResourceRef<TResultEntity | undefined>
    }
}

export const patchResource: PatchResourceFn = ((): PatchResourceFn => {
    /**
     * Patches a resource at the given URL, maps the body and optionally the response using the given mappers.
     * The url parameter is a function to allow for dynamic URL generation based on signals. When a signal is used,
     * the httpResource will track changes to the signal and automatically update the URL and execute the request.
     * @param options The execution options for the patch resource function.
     */
    const patchFn = (<TBodyEntity, TBodyDto, TResultDto, TResultEntity>(
        options: PatchResourceOptions<TBodyEntity, TBodyDto, TResultDto, TResultEntity>
    ): HttpResourceRef<TResultEntity | undefined> =>
        httpResource<TResultEntity>(
            _generatePatchResourceRequest(options),
            generateBaseHttpResourceOptions(options)
        )) as PatchResourceFn

    /**
     * Patches a resource at the given URL, maps the body and optionally the response using the given mappers.
     * Reads the result as text.
     * The url parameter is a function to allow for dynamic URL generation based on signals. When a signal is used,
     * the httpResource will track changes to the signal and automatically update the URL and execute the request.
     * @param options The execution options for the patch resource function.
     */
    patchFn.text = (<TBodyEntity, TBodyDto, TResultEntity>(
        options: PatchResourceOptions<TBodyEntity, TBodyDto, string, TResultEntity>
    ): HttpResourceRef<TResultEntity | undefined> =>
        httpResource.text<TResultEntity>(
            _generatePatchResourceRequest(options),
            generateBaseHttpResourceOptions(options)
        )) as PatchResourceFn['text']

    patchFn.blob = (<TBodyEntity, TBodyDto, TResultEntity>(
        options: PatchResourceOptions<TBodyEntity, TBodyDto, Blob, TResultEntity>
    ): HttpResourceRef<TResultEntity | undefined> =>
        httpResource.blob<TResultEntity>(
            _generatePatchResourceRequest(options),
            generateBaseHttpResourceOptions(options)
        )) as PatchResourceFn['blob']

    return patchFn
})()
