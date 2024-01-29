import { InjectionToken, Type } from '@angular/core'

export interface PpwAsyncResultDefaultOptions {
    emptyResultComponent?: Type<unknown>
}

export const PPW_ASYNC_RESULT_DEFAULT_OPTIONS = new InjectionToken<PpwAsyncResultDefaultOptions>(
    'PPW_ASYNC_RESULT_DEFAULT_OPTIONS'
)
