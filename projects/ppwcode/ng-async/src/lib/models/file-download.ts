import { HttpResponse } from '@angular/common/http'
import { notUndefined } from '@ppwcode/js-ts-oddsandends/lib/conditional-assert'

export interface FileDownload {
    blob: Blob
    fileName?: string
}

export const httpResponseToFileDownload = (response: HttpResponse<Blob>): FileDownload => {
    const contentDisposition = response.headers.get('Content-Disposition')
    return {
        blob: notUndefined(response.body || undefined),
        fileName:
            contentDisposition && contentDisposition.length && contentDisposition.indexOf('filename=') > -1
                ? contentDisposition.split('filename=')[1].trim().replace(/['"]/g, '')
                : undefined
    }
}
