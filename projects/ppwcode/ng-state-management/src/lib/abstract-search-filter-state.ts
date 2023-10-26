import { inject } from '@angular/core'
import { SESSION_STORAGE_TOKEN } from '@ppwcode/ng-common'
import { SignalStore } from './signal-store/signal-store'

export abstract class AbstractSearchFilterState<
    TStateModel extends Record<string, unknown>
> extends SignalStore<TStateModel> {
    private sessionStorage: Storage | null = inject(SESSION_STORAGE_TOKEN, { optional: true })

    abstract readonly sessionStorageKey: string

    abstract getDefaultValues(): TStateModel

    protected constructor() {
        super()

        this.initialize(this.getDefaultValues())
        this.loadInitialState()
    }

    public saveSearchFilters<TKey extends keyof TStateModel>(key: TKey, value: TStateModel[TKey]): void {
        this.patch({ [key]: value } as unknown as Partial<TStateModel>)
        this.sessionStorage?.setItem(this.sessionStorageKey, JSON.stringify(this.snapshot))
    }

    private loadInitialState(): void {
        const sessionStorageValue = this.sessionStorage?.getItem(this.sessionStorageKey)
        if (sessionStorageValue) {
            this.patch(JSON.parse(sessionStorageValue))
        }
    }

    public clearState(): void {
        this.patch(this.getDefaultValues())
        this.sessionStorage?.removeItem(this.sessionStorageKey)
    }
}
