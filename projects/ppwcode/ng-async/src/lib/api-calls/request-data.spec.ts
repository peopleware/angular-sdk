import { cleanupRequestData } from './request-data'

describe('request-data', () => {
    describe('cleanupRequestData', () => {
        it('should remove null and undefined values from the object', () => {
            // Arrange
            const data = {
                key1: 'value1',
                key2: null,
                key3: undefined,
                key4: 'value4'
            }

            // Act
            const result = cleanupRequestData(data)

            // Assert
            expect(result).toEqual({
                key1: 'value1',
                key4: 'value4'
            })
        })
    })
})
