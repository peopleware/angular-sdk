// Copied from https://stackblitz.com/edit/stackblitz-starters-8wuadn?file=src%2Fcomponents%2Fsmart%2Fmodels%2Fmodels.component.ts
import { computed, effect, Injectable, Signal, signal, WritableSignal } from '@angular/core'

type Signals<T> = { [P in keyof T]: WritableSignal<T[P]> }
type SpecificKeysOfObj<T> = { [P in keyof T]: T[P] }
type SpecificKeysOfObjAsSignals<T> = { [P in keyof T]: Signal<T[P]> }

@Injectable()
export class SignalStore<T extends Record<string, unknown>> {
    private readonly notInitializedError =
        'Signal state is not initialized yet, call the initialize() method before using any other methods'
    private signals: Signals<T> | undefined

    /**
     * Initializes the state with default values
     */
    protected initialize<P extends keyof T>(state: T): void {
        const signals: Partial<Signals<T>> = {}
        ;(Object.keys(state) as P[]).forEach((key) => {
            signals[key] = signal<T[P]>(state[key])
        })
        this.signals = signals as Signals<T>
    }

    /**
     * Selects a single piece of the state as a Signal and optionally maps it to a new signal
     * @param key: The key we want to use to extract a piece of state as a signal
     * @param cb: (Optional) The callback function that will map to the computed signal
     */
    public select<K extends keyof T>(key: K): Signal<T[K]>
    public select<K extends keyof T, P>(key: K, cb: (state: T[K]) => P): Signal<P>
    public select<K extends keyof T, P>(key: K, cb?: (state: T[K]) => P): Signal<T[K] | P> {
        return computed(() => {
            const state = this.throwOrReturnSignals()[key]() as T[K]
            return cb ? (cb(state) as P) : (state as T[K])
        })
    }

    /**
     * Selects multiple pieces of the state as a computed Signal and optionally maps it to a new signal
     * @param keys: The keys we want to use to extract pieces of state as a signal
     * @param cb: (Optional) The callback function that will map to the computed signal
     */
    public selectMany(keys: (keyof T)[]): Signal<SpecificKeysOfObj<T>>
    public selectMany<P>(keys: (keyof T)[], cb: (obj: SpecificKeysOfObj<T>) => P): Signal<P>
    public selectMany<P>(keys: (keyof T)[], cb?: (obj: SpecificKeysOfObj<T>) => P): Signal<P | SpecificKeysOfObj<T>> {
        return computed(() => {
            const state = keys.reduce((obj, key) => {
                obj[key] = this.throwOrReturnSignals()[key]()
                return obj
            }, {} as Partial<SpecificKeysOfObj<T>>) as SpecificKeysOfObj<T>
            return cb ? (cb(state) as P) : (state as SpecificKeysOfObj<T>)
        })
    }

    /**
     * This method is ideal to pick pieces of state from somewhere else
     * It will return an obje ct that contains properties as signals.
     * Used best in combination with the connect method
     * @param keys: The keys that are related to the pieces of state we want to pick
     */
    public pick(keys: (keyof T)[]): SpecificKeysOfObjAsSignals<T> {
        return keys.reduce((obj, key) => {
            obj[key] = this.throwOrReturnSignals()[key]
            return obj
        }, {} as Partial<SpecificKeysOfObjAsSignals<T>>) as SpecificKeysOfObjAsSignals<T>
    }

    /**
     * Connects a partial state object where every property is a signal.
     * It will connect all theses signals to the state
     * This will automatically feed the state whenever one of the signals changes
     * It will use an Angular effect to calculate it
     * @param object: The object holding the signals where we want to listen to
     */
    protected connect(object: Partial<{ [P in keyof T]: Signal<T[P]> }>): void {
        this.throwOrReturnSignals()
        effect(
            () => {
                Object.keys(object).forEach((key: keyof T) => {
                    const v = object[key] as Signal<keyof T>
                    this.patch({ [key]: v() } as Partial<T>)
                })
            },
            // This will update the state, so we need to allow signal writes
            { allowSignalWrites: true }
        )
    }

    /**
     * Patches the state with a partial object.
     * This will loop through all the state signals and update
     * them one by one
     */
    protected patch<P extends keyof T>(object: Partial<T>): void {
        const signals = this.throwOrReturnSignals()
        ;(Object.keys(object) as P[]).forEach((key: P) => {
            signals[key].set(object[key] as T[P])
        })
    }

    /**
     * Returns the state as a signal
     */
    public state = computed(() => {
        this.throwOrReturnSignals()
        return this.snapshot
    })

    /**
     * Returns the state as a snapshot
     * This will read through all the signals
     */
    public get snapshot(): T {
        const signals = this.throwOrReturnSignals()
        return Object.keys(signals).reduce((obj, key: keyof T) => {
            obj[key] = signals[key]()
            return obj
        }, {} as Partial<T>) as T
    }

    private throwOrReturnSignals(): Signals<T> {
        if (!this.signals) {
            throw new Error(this.notInitializedError)
        }
        return this.signals as Signals<T>
    }
}
