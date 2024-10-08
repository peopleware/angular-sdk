import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { LoaderComponent, MessageBarComponent } from '@ppwcode/ng-common-components'
import {
    PpwAsyncResultEmptyDirective,
    PpwAsyncResultInitialDirective,
    PpwAsyncResultSuccessDirective
} from './async-result-directives'
import { AsyncResultComponent } from './async-result.component'

@NgModule({
    declarations: [
        AsyncResultComponent,
        PpwAsyncResultInitialDirective,
        PpwAsyncResultSuccessDirective,
        PpwAsyncResultEmptyDirective
    ],
    exports: [
        AsyncResultComponent,
        PpwAsyncResultInitialDirective,
        PpwAsyncResultSuccessDirective,
        PpwAsyncResultEmptyDirective
    ],
    imports: [CommonModule, MessageBarComponent, TranslateModule, LoaderComponent]
})
export class AsyncResultModule {}
