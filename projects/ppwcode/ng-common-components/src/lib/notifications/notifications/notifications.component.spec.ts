import { signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { getByDirective, provideStaticTranslations } from '@ppwcode/ng-unit-testing'
import { Subscription } from 'rxjs'
import { Notification as SpiceNotification } from '../notification'
import { NotificationComponent } from '../notification/notification.component'
import { NotificationsService } from '../notifications.service'
import { NotificationsComponent } from './notifications.component'

describe('NotificationsComponent', () => {
    let component: NotificationsComponent
    let fixture: ComponentFixture<NotificationsComponent>
    let notifications: ReturnType<typeof signal<Array<SpiceNotification>>>
    let notificationsService: {
        notifications: typeof notifications
        remove: ReturnType<typeof vi.fn>
        pause: ReturnType<typeof vi.fn>
        resume: ReturnType<typeof vi.fn>
    }

    const createNotification = (id: string): SpiceNotification => ({
        id,
        type: 'success',
        body: { messageKey: `notifications.${id}` },
        timeout: 7500,
        timerSubscription: new Subscription()
    })

    beforeEach(async () => {
        notifications = signal<Array<SpiceNotification>>([])
        notificationsService = {
            notifications,
            remove: vi.fn(),
            pause: vi.fn(),
            resume: vi.fn()
        }

        await TestBed.configureTestingModule({
            imports: [NotificationsComponent],
            providers: [
                provideStaticTranslations({}),
                {
                    provide: NotificationsService,
                    useValue: notificationsService
                }
            ]
        }).compileComponents()

        fixture = TestBed.createComponent(NotificationsComponent)
        component = fixture.componentInstance
        await fixture.whenStable()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should render the notifications from the service', async () => {
        notifications.set([createNotification('1'), createNotification('2')])
        await fixture.whenStable()

        expect(fixture.debugElement.queryAll(By.directive(NotificationComponent))).toHaveLength(2)
    })

    it('should remove a notification when the child emits closeNotification', async () => {
        const notification = createNotification('1')
        notifications.set([notification])
        await fixture.whenStable()

        const child = getByDirective(fixture, NotificationComponent)
        child.closeNotification.emit()
        await fixture.whenStable()

        expect(notificationsService.remove).toHaveBeenCalledWith(notification)
    })

    it('should forward close requests to the service', () => {
        const notification = createNotification('1')

        component.close(notification)

        expect(notificationsService.remove).toHaveBeenCalledWith(notification)
    })

    it('should pause and resume a notification timer when the pointer enters and leaves', async () => {
        const notification = createNotification('1')
        notifications.set([notification])
        await fixture.whenStable()

        const child = fixture.debugElement.query(By.directive(NotificationComponent))
        child.triggerEventHandler('pointerenter', new PointerEvent('pointerenter'))
        child.triggerEventHandler('pointerleave', new PointerEvent('pointerleave'))

        expect(notificationsService.pause).toHaveBeenCalledWith(notification)
        expect(notificationsService.resume).toHaveBeenCalledWith(notification)
    })
})
