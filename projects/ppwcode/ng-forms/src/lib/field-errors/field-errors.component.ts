import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    Injector,
    input,
    runInInjectionContext
} from '@angular/core'
import { FieldTree } from '@angular/forms/signals'
import { FIELD_ERRORS_ERROR_TRANSLATOR } from '../provider/provider'

/**
 * A component responsible for displaying validation error messages for a specific field.
 *
 * This component is designed to work with a field tree structure for form validation. It
 * observes the field's validation errors and computes the first error to be displayed.
 * Additionally, it provides a mechanism to translate error messages dynamically using an
 * external translator function.
 *
 * Features:
 * - Observes a field for validation errors.
 * - Computes the first error to display.
 * - Dynamically translates error messages using the provided translator.
 * - Controls visibility of the error message based on the presence of errors.
 *
 * Dependencies:
 * - Requires a `FieldTree` input to represent the form field and its associated errors.
 * - Relies on an injected translator function to handle the translation of error messages.
 *
 * @example
 * ```html
 * <!-- Use directly and with your own styling. -->
 * <ppw-field-errors [field]="form.username" />
 *
 * <!-- Or within a mat-form-field, inheriting Material form field styling. -->
 * <mat-form-field>
 *     <mat-label>Username</mat-label>
 *     <input [formField]="form.username" />
 *     <ppw-field-errors matError [field]="form.username" />
 * </mat-form-field>
 * ```
 *
 * Relies on the presence of a provided translator function.
 * ```ts
 * // app.config.ts
 * providePpwcodeNgForms({
 *      errorTranslator: (error: ValidationError.WithFieldTree) => {
 *          const translate = inject(TranslateService)
 *          const _language = translate.currentLang() // acts as a trigger for recalculation
 *          const key = error.message ?? error.kind ?? null
 *
 *          return key ? translate.instant(key) : ''
 *      })
 * })
 * ```
 */
@Component({
    selector: 'ppw-field-errors',
    imports: [],
    templateUrl: './field-errors.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldErrorsComponent {
    readonly #injector = inject(Injector)
    readonly #translator = inject(FIELD_ERRORS_ERROR_TRANSLATOR)

    public readonly field = input.required<FieldTree<unknown>>()

    readonly #firstError = computed(() => {
        // This looks weird because of the double invocation, but it really is correct.
        // - The first brackets are used to get the FieldTree from the input binding.
        // - The second brackets are invoking the FieldTree itself to get access to methods for that field.
        return this.field()().errors()[0]
    })

    public readonly showError = computed(() => !!this.#firstError())

    public readonly displayedMessage = computed(() => {
        const firstError = this.#firstError()
        if (!firstError) {
            return
        }

        // Running this within the injection context allows the developer to use `inject` within its translator function.
        // This is necessary, so they have access to the TranslateService of ngx-translate, for example.
        // We have chosen this way of implementation so that the ng-forms package doesn't get an explicit depencency
        // on translation packages like ngx-translate.
        return runInInjectionContext(this.#injector, () => this.#translator(firstError))
    })
}
