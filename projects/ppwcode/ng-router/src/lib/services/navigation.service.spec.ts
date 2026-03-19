import type { MockedObject } from 'vitest'
import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { WINDOW } from '@ppwcode/ng-common'
import { NavigationService } from './navigation.service'

describe('NavigationService', () => {
    let service: NavigationService
    let mockRouter: MockedObject<Router>
    let mockWindow: MockedObject<Window>
    let mockLocation: MockedObject<Location>
    let location: Location

    beforeEach(() => {
        mockRouter = {
            navigateByUrl: vi.fn().mockName('Router.navigateByUrl')
        } as MockedObject<Router>
        mockWindow = {
            open: vi.fn().mockName('Window.open')
        } as unknown as MockedObject<Window>
        mockLocation = {
            replace: vi.fn().mockName('Location.replace')
        } as unknown as MockedObject<Location>

        TestBed.configureTestingModule({
            providers: [
                NavigationService,
                { provide: Router, useValue: mockRouter },
                { provide: Location, useValue: mockLocation },
                { provide: WINDOW, useValue: mockWindow }
            ]
        })

        service = TestBed.inject(NavigationService)
        location = TestBed.inject(Location)
    })

    describe('openUrl', () => {
        it('should navigate to the URL using the router if inNewTab is false', async () => {
            const url = '/test-route'

            await service.openUrl(url, false, true)

            expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(url, { replaceUrl: true })
            expect(mockWindow.open).not.toHaveBeenCalled()
        })

        it('should open the URL in a new tab if inNewTab is true', async () => {
            const url = '/example-route'
            const mockWindowInstance = { location } as Window
            mockWindow.open.mockReturnValue(mockWindowInstance)

            const result = await service.openUrl(url, true)

            expect(mockWindow.open).toHaveBeenCalledWith(url, '_blank')
            expect(mockWindowInstance.location.replace).toBeDefined()
            expect(result).toBe(mockWindowInstance)
        })

        it('should return null if new tab fails to open', async () => {
            const url = '/example-route'
            mockWindow.open.mockReturnValue(null)

            const promiseResult = service.openUrl(url, true)

            expect(mockWindow.open).toHaveBeenCalledWith(url, '_blank')
            await expect(promiseResult).rejects.toThrow()
        })
    })

    describe('openExternalUrlInNewTab', () => {
        it('should open a URL in a new tab and return the window instance', async () => {
            const url = '/example-route'
            const mockWindowInstance = { location } as Window
            mockWindow.open.mockReturnValue(mockWindowInstance)

            const result = await service.openExternalUrlInNewTab(url)

            expect(mockWindow.open).toHaveBeenCalledWith(url, '_blank')
            expect(mockWindowInstance.location.replace).toBeDefined()
            expect(result).toBe(mockWindowInstance)
        })

        it('should return null if new tab fails to open', async () => {
            const url = '/example-route'
            mockWindow.open.mockReturnValue(null)

            const promiseResult = service.openExternalUrlInNewTab(url)

            expect(mockWindow.open).toHaveBeenCalledWith(url, '_blank')
            await expect(promiseResult).rejects.toThrow()
        })
    })
})
