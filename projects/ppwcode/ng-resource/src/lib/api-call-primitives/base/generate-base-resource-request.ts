import { HttpResourceRequest } from '@angular/common/http'
import { BaseResourceOptions } from './base-resource-options'
import { getRequestHeaders } from './get-request-headers'
import { getRequestUrl } from './get-request-url'

export const generateBaseResourceRequest = <TResultDto, TResultEntity>(
    options: BaseResourceOptions<TResultDto, TResultEntity>
): Pick<HttpResourceRequest, 'url' | 'headers'> | undefined => {
    const url = getRequestUrl(options.url, options.requestOptions?.queryParams)
    if (!url) {
        return undefined
    }

    return {
        url,
        headers: getRequestHeaders(options.requestOptions?.headers)
    }
}
