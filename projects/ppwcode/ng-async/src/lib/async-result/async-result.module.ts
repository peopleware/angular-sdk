import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MtxLoaderModule } from '@ng-matero/extensions/loader'
import { TranslateModule } from '@ngx-translate/core'
import { MessageBarComponent } from '@ppwcode/ng-common-components'
import { PpwAsyncResultInitialDirective, PpwAsyncResultSuccessDirective } from './async-result-directives'
import { AsyncResultComponent } from './async-result.component'

@NgModule({
    declarations: [AsyncResultComponent, PpwAsyncResultInitialDirective, PpwAsyncResultSuccessDirective],
    exports: [AsyncResultComponent, PpwAsyncResultInitialDirective, PpwAsyncResultSuccessDirective],
    imports: [CommonModule, MessageBarComponent, TranslateModule, MtxLoaderModule]
})
export class AsyncResultModule {}
