import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { GlobalPositionStrategy, OverlayModule } from '@angular/cdk/overlay'
import { MatButtonModule } from '@angular/material/button'
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { provideTranslateService } from '@ngx-translate/core'
import { NotificationType } from '../notification'
import { NotificationsService } from '../notifications.service'
import { providePpwcodeCommonComponents } from '../../providers'

const bottomCenterPositionConfigurator = (strategy: GlobalPositionStrategy): GlobalPositionStrategy =>
    strategy.bottom('var(--ppw-ds-spacing-gutter)').centerHorizontally()

@Component({
    selector: 'ppw-notifications-example',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatButtonModule],
    template: `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 32px;">
            <p>Notifications are displayed using the configured viewport position.</p>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;">
                <button mat-flat-button (click)="showNotification('success')">Success</button>
                <button mat-flat-button (click)="showNotification('error')">Error</button>
                <button mat-flat-button (click)="showNotification('warning')">Warning</button>
                <button mat-flat-button (click)="showNotification('info')">Info</button>
            </div>
        </div>
    `
})
class NotificationsExampleComponent {
    readonly #notificationsService = inject(NotificationsService)

    public showNotification(type: NotificationType): void {
        switch (type) {
            case 'success':
                this.#notificationsService.success('Your changes were saved successfully.')
                break
            case 'error':
                this.#notificationsService.error('The changes could not be saved.')
                break
            case 'warning':
                this.#notificationsService.warning('Your session will expire soon.')
                break
            case 'info':
                this.#notificationsService.info('A new version of the application is available.')
                break
        }
    }
}

const meta: Meta<NotificationsExampleComponent> = {
    title: 'ng-common-components/Notifications',
    component: NotificationsExampleComponent,
    decorators: [
        moduleMetadata({
            imports: [NotificationsExampleComponent, OverlayModule]
        }),
        applicationConfig({
            providers: [provideTranslateService(), NotificationsService]
        })
    ],
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
### When to use
Use notifications to provide short-lived, non-blocking feedback about an action or system state. The NotificationsService displays them in the configured viewport position and removes them automatically after a short delay. Notifications can also be closed explicitly. The default position is the top-right corner.
                `
            }
        }
    }
}

export default meta
type Story = StoryObj<NotificationsExampleComponent>

export const Service: Story = {}

export const BottomCenter: Story = {
    decorators: [
        applicationConfig({
            providers: [
                providePpwcodeCommonComponents({
                    notifications: {
                        positionConfigurator: bottomCenterPositionConfigurator
                    }
                })
            ]
        })
    ]
}

export const ShortTimeout: Story = {
    decorators: [
        applicationConfig({
            providers: [
                providePpwcodeCommonComponents({
                    notifications: {
                        defaultTimeout: 2000
                    }
                })
            ]
        })
    ],
    parameters: {
        docs: {
            description: {
                story: 'Notifications in this story use a 2-second default timeout.'
            }
        }
    }
}
