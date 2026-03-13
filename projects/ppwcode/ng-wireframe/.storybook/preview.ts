import type { Preview } from '@storybook/angular'
import { applicationConfig } from '@storybook/angular'
import { provideZonelessChangeDetection } from '@angular/core'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { provideTranslateService } from '@ngx-translate/core'
import { provideRouter } from '@angular/router'

const preview: Preview = {
    decorators: [
        applicationConfig({
            providers: [
                provideZonelessChangeDetection(),
                provideNoopAnimations(),
                provideTranslateService(),
                provideRouter([])
            ]
        }),
        (story, context) => {
            const link = document.createElement('link')
            link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons'
            link.rel = 'stylesheet'
            document.head.appendChild(link)
            return story(context)
        }
    ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    }
}

export default preview
