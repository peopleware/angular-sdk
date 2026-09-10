import { provideHttpClient } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, DestroyRef, ErrorHandler, inject, input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { provideRouter, withDisabledInitialNavigation } from '@angular/router'
import { provideTranslateService, TranslateModule } from '@ngx-translate/core'
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader'
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite'
import { GlobalErrorDialogOptions } from './global-error-dialog-options'
import { GlobalErrorDialogComponent } from './global-error-dialog.component'
import { GlobalErrorHandler } from './global-error-handler'
import { ERROR_HANDLERS } from './multi-error-handler'
import { provideGlobalErrorHandler } from './provider'

const errorMessage = 'This is a test error invoked by the button!'
const secondErrorMessage = 'A second operation failed while handling the request.'

@Component({
    selector: 'ppw-global-error-handler-story',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatButtonModule, TranslateModule],
    template: `
        <div class="flex-column gap-16 padding-8">
            <p>Report an error to open the global error dialog. Use Ignore to dismiss it and try again.</p>
            <div>
                <button mat-raised-button type="button" (click)="reportError()">Invoke error</button>
            </div>
        </div>
    `
})
class GlobalErrorHandlerStoryComponent {
    readonly multipleErrors = input(false)
    readonly #errorHandler = inject(ErrorHandler)
    readonly #globalHandler = inject(ERROR_HANDLERS).find(
        (handler): handler is GlobalErrorHandler => handler instanceof GlobalErrorHandler
    )

    constructor() {
        inject(DestroyRef).onDestroy(() => this.#globalHandler?.dialogRef?.close())
    }

    protected reportError(): void {
        this.#errorHandler.handleError(new Error(errorMessage))
        if (this.multipleErrors()) {
            this.#errorHandler.handleError(new Error(secondErrorMessage))
        }
    }
}

const dialogOptions = (genericMessage = false): GlobalErrorDialogOptions => ({
    allowIgnore: true,
    navigation: { home: false, reload: false },
    messages: {
        title: 'global-error-dialog.title',
        singleErrorDetails: 'global-error-dialog.single-error-details',
        copySingleError: 'global-error-dialog.copy-single-error',
        copyAllErrors: 'global-error-dialog.copy-all-errors',
        ignore: 'global-error-dialog.ignore',
        ...(genericMessage ? { genericErrorMessage: 'global-error-dialog.generic-error-message' } : {})
    }
})

const meta: Meta<GlobalErrorHandlerStoryComponent> = {
    title: 'ng-common/GlobalErrorHandler',
    component: GlobalErrorHandlerStoryComponent,
    subcomponents: { GlobalErrorDialogComponent },
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({ imports: [GlobalErrorHandlerStoryComponent, MatDialogModule, TranslateModule] }),
        applicationConfig({
            providers: [
                provideHttpClient(),
                provideRouter([], withDisabledInitialNavigation()),
                provideTranslateService({
                    lang: 'en',
                    fallbackLang: 'en',
                    loader: provideTranslateHttpLoader({ prefix: '/assets/i18n/', suffix: '.json' })
                })
            ]
        })
    ],
    argTypes: {
        multipleErrors: {
            control: 'boolean',
            description: 'Report two errors synchronously so the handler collects them in one dialog.'
        }
    },
    parameters: {
        docs: {
            description: {
                component: `Register \`provideGlobalErrorHandler({ errorDialogOptions })\` in application providers to handle Angular errors. These stories call the injected \`ErrorHandler.handleError(new Error(...))\` explicitly and use the real handler and dialog. Each reported error is intentionally logged to the console.

The story providers set \`allowIgnore: true\` and \`navigation: { home: false, reload: false }\`, omitting the unused navigation message keys. Clipboard actions remain real. The generic message hides technical details on screen; Copy All Errors still copies the underlying errors. Translations come from the demo application's English assets.`
            }
        }
    }
}

export default meta
type Story = StoryObj<GlobalErrorHandlerStoryComponent>

export const SingleError: Story = {
    args: { multipleErrors: false },
    decorators: [applicationConfig({ providers: provideGlobalErrorHandler({ errorDialogOptions: dialogOptions() }) })]
}

export const MultipleErrors: Story = {
    args: { multipleErrors: true },
    decorators: [applicationConfig({ providers: provideGlobalErrorHandler({ errorDialogOptions: dialogOptions() }) })]
}

export const GenericMessage: Story = {
    args: { multipleErrors: false },
    decorators: [
        applicationConfig({ providers: provideGlobalErrorHandler({ errorDialogOptions: dialogOptions(true) }) })
    ]
}
