import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { ppwHttpErrorExtractorWithTranslatedMessages } from '../projects/ppwcode/ng-async/src/lib/error-extractors'

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err))

window.ppwcodeHttpErrorExtractor = ppwHttpErrorExtractorWithTranslatedMessages
