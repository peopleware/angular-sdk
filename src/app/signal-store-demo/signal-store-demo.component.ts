import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { LoaderComponent } from '@ppwcode/ng-common-components'
import { DemoItemStore } from './demo-item.store'

@Component({
    selector: 'ppw-signal-store-demo',
    standalone: true,
    imports: [MatButtonModule, MatFormFieldModule, MatInputModule, LoaderComponent],
    templateUrl: './signal-store-demo.component.html',
    styleUrl: './signal-store-demo.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignalStoreDemoComponent {
    readonly store = inject(DemoItemStore)

    onSearchTermChange(value: string): void {
        this.store.setSearchTerm(value)
    }
}
