import { getFileNameFromContentDisposition } from './file-download'

describe('getFileName', () => {
    it.each([
        { description: 'missing header', header: undefined, expected: undefined },
        { description: 'null header', header: null, expected: undefined },
        { description: 'empty header', header: '', expected: undefined },
        { description: 'header without filename', header: 'attachment', expected: undefined },
        { description: 'empty filename', header: 'attachment; filename=', expected: undefined },
        { description: 'quoted filename', header: 'attachment; filename="report.csv"', expected: 'report.csv' },
        {
            description: 'filename followed by another parameter',
            header: 'attachment; filename="report.csv"; size=123',
            expected: 'report.csv'
        }
    ])('should handle $description', ({ header, expected }) => {
        expect(getFileNameFromContentDisposition(header)).toEqual(expected)
    })

    it('should get the filename from a content-disposition string', () => {
        const contentDisposition =
            // eslint-disable-next-line no-secrets/no-secrets
            'attachment; filename="Incentive EUR - Devloo BELGIUM NV - 20231212_1524.xlsx"; filename*=UTF-8\'\'Incentive%20EUR%20-%20Devloo%20BELGIUM%20NV%20-%2020231212_1524.xlsx'
        const expected = 'Incentive EUR - Devloo BELGIUM NV - 20231212_1524.xlsx'
        expect(getFileNameFromContentDisposition(contentDisposition)).toEqual(expected)
    })
})
