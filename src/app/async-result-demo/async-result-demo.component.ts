import { AsyncPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { AsyncResultModule, createFailedAsyncResult, createSuccessAsyncResult, AsyncResult, isAsyncResult } from '@ppwcode/ng-async'
import { BehaviorSubject } from 'rxjs'
import { delay, map, of } from 'rxjs'
import { executeAsyncOperation } from '@ppwcode/ng-async'

interface DemoItem {
    id: number
    name: string
}

@Component({
    selector: 'ppw-async-result-demo',
    standalone: true,
    imports: [AsyncResultModule, MatButtonModule, AsyncPipe],
    templateUrl: './async-result-demo.component.html',
    styleUrl: './async-result-demo.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsyncResultDemoComponent {
    readonly asyncResult = signal<AsyncResult<DemoItem[] | null, null> | null>(null)
    readonly isAsyncResultGuardResult = signal<string>('')

    readonly isLoading$ = new BehaviorSubject<boolean>(false)

    setInitial(): void {
        this.asyncResult.set({
            status: 'initial',
            entity: null,
            filters: null
        })
        this.isLoading$.next(false)
    }

    setSuccess(): void {
        this.asyncResult.set(
            createSuccessAsyncResult<DemoItem[], null>([
                { id: 1, name: 'Alpha' },
                { id: 2, name: 'Beta' }
            ])
        )
        this.isLoading$.next(false)
    }

    setEmpty(): void {
        this.asyncResult.set(createSuccessAsyncResult<DemoItem[] | null>(null))
        this.isLoading$.next(false)
    }

    setFailed(): void {
        this.asyncResult.set(
            createFailedAsyncResult(new Error('Something went wrong'), [], null)
        )
        this.isLoading$.next(false)
    }

    async simulateLoad(): Promise<void> {
        const result$ = of(
            createSuccessAsyncResult<DemoItem[], null>([{ id: 1, name: 'Loaded' }])
        ).pipe(
            delay(1500),
            map((r) => r)
        )
        await executeAsyncOperation(
            result$,
            {
                success: (r) => this.asyncResult.set(r),
                error: (r) => this.asyncResult.set(r)
            },
            this.isLoading$,
            true,
            false
        )
    }

    checkIsAsyncResult(): void {
        const current = this.asyncResult()
        const result = isAsyncResult(current) ? `Yes, status: ${current.status}` : 'No'
        this.isAsyncResultGuardResult.set(result)
    }
}
