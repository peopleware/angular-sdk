import { Component, OnInit } from '@angular/core'
import {
    Column,
    DateColumn,
    ExpandableCardComponent,
    NumberColumn,
    SearchFilterComponent,
    TableComponent,
    TextColumn
} from '@ppwcode/ng-common-components'
import { DateTime } from 'luxon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { NgIf } from '@angular/common'

export interface Player extends Record<string, unknown> {
    id: number
    firstName: string
    lastName: string
    birthDate: DateTime
    income: number
}

const PLAYERS_DATA: Array<Player> = [
    {
        id: 1,
        firstName: 'Lionel',
        lastName: 'Messi',
        birthDate: DateTime.fromObject({ year: 1988, month: 7, day: 23 }),
        income: 35000
    },
    {
        id: 2,
        firstName: 'Christiano',
        lastName: 'Ronaldo',
        birthDate: DateTime.fromObject({ year: 1989, month: 4, day: 2 }),
        income: 37000
    },
    {
        id: 3,
        firstName: 'Kevin',
        lastName: 'De Bruyne',
        birthDate: DateTime.fromObject({ year: 1992, month: 10, day: 18 }),
        income: 26000
    },
    {
        id: 4,
        firstName: 'Eden',
        lastName: 'Hazard',
        birthDate: DateTime.fromObject({ year: 1991, month: 6, day: 28 }),
        income: 23000
    },
    {
        id: 5,
        firstName: 'Roberto',
        lastName: 'Carlos',
        birthDate: DateTime.fromObject({ year: 1975, month: 3, day: 22 }),
        income: 23000
    },
    {
        id: 6,
        firstName: 'Romelu',
        lastName: 'Lukaku',
        birthDate: DateTime.fromObject({ year: 1993, month: 7, day: 1 }),
        income: 24000
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
        ExpandableCardComponent,
        TableComponent,
        SearchFilterComponent,
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
        new NumberColumn('income', 'Income', 'income')
    ]
    public data = PLAYERS_DATA

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
}
