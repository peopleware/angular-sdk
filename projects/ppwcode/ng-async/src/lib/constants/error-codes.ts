import { HttpStatusCode } from '@angular/common/http'

export const DEFAULT_HTTP_ERROR_CODES: Array<number> = [
    HttpStatusCode.BadRequest,
    HttpStatusCode.Forbidden,
    HttpStatusCode.NotFound,
    HttpStatusCode.MethodNotAllowed,
    HttpStatusCode.InternalServerError
]
