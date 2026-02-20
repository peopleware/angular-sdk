import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { LOCAL_STORAGE_TOKEN } from '@ppwcode/ng-common'

const DEMO_KEY = 'ppw-demo-storage-key'

@Component({
    selector: 'ppw-local-storage-demo',
    standalone: true,
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule
    ],
    templateUrl: './local-storage-demo.component.html',
    styleUrl: './local-storage-demo.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalStorageDemoComponent {
    private readonly storage = inject(LOCAL_STORAGE_TOKEN)

    readonly value = new FormControl(this.storage.getItem(DEMO_KEY) ?? '', { nonNullable: true })
    readonly lastRead = signal<string | null>(this.storage.getItem(DEMO_KEY))

    save(): void {
        this.storage.setItem(DEMO_KEY, this.value.value)
        this.lastRead.set(this.value.value)
    }

    clear(): void {
        this.storage.removeItem(DEMO_KEY)
        this.value.setValue('')
        this.lastRead.set(null)
    }

    read(): void {
        this.lastRead.set(this.storage.getItem(DEMO_KEY))
    }
}
