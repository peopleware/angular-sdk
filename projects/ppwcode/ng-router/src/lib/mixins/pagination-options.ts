import { InjectionToken, ValueProvider } from '@angular/core'

/**
 * Interface describing the default options for pagination within the application.
 */
export interface PaginationOptions {
    /**
     * Enable this when you don't want the URL to change when navigating to a different page in the data set.
     * This is useful for when you don't want the URL to contain the page and page size parameters and ensures
     * that the first page of the data set is show again when refreshing the browser page.
     * This defaults to `false`, meaning that the URL query parameters will be visible in the URL.
     */
    skipLocationChange?: boolean
}

/** Injection token for the pagination options. */
export const PAGINATION_OPTIONS: InjectionToken<PaginationOptions> = new InjectionToken<PaginationOptions>(
    'Pagination options'
)

/**
 * Provides the default pagination options for the application.
 * @param options The pagination options to provide.
 */
export const providePaginationOptions = (options: PaginationOptions): ValueProvider => {
    return {
        provide: PAGINATION_OPTIONS,
        useValue: options
    }
}
