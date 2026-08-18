import { Overlay } from '@angular/cdk/overlay'
import { TestBed } from '@angular/core/testing'
import { NotificationsService } from './notifications.service'

describe('NotificationsService', () => {
    let service: NotificationsService
    let overlayRef: {
        attach: ReturnType<typeof vi.fn>
        detach: ReturnType<typeof vi.fn>
        hasAttached: ReturnType<typeof vi.fn>
    }

    beforeEach(() => {
        vi.useFakeTimers()
        overlayRef = {
            attach: vi.fn(),
            detach: vi.fn(),
            hasAttached: vi.fn(() => false)
        }

        const globalPositionStrategy = {
            top: vi.fn(() => globalPositionStrategy),
            right: vi.fn()
        }
        const overlay = {
            position: vi.fn(() => ({
                global: vi.fn(() => globalPositionStrategy)
            })),
            create: vi.fn(() => overlayRef)
        }

        TestBed.configureTestingModule({
            providers: [
                NotificationsService,
                {
                    provide: Overlay,
                    useValue: overlay
                }
            ]
        })

        service = TestBed.inject(NotificationsService)
    })

    afterEach(() => {
        service.notifications().forEach((notification) => notification.timerSubscription.unsubscribe())
        vi.useRealTimers()
    })

    it('should create', () => {
        expect(service).toBeTruthy()
    })

    it('should add success notifications from a message key', () => {
        service.success('notifications.saved')

        expect(service.notifications()).toEqual([
            expect.objectContaining({
                type: 'success',
                body: { messageKey: 'notifications.saved' }
            })
        ])
        expect(overlayRef.attach).toHaveBeenCalledOnce()
    })

    it('should add notifications with message parameters', () => {
        service.warning({
            messageKey: 'notifications.saved',
            messageParams: { name: 'Lunch' }
        })

        expect(service.notifications()[0]).toEqual(
            expect.objectContaining({
                type: 'warning',
                body: {
                    messageKey: 'notifications.saved',
                    messageParams: { name: 'Lunch' }
                }
            })
        )
    })

    it('should support all notification types', () => {
        const notifications = [
            service.success('notifications.success'),
            service.error('notifications.error'),
            service.info('notifications.info'),
            service.warning('notifications.warning')
        ]

        expect(notifications.map((notification) => notification.type)).toEqual(['success', 'error', 'info', 'warning'])
        expect(service.notifications()).toEqual(notifications)
    })

    it('should attach the notifications portal only once while notifications are visible', () => {
        service.success('notifications.first')
        overlayRef.hasAttached.mockReturnValue(true)
        service.error('notifications.second')

        expect(overlayRef.attach).toHaveBeenCalledOnce()
    })

    it('should remove notifications explicitly and detach when the last one is gone', () => {
        service.success('notifications.first')
        service.error('notifications.second')
        const [firstNotification, secondNotification] = service.notifications()
        const unsubscribe = vi.spyOn(firstNotification.timerSubscription, 'unsubscribe')

        service.remove(firstNotification)

        expect(unsubscribe).toHaveBeenCalledOnce()
        expect(service.notifications()).toEqual([secondNotification])
        expect(overlayRef.detach).not.toHaveBeenCalled()

        service.remove(secondNotification)

        expect(service.notifications()).toEqual([])
        expect(overlayRef.detach).toHaveBeenCalledOnce()
    })

    it('should remove a notification after the timeout', () => {
        service.info('notifications.wait')

        vi.runAllTimers()

        expect(service.notifications()).toEqual([])
        expect(overlayRef.detach).toHaveBeenCalledOnce()
    })

    it('should keep an indefinite info notification until it is removed explicitly', () => {
        const notification = service.info('notifications.wait', 0)

        vi.runAllTimers()

        expect(service.notifications()).toEqual([notification])

        service.remove(notification)

        expect(service.notifications()).toEqual([])
        expect(overlayRef.detach).toHaveBeenCalledOnce()
    })

    it('should cancel the timeout when a notification is removed explicitly', () => {
        service.info('notifications.wait')
        const notification = service.notifications()[0]

        service.remove(notification)
        vi.runAllTimers()

        expect(service.notifications()).toEqual([])
        expect(overlayRef.detach).toHaveBeenCalledOnce()
    })

    it('should pause and resume a notification with its remaining timeout', () => {
        const notification = service.info('notifications.wait', 1000)

        vi.advanceTimersByTime(400)
        service.pause(notification)
        vi.advanceTimersByTime(1000)

        expect(service.notifications()).toEqual([notification])

        service.resume(notification)
        vi.advanceTimersByTime(599)

        expect(service.notifications()).toEqual([notification])

        vi.advanceTimersByTime(1)

        expect(service.notifications()).toEqual([])
    })

    it('should make repeated pause and resume calls safe', () => {
        const notification = service.info('notifications.wait', 1000)

        vi.advanceTimersByTime(400)
        service.pause(notification)
        service.pause(notification)
        service.resume(notification)
        service.resume(notification)
        vi.advanceTimersByTime(599)

        expect(service.notifications()).toEqual([notification])

        vi.advanceTimersByTime(1)

        expect(service.notifications()).toEqual([])
    })

    it('should ignore pause and resume for an indefinite notification', () => {
        const notification = service.info('notifications.wait', 0)

        service.pause(notification)
        service.resume(notification)
        vi.runAllTimers()

        expect(service.notifications()).toEqual([notification])
    })

    it('should cancel a paused timeout when a notification is removed explicitly', () => {
        const notification = service.info('notifications.wait', 1000)

        vi.advanceTimersByTime(400)
        service.pause(notification)
        service.remove(notification)
        service.resume(notification)
        vi.runAllTimers()

        expect(service.notifications()).toEqual([])
        expect(overlayRef.detach).toHaveBeenCalledOnce()
    })
})
