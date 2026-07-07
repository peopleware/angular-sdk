import { InjectionToken, ValueProvider } from '@angular/core'

export interface PpwcodeCommonComponentsProviderOptions {
    translationKeys?: PartialPpwcodeCommonComponentsTranslationKeys
}

export interface PpwcodeCommonComponentsTranslationKeys {
    loader: {
        loading: string
    }
    table: {
        collapseRow: string
        expandRow: string
    }
}

export type PartialPpwcodeCommonComponentsTranslationKeys = {
    loader?: Partial<PpwcodeCommonComponentsTranslationKeys['loader']>
    table?: Partial<PpwcodeCommonComponentsTranslationKeys['table']>
}

export const DEFAULT_PPWCODE_COMMON_COMPONENTS_TRANSLATION_KEYS: PpwcodeCommonComponentsTranslationKeys = {
    loader: {
        loading: 'Loading'
    },
    table: {
        collapseRow: 'Collapse row',
        expandRow: 'Expand row'
    }
}

export const PPWCODE_COMMON_COMPONENTS_TRANSLATION_KEYS = new InjectionToken<PpwcodeCommonComponentsTranslationKeys>(
    'PPWCODE_COMMON_COMPONENTS_TRANSLATION_KEYS',
    {
        providedIn: 'root',
        factory: () => DEFAULT_PPWCODE_COMMON_COMPONENTS_TRANSLATION_KEYS
    }
)

export const providePpwcodeCommonComponentsTranslations = (
    options?: PpwcodeCommonComponentsProviderOptions
): ValueProvider => ({
    provide: PPWCODE_COMMON_COMPONENTS_TRANSLATION_KEYS,
    useValue: {
        loader: {
            ...DEFAULT_PPWCODE_COMMON_COMPONENTS_TRANSLATION_KEYS.loader,
            ...options?.translationKeys?.loader
        },
        table: {
            ...DEFAULT_PPWCODE_COMMON_COMPONENTS_TRANSLATION_KEYS.table,
            ...options?.translationKeys?.table
        }
    }
})
