import { Component, ContentChild, inject, Input, TemplateRef, Type } from '@angular/core'
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
    templateUrl: './async-result.component.html'
})
export class AsyncResultComponent {
    #asyncResultDefaultOptions: PpwAsyncResultDefaultOptions | null = inject(PPW_ASYNC_RESULT_DEFAULT_OPTIONS, {
        optional: true
    })

    @Input({ required: true }) public asyncResult?: AsyncResult<unknown, unknown> | null
    @Input() public pending?: boolean | null = null

    @ContentChild(PpwAsyncResultSuccessDirective, { read: TemplateRef }) public successTemplate!: TemplateRef<unknown>
    @ContentChild(PpwAsyncResultInitialDirective, { read: TemplateRef }) public initialTemplate?: TemplateRef<unknown>
    @ContentChild(PpwAsyncResultEmptyDirective, { read: TemplateRef }) public emptyTemplate?: TemplateRef<unknown>

    public get asyncResultDefaultEmptyComponent(): Type<unknown> | undefined {
        return this.#asyncResultDefaultOptions?.emptyResultComponent
    }

    public readonly errorSeverity: Severity = Severity.error
}
