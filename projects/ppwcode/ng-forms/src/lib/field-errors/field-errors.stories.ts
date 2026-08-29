import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { form, FormField, minLength, required, ValidationError } from '@angular/forms/signals'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite'
import { providePpwcodeNgForms } from '../provider/provider'
import { FieldErrorsComponent } from './field-errors.component'

@Component({
    selector: 'ppw-field-errors-story',
    imports: [FieldErrorsComponent, FormField, MatFormFieldModule, MatInputModule],
    template: `
        <mat-form-field>
            <mat-label>Username</mat-label>
            <input matInput [formField]="form.username" />
            <ppw-field-errors matError [field]="form.username" />
        </mat-form-field>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
class FieldErrorsStoryComponent {
    readonly #model = signal({ username: '' })
    protected readonly form = form(this.#model, (path) => {
        required(path.username, { message: () => 'This field is required' })
        minLength(path.username, 3)
    })
}

const translateFieldError = (error: ValidationError.WithFieldTree): string => {
    if (error.message) {
        // When a message is explicitly set by the validator, show that message.
        // required(path.username, { message: () => 'This field is required' })
        return error.message
    }

    // The kind property contains the kind of error (required, maxLength, minLength, ...), you can use that
    // for generic error messages using ngx-translate:
    // `return inject(TranslateService).instant('validation' + error.kind)`
    return `Validation failed: ${error.kind}`
}

const meta: Meta<FieldErrorsStoryComponent> = {
    title: 'ng-forms/FieldErrors',
    component: FieldErrorsStoryComponent,
    subcomponents: { FieldErrorsComponent },
    decorators: [
        moduleMetadata({
            imports: [FieldErrorsStoryComponent]
        }),
        applicationConfig({
            providers: [
                providePpwcodeNgForms({
                    errorTranslator: translateFieldError
                })
            ]
        })
    ],
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Displays the first validation error for an Angular signal-forms field. The message is resolved by the error translator configured through `providePpwcodeNgForms`.'
            }
        }
    },
    argTypes: {}
}

export default meta
type Story = StoryObj<FieldErrorsStoryComponent>

export const Default: Story = {}
