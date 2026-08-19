import { InjectionToken, ValueProvider } from '@angular/core'
import { GlobalPositionStrategy } from '@angular/cdk/overlay'

export interface PpwcodeCommonComponentsProviderOptions {
    translationKeys: PpwcodeCommonComponentsTranslationKeys
    notifications?: {
        positionConfigurator?: (strategy: GlobalPositionStrategy) => GlobalPositionStrategy
        defaultTimeout?: number
    }
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

export type PartialPpwcodeCommonComponentsProviderOptions = {
    translationKeys?: PartialPpwcodeCommonComponentsTranslationKeys
    notifications?: PpwcodeCommonComponentsProviderOptions['notifications']
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

export const PPWCODE_COMMON_COMPONENTS_OPTIONS = new InjectionToken<PpwcodeCommonComponentsProviderOptions>(
    'PPWCODE_COMMON_COMPONENTS_OPTIONS',
    {
        providedIn: 'root',
        factory: () => ({
            translationKeys: DEFAULT_PPWCODE_COMMON_COMPONENTS_TRANSLATION_KEYS
        })
    }
)

export const providePpwcodeCommonComponents = (
    options?: PartialPpwcodeCommonComponentsProviderOptions
): ValueProvider => ({
    provide: PPWCODE_COMMON_COMPONENTS_OPTIONS,
    useValue: {
        ...options,
        notifications: options?.notifications,
        translationKeys: {
            loader: {
                ...DEFAULT_PPWCODE_COMMON_COMPONENTS_TRANSLATION_KEYS.loader,
                ...options?.translationKeys?.loader
            },
            table: {
                ...DEFAULT_PPWCODE_COMMON_COMPONENTS_TRANSLATION_KEYS.table,
                ...options?.translationKeys?.table
            }
        }
    }
})
