import { InjectionToken, ValueProvider } from '@angular/core'

export interface WireframeOptions {
    showToolbar?: boolean
}

const defaultWireframeOptions: WireframeOptions = {
    showToolbar: true
}

export const WIREFRAME_OPTIONS = new InjectionToken<WireframeOptions>('WireframeOptions', {
    factory: () => defaultWireframeOptions
})

export const provideWireframeOptions = (options?: WireframeOptions): ValueProvider => ({
    provide: WIREFRAME_OPTIONS,
    useValue: options ? options : defaultWireframeOptions
})
