import { SimpleChange } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DateTimeFormatter, LocalDate } from '@js-joda/core'
import { format } from 'date-fns'
import { DateTime } from 'luxon'
import { ColumnType } from './columns/column'
import { DateColumn } from './columns/date-column'
import { NumberColumn } from './columns/number-column'
import { TextColumn } from './columns/text-column'

import { TableComponent } from './table.component'

export interface PeriodicElement extends Record<string, unknown> {
    name: string
    position: number
    weight: number
    symbol: string
    luxDate: DateTime
    jsDate: Date
    jsJodaDate: LocalDate
    fnsDate: Date
}

export function getJsDateFormatter(): (value: Date) => string {
    return (value: Date) => value.toDateString()
}

export function getLuxonFormatter(format: string): (value: DateTime) => string {
    return (value: DateTime) => value.toFormat(format)
}

export function getJsJodaFormatter(pattern: string): (value: LocalDate) => string {
    return (value: LocalDate) => DateTimeFormatter.ofPattern(pattern).format(value)
}

export function getDateFnsFormatter(dateFormat: string): (value: Date) => string {
    return (value: Date) => format(value, dateFormat)
}

describe('TableComponent', () => {
    let component: TableComponent<any>
    let fixture: ComponentFixture<any>
    let elementData: Array<PeriodicElement>

    beforeEach(async () => {
        elementData = [
            {
                position: 1,
                name: 'Hydrogen',
                weight: 1.0079,
                symbol: 'H',
                luxDate: DateTime.fromObject({
                    year: 2023,
                    month: 1,
                    day: 1
                }),
                jsDate: new Date(2023, 0, 1),
                jsJodaDate: LocalDate.of(2023, 1, 1),
                fnsDate: new Date(2023, 0, 1)
            },
            {
                position: 2,
                name: 'Helium',
                weight: 4.0026,
                symbol: 'He',
                luxDate: DateTime.fromObject({
                    year: 2023,
                    month: 2,
                    day: 1
                }),
                jsDate: new Date(2023, 1, 1),
                jsJodaDate: LocalDate.of(2023, 2, 1),
                fnsDate: new Date(2023, 1, 1)
            },
            {
                position: 3,
                name: 'Lithium',
                weight: 6.941,
                symbol: 'Li',
                luxDate: DateTime.fromObject({
                    year: 2023,
                    month: 3,
                    day: 1
                }),
                jsDate: new Date(2023, 2, 1),
                jsJodaDate: LocalDate.of(2023, 3, 1),
                fnsDate: new Date(2023, 2, 1)
            },
            {
                position: 4,
                name: 'Beryllium',
                weight: 9.0122,
                symbol: 'Be',
                luxDate: DateTime.fromObject({
                    year: 2023,
                    month: 4,
                    day: 1
                }),
                jsDate: new Date(2023, 3, 1),
                jsJodaDate: LocalDate.of(2023, 4, 1),
                fnsDate: new Date(2023, 3, 1)
            },
            {
                position: 5,
                name: 'Boron',
                weight: 10.811,
                symbol: 'B',
                luxDate: DateTime.fromObject({
                    year: 2023,
                    month: 5,
                    day: 1
                }),
                jsDate: new Date(2023, 4, 1),
                jsJodaDate: LocalDate.of(2023, 5, 1),
                fnsDate: new Date(2023, 4, 1)
            },
            {
                position: 6,
                name: 'Carbon',
                weight: 12.0107,
                symbol: 'C',
                luxDate: DateTime.fromObject({
                    year: 2023,
                    month: 6,
                    day: 1
                }),
                jsDate: new Date(2023, 5, 1),
                jsJodaDate: LocalDate.of(2023, 6, 1),
                fnsDate: new Date(2023, 5, 1)
            },
            {
                position: 7,
                name: 'Nitrogen',
                weight: 14.0067,
                symbol: 'N',
                luxDate: DateTime.fromObject({
                    year: 2023,
                    month: 7,
                    day: 1
                }),
                jsDate: new Date(2023, 6, 1),
                jsJodaDate: LocalDate.of(2023, 7, 1),
                fnsDate: new Date(2023, 6, 1)
            },
            {
                position: 8,
                name: 'Oxygen',
                weight: 15.9994,
                symbol: 'O',
                luxDate: DateTime.fromObject({
                    year: 2023,
                    month: 8,
                    day: 1
                }),
                jsDate: new Date(2023, 7, 1),
                jsJodaDate: LocalDate.of(2023, 8, 1),
                fnsDate: new Date(2023, 7, 1)
            },
            {
                position: 9,
                name: 'Fluorine',
                weight: 18.9984,
                symbol: 'F',
                luxDate: DateTime.fromObject({
                    year: 2023,
                    month: 9,
                    day: 1
                }),
                jsDate: new Date(2023, 8, 1),
                jsJodaDate: LocalDate.of(2023, 9, 1),
                fnsDate: new Date(2023, 8, 1)
            },
            {
                position: 10,
                name: 'Neon',
                weight: 20.1797,
                symbol: 'Ne',
                luxDate: DateTime.fromObject({
                    year: 2023,
                    month: 10,
                    day: 1
                }),
                jsDate: new Date(2023, 9, 1),
                jsJodaDate: LocalDate.of(2023, 10, 1),
                fnsDate: new Date(2023, 9, 1)
            }
        ]

        await TestBed.configureTestingModule({
            imports: [TableComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(TableComponent<any>)
        component = fixture.componentInstance
        component.data = elementData
        component.columns = [
            new TextColumn('elementName', 'Element name', 'name'),
            { type: ColumnType.Text, name: 'symbol', label: 'Symbol' }
        ]
        fixture.detectChanges()

        component.ngOnChanges({
            data: new SimpleChange(null, component.data, true),
            columns: new SimpleChange(null, component.columns, true)
        })
    })

    it('should show initial value', () => {
        const testData = (component.data as Array<Record<string, unknown>>)[3]
        expect(component.dataSource.data[3].initialRecord).toBe(testData)
        expect(component.dataSource.data[3].mappedValues['elementName']).toBe('Beryllium')
        expect(component.dataSource.data[3].mappedValues['symbol']).toBe('Be')
    })

    it('should detect column changes', () => {
        component.columns[1] = new TextColumn('testName', 'testLabel', 'symbol')
        component.ngOnChanges({
            columns: new SimpleChange(
                { type: ColumnType.Text, name: 'symbol', label: 'Symbol' },
                component.columns[1],
                true
            )
        })
        expect(component.columnNames[1]).toBe('testName')
        expect(component.dataSource.data[3].mappedValues['symbol']).toBe(undefined)
        expect(component.dataSource.data[3].mappedValues['testName']).toBe('Be')
    })

    it('should detect row changes', () => {
        const testObj = {
            name: 'test',
            symbol: 'T',
            weight: 2.023,
            position: 11,
            luxDate: DateTime.fromObject({ year: 2024, month: 11, day: 1 }),
            jsDate: new Date(2024, 10, 1),
            jsJodaDate: LocalDate.of(2024, 10, 1),
            fnsDate: new Date(2024, 10, 1)
        }
        elementData.push(testObj)
        component.ngOnChanges({ data: new SimpleChange(component.data, elementData, false) })
        expect(component.dataSource.data[10].initialRecord).toBe(testObj)
    })

    it('should map undefined text column property', () => {
        component.columns.push(new TextColumn('weight', 'Weight'))
        component.columns.push(new TextColumn('weightFromUndefinedProp', 'Weight'))
        component.ngOnChanges({
            columns: new SimpleChange(component.columns, component.columns, false)
        })

        expect(component.columnNames).toEqual(['elementName', 'symbol', 'weight', 'weightFromUndefinedProp'])
        expect(component.dataSource.data[3].mappedValues['weight']).toBe(9.0122)
        expect(component.dataSource.data[3].mappedValues['weightFromUndefinedProp']).toBe(undefined)
    })

    it('should map string text column property', () => {
        component.columns.push(new TextColumn('weight', 'Weight', 'string'))
        component.columns.push(new TextColumn('weightFromProp', 'Weight', 'weight'))
        component.ngOnChanges({
            columns: new SimpleChange(component.columns, component.columns, false)
        })

        expect(component.columnNames).toEqual(['elementName', 'symbol', 'weight', 'weightFromProp'])
        expect(component.dataSource.data[3].mappedValues['weight']).toBe(undefined)
        expect(component.dataSource.data[3].mappedValues['weightFromProp']).toBe(9.0122)
    })

    it('should map function text column property', () => {
        component.columns.push(
            new TextColumn('weight', 'Weight', (record: PeriodicElement) => record.weight.toFixed(2))
        )
        component.ngOnChanges({
            columns: new SimpleChange(component.columns, component.columns, false)
        })

        expect(component.columnNames).toEqual(['elementName', 'symbol', 'weight'])
        expect(component.dataSource.data[3].mappedValues['weight']).toBe('9.01')
    })

    it('should map undefined number column property', () => {
        component.columns.push(new NumberColumn('weight', 'Weight'))
        component.columns.push(new NumberColumn('weightFromUndefinedProp', 'Weight'))
        component.ngOnChanges({
            columns: new SimpleChange(component.columns, component.columns, false)
        })

        expect(component.columnNames).toEqual(['elementName', 'symbol', 'weight', 'weightFromUndefinedProp'])
        expect(component.dataSource.data[3].mappedValues['weight']).toBe(9.0122)
        expect(component.dataSource.data[3].mappedValues['weightFromUndefinedProp']).toBe(undefined)
    })

    it('should map string number column property', () => {
        component.columns.push(new NumberColumn('weight', 'Weight', 'number'))
        component.columns.push(new NumberColumn('weightFromProp', 'Weight', 'weight'))
        component.ngOnChanges({
            columns: new SimpleChange(component.columns, component.columns, false)
        })

        expect(component.columnNames).toEqual(['elementName', 'symbol', 'weight', 'weightFromProp'])
        expect(component.dataSource.data[3].mappedValues['weight']).toBe(undefined)
        expect(component.dataSource.data[3].mappedValues['weightFromProp']).toBe(9.0122)
    })

    it('should map function number column property', () => {
        component.columns.push(
            new NumberColumn('weight', 'Weight', (record: PeriodicElement) => Number(record.weight.toFixed(2)))
        )
        component.ngOnChanges({
            columns: new SimpleChange(component.columns, component.columns, false)
        })

        expect(component.columnNames).toEqual(['elementName', 'symbol', 'weight'])
        expect(component.dataSource.data[3].mappedValues['weight']).toBe(9.01)
    })

    it('should map undefined luxon date column property', () => {
        component.columns.push(new DateColumn('luxDate', 'luxonTestDate', getLuxonFormatter('dd/MM/yyyy')))
        component.columns.push(
            new DateColumn('luxonTestDateFromUndefinedProp', 'luxonTestDate', getLuxonFormatter('dd/MM/yyyy'))
        )
        component.ngOnChanges({
            columns: new SimpleChange(component.columns, component.columns, false)
        })

        expect(component.columnNames).toEqual(['elementName', 'symbol', 'luxDate', 'luxonTestDateFromUndefinedProp'])
        expect(component.dataSource.data[3].mappedValues['luxDate']).toBe('01/04/2023')
        expect(component.dataSource.data[3].mappedValues['luxonTestDateFromUndefinedProp']).toBe(undefined)
    })

    it('should map string luxon date column property', () => {
        component.columns.push(new DateColumn('luxDate', 'Weight', getLuxonFormatter('dd/MM/yyyy'), 'date'))
        component.columns.push(new DateColumn('luxDateFromProp', 'Weight', getLuxonFormatter('dd/MM/yyyy'), 'luxDate'))
        component.ngOnChanges({
            columns: new SimpleChange(component.columns, component.columns, false)
        })

        expect(component.columnNames).toEqual(['elementName', 'symbol', 'luxDate', 'luxDateFromProp'])
        expect(component.dataSource.data[3].mappedValues['luxDate']).toBe(undefined)
        expect(component.dataSource.data[3].mappedValues['luxDateFromProp']).toBe('01/04/2023')
    })

    it('should map function luxon date column property', () => {
        component.columns.push(
            new DateColumn('luxDate', 'Luxon', getLuxonFormatter('dd/MM/yyyy'), (record: PeriodicElement) =>
                record.luxDate.plus({ days: 1 })
            )
        )
        component.ngOnChanges({
            columns: new SimpleChange(component.columns, component.columns, false)
        })

        expect(component.columnNames).toEqual(['elementName', 'symbol', 'luxDate'])
        expect(component.dataSource.data[3].mappedValues['luxDate']).toBe('02/04/2023')
    })

    it('should map undefined js date column property', () => {
        component.columns.push(new DateColumn('jsDate', 'jsTestDate', getJsDateFormatter()))
        component.columns.push(new DateColumn('jsDateFromUndefinedProp', 'jsTestDate', getJsDateFormatter()))
        component.ngOnChanges({
            columns: new SimpleChange(component.columns, component.columns, false)
        })

        expect(component.columnNames).toEqual(['elementName', 'symbol', 'jsDate', 'jsDateFromUndefinedProp'])
        expect(component.dataSource.data[3].mappedValues['jsDate']).toBe('Sat Apr 01 2023')
        expect(component.dataSource.data[3].mappedValues['jsDateFromUndefinedProp']).toBe(undefined)
    })

    it('should map string js date column property', () => {
        component.columns.push(new DateColumn('jsDate', 'jsDate', getJsDateFormatter(), 'date'))
        component.columns.push(new DateColumn('jsDateFromProp', 'jsDateFromProp', getJsDateFormatter(), 'jsDate'))
        component.ngOnChanges({
            columns: new SimpleChange(component.columns, component.columns, false)
        })

        expect(component.columnNames).toEqual(['elementName', 'symbol', 'jsDate', 'jsDateFromProp'])
        expect(component.dataSource.data[3].mappedValues['jsDate']).toBe(undefined)
        expect(component.dataSource.data[3].mappedValues['jsDateFromProp']).toBe('Sat Apr 01 2023')
    })

    it('should map function js date column property', () => {
        component.columns.push(
            new DateColumn(
                'jsDate',
                'JS',
                getJsDateFormatter(),
                (record: PeriodicElement) =>
                    (record.jsDate = new Date(record.jsDate.setMonth(record.jsDate.getMonth() + 4)))
            )
        )
        component.ngOnChanges({
            columns: new SimpleChange(component.columns, component.columns, false)
        })

        expect(component.columnNames).toEqual(['elementName', 'symbol', 'jsDate'])
        expect(component.dataSource.data[3].mappedValues['jsDate']).toBe('Tue Aug 01 2023')
    })

    it('should map undefined js-joda date column property', () => {
        component.columns.push(new DateColumn('jsJodaDate', 'jsJodaTestDate', getJsJodaFormatter('dd-MM-yyyy')))
        component.columns.push(
            new DateColumn('jsJodaDateFromUndefinedProp', 'jsJodaTestDate', getJsJodaFormatter('dd-MM-yyyy'))
        )
        component.ngOnChanges({
            columns: new SimpleChange(component.columns, component.columns, false)
        })

        expect(component.columnNames).toEqual(['elementName', 'symbol', 'jsJodaDate', 'jsJodaDateFromUndefinedProp'])
        expect(component.dataSource.data[3].mappedValues['jsJodaDate']).toBe('01-04-2023')
        expect(component.dataSource.data[3].mappedValues['jsJodaDateFromUndefinedProp']).toBe(undefined)
    })

    it('should map string js-joda date column property', () => {
        component.columns.push(new DateColumn('jsJodaDate', 'jsJodaDate', getJsJodaFormatter('dd-MM-yyyy'), 'date'))
        component.columns.push(
            new DateColumn('jsJodaDateFromProp', 'jsJodaDateFromProp', getJsJodaFormatter('dd-MM-yyyy'), 'jsJodaDate')
        )
        component.ngOnChanges({
            columns: new SimpleChange(component.columns, component.columns, false)
        })

        expect(component.columnNames).toEqual(['elementName', 'symbol', 'jsJodaDate', 'jsJodaDateFromProp'])
        expect(component.dataSource.data[3].mappedValues['jsJodaDate']).toBe(undefined)
        expect(component.dataSource.data[3].mappedValues['jsJodaDateFromProp']).toBe('01-04-2023')
    })

    it('should map function js-joda date column property', () => {
        component.columns.push(
            new DateColumn('jsJodaDate', 'JSJoda', getJsJodaFormatter('dd-MM-yyyy'), (record: PeriodicElement) =>
                record.jsJodaDate.plusDays(4)
            )
        )
        component.ngOnChanges({
            columns: new SimpleChange(component.columns, component.columns, false)
        })

        expect(component.columnNames).toEqual(['elementName', 'symbol', 'jsJodaDate'])
        expect(component.dataSource.data[3].mappedValues['jsJodaDate']).toBe('05-04-2023')
    })

    it('should map undefined date-fns date column property', () => {
        component.columns.push(new DateColumn('fnsDate', 'fnsTestDate', getDateFnsFormatter('dd-MM-yyyy')))
        component.columns.push(
            new DateColumn('fnsDateFromUndefinedProp', 'fnsTestDate', getDateFnsFormatter('dd-MM-yyyy'))
        )
        component.ngOnChanges({
            columns: new SimpleChange(component.columns, component.columns, false)
        })

        expect(component.columnNames).toEqual(['elementName', 'symbol', 'fnsDate', 'fnsDateFromUndefinedProp'])
        expect(component.dataSource.data[3].mappedValues['fnsDate']).toBe('01-04-2023')
        expect(component.dataSource.data[3].mappedValues['fnsDateFromUndefinedProp']).toBe(undefined)
    })

    it('should map string date-fns date column property', () => {
        component.columns.push(new DateColumn('fnsDate', 'fnsDate', getDateFnsFormatter('dd-MM-yyyy'), 'date'))
        component.columns.push(
            new DateColumn('fnsDateFromProp', 'fnsDateFromProp', getDateFnsFormatter('dd-MM-yyyy'), 'fnsDate')
        )
        component.ngOnChanges({
            columns: new SimpleChange(component.columns, component.columns, false)
        })

        expect(component.columnNames).toEqual(['elementName', 'symbol', 'fnsDate', 'fnsDateFromProp'])
        expect(component.dataSource.data[3].mappedValues['fnsDate']).toBe(undefined)
        expect(component.dataSource.data[3].mappedValues['fnsDateFromProp']).toBe('01-04-2023')
    })

    it('should map function date-fns date column property', () => {
        component.columns.push(
            new DateColumn(
                'fnsDate',
                'fnsDate',
                getDateFnsFormatter('dd-MM-yyyy'),
                (record: PeriodicElement) =>
                    (record.fnsDate = new Date(record.fnsDate.setMonth(record.fnsDate.getMonth() + 4)))
            )
        )
        component.ngOnChanges({
            columns: new SimpleChange(component.columns, component.columns, false)
        })

        expect(component.columnNames).toEqual(['elementName', 'symbol', 'fnsDate'])
        expect(component.dataSource.data[3].mappedValues['fnsDate']).toBe('01-08-2023')
    })
})
