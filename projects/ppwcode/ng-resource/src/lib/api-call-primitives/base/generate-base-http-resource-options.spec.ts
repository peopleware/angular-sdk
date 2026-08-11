import { generateBaseHttpResourceOptions } from './generate-base-http-resource-options'

describe('generateBaseHttpResourceOptions', () => {
    it('should expose the response mapper as parse', () => {
        const options = generateBaseHttpResourceOptions({
            url: '/api/items',
            responseMapper: (value: string) => value.toUpperCase()
        })

        expect(options.parse?.('item')).toBe('ITEM')
    })

    it('should carry through a configured default value', () => {
        const options = generateBaseHttpResourceOptions({
            url: '/api/items',
            resourceOptions: {
                defaultValue: ['item']
            }
        })

        expect(options.defaultValue).toEqual(['item'])
    })

    it('should leave default value undefined when none is configured', () => {
        expect(generateBaseHttpResourceOptions({ url: '/api/items' }).defaultValue).toBeUndefined()
    })
})
