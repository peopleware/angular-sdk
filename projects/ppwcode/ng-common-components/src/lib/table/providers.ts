import { InjectionToken, Type } from '@angular/core'

export const PPW_TABLE_DEFAULT_OPTIONS = new InjectionToken<PpwTableDefaultOptions>('PPW_TABLE_DEFAULT_OPTIONS')

export interface PpwTableDefaultOptions {
    dateColumnFormatter?: (value: unknown) => string
    numberColumnFormatter?: (value: unknown) => string
    emptyPageComponent?: Type<unknown>
}
