import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { provideRouter, withDisabledInitialNavigation } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { PpwTableModule, PpwTableOptions } from '@ppwcode/ng-common-components'
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite'
import { InMemoryLogger, InMemoryLogLine, provideInMemoryLogger } from './in-memory-logger'
import { PPW_LOGGER } from './logger'

interface LogLine extends Record<string, unknown> {
    type: InMemoryLogLine['type']
    message: string
}

const messages = {
    debug: 'This is a debug message',
    info: 'This is an info message',
    log: 'This is a log message',
    warn: 'This is a warn message',
    error: 'This is an error message'
}

const logLineStyles = (line: LogLine): Record<string, unknown> => {
    switch (line.type) {
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

@Component({
    selector: 'ppw-in-memory-logging-story',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatButtonModule, MatDividerModule, PpwTableModule, TranslateModule],
    template: `
        <div class="flex-column gap-16 padding-8">
            <p>Log messages are stored in memory instead of being written to the console.</p>
            <div>
                Debug logging: {{ logger.debugMode ? 'enabled' : 'disabled' }}. Prefix: {{ logger.prefix || '(none)' }}.
            </div>
            @if (!logger.debugMode) {
                <p>
                    Debug logging is disabled by default. Add debug line stores no entry; the other levels still work.
                </p>
            }
            <div class="flex-row gap-16">
                <div class="flex-column gap-8">
                    <button mat-stroked-button type="button" (click)="addLogLine('debug')">Add debug line</button>
                    <button mat-stroked-button type="button" (click)="addLogLine('info')">Add info line</button>
                    <button mat-stroked-button type="button" (click)="addLogLine('log')">Add log line</button>
                    <button mat-stroked-button type="button" (click)="addLogLine('warn')">Add warning line</button>
                    <button mat-stroked-button type="button" (click)="addLogLine('error')">Add error line</button>
                </div>
                <mat-divider [vertical]="true" />
                <div class="flex-column flex-grow-1 gap-16">
                    <ppw-table [data]="logLines()" [options]="options" [trackBy]="trackLogLine">
                        <ppw-column type="text" label="type" name="type" />
                        <ppw-column type="text" label="message" name="message" />
                    </ppw-table>
                    <div>
                        <button mat-stroked-button type="button" (click)="clear()">Clear log</button>
                    </div>
                </div>
            </div>
        </div>
    `
})
class InMemoryLoggingStoryComponent {
    protected readonly logger: InMemoryLogger
    protected readonly logLines = signal<LogLine[]>([])
    protected readonly options: PpwTableOptions<LogLine> = {
        columns: { styles: { type: logLineStyles, message: logLineStyles } }
    }
    protected readonly trackLogLine = (index: number, line: LogLine): string => `${index}-${line.message}`

    constructor() {
        const logger = inject(PPW_LOGGER)
        if (!(logger instanceof InMemoryLogger)) {
            throw new Error('The logging story requires provideInMemoryLogger().')
        }
        this.logger = logger
        inject(DestroyRef).onDestroy(() => logger.clear())
    }

    protected addLogLine(type: InMemoryLogLine['type']): void {
        this.logger[type](messages[type])
        this.refreshLogLines()
    }

    protected clear(): void {
        this.logger.clear()
        this.refreshLogLines()
    }

    private refreshLogLines(): void {
        this.logLines.set(this.logger.logLines.map(({ type, message }) => ({ type, message })))
    }
}

const meta: Meta<InMemoryLoggingStoryComponent> = {
    title: 'ng-common/InMemoryLogging',
    component: InMemoryLoggingStoryComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({ imports: [InMemoryLoggingStoryComponent, TranslateModule] }),
        applicationConfig({ providers: [provideRouter([], withDisabledInitialNavigation())] })
    ],
    parameters: {
        docs: {
            description: {
                component: `Use \`provideInMemoryLogger()\` in application or TestBed providers, then inject \`PPW_LOGGER\` to log without writing to the console. Narrow it with \`instanceof InMemoryLogger\` to read \`logLines\` or call \`clear()\`.

Debug entries are disabled by default; enable them with \`provideInMemoryLogger({ debug: true })\`. Set \`prefix\` to prepend text to every stored message. Each story has its own provider configuration and starts empty. The table publishes a fresh signal snapshot after each action because the logger's array is mutable. Optional parameters remain stored by the logger but are not shown in this table.`
            }
        }
    }
}

export default meta
type Story = StoryObj<InMemoryLoggingStoryComponent>

export const AllLevels: Story = {
    decorators: [applicationConfig({ providers: [provideInMemoryLogger({ debug: true })] })]
}

export const DebugDisabled: Story = {
    decorators: [applicationConfig({ providers: [provideInMemoryLogger()] })]
}

export const WithPrefix: Story = {
    decorators: [applicationConfig({ providers: [provideInMemoryLogger({ debug: true, prefix: '[Demo]' })] })]
}
