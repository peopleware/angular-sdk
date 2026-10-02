import { effect, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { SignalStore } from './signal-store'

type TestState = { count: number; label: string }

class TestStore extends SignalStore<TestState> {
    constructor() {
        super()
        this.initialize({ count: 0, label: 'initial' })
    }

    public update(state: Partial<TestState>): void {
        this.patch(state)
    }
}

describe('SignalStore', () => {
    it('should create', () => {
        const store = new SignalStore()
        expect(store).toBeTruthy()
    })

    it('should read snapshots without tracking store updates while tracking other signals', () => {
        const store = new TestStore()
        const trigger = signal(0)
        const snapshots: TestState[] = []
        TestBed.runInInjectionContext(() => {
            effect(() => {
                snapshots.push(store.snapshot)
                trigger()
            })
        })
        TestBed.tick()
        expect(snapshots).toEqual([{ count: 0, label: 'initial' }])

        store.update({ count: 1 })
        TestBed.tick()
        store.update({ label: 'updated' })
        TestBed.tick()
        expect(snapshots).toEqual([{ count: 0, label: 'initial' }])

        trigger.set(1)
        TestBed.tick()
        expect(snapshots).toEqual([
            { count: 0, label: 'initial' },
            { count: 1, label: 'updated' }
        ])
    })

    it('should return the latest state on each snapshot access', () => {
        const store = new TestStore()
        const snapshot = store.snapshot

        store.update({ count: 1, label: 'updated' })

        expect(snapshot).toEqual({ count: 0, label: 'initial' })
        expect(store.snapshot).toEqual({ count: 1, label: 'updated' })
    })

    it('should keep state reactive when any store property changes', () => {
        const store = new TestStore()
        const states: TestState[] = []
        TestBed.runInInjectionContext(() => {
            effect(() => {
                states.push(store.state())
            })
        })
        TestBed.tick()
        store.update({ count: 1 })
        TestBed.tick()
        store.update({ label: 'updated' })
        TestBed.tick()

        expect(states).toEqual([
            { count: 0, label: 'initial' },
            { count: 1, label: 'initial' },
            { count: 1, label: 'updated' }
        ])
    })

    it('should throw the initialization error when reading a snapshot before initialization', () => {
        const store = new SignalStore<TestState>()

        expect(() => store.snapshot).toThrow(
            'Signal state is not initialized yet, call the initialize() method before using any other methods'
        )
    })
})
