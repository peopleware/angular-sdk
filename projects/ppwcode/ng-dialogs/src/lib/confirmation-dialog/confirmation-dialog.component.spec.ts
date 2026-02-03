import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { provideTranslateService } from '@ngx-translate/core'
import { ConfirmationDialogComponent } from './confirmation-dialog.component'

describe('Confirmation dialog component', () => {
    let fixture: ComponentFixture<ConfirmationDialogComponent>
    let component: ConfirmationDialogComponent

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ConfirmationDialogComponent],
            providers: [
                provideTranslateService({}),
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        confirmationKey: 'Confirm',
                        bodyKey: 'Body',
                        bodyParams: {},
                        cancelKey: 'Cancel',
                        titleKey: 'Title',
                        titleParams: {}
                    }
                }
            ]
        })

        fixture = TestBed.createComponent(ConfirmationDialogComponent)
        component = fixture.componentInstance
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
