import { Component, ViewChild } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { DateTimeFormatter, LocalDate } from '@js-joda/core'
import { addMonths, format } from 'date-fns'
import { ColumnType } from './columns/column'

import { TableComponent } from './table.component'
import { PpwTableModule } from './table.module'

export interface PeriodicElement extends Record<string, unknown> {
    name: string
    position: number
    weight: number
    symbol: string
    jsDate: Date
    jsJodaDate: LocalDate
    fnsDate: Date
}

const MOCK_ELEMENT_DATA = [
    {
        position: 1,
        name: 'Hydrogen',
        weight: 1.0079,
        symbol: 'H',
        jsDate: new Date(2023, 0, 1),
        jsJodaDate: LocalDate.of(2023, 1, 1),
        fnsDate: new Date(2023, 0, 1)
    },
    {
        position: 2,
        name: 'Helium',
        weight: 4.0026,
        symbol: 'He',
        jsDate: new Date(2023, 1, 1),
        jsJodaDate: LocalDate.of(2023, 2, 1),
        fnsDate: new Date(2023, 1, 1)
    },
    {
        position: 3,
        name: 'Lithium',
        weight: 6.941,
        symbol: 'Li',
        jsDate: new Date(2023, 2, 1),
        jsJodaDate: LocalDate.of(2023, 3, 1),
        fnsDate: new Date(2023, 2, 1)
    },
    {
        position: 4,
        name: 'Beryllium',
        weight: 9.0122,
        symbol: 'Be',
        jsDate: new Date(2023, 3, 1),
        jsJodaDate: LocalDate.of(2023, 4, 1),
        fnsDate: new Date(2023, 3, 1)
    },
    {
        position: 5,
        name: 'Boron',
        weight: 10.811,
        symbol: 'B',
        jsDate: new Date(2023, 4, 1),
        jsJodaDate: LocalDate.of(2023, 5, 1),
        fnsDate: new Date(2023, 4, 1)
    },
    {
        position: 6,
        name: 'Carbon',
        weight: 12.0107,
        symbol: 'C',
        jsDate: new Date(2023, 5, 1),
        jsJodaDate: LocalDate.of(2023, 6, 1),
        fnsDate: new Date(2023, 5, 1)
    },
    {
        position: 7,
        name: 'Nitrogen',
        weight: 14.0067,
        symbol: 'N',
        jsDate: new Date(2023, 6, 1),
        jsJodaDate: LocalDate.of(2023, 7, 1),
        fnsDate: new Date(2023, 6, 1)
    },
    {
        position: 8,
        name: 'Oxygen',
        weight: 15.9994,
        symbol: 'O',
        jsDate: new Date(2023, 7, 1),
        jsJodaDate: LocalDate.of(2023, 8, 1),
        fnsDate: new Date(2023, 7, 1)
    },
    {
        position: 9,
        name: 'Fluorine',
        weight: 18.9984,
        symbol: 'F',
        jsDate: new Date(2023, 8, 1),
        jsJodaDate: LocalDate.of(2023, 9, 1),
        fnsDate: new Date(2023, 8, 1)
    },
    {
        position: 10,
        name: 'Neon',
        weight: 20.1797,
        symbol: 'Ne',
        jsDate: new Date(2023, 9, 1),
        jsJodaDate: LocalDate.of(2023, 10, 1),
        fnsDate: new Date(2023, 9, 1)
    }
]

export function getJsDateFormatter(): (value: Date) => string {
    return (value: Date) => value.toDateString()
}

export function getJsJodaFormatter(pattern: string): (value: LocalDate) => string {
    return (value: LocalDate) => DateTimeFormatter.ofPattern(pattern).format(value)
}

export function getDateFnsFormatter(dateFormat: string): (value: Date) => string {
    return (value: Date) => format(value, dateFormat)
}

@Component({
    template: `
        <ppw-table [data]="data" [trackBy]="trackBy">
            @for (column of columns; track column) {
                <ppw-column
                    [name]="column.name"
                    [label]="column.label"
                    [type]="column.type"
                    [valueRetrieval]="column.valueRetrieval"
                    [dateFormatFn]="column.dateFormatter"
                ></ppw-column>
            }
        </ppw-table>
    `,
    standalone: false
})
class TestTableComponent {
    @ViewChild(TableComponent, { static: true }) tableComponent!: TableComponent<PeriodicElement>

    public columns: Array<{
        name: string
        label: string
        type: ColumnType
        valueRetrieval?: string | ((record: PeriodicElement) => unknown)
        dateFormatter?: (value: PeriodicElement) => string
    }> = [
        { name: 'elementName', label: 'Element name', type: ColumnType.Text, valueRetrieval: 'name' },
        { name: 'symbol', label: 'Symbol', type: ColumnType.Text }
    ]
    public data: Array<PeriodicElement> = MOCK_ELEMENT_DATA
    public trackBy = (index: number, record: PeriodicElement) => record.position
}

describe('TableComponent', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tableComponent: TableComponent<any>
    let fixture: ComponentFixture<TestTableComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestTableComponent],
            imports: [PpwTableModule, NoopAnimationsModule]
        })

        fixture = TestBed.createComponent(TestTableComponent)
        fixture.componentInstance.data = [...MOCK_ELEMENT_DATA]
        tableComponent = (fixture.componentInstance as TestTableComponent).tableComponent
        fixture.detectChanges()
    })

    it('should show initial value', () => {
        const testData = (tableComponent.data() as Array<Record<string, unknown>>)[3]
        expect(tableComponent.dataSource().data[3].initialRecord).toBe(testData)
        expect(tableComponent.dataSource().data[3].mappedValues['elementName']).toBe('Beryllium')
        expect(tableComponent.dataSource().data[3].mappedValues['symbol']).toBe('Be')
    })

    it('should detect column changes', () => {
        fixture.componentInstance.columns[1] = {
            name: 'testName',
            label: 'testLabel',
            type: ColumnType.Text,
            valueRetrieval: 'symbol'
        }
        fixture.detectChanges()

        expect(tableComponent.columnNames()[1]).toBe('testName')
        expect(tableComponent.dataSource().data[3].mappedValues['symbol']).toBe(undefined)
        expect(tableComponent.dataSource().data[3].mappedValues['testName']).toBe('Be')
    })

    it('should detect row changes', () => {
        const testObj = {
            name: 'test',
            symbol: 'T',
            weight: 2.023,
            position: 11,
            jsDate: new Date(2024, 10, 1),
            jsJodaDate: LocalDate.of(2024, 10, 1),
            fnsDate: new Date(2024, 10, 1)
        }
        const newData = [...fixture.componentInstance.data, testObj]
        fixture.componentInstance.data = newData
        fixture.detectChanges()

        expect(tableComponent.dataSource().data[10].initialRecord).toBe(testObj)
    })

    it('should map undefined text column property', () => {
        fixture.componentInstance.columns.push({ name: 'weight', label: 'Weight', type: ColumnType.Text })
        fixture.componentInstance.columns.push({
            name: 'weightFromUndefinedProp',
            label: 'Weight',
            type: ColumnType.Text
        })
        fixture.detectChanges()

        expect(tableComponent.columnNames()).toEqual(['elementName', 'symbol', 'weight', 'weightFromUndefinedProp'])
        expect(tableComponent.dataSource().data[3].mappedValues['weight']).toBe(9.0122)
        expect(tableComponent.dataSource().data[3].mappedValues['weightFromUndefinedProp']).toBe(undefined)
    })

    it('should map string text column property', () => {
        fixture.componentInstance.columns.push({
            name: 'weight',
            label: 'Weight',
            type: ColumnType.Text,
            valueRetrieval: 'string'
        })
        fixture.componentInstance.columns.push({
            name: 'weightFromProp',
            label: 'Weight',
            type: ColumnType.Text,
            valueRetrieval: 'weight'
        })
        fixture.detectChanges()

        expect(tableComponent.columnNames()).toEqual(['elementName', 'symbol', 'weight', 'weightFromProp'])
        expect(tableComponent.dataSource().data[3].mappedValues['weight']).toBe(undefined)
        expect(tableComponent.dataSource().data[3].mappedValues['weightFromProp']).toBe(9.0122)
    })

    it('should map function text column property', () => {
        fixture.componentInstance.columns.push({
            name: 'weight',
            label: 'Weight',
            type: ColumnType.Text,
            valueRetrieval: (record: PeriodicElement) => record.weight.toFixed(2)
        })
        fixture.detectChanges()

        expect(tableComponent.columnNames()).toEqual(['elementName', 'symbol', 'weight'])
        expect(tableComponent.dataSource().data[3].mappedValues['weight']).toBe('9.01')
    })

    it('should map undefined number column property', () => {
        fixture.componentInstance.columns.push({
            name: 'weight',
            label: 'Weight',
            type: ColumnType.Number
        })
        fixture.componentInstance.columns.push({
            name: 'weightFromUndefinedProp',
            label: 'Weight',
            type: ColumnType.Number
        })
        fixture.detectChanges()

        expect(tableComponent.columnNames()).toEqual(['elementName', 'symbol', 'weight', 'weightFromUndefinedProp'])
        expect(tableComponent.dataSource().data[3].mappedValues['weight']).toBe(9.0122)
        expect(tableComponent.dataSource().data[3].mappedValues['weightFromUndefinedProp']).toBe(undefined)
    })

    it('should map string number column property', () => {
        fixture.componentInstance.columns.push({
            name: 'weight',
            label: 'Weight',
            type: ColumnType.Number,
            valueRetrieval: 'number'
        })
        fixture.componentInstance.columns.push({
            name: 'weightFromProp',
            label: 'Weight',
            type: ColumnType.Number,
            valueRetrieval: 'weight'
        })
        fixture.detectChanges()

        expect(tableComponent.columnNames()).toEqual(['elementName', 'symbol', 'weight', 'weightFromProp'])
        expect(tableComponent.dataSource().data[3].mappedValues['weight']).toBe(undefined)
        expect(tableComponent.dataSource().data[3].mappedValues['weightFromProp']).toBe(9.0122)
    })

    it('should map function number column property', () => {
        fixture.componentInstance.columns.push({
            name: 'weight',
            label: 'Weight',
            type: ColumnType.Number,
            valueRetrieval: (record: PeriodicElement) => Number(record.weight.toFixed(2))
        })
        fixture.detectChanges()

        expect(tableComponent.columnNames()).toEqual(['elementName', 'symbol', 'weight'])
        expect(tableComponent.dataSource().data[3].mappedValues['weight']).toBe(9.01)
    })

    it('should map undefined js date column property', () => {
        fixture.componentInstance.columns.push({
            name: 'jsDate',
            label: 'jsTestDate',
            type: ColumnType.Date,
            dateFormatter: getJsDateFormatter() as (value: unknown) => string
        })
        fixture.componentInstance.columns.push({
            name: 'jsDateFromUndefinedProp',
            label: 'jsTestDate',
            type: ColumnType.Date,
            dateFormatter: getJsDateFormatter() as (value: unknown) => string
        })
        fixture.detectChanges()

        expect(tableComponent.columnNames()).toEqual(['elementName', 'symbol', 'jsDate', 'jsDateFromUndefinedProp'])
        expect(tableComponent.dataSource().data[3].mappedValues['jsDate']).toBe('Sat Apr 01 2023')
        expect(tableComponent.dataSource().data[3].mappedValues['jsDateFromUndefinedProp']).toBe(undefined)
    })

    it('should map string js date column property', () => {
        fixture.componentInstance.columns.push({
            name: 'jsDate',
            label: 'jsDate',
            type: ColumnType.Date,
            dateFormatter: getJsDateFormatter() as (value: unknown) => string,
            valueRetrieval: 'date'
        })
        fixture.componentInstance.columns.push({
            name: 'jsDateFromProp',
            label: 'jsDateFromProp',
            type: ColumnType.Date,
            dateFormatter: getJsDateFormatter() as (value: unknown) => string,
            valueRetrieval: 'jsDate'
        })
        fixture.detectChanges()

        expect(tableComponent.columnNames()).toEqual(['elementName', 'symbol', 'jsDate', 'jsDateFromProp'])
        expect(tableComponent.dataSource().data[3].mappedValues['jsDate']).toBe(undefined)
        expect(tableComponent.dataSource().data[3].mappedValues['jsDateFromProp']).toBe('Sat Apr 01 2023')
    })

    it('should map function js date column property', () => {
        fixture.componentInstance.columns.push({
            name: 'jsDate',
            label: 'jsDate',
            type: ColumnType.Date,
            dateFormatter: getJsDateFormatter() as (value: unknown) => string,
            valueRetrieval: (record: PeriodicElement) =>
                new Date(
                    record.jsDate.getFullYear(),
                    record.jsDate.getMonth() + 4,
                    record.jsDate.getDate(),
                    record.jsDate.getHours(),
                    record.jsDate.getMinutes(),
                    record.jsDate.getSeconds()
                )
        })
        fixture.detectChanges()

        expect(tableComponent.columnNames()).toEqual(['elementName', 'symbol', 'jsDate'])
        expect(tableComponent.dataSource().data[3].mappedValues['jsDate']).toBe('Tue Aug 01 2023')
    })

    it('should map undefined js-joda date column property', () => {
        fixture.componentInstance.columns.push({
            name: 'jsJodaDate',
            label: 'jsJodaTestDate',
            type: ColumnType.Date,
            dateFormatter: getJsJodaFormatter('dd-MM-yyyy') as (value: unknown) => string
        })
        fixture.componentInstance.columns.push({
            name: 'jsJodaDateFromUndefinedProp',
            label: 'jsJodaTestDate',
            type: ColumnType.Date,
            dateFormatter: getJsJodaFormatter('dd-MM-yyyy') as (value: unknown) => string
        })
        fixture.detectChanges()

        expect(tableComponent.columnNames()).toEqual([
            'elementName',
            'symbol',
            'jsJodaDate',
            'jsJodaDateFromUndefinedProp'
        ])
        expect(tableComponent.dataSource().data[3].mappedValues['jsJodaDate']).toBe('01-04-2023')
        expect(tableComponent.dataSource().data[3].mappedValues['jsJodaDateFromUndefinedProp']).toBe(undefined)
    })

    it('should map string js-joda date column property', () => {
        fixture.componentInstance.columns.push({
            name: 'jsJodaDate',
            label: 'jsJodaTestDate',
            type: ColumnType.Date,
            dateFormatter: getJsJodaFormatter('dd-MM-yyyy') as (value: unknown) => string,
            valueRetrieval: 'value'
        })
        fixture.componentInstance.columns.push({
            name: 'jsJodaDateFromProp',
            label: 'jsJodaDateFromProp',
            type: ColumnType.Date,
            dateFormatter: getJsJodaFormatter('dd-MM-yyyy') as (value: unknown) => string,
            valueRetrieval: 'jsJodaDate'
        })
        fixture.detectChanges()

        expect(tableComponent.columnNames()).toEqual(['elementName', 'symbol', 'jsJodaDate', 'jsJodaDateFromProp'])
        expect(tableComponent.dataSource().data[3].mappedValues['jsJodaDate']).toBe(undefined)
        expect(tableComponent.dataSource().data[3].mappedValues['jsJodaDateFromProp']).toBe('01-04-2023')
    })

    it('should map function js-joda date column property', () => {
        fixture.componentInstance.columns.push({
            name: 'jsJodaDate',
            label: 'jsJodaTestDate',
            type: ColumnType.Date,
            dateFormatter: getJsJodaFormatter('dd-MM-yyyy') as (value: unknown) => string,
            valueRetrieval: (record: PeriodicElement) => record.jsJodaDate.plusDays(4)
        })
        fixture.detectChanges()

        expect(tableComponent.columnNames()).toEqual(['elementName', 'symbol', 'jsJodaDate'])
        expect(tableComponent.dataSource().data[3].mappedValues['jsJodaDate']).toBe('05-04-2023')
    })

    it('should map undefined date-fns date column property', () => {
        fixture.componentInstance.columns.push({
            name: 'fnsDate',
            label: 'fnsTestDate',
            type: ColumnType.Date,
            dateFormatter: getDateFnsFormatter('dd-MM-yyyy') as (value: unknown) => string
        })
        fixture.componentInstance.columns.push({
            name: 'fnsDateFromUndefinedProp',
            label: 'fnsTestDate',
            type: ColumnType.Date,
            dateFormatter: getDateFnsFormatter('dd-MM-yyyy') as (value: unknown) => string
        })
        fixture.detectChanges()

        expect(tableComponent.columnNames()).toEqual(['elementName', 'symbol', 'fnsDate', 'fnsDateFromUndefinedProp'])
        expect(tableComponent.dataSource().data[3].mappedValues['fnsDate']).toBe('01-04-2023')
        expect(tableComponent.dataSource().data[3].mappedValues['fnsDateFromUndefinedProp']).toBe(undefined)
    })

    it('should map string date-fns date column property', () => {
        fixture.componentInstance.columns.push({
            name: 'fnsDate',
            label: 'fnsDate',
            type: ColumnType.Date,
            dateFormatter: getDateFnsFormatter('dd-MM-yyyy') as (value: unknown) => string,
            valueRetrieval: 'date'
        })
        fixture.componentInstance.columns.push({
            name: 'fnsDateFromProp',
            label: 'fnsDateFromProp',
            type: ColumnType.Date,
            dateFormatter: getDateFnsFormatter('dd-MM-yyyy') as (value: unknown) => string,
            valueRetrieval: 'fnsDate'
        })
        fixture.detectChanges()

        expect(tableComponent.columnNames()).toEqual(['elementName', 'symbol', 'fnsDate', 'fnsDateFromProp'])
        expect(tableComponent.dataSource().data[3].mappedValues['fnsDate']).toBe(undefined)
        expect(tableComponent.dataSource().data[3].mappedValues['fnsDateFromProp']).toBe('01-04-2023')
    })

    it('should map function date-fns date column property', () => {
        fixture.componentInstance.columns.push({
            name: 'fnsDate',
            label: 'fnsDate',
            type: ColumnType.Date,
            dateFormatter: getDateFnsFormatter('dd-MM-yyyy') as (value: unknown) => string,
            valueRetrieval: (record: PeriodicElement) => addMonths(record.fnsDate, 4)
        })
        fixture.detectChanges()

        expect(tableComponent.columnNames()).toEqual(['elementName', 'symbol', 'fnsDate'])
        expect(tableComponent.dataSource().data[3].mappedValues['fnsDate']).toBe('01-08-2023')
    })
})
