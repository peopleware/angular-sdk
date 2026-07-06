import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { provideTranslateService } from '@ngx-translate/core'
import { PPW_TABLE_DEFAULT_OPTIONS } from '@ppwcode/ng-common-components'
import { expectNoA11yViolations, runA11yChecks } from '@ppwcode/ng-unit-testing'
import TableDemoComponent from './table-demo.component'

describe('TableDemoComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [TableDemoComponent, NoopAnimationsModule, RouterTestingModule],
            providers: [
                provideTranslateService({}),
                { provide: PPW_TABLE_DEFAULT_OPTIONS, useValue: { dateColumnFormatter: (v: unknown) => String(v) } }
            ]
        })
    )

    it('should create', () => {
        const fixture = TestBed.createComponent(TableDemoComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    it('should have no accessibility violations in its default state', async () => {
        const fixture = TestBed.createComponent(TableDemoComponent)
        fixture.detectChanges()
        const results = await runA11yChecks(fixture.nativeElement)
        expectNoA11yViolations(results)
    })
})
