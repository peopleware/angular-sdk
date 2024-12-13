import { getFileNameFromContentDisposition } from './file-download'

describe('getFileName', () => {
    it('should get the filename from a content-disposition string', () => {
        const contentDisposition =
            // eslint-disable-next-line no-secrets/no-secrets
            'attachment; filename="Incentive EUR - Devloo BELGIUM NV - 20231212_1524.xlsx"; filename*=UTF-8\'\'Incentive%20EUR%20-%20Devloo%20BELGIUM%20NV%20-%2020231212_1524.xlsx'
        const expected = 'Incentive EUR - Devloo BELGIUM NV - 20231212_1524.xlsx'
        expect(getFileNameFromContentDisposition(contentDisposition)).toEqual(expected)
    })
})
