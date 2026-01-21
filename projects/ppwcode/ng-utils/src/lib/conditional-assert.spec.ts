import { natural } from './assertion'
import {
    assert,
    baseViolationMessage,
    ConditionViolation,
    notNull,
    notNullViolationMessage,
    notUndefined,
    notUndefinedViolationMessage,
    settings,
    violationMessage
} from './conditional-assert'
import Spy = jasmine.Spy

interface Fixture {
    originalConditionalAssertEnabled: boolean
    originalLogViolations: boolean
    spy: Spy
}

describe('Conditional Assert ', () => {
    beforeEach(function (this: Fixture): void {
        this.originalConditionalAssertEnabled = settings.enabled
        this.originalLogViolations = settings.logViolations
    })

    afterEach(function (this: Fixture): void {
        settings.enabled = this.originalConditionalAssertEnabled
        settings.logViolations = this.originalLogViolations
    })

    describe('#violationMessage', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const circular: any = {}
        circular.prop = circular
        const subjects = [
            0,
            1,
            Number.NaN,
            'this is a string',
            true,
            false,
            {},
            circular,
            new Date(),
            // TODO Symbol('A'),
            null,
            undefined,
            () => 0,
            (a: number) => {
                const b = a / 2

                return b * 2
            }
        ]
        const array = subjects.slice()
        array.push(subjects.slice())
        subjects.push(array)

        const customMessages = ['custom message', undefined]

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cases: Array<{ subject: any; customMessage?: string }> = subjects.reduce(
            (acc1, s) =>
                customMessages.reduce((acc2, cm) => {
                    acc2.push({ subject: s, customMessage: cm })

                    return acc2
                }, acc1),
            []
        )

        const assertion = () => true

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const escapeRegExp = (str: any): string => `${str}`.replace(/([()[+*])/g, '\\$1')

        cases.forEach((c) => {
            it(`creates the expected message for ${c.subject} ${
                c.customMessage ? 'with' : 'without'
            } a custom message`, () => {
                const result = violationMessage(c.subject, assertion, c.customMessage)
                expect(result).toMatch(new RegExp(`^${baseViolationMessage}: Â«`))
                expect(result).toMatch(
                    new RegExp(`^${baseViolationMessage}: Â«${c.customMessage || escapeRegExp(assertion)}Â»`)
                )
                expect(result).toMatch(new RegExp(`Â«${escapeRegExp(c.subject)}Â»$`))
            })
        })

        it('creates the expected message for a multiline assertion', () => {
            const multilineAssertion = () => {
                const a = 4

                return a % 2 === 0
            }
            const result = violationMessage(7, multilineAssertion)
            expect(result).toMatch(new RegExp(escapeRegExp(multilineAssertion.toString().replace(/\s+/g, ' '))))
        })
    })

    describe('#assert', () => {
        const subject = 5
        const alwaysTrue = () => true
        const alwaysFalse = () => false
        const customMessage = 'custom message'

        const generateNoProblemTests = () => {
            it('does nothing when the assertion evaluates to true, with the default message', () => {
                assert(subject, alwaysTrue)
                expect(5).not.toBeUndefined() // Jasmine complains when there is no expect
            })

            it('does nothing when the assertion evaluates to true, with a custom message', () => {
                assert(subject, alwaysTrue, customMessage)
                expect(5).not.toBeUndefined() // Jasmine complains when there is no expect
            })
        }

        describe('enabled', () => {
            beforeEach(() => {
                settings.enabled = true
            })

            generateNoProblemTests()

            it('throws when the assertion fails, with the default message', () => {
                const expectedMessage = violationMessage(subject, alwaysFalse)
                expect(assert.bind(undefined, subject, alwaysFalse)).toThrowError(ConditionViolation, expectedMessage)
            })

            it('throws when the assertion fails, with a custom message', () => {
                const expectedMessage = violationMessage(subject, alwaysFalse, customMessage)
                expect(assert.bind(undefined, subject, alwaysFalse, customMessage)).toThrowError(
                    ConditionViolation,
                    expectedMessage
                )
            })

            describe('log violations', () => {
                beforeEach(function (this: Fixture): void {
                    this.spy = spyOn(console, 'error') // spy released by Jasmine automatically
                })

                it('does not log violations to the console when requested', function (this: Fixture): void {
                    settings.logViolations = false
                    try {
                        assert(5, (t) => t === 3)
                        // should have failed and have written to console
                        fail()
                    } catch (err) {
                        expect(err).toBeDefined()
                        expect(this.spy).not.toHaveBeenCalled()
                    }
                })

                it('logs violations to the console when requested', function (this: Fixture): void {
                    settings.logViolations = true
                    try {
                        assert(5, (t) => t === 3)
                        // should have failed and have written to console
                        fail()
                    } catch (err) {
                        expect(err).toBeDefined()
                        expect(this.spy).toHaveBeenCalledWith(err)
                    }
                })
            })
        })

        describe('disabled', () => {
            beforeEach(() => {
                settings.enabled = false
            })

            generateNoProblemTests()

            it('does not throw when the assertion failed, with the default message', () => {
                assert(subject, alwaysFalse)
                expect(5).not.toBeUndefined() // Jasmine complains when there is no expect
            })

            it('does not throw when the assertion failed, with a custom message', () => {
                assert(subject, alwaysFalse, customMessage)
                expect(5).not.toBeUndefined() // Jasmine complains when there is no expect
            })
        })
    })

    describe('#notUndefined', () => {
        const generateNoProblemTests = () => {
            it('returns t when it is actual, and cannot be undefined', () => {
                const t = 5
                const result = notUndefined(t)
                expect(result).toBe(t)
            })

            it('returns t when it is actual, and can be undefined', () => {
                const t: number | undefined = 5
                const result = notUndefined(t)
                expect(result).toBe(t)
            })
        }

        describe('enabled', () => {
            beforeEach(() => {
                settings.enabled = true
            })

            generateNoProblemTests()

            it('throws when t is undefined', () => {
                const t: number | undefined = undefined
                expect(notUndefined.bind(undefined, t)).toThrowError(
                    ConditionViolation,
                    violationMessage(undefined, () => true, notUndefinedViolationMessage)
                )
            })
        })

        describe('disabled', () => {
            beforeEach(() => {
                settings.enabled = false
            })

            generateNoProblemTests()

            it('does not throw when t is undefined, but returns undefined', () => {
                const t: number | undefined = undefined
                const result = notUndefined(t)
                expect(result).toBeUndefined()
            })
        })
    })

    describe('#notNull', () => {
        const generateNoProblemTests = () => {
            it('returns t when it is actual, and cannot be null', () => {
                const t = 5
                const result = notNull(t)
                expect(result).toBe(t)
            })

            it('returns t when it is actual, and can be null', () => {
                const t: number | null = 5
                const result = notNull(t)
                expect(result).toBe(t)
            })
        }

        describe('enabled', () => {
            beforeEach(() => {
                settings.enabled = true
            })

            generateNoProblemTests()

            it('throws when t is null', () => {
                const t: number | null = null
                expect(notNull.bind(null, t)).toThrowError(
                    ConditionViolation,
                    violationMessage(null, () => true, notNullViolationMessage)
                )
            })
        })

        describe('disabled', () => {
            beforeEach(() => {
                settings.enabled = false
            })

            generateNoProblemTests()

            it('does not throw when t is null, but returns null', () => {
                const t: number | null = null
                const result = notNull(t)
                expect(result).toBeNull()
            })
        })
    })

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
})
