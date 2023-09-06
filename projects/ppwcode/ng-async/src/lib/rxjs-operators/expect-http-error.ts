import { HttpErrorResponse } from '@angular/common/http'
import { Observable, Subscriber } from 'rxjs'

// eslint-disable-next-line max-lines-per-function
export const expectHttpError = <TResult>(
    statusCodes: Array<number>,
    handler: (httpError: HttpErrorResponse) => TResult,
    complete = false
) =>
    // eslint-disable-next-line max-lines-per-function
    function <T>(source: Observable<T>): Observable<T | TResult> {
        return new Observable((subscriber: Subscriber<T | TResult>) =>
            source.subscribe({
                next(value: T) {
                    subscriber.next(value)
                },
                error(error: HttpErrorResponse | unknown) {
                    if (error instanceof HttpErrorResponse && statusCodes.indexOf(error.status) > -1) {
                        const continueWithValue: TResult = handler(error)
                        subscriber.next(continueWithValue)
                        if (complete) {
                            subscriber.complete()
                        }
                    } else {
                        subscriber.error(error)
                    }
                },
                complete() {
                    subscriber.complete()
                }
            })
        )
    }
