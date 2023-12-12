import { HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'

export const throwHttpErrorResponse = (statusCode: number): Observable<never> =>
    throwError(
        () =>
            new HttpErrorResponse({
                error: `Error ${statusCode}`,
                status: statusCode
            })
    )
