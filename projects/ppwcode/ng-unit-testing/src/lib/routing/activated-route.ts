import { InjectionToken, ValueProvider } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { ActivatedRoute, Data } from '@angular/router'
import { BehaviorSubject, firstValueFrom, map } from 'rxjs'

// Injection tokens for the BehaviorSubject instances
export const ACTIVATED_ROUTE_PARAMS = new InjectionToken<BehaviorSubject<{ [key: string]: string }>>(
    'ACTIVATED_ROUTE_PARAMS'
)
export const ACTIVATED_ROUTE_QUERY_PARAMS = new InjectionToken<BehaviorSubject<{ [key: string]: string }>>(
    'ACTIVATED_ROUTE_QUERY_PARAMS'
)
export const ACTIVATED_ROUTE_DATA = new InjectionToken<BehaviorSubject<Data>>('ACTIVATED_ROUTE_DATA')

/**
 * Provides a mocked ActivatedRoute with dynamic BehaviorSubject instances for testing.
 * Returns multiple providers including the ActivatedRoute mock and injectable BehaviorSubject instances.
 * @param options Configuration object with optional route parameters, query parameters, and data
 * @returns Array of ValueProvider instances for TestBed configuration
 */
export const provideActivatedRoute = (options?: {
    routeParams?: { [key: string]: string }
    queryParams?: { [key: string]: string }
    data?: Data
}): ValueProvider[] => {
    const queryParams = options?.queryParams ?? {}
    const routeParams = options?.routeParams ?? {}
    const data = options?.data ?? {}

    // Create BehaviorSubject instances
    const paramsSubject = new BehaviorSubject(routeParams)
    const queryParamsSubject = new BehaviorSubject(queryParams)
    const dataSubject = new BehaviorSubject(data)

    return [
        // Provide the BehaviorSubject instances
        {
            provide: ACTIVATED_ROUTE_PARAMS,
            useValue: paramsSubject
        },
        {
            provide: ACTIVATED_ROUTE_QUERY_PARAMS,
            useValue: queryParamsSubject
        },
        {
            provide: ACTIVATED_ROUTE_DATA,
            useValue: dataSubject
        },
        // Provide the mocked ActivatedRoute
        {
            provide: ActivatedRoute,
            useValue: {
                queryParamMap: queryParamsSubject.asObservable().pipe(
                    map((params) => ({
                        get: (propertyName: string) => params[propertyName] ?? null
                    }))
                ),
                paramMap: paramsSubject.asObservable().pipe(
                    map((params) => ({
                        get: (propertyName: string) => params[propertyName] ?? null
                    }))
                ),
                params: paramsSubject.asObservable(),
                queryParams: queryParamsSubject.asObservable(),
                data: dataSubject.asObservable(),
                snapshot: {
                    get params() {
                        return paramsSubject.value
                    },
                    get queryParams() {
                        return queryParamsSubject.value
                    },
                    get data() {
                        return dataSubject.value
                    }
                }
            } as ActivatedRoute
        }
    ]
}

/**
 * Updates the route parameters during test execution.
 * Merges the provided parameters with existing ones.
 * @param paramsToUpdate Object containing route parameters to update
 */
export const updateActivatedRouteParams = (paramsToUpdate: { [key: string]: string }) => {
    const paramsSubject = TestBed.inject(ACTIVATED_ROUTE_PARAMS)
    paramsSubject.next({ ...paramsSubject.value, ...paramsToUpdate })
}

/**
 * Updates the query parameters during test execution.
 * Merges the provided query parameters with existing ones.
 * @param queryParamsToUpdate Object containing query parameters to update
 */
export const updateActivatedRouteQueryParams = (queryParamsToUpdate: { [key: string]: string }) => {
    const queryParamsSubject = TestBed.inject(ACTIVATED_ROUTE_QUERY_PARAMS)
    queryParamsSubject.next({ ...queryParamsSubject.value, ...queryParamsToUpdate })
}

/**
 * Updates the route data during test execution.
 * Merges the provided data with existing route data.
 * @param dataToUpdate Object containing route data to update
 */
export const updateActivatedRouteData = (dataToUpdate: Data) => {
    const dataSubject = TestBed.inject(ACTIVATED_ROUTE_DATA)
    dataSubject.next({ ...dataSubject.value, ...dataToUpdate })
}

/**
 * Asserts that the ActivatedRoute snapshot data matches the expected data.
 * @param data Expected route data object
 */
export const expectSnapshotData = (data: Data) => {
    expect(getActivatedRouteProperty('snapshot').data).toEqual(data)
}

/**
 * Asserts that the ActivatedRoute snapshot parameters match the expected parameters.
 * @param params Expected route parameters object
 */
export const expectSnapshotParams = (params: { [key: string]: string }) => {
    expect(getActivatedRouteProperty('snapshot').params).toEqual(params)
}

/**
 * Asserts that the ActivatedRoute snapshot query parameters match the expected query parameters.
 * @param queryParams Expected query parameters object
 */
export const expectSnapshotQueryParams = (queryParams: { [key: string]: string }) => {
    expect(getActivatedRouteProperty('snapshot').queryParams).toEqual(queryParams)
}

/**
 * Asserts that the ActivatedRoute data observable emits the expected data.
 * @param data Expected route data object
 */
export const expectData = async (data: Data) => {
    const result = await firstValueFrom(getActivatedRouteProperty('data'))
    expect(result).toEqual(data)
}

/**
 * Asserts that the ActivatedRoute params observable emits the expected parameters.
 * @param params Expected route parameters object
 */
export const expectParams = async (params: { [key: string]: string }) => {
    const result = await firstValueFrom(getActivatedRouteProperty('params'))
    expect(result).toEqual(params)
}

/**
 * Asserts that the ActivatedRoute queryParams observable emits the expected query parameters.
 * @param queryParams Expected query parameters object
 */
export const expectQueryParams = async (queryParams: { [key: string]: string }) => {
    const result = await firstValueFrom(getActivatedRouteProperty('queryParams'))
    expect(result).toEqual(queryParams)
}

/**
 * Asserts that a specific parameter in the paramMap has the expected value.
 * @param propertyName Name of the parameter to check
 * @param value Expected value of the parameter
 */
export const expectParamMapValue = async (propertyName: string, value: string) => {
    const paramMap = await firstValueFrom(getActivatedRouteProperty('paramMap'))
    expect(paramMap.get(propertyName)).toEqual(value)
}

/**
 * Asserts that a specific parameter in the queryParamMap has the expected value.
 * @param propertyName Name of the query parameter to check
 * @param value Expected value of the query parameter
 */
export const expectQueryParamMapValue = async (propertyName: string, value: string) => {
    const queryParamMap = await firstValueFrom(getActivatedRouteProperty('queryParamMap'))
    expect(queryParamMap.get(propertyName)).toEqual(value)
}

const getActivatedRouteProperty = <TKey extends keyof ActivatedRoute>(propertyName: TKey): ActivatedRoute[TKey] => {
    const activatedRoute = TestBed.inject(ActivatedRoute)
    return activatedRoute[propertyName]
}
