import { Component, computed, input, output } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { TranslatePipe } from '@ngx-translate/core'
import { NotificationBody, NotificationType } from '../notification'

/**
 * Displays a single notification, used within the NotificationsComponent.
 *
 * @example
 * ```
 * Don't use this component explicitly.
 * ```
 */
@Component({
    selector: 'ppw-notification',
    imports: [MatIcon, TranslatePipe],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.scss',
    host: {
        '[class]': '"notification--" + type()'
    }
})
export class NotificationComponent {
    /** The type of the notification, used for styling. */
    public readonly type = input.required<NotificationType>()

    /** The body of the notification, this will be translated into readable text. */
    public readonly body = input.required<NotificationBody>()

    /** The automatic removal delay in milliseconds. A value of 0 means the notification is indefinite. */
    public readonly timeout = input.required<number>()

    /** Emits when the user clicks the close button. */
    public readonly closeNotification = output<void>()

    /** The icon to render in the notification, based on the type of notification. */
    protected readonly icon = computed(() => {
        switch (this.type()) {
            case 'info':
                return 'info'
            case 'warning':
                return 'warning'
            case 'success':
                return 'check_circle'
            case 'error':
                return 'dangerous'
        }
    })
}
