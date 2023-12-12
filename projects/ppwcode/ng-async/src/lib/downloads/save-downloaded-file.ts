import { saveAs } from 'file-saver-es'
import { notNull } from '@ppwcode/js-ts-oddsandends/lib/conditional-assert'
import { AsyncResult } from '../models/async-result'
import { FileDownload } from '../models/file-download'

export const saveDownloadedFile =
    (fileName: string) =>
    (asyncResult: AsyncResult<Blob | null>): void => {
        saveAs(notNull(asyncResult.entity), fileName)
    }

/**
 * Can be used to save file that comes with a filename in the response from the back-end.
 */
export const saveFileDownload =
    () =>
    (asyncResult: AsyncResult<FileDownload | null>): void => {
        saveAs(notNull(asyncResult.entity).blob, notNull(asyncResult.entity).fileName)
    }
