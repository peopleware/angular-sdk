import { Component, Inject, LOCALE_ID, OnInit, signal, WritableSignal } from '@angular/core'
import {
    Column,
    DateColumn,
    ExpandableCardComponent,
    NumberColumn,
    SearchFilterComponent,
    TableComponent,
    TableRecord,
    TextColumn
} from '@ppwcode/ng-common-components'
import { DateTime } from 'luxon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { CommonModule, formatCurrency, formatPercent, getCurrencySymbol, NgIf } from '@angular/common'
import { MatCardModule } from '@angular/material/card'

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
        bonus: 10
    },
    {
        id: 2,
        firstName: 'Christiano',
        lastName: 'Ronaldo',
        birthDate: DateTime.fromObject({ year: 1989, month: 4, day: 2 }),
        age: 34,
        income: 37000,
        bonus: 2
    },
    {
        id: 3,
        firstName: 'Kevin',
        lastName: 'De Bruyne',
        birthDate: DateTime.fromObject({ year: 1992, month: 10, day: 18 }),
        age: 31,
        income: 26000,
        bonus: 5
    },
    {
        id: 4,
        firstName: 'Eden',
        lastName: 'Hazard',
        birthDate: DateTime.fromObject({ year: 1991, month: 6, day: 28 }),
        age: 32,
        income: 23000,
        bonus: 40
    },
    {
        id: 5,
        firstName: 'Roberto',
        lastName: 'Carlos',
        birthDate: DateTime.fromObject({ year: 1975, month: 3, day: 22 }),
        age: 48,
        income: 23000,
        bonus: 30
    },
    {
        id: 6,
        firstName: 'Romelu',
        lastName: 'Lukaku',
        birthDate: DateTime.fromObject({ year: 1993, month: 7, day: 1 }),
        age: 30,
        income: 24000,
        bonus: 20
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
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NgIf
    ]
})
export class FilterTableComponent implements OnInit {
    public searchForm!: FormGroup
    public columns: Array<Column<Player, unknown>> = [
        new TextColumn('firstName', 'First name', 'firstName'),
        new TextColumn('lastName', 'First name', 'lastName'),
        new DateColumn<DateTime, Player>('birthDate', 'Birth date', getLuxonFormatter('dd/MM/yyyy'), 'birthDate'),
        new NumberColumn('age', 'Age', 'age'),
        new NumberColumn('income', 'Income', 'income', (income: number) =>
            formatCurrency(income, this.locale, getCurrencySymbol('EUR', 'wide'), 'EUR', '3.2-2')
        ),
        new NumberColumn('bonus', 'Bonus', 'bonus', (bonus: number) => formatPercent(bonus / 100, this.locale, '1.2-2'))
    ]
    public data = PLAYERS_DATA
    public selectedPlayersSignal: WritableSignal<Player[]> = signal([])

    constructor(@Inject(LOCALE_ID) public locale: string) {}

    public ngOnInit(): void {
        this.searchForm = new FormGroup<SearchPlayersForm>({
            firstName: new FormControl('', { nonNullable: true }),
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
