import type { HttpErrorResponse } from '@angular/common/http'
import { InjectionToken, ValueProvider } from '@angular/core'

/** Type definition for a function that extracts an error from an HttpErrorResponse. */
export type PpwResourceErrorExtractor = (error: HttpErrorResponse) => Error

/** Injection token for providing a custom error extractor for PpwResource. */
export const PPW_RESOURCE_ERROR_EXTRACTOR = new InjectionToken<PpwResourceErrorExtractor>(
    'PPW_RESOURCE_ERROR_EXTRACTOR'
)

/**
 * Provides a custom error extractor for PpwResource.
 * @param extractor The error extractor function to provide.
 * @returns A ValueProvider for the PPW_RESOURCE_ERROR_EXTRACTOR token.
 */
export const providePpwResourceErrorExtractor = (extractor: PpwResourceErrorExtractor): ValueProvider => ({
    provide: PPW_RESOURCE_ERROR_EXTRACTOR,
    useValue: extractor
})
