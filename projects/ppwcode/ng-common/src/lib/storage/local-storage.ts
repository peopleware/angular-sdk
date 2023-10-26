import { Injectable, InjectionToken, Provider } from '@angular/core'

export const LOCAL_STORAGE_TOKEN = new InjectionToken<Storage>('localStorage')

@Injectable()
export class LocalStorageMock implements Storage {
    private data: Record<string, string> = {}

    public get length(): number {
        return Object.keys(this.data).length
    }

    clear(): void {
        this.data = {}
    }

    getItem(key: string): string | null {
        return this.data[key] || null
    }

    key(index: number): string | null {
        const keys = Object.keys(this.data)
        return keys[index] || null
    }

    removeItem(key: string): void {
        delete this.data[key]
    }

    setItem(key: string, value: string): void {
        this.data[key] = value
    }
}

export const provideLocalStorage = (): Provider => ({
    provide: LOCAL_STORAGE_TOKEN,
    useFactory: () => localStorage
})

export const provideLocalStorageMock = (): Provider => ({
    provide: LOCAL_STORAGE_TOKEN,
    useClass: LocalStorageMock
})
