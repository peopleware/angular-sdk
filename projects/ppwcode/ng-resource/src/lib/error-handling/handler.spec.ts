import { PPW_RESOURCE_DEFAULT_ERROR_HANDLER, providePpwResourceDefaultErrorHandler } from './handler'

describe('providePpwResourceDefaultErrorHandler', () => {
    it('should provide the supplied default error handler', () => {
        const handler = vi.fn<(error: Error) => void>()
        const error = new Error('Failed')

        const provider = providePpwResourceDefaultErrorHandler(handler)

        expect(provider).toEqual({
            provide: PPW_RESOURCE_DEFAULT_ERROR_HANDLER,
            useValue: handler
        })
        provider.useValue(error)
        expect(handler).toHaveBeenCalledWith(error)
    })
})
