import { HttpResponse } from '@angular/common/http'
import { notUndefined } from '@ppwcode/ng-utils'

export interface FileDownload {
    blob: Blob
    fileName?: string
}

export const httpResponseToFileDownload = (response: HttpResponse<Blob>): FileDownload => {
    const contentDisposition = response.headers.get('Content-Disposition')
    const fileName = getFileNameFromContentDisposition(contentDisposition)
    return {
        blob: notUndefined(response.body || undefined),
        fileName
    }
}

export const getFileNameFromContentDisposition = (contentDisposition?: string | null): string | undefined => {
    if (!(contentDisposition && contentDisposition.length && contentDisposition.indexOf('filename=') > -1)) {
        return undefined
    }
    const filenameStart = contentDisposition.split('filename=')[1]
    const filename =
        filenameStart?.length && filenameStart.indexOf(';') > -1 ? filenameStart.split(';')[0] : filenameStart
    return filename?.length ? filename.trim().replace(/['"]/g, '') : undefined
}
