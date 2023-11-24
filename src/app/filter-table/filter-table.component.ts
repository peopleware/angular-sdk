import { CommonModule, formatCurrency, formatPercent, getCurrencySymbol } from '@angular/common'
import { Component, Inject, LOCALE_ID, OnInit, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import {
    Column,
    DateColumn,
    ExpandableCardComponent,
    NumberColumn,
    PpwTableOptions,
    SearchFilterComponent,
    TableComponent,
    TableRecord,
    TemplateColumn,
    TextColumn
} from '@ppwcode/ng-common-components'
import { DateTime } from 'luxon'
import { MatButtonModule } from '@angular/material/button'
import {
    AsyncResultComponent,
    DEFAULT_HTTP_ERROR_CODES,
    expectPagedAsyncResultHttpError,
    expectPagedAsyncResultHttpSuccess
} from '@ppwcode/ng-async'
import { mixinPagination } from '../../../projects/ppwcode/ng-router/src/lib/mixins/pagination'
import { mixinRelativeNavigation } from '../../../projects/ppwcode/ng-router/src/lib/relative-navigation'
import { mixinTrackPending } from '../../../projects/ppwcode/ng-common/src/lib/mixins/track-pending'
import { PaginationBarComponent } from '@ppwcode/ng-wireframe'
import { BehaviorSubject, combineLatest, of, switchMap, tap } from 'rxjs'

export interface Player extends Record<string, unknown> {
    id: number
    firstName: string
    lastName: string
    birthDate: DateTime
    age: number
    income: number
    bonus: number
}

const PLAYERS_DATA: Array<Player> = [
    {
        id: 1,
        firstName: 'Lionel',
        lastName: 'Messi',
        birthDate: DateTime.fromObject({ year: 1988, month: 7, day: 23 }),
        age: 35,
        income: 35000,
        bonus: 10,
        active: true
    },
    {
        id: 2,
        firstName: 'Christiano',
        lastName: 'Ronaldo',
        birthDate: DateTime.fromObject({ year: 1989, month: 4, day: 2 }),
        age: 34,
        income: 37000,
        bonus: 2,
        active: true
    },
    {
        id: 3,
        firstName: 'Kevin',
        lastName: 'De Bruyne',
        birthDate: DateTime.fromObject({ year: 1992, month: 10, day: 18 }),
        age: 31,
        income: 26000,
        bonus: 5,
        active: true
    },
    {
        id: 4,
        firstName: 'Eden',
        lastName: 'Hazard',
        birthDate: DateTime.fromObject({ year: 1991, month: 6, day: 28 }),
        age: 32,
        income: 23000,
        bonus: 40,
        active: false
    },
    {
        id: 5,
        firstName: 'Roberto',
        lastName: 'Carlos',
        birthDate: DateTime.fromObject({ year: 1975, month: 3, day: 22 }),
        age: 48,
        income: 23000,
        bonus: 30,
        active: false
    },
    {
        id: 6,
        firstName: 'Romelu',
        lastName: 'Lukaku',
        birthDate: DateTime.fromObject({ year: 1993, month: 7, day: 1 }),
        age: 30,
        income: 24000,
        bonus: 20,
        active: true
    }
]

export function getLuxonFormatter(format: string): (value: DateTime) => string {
    return (value: DateTime) => value.toFormat(format)
}

type SearchPlayersForm = {
    firstName: FormControl<string>
    lastName: FormControl<string>
}

@Component({
    selector: 'ppw-filter-table',
    templateUrl: './filter-table.component.html',
    styleUrls: ['./filter-table.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ExpandableCardComponent,
        TableComponent,
        SearchFilterComponent,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        PaginationBarComponent,
        AsyncResultComponent
    ]
})
export class FilterTableComponent
    extends mixinPagination(mixinTrackPending(true, mixinRelativeNavigation()))
    implements OnInit
{
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    @ViewChild('playerStatusTemplate', { static: true }) public playerStatusTemplate!: TemplateRef<any>
    @ViewChild('rowIndexTemplate', { static: true }) public rowIndexTemplate!: TemplateRef<any>
    @ViewChild('addTemplate', { static: true }) public addTemplate!: TemplateRef<unknown>

    // Below variable is an override of the defaultPageSize property in the mixinPagination
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public defaultPageSize = 5
    public searchForm!: FormGroup
    public lastClickedRow?: Player
    public columns: Array<Column<Player, unknown>> = [
        new TextColumn('firstName', 'First name', 'firstName'),
        new TextColumn('lastName', 'Last name', 'lastName'),
        new DateColumn<DateTime, Player>('birthDate', 'Birth date', getLuxonFormatter('dd/MM/yyyy'), 'birthDate'),
        new NumberColumn('age', 'Age', 'age'),
        new NumberColumn('income', 'Income', 'income', (income: number) =>
            formatCurrency(income, this.locale, getCurrencySymbol('EUR', 'wide'), 'EUR', '3.2-2')
        ),
        new NumberColumn('bonus', 'Bonus', 'bonus', (bonus: number) =>
            formatPercent(bonus / 100, this.locale, '1.2-2')
        ),
        new TemplateColumn('rowIndex', 'Row index', () => this.rowIndexTemplate),
        new TemplateColumn('active', 'Active', () => this.playerStatusTemplate)
    ]
    public tableOptions: PpwTableOptions<Player> = {
        columnWidths: {
            age: '65px',
            income: '100px',
            bonus: '100px',
            rowIndex: '100px',
            active: '50px'
        },
        columnHeaderStyles: {
            firstName: () => {
                return { 'text-align': 'right' }
            },
            rowIndex: () => {
                return { 'text-align': 'right' }
            },
            active: () => {
                return { 'text-align': 'center' }
            }
        },
        columnHeaderTemplates: {
            active: () => {
                return this.addTemplate
            }
        },
        columnStyles: {
            firstName: () => {
                return { 'text-align': 'right' }
            },
            age: (record: Player) => {
                if (record.age > 40) {
                    return { background: 'red' }
                }
                return {}
            },
            rowIndex: () => {
                return { 'text-align': 'right' }
            },
            active: () => {
                return { 'text-align': 'center' }
            }
        },
        rowClickAction: (row: Player) => {
            this.lastClickedRow = row
        },
        ignoreClickColumns: ['active'],
        rowHighlightOnHover: true,
        stickyHeader: true
    }
    public initialSearchParams: { lastName: string; firstName: string } = {
        lastName: '',
        firstName: ''
    }
    public searchParameters$: BehaviorSubject<{ lastName: string; firstName: string }> = new BehaviorSubject<{
        lastName: string
        firstName: string
    }>(this.initialSearchParams)
    private refreshPlayers$: BehaviorSubject<void> = new BehaviorSubject<void>(void 0)
    public players$ = combineLatest([this.page$, this.pageSize$, this.searchParameters$, this.refreshPlayers$]).pipe(
        switchMap(([page, pageSize, searchParameters]) =>
            this.trackPending(
                this.mockPagedPlayers(page, pageSize, searchParameters).pipe(
                    tap((items) => (this.playersToSave = [...(items.entity.items as Player[])]))
                )
            )
        )
    )
    public selectedPlayersSignal: WritableSignal<Player[]> = signal([])
    public playersToSave: Player[] = []

    constructor(@Inject(LOCALE_ID) public locale: string) {
        super()
    }

    private mockPagedPlayers(
        page: number,
        pageSize: number,
        filters?: {
            firstName: string
            lastName: string
        }
    ) {
        const players = !filters
            ? PLAYERS_DATA
            : PLAYERS_DATA.filter((value: Player) => {
                  return (
                      (!filters.firstName ||
                          value.firstName.toLowerCase().startsWith(filters.firstName?.toLowerCase() ?? '')) &&
                      (!filters.lastName ||
                          value.lastName.toLowerCase().startsWith(filters.lastName?.toLowerCase() ?? ''))
                  )
              })
        const playersPage = players.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
        return of({
            pageSize: pageSize,
            pageIndex: page,
            totalPages: Math.ceil(players.length / pageSize),
            totalCount: players.length,
            hasPreviousPage: false,
            hasNextPage: true,
            items: playersPage
        }).pipe(
            expectPagedAsyncResultHttpSuccess(filters),
            expectPagedAsyncResultHttpError(DEFAULT_HTTP_ERROR_CODES, filters)
        )
    }

    public ngOnInit(): void {
        this.searchForm = new FormGroup<SearchPlayersForm>({
            firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            lastName: new FormControl('', { nonNullable: true })
        })
    }

    public trackByFn(_index: number, item: Player): number {
        return item.id
    }

    public performReset(): void {
        this.searchForm.reset({ lastName: '', firstName: '' })
        this.performSearch()
    }

    public performSearch(): void {
        this.searchParameters$.next(this.searchForm.getRawValue() as { firstName: string; lastName: string })
    }

    public updateSelected(selected: TableRecord<Player>[]): void {
        this.selectedPlayersSignal.set(selected.map((record: TableRecord<Player>) => record.initialRecord))
    }

    public orderChanged(items: TableRecord<Player>[]): void {
        this.playersToSave = [...items.map((item: TableRecord<Player>) => item.initialRecord)]
    }

    public addPlayer(): void {
        PLAYERS_DATA.push({
            id: 7,
            firstName: 'Dries',
            lastName: 'Mertens',
            birthDate: DateTime.fromObject({ year: 1987, month: 5, day: 6 }),
            age: 36,
            income: 19000,
            bonus: 35,
            active: true
        })
        this.refreshPlayers$.next()
    }
}
