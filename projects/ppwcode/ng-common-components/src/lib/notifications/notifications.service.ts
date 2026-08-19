import { GlobalPositionStrategy, Overlay } from '@angular/cdk/overlay'
import { ComponentPortal } from '@angular/cdk/portal'
import { inject, Service, signal } from '@angular/core'
import { NEVER, Subscription, timer } from 'rxjs'
import { Notification, NotificationBody, NotificationType } from './notification'
import { NotificationsComponent } from './notifications/notifications.component'
import { PPWCODE_COMMON_COMPONENTS_OPTIONS } from '../providers'

const DEFAULT_NOTIFICATION_TIMEOUT = 7500
const defaultPositionConfigurator = (strategy: GlobalPositionStrategy): GlobalPositionStrategy =>
    strategy.top('var(--ppw-ds-spacing-gutter)').right('var(--ppw-ds-spacing-gutter)')

interface NotificationTimerState {
    remaining: number
    startedAt: number
    paused: boolean
}

/**
 * This service handles showing notifications to the user and managing the overlay used for it.
 */
@Service()
export class NotificationsService {
    readonly #overlay = inject(Overlay)
    readonly #notificationConfiguration = inject(PPWCODE_COMMON_COMPONENTS_OPTIONS).notifications

    readonly #positionConfigurator =
        this.#notificationConfiguration?.positionConfigurator ?? defaultPositionConfigurator
    readonly #defaultTimeout = this.#notificationConfiguration?.defaultTimeout ?? DEFAULT_NOTIFICATION_TIMEOUT

    // Position the notifications on the screen.
    readonly #position = this.#positionConfigurator(this.#overlay.position().global())

    // Overlay that is laid on top of the application.
    readonly #overlayRef = this.#overlay.create({ positionStrategy: this.#position })

    // Portal for the NotificationsComponent that will render the notifications. This portal will be attached to
    // and detached from the overlay when necessary to keep the DOM as clean as possible.
    readonly #notificationsPortal = new ComponentPortal(NotificationsComponent)

    // Private array that keeps track of the list of notifications. Prevents manipulation of the notifications outside
    // of the service.
    readonly #notifications = signal<Array<Notification>>([])

    // Private timer state used to pause and resume notification timers without exposing timer implementation details.
    readonly #timerStates = new WeakMap<Notification, NotificationTimerState>()

    // Public readonly signal containing the notifications to display.
    public notifications = this.#notifications.asReadonly()

    /**
     * Add a notification of type success with the given body.
     * @param body The translation key or an object with the body settings.
     * @param timeout The automatic removal delay in milliseconds. Use 0 for an indefinite notification.
     * @returns The notification so callers can remove indefinite notifications explicitly.
     */
    public success(body: string | NotificationBody, timeout = this.#defaultTimeout): Notification {
        return this.#addNotification('success', body, timeout)
    }

    /**
     * Add a notification of type error with the given body.
     * @param body The translation key or an object with the body settings.
     * @param timeout The automatic removal delay in milliseconds. Use 0 for an indefinite notification.
     * @returns The notification so callers can remove indefinite notifications explicitly.
     */
    public error(body: string | NotificationBody, timeout = this.#defaultTimeout): Notification {
        return this.#addNotification('error', body, timeout)
    }

    /**
     * Add a notification of type info with the given body.
     * @param body The translation key or an object with the body settings.
     * @param timeout The automatic removal delay in milliseconds. Use 0 for an indefinite notification.
     * @returns The notification so callers can remove indefinite notifications explicitly.
     */
    public info(body: string | NotificationBody, timeout = this.#defaultTimeout): Notification {
        return this.#addNotification('info', body, timeout)
    }

    /**
     * Add a notification of type warning with the given body.
     * @param body The translation key or an object with the body settings.
     * @param timeout The automatic removal delay in milliseconds. Use 0 for an indefinite notification.
     * @returns The notification so callers can remove indefinite notifications explicitly.
     */
    public warning(body: string | NotificationBody, timeout = this.#defaultTimeout): Notification {
        return this.#addNotification('warning', body, timeout)
    }

    /**
     * Cancels the automatic removal and removes the notification explicitly
     * @param notification The notification to remove.
     */
    public remove(notification: Notification): void {
        notification.timerSubscription.unsubscribe()
        this.#timerStates.delete(notification)
        this.#removeNotification(notification.id)
    }

    /**
     * Pauses the automatic removal timer for a notification.
     * @param notification The notification whose timer should be paused.
     */
    public pause(notification: Notification): void {
        const timerState = this.#timerStates.get(notification)
        if (!timerState || timerState.paused) {
            return
        }

        timerState.remaining = Math.max(0, timerState.remaining - (Date.now() - timerState.startedAt))
        timerState.paused = true
        notification.timerSubscription.unsubscribe()
    }

    /**
     * Resumes the automatic removal timer for a notification.
     * @param notification The notification whose timer should be resumed.
     */
    public resume(notification: Notification): void {
        const timerState = this.#timerStates.get(notification)
        if (!timerState || !timerState.paused) {
            return
        }

        timerState.paused = false
        this.#startTimer(notification)
    }

    /**
     * Add a notification to the list of notifications and remove it after 7500ms.
     * Tries to attach the portal to the overlay.
     * @param type The type of the notification.
     * @param body The body of the notification. When a string is given it will be converted into NotificationBody.
     * @param timeout The automatic removal delay in milliseconds. Use 0 to disable automatic removal.
     * @returns The added notification.
     */
    #addNotification(
        type: NotificationType,
        body: string | NotificationBody,
        timeout = this.#defaultTimeout
    ): Notification {
        const id = window.crypto.randomUUID()
        const notification: Notification = {
            id,
            type,
            body: this.#toNotificationBody(body),
            timeout,
            timerSubscription: timeout === 0 ? NEVER.subscribe() : Subscription.EMPTY
        }

        if (timeout !== 0) {
            this.#timerStates.set(notification, {
                remaining: Math.max(timeout, 0),
                startedAt: Date.now(),
                paused: false
            })
            this.#startTimer(notification)
        }

        this.#notifications.update((notifications) => [...notifications, notification])

        this.#tryAttachPortal()

        return notification
    }

    /**
     * Remove a notification from the list of notifications.
     * Tries to detach the portal from the overlay.
     * @param id The id of the notification to remove.
     */
    #removeNotification(id: string): void {
        const notification = this.#notifications().find((currentNotification) => currentNotification.id === id)
        if (notification) {
            this.#timerStates.delete(notification)
        }

        this.#notifications.update((notifications) => notifications.filter((notification) => notification.id !== id))

        this.#tryDetachPortal()
    }

    /**
     * Ensure that the given body is a NotificationBody. When a string is given, an object is created and returned.
     * @param body The body that should be a NotificationBody.
     */
    #toNotificationBody(body: string | NotificationBody): NotificationBody {
        return typeof body === 'string' ? { messageKey: body } : body
    }

    /** Starts a timer using the notification's currently remaining duration. */
    #startTimer(notification: Notification): void {
        const timerState = this.#timerStates.get(notification)
        if (!timerState) {
            return
        }

        timerState.startedAt = Date.now()
        notification.timerSubscription = timer(timerState.remaining).subscribe(() =>
            this.#removeNotification(notification.id)
        )
    }

    /**
     * Attaches the notifications portal to the overlay if it is not already attached.
     */
    #tryAttachPortal(): void {
        if (!this.#overlayRef.hasAttached()) {
            this.#overlayRef.attach(this.#notificationsPortal)
        }
    }

    /**
     * Detaches the notifications portal from the overlay if there are no notifications left.
     */
    #tryDetachPortal(): void {
        if (this.#notifications().length === 0) {
            this.#overlayRef.detach()
        }
    }
}
