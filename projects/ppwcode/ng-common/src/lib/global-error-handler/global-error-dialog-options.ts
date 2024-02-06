import { InjectionToken } from '@angular/core'

export const GLOBAL_ERROR_DIALOG_OPTIONS = new InjectionToken<GlobalErrorDialogOptions>('GLOBAL_ERROR_DIALOG_OPTIONS')

export interface GlobalErrorDialogOptions {
    /**
     * Whether the dialog should be shown. Defaults to false.
     */
    allowIgnore?: boolean
    messages: {
        /**
         * The translation key to use for the title of the dialog.
         */
        title: string
        /**
         * The translation key to use for the title of the expansion panel.
         */
        singleErrorDetails: string
        /**
         * The translation key to use for the button to copy a single error to the clipboard.
         * Optional. Must be provided if `copy.singleError` is true or unset.
         */
        copySingleError?: string
        /**
         * The translation key to use for the button to copy all errors to the clipboard.
         * Optional. Must be provided if `copy.allErrors` is true or unset.
         */
        copyAllErrors?: string
        /**
         * The translation key to use for the button to go to the home page.
         * Optional. Must be provided if `navigation.home` is true or unset.
         */
        goHome?: string
        /**
         * The translation key to use for the button to reload the page.
         * Optional. Must be provided if `navigation.reload` is true or unset.
         */
        reload?: string
        /**
         * The translation key to use for the button to ignore the error.
         * Optional. Must be provided if `allowIgnore` is true.
         */
        ignore?: string
        /**
         * Message to show instead of the actual error messages. When this is set, the actual error messages are not shown.
         */
        genericErrorMessage?: string
    }
    copy?: {
        /**
         * Whether copying a single error is supported. Defaults to true.
         */
        singleError?: boolean
        /**
         * Whether copying all errors is supported. Defaults to true.
         */
        allErrors?: boolean
    }
    navigation?: {
        /**
         * Whether the "go home" button is supported. Defaults to true.
         */
        home?: boolean
        /**
         * Whether the "reload" button is supported. Defaults to true.
         */
        reload?: boolean
    }
}
