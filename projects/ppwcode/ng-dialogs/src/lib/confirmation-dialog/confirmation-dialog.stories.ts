import { ChangeDetectionStrategy, Component, inject, Injectable, input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import {
    MissingTranslationHandler,
    MissingTranslationHandlerParams,
    provideTranslateService,
    TranslateParser
} from '@ngx-translate/core'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import {
    ConfirmationDialogButtonOptions,
    ConfirmationDialogComponent,
    ConfirmationDialogData
} from './confirmation-dialog.component'
import { expect, userEvent, within } from 'storybook/test'

@Injectable()
class TranslateIdentityParser extends TranslateParser {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    public interpolate(expr: string | Function, params?: Record<string, unknown>): string {
        if (typeof expr === 'function') {
            return expr(params)
        }
        if (!params) {
            return expr
        }
        return expr.replace(/{{\s?([^{}\s]*)\s?}}/g, (substring: string, key: string) => {
            const value = params[key.trim()]
            return value !== undefined ? String(value) : substring
        })
    }

    public getValue(target: Record<string, unknown>, key: string): unknown {
        return target[key] || key
    }
}

@Injectable()
class StorybookMissingTranslationHandler implements MissingTranslationHandler {
    private parser = inject(TranslateParser)

    handle(params: MissingTranslationHandlerParams) {
        const { key, interpolateParams } = params
        return this.parser.interpolate(key, interpolateParams)
    }
}

@Component({
    selector: 'ppw-confirmation-dialog-launcher',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatButtonModule],
    template: `
        <div style="display: flex; justify-content: center; padding: 32px;">
            <button mat-flat-button color="primary" (click)="open()">Open Confirmation Dialog</button>
        </div>
    `
})
class ConfirmationDialogLauncherComponent {
    titleKey = input('')
    bodyKey = input('')
    bodyParams = input<Record<string, unknown>>({})
    confirm = input<ConfirmationDialogButtonOptions | undefined>(undefined)
    cancel = input<ConfirmationDialogButtonOptions | undefined>(undefined)

    private dialog = inject(MatDialog)

    open(): void {
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
                titleKey: this.titleKey(),
                bodyKey: this.bodyKey(),
                bodyParams: this.bodyParams(),
                confirm: this.confirm(),
                cancel: this.cancel()
            } as ConfirmationDialogData
        })
    }
}

const meta: Meta<ConfirmationDialogLauncherComponent> = {
    title: 'ng-dialogs/ConfirmationDialog',
    component: ConfirmationDialogLauncherComponent,
    decorators: [
        moduleMetadata({
            imports: [ConfirmationDialogComponent, MatDialogModule, MatButtonModule]
        }),
        applicationConfig({
            providers: [
                provideNoopAnimations(),
                provideTranslateService({
                    defaultLanguage: 'en',
                    parser: { provide: TranslateParser, useClass: TranslateIdentityParser },
                    missingTranslationHandler: {
                        provide: MissingTranslationHandler,
                        useClass: StorybookMissingTranslationHandler
                    }
                })
            ]
        })
    ],
    argTypes: {
        titleKey: {
            description: 'The translation key for the dialog title.',
            control: 'text',
            table: { category: 'Inputs' }
        },
        bodyKey: {
            description: 'The translation key for the dialog body text.',
            control: 'text',
            table: { category: 'Inputs' }
        },
        bodyParams: {
            description: 'Optional parameters for the body translation key.',
            control: 'object',
            table: { category: 'Inputs' }
        },
        confirm: {
            description: 'Options for the confirmation button.',
            control: 'object',
            table: { category: 'Inputs' }
        },
        cancel: {
            description: 'Options for the cancel button.',
            control: 'object',
            table: { category: 'Inputs' }
        }
    }
}

export default meta
type Story = StoryObj<ConfirmationDialogLauncherComponent>

export const Default: Story = {
    args: {
        titleKey: 'Confirmation Title',
        bodyKey: 'Are you sure you want to perform this action?',
        confirm: { key: 'Confirm' },
        cancel: { key: 'Cancel' }
    }
}

export const ConfirmOnly: Story = {
    args: {
        titleKey: 'Notification',
        bodyKey: 'This action has been completed successfully.',
        confirm: { key: 'Close' }
    }
}

export const CustomColors: Story = {
    args: {
        titleKey: 'Danger Zone',
        bodyKey: 'This will permanently delete the record. Proceed?',
        confirm: { key: 'Delete', color: 'warn', type: 'filled' },
        cancel: { key: 'Keep', type: 'outlined' }
    }
}

export const WithParams: Story = {
    args: {
        titleKey: 'Delete User',
        bodyKey: 'Are you sure you want to delete user {{ name }}?',
        bodyParams: { name: 'John Doe' },
        confirm: { key: 'Delete', color: 'warn' },
        cancel: { key: 'Cancel' }
    }
}

export const WithoutIcons: Story = {
    args: {
        titleKey: 'Simple Dialog',
        bodyKey: 'Do you want to continue?',
        confirm: { key: 'Yes', hideIcon: true },
        cancel: { key: 'No', hideIcon: true }
    }
}

export const AutoOpen: Story = {
    ...Default,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const openButton = canvas.getByRole('button', { name: /Open Confirmation Dialog/i })
        await expect(openButton).toBeInTheDocument()
        await userEvent.click(openButton)
    }
}
