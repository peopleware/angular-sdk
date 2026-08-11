import { DateTime } from 'luxon'
import { describe, expect, it } from 'vitest'
import { MockBuilder } from './mock-builder'

interface ExampleMock {
    nested: {
        value: string
    }
    items: Array<{
        id: string
    }>
    date: DateTime
}

class ExampleMockBuilder extends MockBuilder<ExampleMock> {
    private constructor(value: ExampleMock) {
        super(value)
    }

    static default(): ExampleMockBuilder {
        return new ExampleMockBuilder({
            nested: { value: 'default' },
            items: [{ id: 'default-item' }],
            date: DateTime.fromISO('2026-08-03T00:00:00.000Z')
        })
    }

    build(): ExampleMock {
        return this.buildValue()
    }

    withNested(nested: ExampleMock['nested']): this {
        return this.withValue('nested', nested)
    }
}

describe('MockBuilder', () => {
    it('creates independent values for each build', () => {
        const builder = ExampleMockBuilder.default()
        const first = builder.build()
        const second = builder.build()

        first.nested.value = 'changed'
        first.items[0].id = 'changed-item'

        expect(second).toEqual({
            nested: { value: 'default' },
            items: [{ id: 'default-item' }],
            date: DateTime.fromISO('2026-08-03T00:00:00.000Z')
        })
        expect(second.date).not.toBe(first.date)
    })

    it('does not retain references supplied to a fluent setter', () => {
        const nested = { value: 'provided' }
        const built = ExampleMockBuilder.default().withNested(nested).build()

        nested.value = 'changed'

        expect(built.nested).toEqual({ value: 'provided' })
    })
})
