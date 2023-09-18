import { PageEvent } from '@angular/material/paginator'
import { distinctUntilChanged, map, Observable } from 'rxjs'
import { watchNumberQueryParam } from '../routing'
import { Constructor } from '@ppwcode/ng-common'
import { RelativeNavigationCtor } from '../relative-navigation'

/**
 * Interface describing something that supports pagination.
 */
export interface CanPage {
    /** Stream emitting with the new page value. */
    page$: Observable<number>
    /** The number of items on a single page. */
    pageSize$: Observable<number>

    /** Handler for when the page should be changed. */
    handlePageEvent(e: PageEvent, queryParamName?: string): Promise<void>

    /** Returns an observable stream that watches the given query parameter to be used as a page index. */
    watchPageIndexParam(paramName: string): Observable<number>

    /** Returns an observable stream that watches the given query parameter to be used as a page size. */
    watchPageSizeParam(paramName: string): Observable<number>
}

/** A constructable type that implements the CanPage interface. */
export type CanPageCtor = Constructor<CanPage>

/**
 * Enhances the given base class with functionality for pagination based on query parameters.
 * @param base The base class that already implements functionality for relative navigation.
 */
export const mixinPagination = <T extends RelativeNavigationCtor>(base: T): T & CanPageCtor => {
    return class extends base implements CanPage {
        public page$ = this.watchPageIndexParam('page')
        public pageSize$ = this.watchPageSizeParam('pageSize')
        public defaultPageSize = 20

        public async handlePageEvent(e: PageEvent, queryParamName = 'page'): Promise<void> {
            await this.relativeNavigation([], {
                queryParams: {
                    [queryParamName]: e.pageIndex + 1
                },
                queryParamsHandling: 'merge'
            })
        }

        public watchPageIndexParam(paramName: string): Observable<number> {
            return watchNumberQueryParam(paramName).pipe(
                map((page: number) => (page < 1 ? 1 : page)),
                distinctUntilChanged()
            )
        }

        public watchPageSizeParam(paramName: string): Observable<number> {
            return watchNumberQueryParam(paramName).pipe(
                map((pageSize: number) => (pageSize < 1 ? this.defaultPageSize : pageSize)),
                distinctUntilChanged()
            )
        }
    }
}
