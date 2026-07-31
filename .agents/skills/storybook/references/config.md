# Storybook Configuration for Angular

## Main Configuration (`.storybook/main.ts`)

```typescript
import type { StorybookConfig } from '@storybook/angular'

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-docs', '@storybook/addon-themes', '@storybook/addon-a11y'],
    framework: '@storybook/angular',
    staticDirs: [
        {
            from: '../public',
            to: '/'
        }
    ]
}
export default config
```

Key requirements:

-   Map the real application's static assets into Storybook, especially translation files, fonts, and other shared resources.
-   Keep `main.ts` aligned with the real project layout instead of copying a generic template.

## Preview Configuration (`.storybook/preview.ts`)

```typescript
import { provideHttpClient } from '@angular/common/http'
import { inject, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field'
import { withThemeByClassName } from '@storybook/addon-themes'
import { applicationConfig, type Preview } from '@storybook/angular'
import { provideTranslateService, TranslateService } from '@ngx-translate/core'
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader'

const preview: Preview = {
    decorators: [
        withThemeByClassName({
            themes: {
                light: '',
                dark: 'dark-theme'
            },
            defaultTheme: 'light'
        }),
        (storyFn) => {
            document.body.classList.add('mat-typography')
            return storyFn()
        },
        applicationConfig({
            providers: [
                provideZonelessChangeDetection(),
                provideNoopAnimations(),
                provideHttpClient(),
                provideTranslateService({
                    fallbackLang: 'en',
                    lang: 'en',
                    loader: provideTranslateHttpLoader({ prefix: './i18n/', suffix: '.json' })
                }),
                provideAppInitializer(() => {
                    const translate = inject(TranslateService)
                    translate.use('en')
                }),
                provideRouter([]),
                {
                    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
                    useValue: {
                        appearance: 'outline',
                        subscriptSizing: 'dynamic',
                        floatLabel: 'always'
                    } as MatFormFieldDefaultOptions
                }
            ]
        })
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
```

Key requirements:

-   Mirror the application's global providers and visual setup closely enough that stories render like the real UI.
-   Ensure Storybook picks up the same typography classes, translation loading, theme switching, and shared component defaults as the app.
-   When the project's styling or provider setup changes, update Storybook config in the same change.
