import { natural, noDuplicates } from './assertion'

describe('assertion', () => {
    describe('#natural', () => {
        it('says true for undefined', () => {
            const result = natural()
            expect(result).toBe(true)
        })

        it('says true for a natural', () => {
            const result = natural(7)
            expect(result).toBe(true)
        })

        const cases = [Math.PI, -7, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]

        cases.forEach((n) => {
            it(`says false for ${n}`, () => {
                const result = natural(n)
                expect(result).toBe(false)
            })
        })
    })
    describe('#noDuplicates', () => {
        it('returns true for the empty array', () => {
            const result = noDuplicates([])
            expect(result).toBeTruthy()
        })
        it('returns true for an array with 1 element', () => {
            const result = noDuplicates([1])
            expect(result).toBeTruthy()
        })
        it('returns true for an array with many non-duplicate elements', () => {
            const result = noDuplicates([1, 4, 3, '', {}, true, {}])
            expect(result).toBeTruthy()
        })
        it('returns false for an array with 2 duplicate elements', () => {
            const result = noDuplicates([4, 4])
            expect(result).toBeFalsy()
        })
        it('returns false for an array with many elements, with 1 duplicate', () => {
            const result = noDuplicates([1, 4, 3, '', {}, '', true])
            expect(result).toBeFalsy()
        })
        it('returns false for an array with many elements, with several duplicate', () => {
            const result = noDuplicates([1, 4, true, 3, '', {}, '', 3, true])
            expect(result).toBeFalsy()
        })
    })
})
