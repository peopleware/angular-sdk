// Any is allowed in this file because the type definition of the console only supports any.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FactoryProvider } from '@angular/core'
import { PPW_LOGGER, PpwLogger } from './logger'
import { PpwLoggerOptions } from './logger-options'

export interface InMemoryLogLine {
    type: 'debug' | 'info' | 'log' | 'warn' | 'error'
    message: string
    optionalParams: any[]
}

export class InMemoryLogger implements PpwLogger {
    public readonly logLines: Array<InMemoryLogLine> = []

    constructor(public readonly debugMode: boolean) {}

    public debug(message?: any, ...optionalParams: any[]): void {
        if (this.debugMode) {
            this.logLines.push({ type: 'debug', message, optionalParams })
        }
    }

    public info(message?: any, ...optionalParams: any[]): void {
        this.logLines.push({ type: 'info', message, optionalParams })
    }

    public log(message?: any, ...optionalParams: any[]): void {
        this.logLines.push({ type: 'log', message, optionalParams })
    }

    public warn(message?: any, ...optionalParams: any[]): void {
        this.logLines.push({ type: 'warn', message, optionalParams })
    }

    public error(message?: any, ...optionalParams: any[]): void {
        this.logLines.push({ type: 'error', message, optionalParams })
    }

    public clear(): void {
        this.logLines.splice(0, this.logLines.length)
    }
}

export const provideInMemoryLogger = (options?: PpwLoggerOptions): FactoryProvider => ({
    provide: PPW_LOGGER,
    useFactory: () => new InMemoryLogger(options?.debug ?? false)
})
