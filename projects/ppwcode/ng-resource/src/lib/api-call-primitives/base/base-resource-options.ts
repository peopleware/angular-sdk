import { HttpParams, HttpResourceOptions } from '@angular/common/http'
import { RequestHeadersConfig } from './get-request-headers'
import { RequestUrlConfig } from './get-request-url'

export interface BaseResourceOptions<TResultDto, TResultEntity> {
    /** The URL to post the resource to. */
    url: RequestUrlConfig
    /** The mapper to map the raw response to the desired entity. */
    responseMapper?: (raw: TResultDto) => TResultEntity
    /** Optional request options to pass to the httpResource. */
    requestOptions?: { queryParams?: () => HttpParams; headers?: RequestHeadersConfig }
    /** Optional resource options to pass to the httpResource. */
    resourceOptions?: Pick<HttpResourceOptions<TResultEntity, TResultDto>, 'defaultValue'>
}

export type BaseResourceOptionsWithDefaultValue<TResultDto, TResultEntity> = BaseResourceOptions<
    TResultDto,
    TResultEntity
> & {
    resourceOptions: NonNullable<BaseResourceOptions<TResultDto, TResultEntity>['resourceOptions']> & {
        defaultValue: TResultEntity
    }
}
