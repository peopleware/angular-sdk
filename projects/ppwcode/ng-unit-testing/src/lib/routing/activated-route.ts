import { ValueProvider } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { ActivatedRoute, Data } from '@angular/router'
import { firstValueFrom, of } from 'rxjs'

export const provideActivatedRoute = (options?: {
    routeParams?: { [key: string]: string }
    queryParams?: { [key: string]: string }
    data?: Data
}): ValueProvider => {
    const queryParams = options?.queryParams ?? {}
    const routeParams = options?.routeParams ?? {}
    const data = options?.data ?? {}

    return {
        provide: ActivatedRoute,
        useValue: {
            queryParamMap: of({
                get: (propertyName: string) => queryParams[propertyName] ?? null
            }),
            paramMap: of({
                get: (propertyName: string) => routeParams[propertyName] ?? null
            }),
            params: of(routeParams),
            queryParams: of(queryParams),
            data: of(data),
            snapshot: {
                params: routeParams,
                queryParams: queryParams,
                data: data
            }
        } as ActivatedRoute
    }
}

export const expectSnapshotData = (data: Data) => {
    expect(getActivatedRouteProperty('snapshot').data).toEqual(data)
}

export const expectSnapshotParams = (params: { [key: string]: string }) => {
    expect(getActivatedRouteProperty('snapshot').params).toEqual(params)
}

export const expectSnapshotQueryParams = (queryParams: { [key: string]: string }) => {
    expect(getActivatedRouteProperty('snapshot').queryParams).toEqual(queryParams)
}

export const expectData = async (data: Data) => {
    const result = await firstValueFrom(getActivatedRouteProperty('data'))
    expect(result).toEqual(data)
}

export const expectParams = async (params: { [key: string]: string }) => {
    const result = await firstValueFrom(getActivatedRouteProperty('params'))
    expect(result).toEqual(params)
}

export const expectQueryParams = async (queryParams: { [key: string]: string }) => {
    const result = await firstValueFrom(getActivatedRouteProperty('queryParams'))
    expect(result).toEqual(queryParams)
}

export const expectParamMapValue = async (propertyName: string, value: string) => {
    const paramMap = await firstValueFrom(getActivatedRouteProperty('paramMap'))
    expect(paramMap.get(propertyName)).toEqual(value)
}

export const expectQueryParamMapValue = async (propertyName: string, value: string) => {
    const queryParamMap = await firstValueFrom(getActivatedRouteProperty('queryParamMap'))
    expect(queryParamMap.get(propertyName)).toEqual(value)
}

const getActivatedRouteProperty = <TKey extends keyof ActivatedRoute>(propertyName: TKey): ActivatedRoute[TKey] => {
    const activatedRoute = TestBed.inject(ActivatedRoute)
    return activatedRoute[propertyName]
}
