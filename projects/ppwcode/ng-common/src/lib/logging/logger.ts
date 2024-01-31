// Any is allowed in this file because the type definition of the console only supports any.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FactoryProvider, InjectionToken } from '@angular/core'
import { PpwLoggerOptions } from './logger-options'

export const PPW_LOGGER = new InjectionToken<PpwLogger>('PpwLogger')

export interface PpwLogger {
    readonly debugMode: boolean
    readonly prefix: string

    debug(message?: any, ...optionalParams: any[]): void

    info(message?: any, ...optionalParams: any[]): void

    log(message?: any, ...optionalParams: any[]): void

    warn(message?: any, ...optionalParams: any[]): void

    error(message?: any, ...optionalParams: any[]): void
}

export class Logger implements PpwLogger {
    constructor(
        public readonly prefix: string,
        public readonly debugMode: boolean
    ) {}

    public debug(message?: any, ...optionalParams: any[]): void {
        if (this.debugMode) {
            console.debug(this.prefixMessage(message), ...optionalParams)
        }
    }

    public info(message?: any, ...optionalParams: any[]): void {
        console.info(this.prefixMessage(message), ...optionalParams)
    }

    public log(message?: any, ...optionalParams: any[]): void {
        console.log(this.prefixMessage(message), ...optionalParams)
    }

    public warn(message?: any, ...optionalParams: any[]): void {
        console.warn(this.prefixMessage(message), ...optionalParams)
    }

    public error(message?: any, ...optionalParams: any[]): void {
        console.error(this.prefixMessage(message), ...optionalParams)
    }

    private prefixMessage(message?: any): string {
        return this.prefix ? `${this.prefix} ${message}` : message
    }
}

export const provideLogger = (options?: PpwLoggerOptions): FactoryProvider => ({
    provide: PPW_LOGGER,
    useFactory: () => new Logger(options?.prefix ?? '', options?.debug ?? false)
})
