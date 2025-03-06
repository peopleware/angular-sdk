import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { ppwHttpErrorExtractorWithTranslatedMessages } from '@ppwcode/ng-async'

import { AppModule } from './app/app.module'

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err))

window.ppwcodeHttpErrorExtractor = ppwHttpErrorExtractorWithTranslatedMessages
