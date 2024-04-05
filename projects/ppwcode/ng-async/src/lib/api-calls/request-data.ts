export const cleanupRequestData = (data: { [key: string]: unknown }) => {
    const dataKeys: Array<string> = Object.keys(data)
    const cleanedData: { [key: string]: unknown } = {}

    dataKeys.forEach((dataKey) => {
        if (data[dataKey] !== undefined && data[dataKey] !== null) {
            cleanedData[dataKey] = data[dataKey]
        }
    })

    return cleanedData
}
