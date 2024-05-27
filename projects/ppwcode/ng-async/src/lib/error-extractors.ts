import { HttpErrorResponse } from '@angular/common/http'
import { PpwErrorMessage } from './models/error-message'
import { extractHttpError } from './error-handling'

export const ppwHttpErrorExtractorWithTranslatedMessages = (response: HttpErrorResponse): Error => {
    if (response.status === 400) {
        const messages: PpwErrorMessage[] = (response.error.messages ?? []).filter(
            (msg: PpwErrorMessage) => msg.translated
        )
        if (messages?.length) {
            return new Error(messages.map((msg) => msg.text).join('\n'))
        } else {
            return extractHttpError(response, true)
        }
    } else {
        return extractHttpError(response, true)
    }
}
