import { Component, contentChild, inject, input, InputSignal, Signal, TemplateRef, Type } from '@angular/core'
import { Severity } from '@ppwcode/ng-common-components'
import { AsyncResult } from '../models/async-result'
import {
    PPW_ASYNC_RESULT_DEFAULT_OPTIONS,
    PpwAsyncResultDefaultOptions
} from '../options/ppw-async-result-default-options'
import {
    PpwAsyncResultEmptyDirective,
    PpwAsyncResultInitialDirective,
    PpwAsyncResultSuccessDirective
} from './async-result-directives'

@Component({
    selector: 'ppw-async-result',
    templateUrl: './async-result.component.html',
    standalone: false
})
export class AsyncResultComponent {
    // Dependencies
    #asyncResultDefaultOptions: PpwAsyncResultDefaultOptions | null = inject(PPW_ASYNC_RESULT_DEFAULT_OPTIONS, {
        optional: true
    })

    // Inputs
    public asyncResult: InputSignal<AsyncResult<unknown, unknown> | null> = input.required<AsyncResult<
        unknown,
        unknown
    > | null>()
    public pending: InputSignal<boolean | null> = input<boolean | null>(null)

    // Content children
    public successTemplate: Signal<TemplateRef<unknown>> = contentChild.required(PpwAsyncResultSuccessDirective, {
        read: TemplateRef
    })
    public initialTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(PpwAsyncResultInitialDirective, {
        read: TemplateRef
    })
    public emptyTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(PpwAsyncResultEmptyDirective, {
        read: TemplateRef
    })

    // Getters
    public get asyncResultDefaultEmptyComponent(): Type<unknown> | undefined {
        return this.#asyncResultDefaultOptions?.emptyResultComponent
    }

    public readonly errorSeverity: Severity = Severity.error
}
