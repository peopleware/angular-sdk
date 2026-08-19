import { Component, inject } from '@angular/core'
import { Notification } from '../notification'
import { NotificationComponent } from '../notification/notification.component'
import { NotificationsService } from '../notifications.service'

/**
 * Component responsible for displaying the notifications of the application.
 * This component is attached to an OverlayRef through a ComponentPortal inside NotificationsService.
 *
 * It renders a list of notifications and handles clicking the close button of a notification.
 *
 * @example
 * ```
 * Don't use this component explicitly.
 * ```
 */
@Component({
    selector: 'ppw-notifications',
    imports: [NotificationComponent],
    templateUrl: './notifications.component.html',
    styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
    readonly #notificationsService = inject(NotificationsService)

    public readonly notifications = this.#notificationsService.notifications

    /**
     * Requests closing the notification through the notification service.
     * @param notification The notification to close.
     */
    public close(notification: Notification): void {
        this.#notificationsService.remove(notification)
    }

    /**
     * Pauses the timer while the pointer is over the notification.
     * @param notification The notification whose timer should be paused.
     */
    public pause(notification: Notification): void {
        this.#notificationsService.pause(notification)
    }

    /**
     * Resumes the timer when the pointer leaves the notification.
     * @param notification The notification whose timer should be resumed.
     */
    public resume(notification: Notification): void {
        this.#notificationsService.resume(notification)
    }
}
