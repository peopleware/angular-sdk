import type { HttpErrorResponse } from '@angular/common/http'
import { PPW_RESOURCE_ERROR_EXTRACTOR, providePpwResourceErrorExtractor } from './extractor'

describe('providePpwResourceErrorExtractor', () => {
    it('should provide the supplied error extractor', () => {
        const extractedError = new Error('Extracted error')
        const extractor = vi.fn<(error: HttpErrorResponse) => Error>(() => extractedError)
        const httpError = { status: 422 } as HttpErrorResponse

        const provider = providePpwResourceErrorExtractor(extractor)

        expect(provider).toEqual({
            provide: PPW_RESOURCE_ERROR_EXTRACTOR,
            useValue: extractor
        })
        expect(provider.useValue(httpError)).toBe(extractedError)
    })
})
