// Any is allowed in this file because the type definition of the console only supports any.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FactoryProvider, InjectionToken } from '@angular/core'
import { PpwLoggerOptions } from './logger-options'

export const PPW_LOGGER = new InjectionToken<PpwLogger>('PpwLogger')

export interface PpwLogger {
    readonly debugMode: boolean

    debug(message?: any, ...optionalParams: any[]): void

    info(message?: any, ...optionalParams: any[]): void

    log(message?: any, ...optionalParams: any[]): void

    warn(message?: any, ...optionalParams: any[]): void

    error(message?: any, ...optionalParams: any[]): void
}

export class Logger implements PpwLogger {
    constructor(public readonly debugMode: boolean) {}

    public debug(message?: any, ...optionalParams: any[]): void {
        if (this.debugMode) {
            console.debug(message, ...optionalParams)
        }
    }

    public info(message?: any, ...optionalParams: any[]): void {
        console.info(message, ...optionalParams)
    }

    public log(message?: any, ...optionalParams: any[]): void {
        console.log(message, ...optionalParams)
    }

    public warn(message?: any, ...optionalParams: any[]): void {
        console.warn(message, ...optionalParams)
    }

    public error(message?: any, ...optionalParams: any[]): void {
        console.error(message, ...optionalParams)
    }
}

export const provideLogger = (options?: PpwLoggerOptions): FactoryProvider => ({
    provide: PPW_LOGGER,
    useFactory: () => new Logger(options?.debug ?? false)
})
