export type PpwInfoLevel = 'INFO' | 'WARNING' | 'ERROR'

export interface PpwErrorMessage {
    code: string
    infoLevel: PpwInfoLevel
    parameters: string[]
    text: string
    translated: boolean
}
