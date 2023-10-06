import { Injectable, InjectionToken, Provider } from '@angular/core'

export const SESSION_STORAGE_TOKEN = new InjectionToken<Storage>('sessionStorage')

@Injectable()
export class SessionStorageMock implements Storage {
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

export const provideSessionStorage = (): Provider => ({
    provide: SESSION_STORAGE_TOKEN,
    useFactory: () => sessionStorage
})

export const provideSessionStorageMock = (): Provider => ({
    provide: SESSION_STORAGE_TOKEN,
    useClass: SessionStorageMock
})
