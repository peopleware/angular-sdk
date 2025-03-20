import { CommonModule, formatCurrency, formatPercent, getCurrencySymbol } from '@angular/common'
import { Component, Inject, LOCALE_ID, OnInit, signal, WritableSignal } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import {
    AsyncResultModule,
    DEFAULT_HTTP_ERROR_CODES,
    expectPagedAsyncResultHttpError,
    expectPagedAsyncResultHttpSuccess,
    PagedAsyncResult,
    PagedEntities
} from '@ppwcode/ng-async'
import { mixinTrackPending } from '@ppwcode/ng-common'
import { PpwTableModule, PpwTableOptions, SearchFilterComponent, TableRecord } from '@ppwcode/ng-common-components'
import { mixinPagination, mixinRelativeNavigation } from '@ppwcode/ng-router'
import { PaginationBarComponent } from '@ppwcode/ng-wireframe'
import { DateTime } from 'luxon'
import { BehaviorSubject, combineLatest, delay, Observable, of, switchMap, tap } from 'rxjs'
import { ExpandableTableComponent } from './expandable-table/expandable-table.component'

export interface Player extends Record<string, unknown> {
    id: number
    firstName: string
    lastName: string
    birthDate: DateTime
    age: number
    income: number
    bonus: number
}

export interface PlayerFilters {
    firstName: string
    lastName: string
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
    selector: 'ppw-table-demo',
    templateUrl: './table-demo.component.html',
    styleUrls: ['./table-demo.component.scss'],
    imports: [
        CommonModule,
        SearchFilterComponent,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        PaginationBarComponent,
        AsyncResultModule,
        FormsModule,
        MatSlideToggleModule,
        PpwTableModule,
        ExpandableTableComponent
    ]
})
export class TableDemoComponent
    extends mixinPagination(mixinTrackPending(true, mixinRelativeNavigation()))
    implements OnInit
{
    // Below variable is an override of the defaultPageSize property in the mixinPagination
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public defaultPageSize = 5
    public enableRowDrag = false
    public searchForm!: FormGroup
    public lastClickedRow?: Player
    public footerData: Partial<Player> = {
        firstName: 'Total:',
        income: 168000
    }

    public tableOptions: PpwTableOptions<Player> = {
        header: {
            sticky: true,
            styles: {
                firstName: () => {
                    return { 'text-align': 'right' }
                },
                rowIndex: () => {
                    return { 'text-align': 'right' }
                },
                active: () => {
                    return { 'text-align': 'center' }
                }
            }
        },
        footer: {
            sticky: true,
            styles: {
                firstName: () => {
                    return { 'text-align': 'right' }
                }
            }
        },
        columns: {
            ignoreClick: ['active'],
            styles: {
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
            widths: {
                age: '65px',
                income: '100px',
                bonus: '100px',
                rowIndex: '100px',
                active: '50px'
            }
        },
        rows: {
            highlightOnHover: true,
            onClick: (row: Player) => {
                this.lastClickedRow = row
            }
        }
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
    public players$: Observable<PagedAsyncResult<Player, PlayerFilters>> = combineLatest([
        this.page$,
        this.pageSize$,
        this.searchParameters$,
        this.refreshPlayers$
    ]).pipe(
        switchMap(([page, pageSize, searchParameters]) =>
            this.trackPending(
                this.mockPagedPlayers(page, pageSize, searchParameters).pipe(
                    delay(1000),
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
        filters?: PlayerFilters
    ): Observable<PagedAsyncResult<Player, PlayerFilters>> {
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
            expectPagedAsyncResultHttpSuccess<Player, PlayerFilters>(filters),
            expectPagedAsyncResultHttpError<Player, PlayerFilters>(DEFAULT_HTTP_ERROR_CODES, filters)
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

    public formatBonus(bonus: number) {
        return formatPercent(bonus / 100, this.locale, '1.2-2')
    }

    public formatIncome(income: number): string {
        return formatCurrency(income, this.locale, getCurrencySymbol('EUR', 'wide'), 'EUR', '3.2-2')
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

    public orderChanged(result: PagedEntities<Player>, items: TableRecord<Player>[]): void {
        result.items = [...items.map((item: TableRecord<Player>) => item.initialRecord)]
        this.playersToSave = result.items
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
