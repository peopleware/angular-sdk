import { signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { combineLatest, firstValueFrom, Observable, of } from 'rxjs'
import { first } from 'rxjs/operators'
import { invert, ObservableConvertableValue, oneTrue } from './value-reducers'

describe('Value combiners', () => {
    describe('invert', () => {
        it('should invert boolean values', (done) => {
            const testCases: Array<{ initialValue: ObservableConvertableValue<boolean>; inverted: boolean }> = [
                { initialValue: false, inverted: true },
                { initialValue: signal(false), inverted: true },
                { initialValue: of(false), inverted: true },
                { initialValue: true, inverted: false },
                { initialValue: signal(true), inverted: false },
                { initialValue: of(true), inverted: false }
            ]

            let observables: Array<Observable<boolean>> = []

            TestBed.runInInjectionContext(() => {
                observables = testCases.map((testCase) => invert(testCase.initialValue))
            })

            combineLatest(observables)
                .pipe(first())
                .subscribe((result) => {
                    expect(result).toEqual(testCases.map((testCase) => testCase.inverted))
                    done()
                })
        })
    })

    describe('oneTrue', () => {
        it('should emit true if at least one of the values emits true', async () => {
            const testCases = [
                { values: [false, signal(false), of(false)], expected: false },
                { values: [true, signal(false), of(false)], expected: true },
                { values: [false, signal(true), of(false)], expected: true },
                { values: [false, signal(false), of(true)], expected: true },
                { values: [true, signal(false), of(true)], expected: true },
                { values: [true, signal(true), of(true)], expected: true }
            ]

            let promises: Array<Promise<boolean>> = []
            TestBed.runInInjectionContext(() => {
                promises = testCases.map((testCase) => firstValueFrom(oneTrue(...testCase.values)))
            })

            const results = await Promise.all(promises)
            expect(results).toEqual(testCases.map((testCase) => testCase.expected))
        })
    })
})
