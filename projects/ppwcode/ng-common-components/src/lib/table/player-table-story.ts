import { formatCurrency, formatPercent, JsonPipe } from '@angular/common'
import { provideHttpClient } from '@angular/common/http'
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    linkedSignal,
    output,
    signal,
    ViewEncapsulation
} from '@angular/core'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { provideRouter, withDisabledInitialNavigation } from '@angular/router'
import { provideTranslateService, TranslateModule } from '@ngx-translate/core'
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader'
import { applicationConfig, moduleMetadata } from '@storybook/angular-vite'
import { DateTime } from 'luxon'
import { SortChange } from './models/sort-change.model'
import { TableRecord } from './models/table-record.model'
import { PpwTableOptions } from './options/table-options'
import { PpwTableModule } from './table.module'

export interface StoryPlayer extends Record<string, unknown> {
    id: number
    firstName: string
    lastName: string
    birthDate: DateTime
    age: number
    income: number
    bonus: number
    active: boolean
}

export const createPlayers = (): StoryPlayer[] => [
    {
        id: 1,
        firstName: 'Lionel',
        lastName: 'Messi',
        birthDate: DateTime.fromISO('1988-07-23'),
        age: 35,
        income: 35000,
        bonus: 10,
        active: true
    },
    {
        id: 2,
        firstName: 'Christiano',
        lastName: 'Ronaldo',
        birthDate: DateTime.fromISO('1989-04-02'),
        age: 34,
        income: 37000,
        bonus: 2,
        active: true
    },
    {
        id: 3,
        firstName: 'Kevin',
        lastName: 'De Bruyne',
        birthDate: DateTime.fromISO('1992-10-18'),
        age: 31,
        income: 26000,
        bonus: 5,
        active: true
    },
    {
        id: 4,
        firstName: 'Eden',
        lastName: 'Hazard',
        birthDate: DateTime.fromISO('1991-06-28'),
        age: 32,
        income: 23000,
        bonus: 40,
        active: false
    },
    {
        id: 5,
        firstName: 'Roberto',
        lastName: 'Carlos',
        birthDate: DateTime.fromISO('1975-03-22'),
        age: 48,
        income: 23000,
        bonus: 30,
        active: false
    },
    {
        id: 6,
        firstName: 'Romelu',
        lastName: 'Lukaku',
        birthDate: DateTime.fromISO('1993-07-01'),
        age: 30,
        income: 24000,
        bonus: 20,
        active: true
    }
]

export const playerStoryDecorators = [
    moduleMetadata({ imports: [TranslateModule] }),
    applicationConfig({
        providers: [
            provideRouter([], withDisabledInitialNavigation()),
            provideHttpClient(),
            provideTranslateService({
                lang: 'en',
                fallbackLang: 'en',
                loader: provideTranslateHttpLoader({ prefix: '/assets/i18n/', suffix: '.json' })
            })
        ]
    })
]

@Component({
    selector: 'ppw-player-table-story',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PpwTableModule, TranslateModule, MatIconButton, MatIcon, JsonPipe],
    styles: [
        `
            ppw-player-table-story .scrollable {
                width: 500px;
                max-width: 100%;
            }
            ppw-player-table-story .scrollable .ppw-table {
                min-width: 1000px;
            }
        `
    ],
    template: `
        <div [class.scrollable]="stickyStart() || stickyEnd()">
            <ppw-table
                [data]="rows()"
                [trackBy]="trackBy"
                [options]="options()"
                [footerData]="showFooter() ? footer() : undefined"
                [sort]="sort()"
                [enableRowSelection]="selectionAndDrag()"
                [enableRowDrag]="selectionAndDrag()"
                (selectionChanged)="select($event)"
                (orderChanged)="reorder($event)"
                (sortChanged)="sortChanged.emit($event)"
            >
                <ppw-column
                    name="firstName"
                    type="text"
                    [label]="'table.firstname' | translate"
                    [sticky]="stickyStart()"
                    [sortable]="sortable()"
                />
                <ppw-column
                    name="lastName"
                    type="text"
                    [label]="'table.lastname' | translate"
                    [sortable]="sortable()"
                />
                <ppw-column
                    name="birthDate"
                    type="date"
                    [label]="'table.birthdate' | translate"
                    [dateFormatFn]="formatDate"
                    [sortable]="sortable()"
                />
                <ppw-column name="age" type="number" [label]="'table.age' | translate" />
                <ppw-column
                    name="income"
                    type="number"
                    [label]="'table.income' | translate"
                    [numberFormatFn]="formatIncome"
                    [sortable]="sortable()"
                />
                <ppw-column
                    name="bonus"
                    type="number"
                    [label]="'table.bonus' | translate"
                    [numberFormatFn]="formatBonus"
                    [sortable]="sortable()"
                />
                <ppw-column name="rowIndex" type="template" [label]="'table.row-index' | translate">
                    <ng-template ppw-column-cell let-rowIndex="rowIndex">{{ rowIndex }}</ng-template>
                </ppw-column>
                <ppw-column
                    name="active"
                    type="template"
                    label="Active"
                    [sticky]="stickyEnd()"
                    [stickyEnd]="stickyEnd()"
                >
                    <ng-template ppw-column-header>
                        @if (headerAction()) {
                            <button mat-icon-button type="button" aria-label="Add player" (click)="addPlayer()">
                                <mat-icon>add</mat-icon>
                            </button>
                        } @else {
                            Active
                        }
                    </ng-template>
                    <ng-template ppw-column-cell let-record>
                        <mat-icon role="img" [attr.aria-label]="record.active ? 'Active' : 'Inactive'">{{
                            record.active ? 'check' : 'close'
                        }}</mat-icon>
                    </ng-template>
                </ppw-column>
                <ng-template ppw-empty-page><p>No players match these filters.</p></ng-template>
            </ppw-table>
        </div>
        @if (selectionAndDrag()) {
            <p>Players older than 32 cannot be selected. Drag a row using its handle to change the order.</p>
            <p>
                Selected IDs: <span data-testid="selected-ids">{{ selectedIds() | json }}</span>
            </p>
            <p>
                Current order: <span data-testid="row-order">{{ rowOrder() | json }}</span>
            </p>
        }
        @if (rowActions()) {
            <p>Click or Ctrl-click a row. Clicking the active-status column does not trigger the row action.</p>
            <pre data-testid="last-click">{{ lastClick() | json }}</pre>
        }
    `
})
export class PlayerTableStoryComponent {
    readonly data = input<StoryPlayer[]>(createPlayers())
    readonly stickyStart = input(false)
    readonly stickyEnd = input(false)
    readonly showFooter = input(false)
    readonly headerAction = input(false)
    readonly selectionAndDrag = input(false)
    readonly rowActions = input(false)
    readonly sortable = input(false)
    readonly sort = input<{ active: string; direction: 'asc' | 'desc' | '' }>({ active: '', direction: '' })
    readonly sortChanged = output<SortChange>()
    protected readonly rows = linkedSignal(() => this.data().map((player) => ({ ...player })))
    protected readonly selectedIds = signal<number[]>([])
    protected readonly rowOrder = computed(() => this.rows().map((player) => player.id))
    protected readonly lastClick = signal<{ player: StoryPlayer; ctrl: boolean } | null>(null)
    protected readonly footer = computed(() => ({
        firstName: 'Total:',
        income: this.rows().reduce((total, p) => total + p.income, 0)
    }))
    protected readonly options = computed<PpwTableOptions<StoryPlayer>>(() => ({
        header: { sticky: true },
        footer: { sticky: true },
        columns: { ignoreClick: ['active'], widths: { income: '120px', bonus: '100px', active: '80px' } },
        rows: {
            highlightOnHover: true,
            disableRowSelection: (player) => player.age > 32,
            onClick: this.rowActions() ? (player) => this.lastClick.set({ player, ctrl: false }) : undefined,
            onCtrlClick: this.rowActions() ? (player) => this.lastClick.set({ player, ctrl: true }) : undefined
        }
    }))
    protected readonly trackBy = (_index: number, player: StoryPlayer): number => player.id
    protected readonly formatDate = (value: DateTime): string => value?.setLocale('en').toFormat('dd/MM/yyyy') ?? ''
    protected readonly formatIncome = (value: number): string =>
        value == null ? '' : formatCurrency(value, 'en-US', '€', 'EUR', '3.2-2')
    protected readonly formatBonus = (value: number): string =>
        value == null ? '' : formatPercent(value / 100, 'en-US', '1.2-2')

    protected select(records: TableRecord<StoryPlayer>[]): void {
        this.selectedIds.set(records.map((record) => record.initialRecord.id))
    }
    protected reorder(records: TableRecord<StoryPlayer>[]): void {
        this.rows.set(records.map((record) => record.initialRecord))
    }
    protected addPlayer(): void {
        const id = Math.max(0, ...this.rows().map((player) => player.id)) + 1
        this.rows.update((rows) => [
            ...rows,
            {
                id,
                firstName: 'Dries',
                lastName: 'Mertens',
                birthDate: DateTime.fromISO('1987-05-06'),
                age: 36,
                income: 19000,
                bonus: 35,
                active: true
            }
        ])
    }
}

export const playerStoryArgTypes = {
    data: { control: false },
    stickyStart: { control: 'boolean' },
    stickyEnd: { control: 'boolean' },
    showFooter: { control: 'boolean' },
    headerAction: { control: 'boolean' },
    selectionAndDrag: { control: 'boolean' },
    rowActions: { control: 'boolean' },
    sortable: { control: false },
    sort: { control: false }
} as const
