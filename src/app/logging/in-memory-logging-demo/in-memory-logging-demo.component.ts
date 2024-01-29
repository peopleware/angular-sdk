import { JsonPipe } from '@angular/common'
import { Component, inject, TrackByFunction } from '@angular/core'
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
    standalone: true,
    imports: [MatButtonModule, MatListModule, JsonPipe, PpwTableModule, MessageBarComponent],
    templateUrl: './in-memory-logging-demo.component.html',
    styleUrl: './in-memory-logging-demo.component.scss',
    providers: [provideInMemoryLogger({ debug: true })]
})
export class InMemoryLoggingDemoComponent {
    private logger: InMemoryLogger = inject(PPW_LOGGER) as InMemoryLogger

    private getLogLineStyles = (logLine: LogLine): Record<string, unknown> => {
        let styles: Record<string, unknown> = {}

        switch (logLine.type) {
            case 'log':
                styles = { background: 'lightgray' }
                break
            case 'info':
                styles = { background: '#b0d9ef' }
                break
            case 'warn':
                styles = { background: '#efd4b0' }
                break
            case 'error':
                styles = { background: '#efb0b0' }
                break
        }

        console.log(styles)

        return styles
    }

    public options: PpwTableOptions<LogLine> = {
        columns: {
            styles: {
                type: this.getLogLineStyles,
                message: this.getLogLineStyles
            }
        }
    }

    public get logLines(): Array<LogLine> {
        return this.logger.logLines.map((ll) => ({
            type: ll.type,
            message: ll.message
        }))
    }

    public addLogLine(type: 'debug' | 'info' | 'log' | 'warn' | 'error'): void {
        switch (type) {
            case 'debug':
                this.logger.debug('This is a debug message')
                break
            case 'info':
                this.logger.info('This is an info message')
                break
            case 'log':
                this.logger.log('This is a log message')
                break
            case 'warn':
                this.logger.warn('This is a warn message')
                break
            case 'error':
                this.logger.error('This is an error message')
                break
        }
    }

    public clear(): void {
        this.logger.clear()
    }

    public trackLogLine: TrackByFunction<LogLine> = (index: number, logLine: LogLine): string => {
        return `${index}-${logLine.message}`
    }
    protected readonly Severity = Severity
}
