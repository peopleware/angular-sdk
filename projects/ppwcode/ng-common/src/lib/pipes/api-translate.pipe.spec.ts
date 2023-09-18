import { PpwTranslationMap } from '../models/ppw-translation-map.model'
import { PpwApiTranslatePipe } from '@ppwcode/ng-common'
import { TestBed } from '@angular/core/testing'

const mockTranslationMap: PpwTranslationMap = {
    nl: 'testNl',
    en: 'testEn',
    fr: 'testFr'
}

describe('Api translate pipe should work properly', () => {
    let apiTranslatePipe: PpwApiTranslatePipe

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PpwApiTranslatePipe]
        })
        apiTranslatePipe = TestBed.inject(PpwApiTranslatePipe)
    })

    it('Should work with PpwTranslationMap input and EN language', () => {
        const result = apiTranslatePipe.transform(mockTranslationMap)
        expect(result).toBe(mockTranslationMap['en'])
    })

    it('Should work with undefined input and valid language', () => {
        const result = apiTranslatePipe.transform(undefined)
        expect(result).toEqual('')
    })
})
