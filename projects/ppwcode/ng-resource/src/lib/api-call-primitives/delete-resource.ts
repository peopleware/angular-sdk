import { HttpResourceOptions, HttpResourceRef, HttpResourceRequest, httpResource } from '@angular/common/http'
import { BaseResourceOptions, BaseResourceOptionsWithDefaultValue } from './base/base-resource-options'
import { generateBaseResourceRequest } from './base/generate-base-resource-request'

/**
 * The options for executing the deleteResource function.
 */
export type DeleteResourceOptions = Omit<BaseResourceOptions<string, null>, 'responseMapper'>

export interface DeleteResourceOptionsWithBody<TBodyEntity, TBodyDto> extends DeleteResourceOptions {
    /** The body to send with the request. */
    body: () => TBodyEntity | undefined
    /** The mapper to map the body to the desired DTO format. */
    bodyMapper: (body: TBodyEntity) => TBodyDto
}

export type DeleteResourceOptionsWithDefaultValue = Omit<
    BaseResourceOptionsWithDefaultValue<string, null>,
    'responseMapper'
>

const hasBody = <TBodyEntity, TBodyDto>(
    options: DeleteResourceOptions | DeleteResourceOptionsWithBody<TBodyEntity, TBodyDto>
): options is DeleteResourceOptionsWithBody<TBodyEntity, TBodyDto> => 'body' in options

/**
 * Function to generate a delete resource request based on the provided options.
 * @privateRemarks
 * The only reason this function is exported is to allow for testing.
 * @param options The options to generate the delete resource request.
 */
export const _generateDeleteResourceRequest =
    <TBodyEntity = never, TBodyDto = never>(
        options: DeleteResourceOptions | DeleteResourceOptionsWithBody<TBodyEntity, TBodyDto>
    ): (() => HttpResourceRequest | undefined) =>
    () => {
        const request = generateBaseResourceRequest(options)

        if (!request) {
            return undefined
        }

        if (hasBody(options)) {
            const body = options.body()

            if (body === undefined) {
                return undefined
            }

            return {
                ...request,
                method: 'DELETE',
                body: options.bodyMapper(body)
            }
        }

        return {
            ...request,
            method: 'DELETE'
        }
    }

interface DeleteResourceFn {
    (options: DeleteResourceOptionsWithDefaultValue): HttpResourceRef<null>
    <TBodyEntity, TBodyDto>(
        options: DeleteResourceOptionsWithBody<TBodyEntity, TBodyDto>
    ): HttpResourceRef<null | undefined>
    (options: DeleteResourceOptions): HttpResourceRef<null | undefined>
}

export const deleteResource: DeleteResourceFn = ((
    options: DeleteResourceOptions
): HttpResourceRef<null | undefined> => {
    const resourceOptions: HttpResourceOptions<null, string> = {
        parse: () => null,
        defaultValue: options.resourceOptions?.defaultValue
    }

    return httpResource.text<null>(_generateDeleteResourceRequest(options), resourceOptions)
}) as DeleteResourceFn
