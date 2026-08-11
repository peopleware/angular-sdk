import { HttpResourceOptions } from '@angular/common/http'
import { BaseResourceOptions, BaseResourceOptionsWithDefaultValue } from './base-resource-options'

/**
 * Generates the base HTTP resource options by combining the provided resource options
 * with a default value for the result entity.
 *
 * @param options The base resource options that include the default value and configuration
 *                for transforming between DTOs and entities.
 * @return A merged object containing the HTTP resource options and the default value
 *         for the result entity.
 */
export function generateBaseHttpResourceOptions<TResultDto, TResultEntity>(
    options: BaseResourceOptionsWithDefaultValue<TResultDto, TResultEntity>
): HttpResourceOptions<TResultEntity, unknown> & { defaultValue: TResultEntity }

/**
 * Generates the base HTTP resource options by transforming the provided resource configuration.
 *
 * @param options The base resource configuration, including types for both the data transfer object (DTO) and the entity.
 * @return The resulting HTTP resource options with entity transformation applied.
 */
export function generateBaseHttpResourceOptions<TResultDto, TResultEntity>(
    options: BaseResourceOptions<TResultDto, TResultEntity>
): HttpResourceOptions<TResultEntity, unknown>

export function generateBaseHttpResourceOptions<TResultDto, TResultEntity>(
    options: BaseResourceOptions<TResultDto, TResultEntity>
): HttpResourceOptions<TResultEntity, unknown> {
    return {
        // Angular uses unknown for the type of `raw`, but we know which one it is because of TResultDto so this cast is safe.
        parse: options.responseMapper as (raw: unknown) => TResultEntity,
        defaultValue: options.resourceOptions?.defaultValue
    }
}
