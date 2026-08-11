import { HttpParams } from '@angular/common/http'

export const getQueryParamsString = (httpParams?: HttpParams): string => {
    const httpParamsString = httpParams?.toString() ?? ''
    if (httpParamsString) {
        return `?${httpParamsString}`
    }
    return ''
}
