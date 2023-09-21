import { AsyncResult } from '@ppwcode/ng-async'
import { saveAs } from 'file-saver'
import { notNull } from '@ppwcode/js-ts-oddsandends/lib/conditional-assert'

export const saveDownloadedFile =
    (fileName: string) =>
    (asyncResult: AsyncResult<Blob | null>): void => {
        saveAs(notNull(asyncResult.entity), fileName)
    }
