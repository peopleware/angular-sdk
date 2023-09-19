import { CommonModule, formatCurrency, formatPercent, getCurrencySymbol, NgIf } from '@angular/common'
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
        NgIf
    ]
})
export class FilterTableComponent implements OnInit {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    @ViewChild('playerStatusTemplate', { static: true }) public playerStatusTemplate!: TemplateRef<any>
    public searchForm!: FormGroup
    public lastClickedRow?: Player
    public columns: Array<Column<Player, unknown>> = [
        new TextColumn('firstName', 'First name', 'firstName'),
        new TextColumn('lastName', 'First name', 'lastName'),
        new DateColumn<DateTime, Player>('birthDate', 'Birth date', getLuxonFormatter('dd/MM/yyyy'), 'birthDate'),
        new NumberColumn('age', 'Age', 'age'),
        new NumberColumn('income', 'Income', 'income', (income: number) =>
            formatCurrency(income, this.locale, getCurrencySymbol('EUR', 'wide'), 'EUR', '3.2-2')
        ),
        new NumberColumn('bonus', 'Bonus', 'bonus', (bonus: number) =>
            formatPercent(bonus / 100, this.locale, '1.2-2')
        ),
        new TemplateColumn('active', 'Active', () => this.playerStatusTemplate)
    ]
    public tableOptions: PpwTableOptions<Player> = {
        columnWidths: {
            age: '65px',
            income: '100px',
            bonus: '100px',
            active: '50px'
        },
        rowClickAction: (row: Player) => {
            this.lastClickedRow = row
        }
    }
    public data = PLAYERS_DATA
    public selectedPlayersSignal: WritableSignal<Player[]> = signal([])

    constructor(@Inject(LOCALE_ID) public locale: string) {}

    public ngOnInit(): void {
        this.searchForm = new FormGroup<SearchPlayersForm>({
            firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            lastName: new FormControl('', { nonNullable: true })
        })
    }

    public performReset(): void {
        this.searchForm.reset()
        this.performSearch()
    }

    public performSearch(): void {
        const filters = this.searchForm.getRawValue() as { firstName: string; lastName: string }
        this.data = PLAYERS_DATA.filter((value: Player) => {
            return (
                (!filters.firstName ||
                    value.firstName.toLowerCase().startsWith(filters.firstName?.toLowerCase() ?? '')) &&
                (!filters.lastName || value.lastName.toLowerCase().startsWith(filters.lastName?.toLowerCase() ?? ''))
            )
        })
    }

    public updateSelected(selected: TableRecord<Player>[]): void {
        this.selectedPlayersSignal.set(selected.map((record: TableRecord<Player>) => record.initialRecord))
    }
}
