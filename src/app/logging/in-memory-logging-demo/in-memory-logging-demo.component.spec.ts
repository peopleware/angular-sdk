import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { provideTranslateService } from '@ngx-translate/core'
import { verifyA11y } from '@ppwcode/ng-unit-testing'
import { InMemoryLoggingDemoComponent } from './in-memory-logging-demo.component'

describe('InMemoryLoggingDemoComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [InMemoryLoggingDemoComponent, NoopAnimationsModule],
            providers: [provideTranslateService({})]
        })
    )

    it('should create', () => {
        const fixture = TestBed.createComponent(InMemoryLoggingDemoComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })

    verifyA11y(InMemoryLoggingDemoComponent)
})
