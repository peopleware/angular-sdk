declare type RequestDataValueType = string | number | boolean | readonly (string | number | boolean)[]

export const cleanupRequestData = (data: { [key: string]: unknown }) => {
    const dataKeys: Array<string> = Object.keys(data)
    const cleanedData: { [param: string]: RequestDataValueType } = {}

    dataKeys.forEach((dataKey) => {
        if (data[dataKey] !== undefined && data[dataKey] !== null) {
            cleanedData[dataKey] = data[dataKey] as RequestDataValueType
        }
    })

    return cleanedData
}
