import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'
import { InMemoryLogger, PPW_LOGGER, provideInMemoryLogger } from '@ppwcode/ng-common'
import { MessageBarComponent, PpwTableModule, PpwTableOptions, Severity } from '@ppwcode/ng-common-components'

export interface LogLine extends Record<string, unknown> {
    type: string
    message: string
}

@Component({
    selector: 'ppw-in-memory-logging-demo',
    imports: [MatButtonModule, MatListModule, PpwTableModule, MessageBarComponent],
    templateUrl: './in-memory-logging-demo.component.html',
    styleUrl: './in-memory-logging-demo.component.scss',
    providers: [provideInMemoryLogger({ debug: true })],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InMemoryLoggingDemoComponent {
    #logger: InMemoryLogger = inject(PPW_LOGGER) as InMemoryLogger

    protected readonly Severity = Severity

    protected readonly options: PpwTableOptions<LogLine> = {
        columns: {
            styles: {
                type: this.#getLogLineStyles,
                message: this.#getLogLineStyles
            }
        }
    }

    protected get logLines(): Array<LogLine> {
        return this.#logger.logLines.map((ll) => ({
            type: ll.type,
            message: ll.message
        }))
    }

    protected addLogLine(type: 'debug' | 'info' | 'log' | 'warn' | 'error'): void {
        switch (type) {
            case 'debug':
                this.#logger.debug('This is a debug message')
                break
            case 'info':
                this.#logger.info('This is an info message')
                break
            case 'log':
                this.#logger.log('This is a log message')
                break
            case 'warn':
                this.#logger.warn('This is a warn message')
                break
            case 'error':
                this.#logger.error('This is an error message')
                break
        }
    }

    protected clear(): void {
        this.#logger.clear()
    }

    protected trackLogLine(index: number, logLine: LogLine): string {
        return `${index}-${logLine.message}`
    }

    #getLogLineStyles(logLine: LogLine): Record<string, unknown> {
        switch (logLine.type) {
            case 'log':
                return { background: 'lightgray' }
            case 'info':
                return { background: '#b0d9ef' }
            case 'warn':
                return { background: '#efd4b0' }
            case 'error':
                return { background: '#efb0b0' }
            default:
                return {}
        }
    }
}
