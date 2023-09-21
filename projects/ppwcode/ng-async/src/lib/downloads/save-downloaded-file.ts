import { saveAs } from 'file-saver'
import { notNull } from '@ppwcode/js-ts-oddsandends/lib/conditional-assert'
import { AsyncResult } from '../models/async-result'

export const saveDownloadedFile =
    (fileName: string) =>
    (asyncResult: AsyncResult<Blob | null>): void => {
        saveAs(notNull(asyncResult.entity), fileName)
    }
