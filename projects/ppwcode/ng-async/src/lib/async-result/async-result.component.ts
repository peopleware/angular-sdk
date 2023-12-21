import { Component, ContentChild, Input, TemplateRef } from '@angular/core'
import { Severity } from '@ppwcode/ng-common-components'
import { AsyncResult } from '../models/async-result'

@Component({
    selector: 'ppw-async-result',
    templateUrl: './async-result.component.html'
})
export class AsyncResultComponent {
    @Input({ required: true }) public asyncResult?: AsyncResult<unknown, unknown> | null
    @Input() public pending?: boolean | null = null

    @ContentChild('success', { read: TemplateRef }) public successTemplate!: TemplateRef<unknown>
    @ContentChild('initial', { read: TemplateRef }) public initialTemplate?: TemplateRef<unknown>

    public get hasFailed(): boolean {
        return this.asyncResult?.status === 'failed'
    }

    public get isInitial(): boolean {
        return this.asyncResult?.status === 'initial'
    }

    public readonly errorSeverity: Severity = Severity.error
}
