import { CommonModule } from '@angular/common'
import { Component, ContentChild, Input, TemplateRef } from '@angular/core'
import { MtxLoaderModule } from '@ng-matero/extensions/loader'
import { TranslateModule } from '@ngx-translate/core'
import { AsyncResult } from '../models/async-result'
import { MessageBarComponent, Severity } from '@ppwcode/ng-common-components'

@Component({
    selector: 'ppw-async-result',
    templateUrl: './async-result.component.html',
    standalone: true,
    imports: [CommonModule, MessageBarComponent, TranslateModule, MtxLoaderModule]
})
export class AsyncResultComponent {
    @Input({ required: true }) public asyncResult?: AsyncResult<unknown, unknown> | null
    @Input() public pending?: boolean | null = null

    /* eslint-disable @typescript-eslint/no-explicit-any */
    @ContentChild('success', { read: TemplateRef }) public successTemplate!: TemplateRef<any>
    @ContentChild('initial', { read: TemplateRef }) public initialTemplate?: TemplateRef<any>
    /* eslint-enable @typescript-eslint/no-explicit-any */

    public get hasFailed(): boolean {
        return this.asyncResult?.status === 'failed'
    }

    public get isInitial(): boolean {
        return this.asyncResult?.status === 'initial'
    }

    public readonly errorSeverity: Severity = Severity.error
}
