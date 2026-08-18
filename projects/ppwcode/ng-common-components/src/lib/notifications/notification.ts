import { Subscription } from 'rxjs'

/** The different types of supported notifications. */
export type NotificationType = 'success' | 'error' | 'warning' | 'info'

/**
 * Represents a notification instance shown to the user.
 */
export interface Notification {
    /** A random id, so we can distinguish it from other notifications. */
    id: string
    /** The body of the notification. */
    body: NotificationBody
    /** The type of the notification. */
    type: NotificationType
    /** The automatic removal delay in milliseconds. A value of 0 means the notification is indefinite. */
    timeout: number
    /**
     * A subscription to the timer that will automatically close the notification.
     * This is to be unsubscribed explicitly when closing the notification before the timer has passed.
     */
    timerSubscription: Subscription
}

/**
 * The body of the notification.
 */
export interface NotificationBody {
    /** A translation key to be translated into a notification text. */
    messageKey: string
    /** Optional parameters to be used within the translated text. */
    messageParams?: object
}
