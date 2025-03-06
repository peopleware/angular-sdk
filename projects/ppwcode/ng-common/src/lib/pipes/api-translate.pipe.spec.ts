import { LOCALE_ID } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { PpwTranslationMap } from '../models/ppw-translation-map.model'
import { PpwApiTranslatePipe } from './api-translate.pipe'

const mockTranslationMap: PpwTranslationMap = {
    nl: 'testnl',
    en: 'testen',
    fr: 'testfr'
}

describe('Api translate pipe should work properly', () => {
    let apiTranslatePipe: PpwApiTranslatePipe
    const languages = ['nl', 'en', 'fr']

    languages.forEach((language: string) => {
        describe(`Language ${language}`, () => {
            beforeEach(() => {
                TestBed.configureTestingModule({
                    providers: [PpwApiTranslatePipe, { provide: LOCALE_ID, useValue: language }]
                })
                apiTranslatePipe = TestBed.inject(PpwApiTranslatePipe)
            })

            it(`should work with a translation map and the given language ${language}`, () => {
                const result = apiTranslatePipe.transform(mockTranslationMap)
                expect(result).toEqual(`test${language}`)
            })

            it('should work with an undefined translation map and the given language', () => {
                const result = apiTranslatePipe.transform(undefined)
                expect(result).toEqual('')
            })
        })
    })

    describe('unknown language in translation map', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [PpwApiTranslatePipe, { provide: LOCALE_ID, useValue: 'de' }]
            })
            apiTranslatePipe = TestBed.inject(PpwApiTranslatePipe)
        })

        it('should return the full object when the language is undefined', () => {
            const result = apiTranslatePipe.transform(mockTranslationMap)
            expect(result).toEqual(mockTranslationMap as unknown as string)
        })

        it('should work with an undefined translation map and the given language', () => {
            const result = apiTranslatePipe.transform(undefined)
            expect(result).toEqual('')
        })
    })
})
