import { ComponentFixture } from '@angular/core/testing'
import {
    expectOutputEventEmits,
    getByTestId,
    prepareAndInstantiateDefaultTestComponent
} from '@ppwcode/ng-unit-testing'
import { NotificationType } from '../notification'
import { NotificationComponent } from './notification.component'

describe('NotificationComponent', () => {
    let component: NotificationComponent
    let fixture: ComponentFixture<NotificationComponent>

    const createComponent = async (type: NotificationType = 'success', timeout = 7500): Promise<void> => {
        fixture = await prepareAndInstantiateDefaultTestComponent(
            NotificationComponent,
            {
                type,
                timeout,
                body: {
                    messageKey: 'notifications.saved',
                    messageParams: { name: 'Lunch' }
                }
            },
            {
                translations: {
                    notifications: {
                        saved: 'Saved {{ name }}'
                    }
                },
                language: 'en'
            }
        )
        component = fixture.componentInstance
    }

    it('should create', async () => {
        await createComponent()

        expect(component).toBeTruthy()
    })

    it.each([
        ['info', 'info'],
        ['warning', 'warning'],
        ['success', 'check_circle'],
        ['error', 'dangerous']
    ] satisfies Array<[NotificationType, string]>)('should render the %s icon', async (type, icon) => {
        await createComponent(type)

        const statusIcon = getByTestId(fixture, 'ppw-notification__icon').textContent
        expect(statusIcon.trim()).toBe(icon)
    })

    it('should apply the notification type host class', async () => {
        await createComponent('warning')

        expect(fixture.nativeElement.classList.contains('notification--warning')).toBe(true)
    })

    it('should render the translated message with parameters', async () => {
        await createComponent()

        const message = getByTestId(fixture, 'ppw-notification__content').textContent
        expect(message.trim()).toBe('Saved Lunch')
    })

    it('should render the timer with the configured timeout', async () => {
        await createComponent('success', 1000)

        const timer = getByTestId(fixture, 'ppw-notification__timer')
        const iconWrapper = fixture.nativeElement.querySelector('.ppw-notification-content__status-icon-wrapper')

        expect(timer.style.getPropertyValue('--ppw-notification-timeout')).toBe('1000ms')
        expect(iconWrapper.classList.contains('ppw-notification-content__status-icon-wrapper--with-timer')).toBe(true)
    })

    it('should not render a timer for an indefinite notification', async () => {
        await createComponent('success', 0)

        expect(fixture.nativeElement.querySelector('[data-testid="ppw-notification__timer"]')).toBeNull()
        expect(
            fixture.nativeElement
                .querySelector('.ppw-notification-content__status-icon-wrapper')
                .classList.contains('ppw-notification-content__status-icon-wrapper--with-timer')
        ).toBe(false)
    })

    it('should emit when the close button is clicked', async () => {
        await createComponent()

        expectOutputEventEmits({
            outputEvent: component.closeNotification,
            when: () => getByTestId(fixture, 'ppw-notification__close-button').click(),
            expectedValue: undefined
        })
    })
})
