import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { LoaderComponent, MessageBarComponent } from '@ppwcode/ng-common-components'
import { AsyncResultComponent } from './async-result.component'
import { PpwAsyncResultEmptyDirective } from './ppw-async-result-empty.directive'
import { PpwAsyncResultInitialDirective } from './ppw-async-result-initial.directive'
import { PpwAsyncResultSuccessDirective } from './ppw-async-result-success.directive'

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
    imports: [CommonModule, MessageBarComponent, TranslatePipe, TranslateDirective, LoaderComponent]
})
export class AsyncResultModule {}
