import { Injectable, inject, computed } from '@angular/core'
import { SignalStore } from '@ppwcode/ng-state-management'

export interface DemoItem {
    id: number
    name: string
}

interface DemoItemState extends Record<string, unknown> {
    items: DemoItem[]
    isLoading: boolean
    searchTerm: string
}

@Injectable({ providedIn: 'root' })
export class DemoItemStore extends SignalStore<DemoItemState> {
    constructor() {
        super()
        this.initialize<keyof DemoItemState>({
            items: [],
            isLoading: false,
            searchTerm: ''
        })
    }

    filteredItems = this.selectMany(['items', 'searchTerm'], ({ items, searchTerm }) =>
        searchTerm
            ? items.filter((item) =>
                  item.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : items
    )

    async loadItems(): Promise<void> {
        this.patch({ isLoading: true })
        await new Promise((r) => setTimeout(r, 800))
        this.patch({
            items: [
                { id: 1, name: 'Alpha' },
                { id: 2, name: 'Beta' },
                { id: 3, name: 'Gamma' }
            ],
            isLoading: false
        })
    }

    setSearchTerm(searchTerm: string): void {
        this.patch({ searchTerm })
    }
}
