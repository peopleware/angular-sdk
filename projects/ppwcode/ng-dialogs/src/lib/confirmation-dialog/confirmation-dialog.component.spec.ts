import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { provideTranslateService } from '@ngx-translate/core'
import { ConfirmationDialogComponent, ConfirmationDialogData } from './confirmation-dialog.component'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { By } from '@angular/platform-browser'
import { MatButtonModule } from '@angular/material/button'

describe('Confirmation dialog component', () => {
    let fixture: ComponentFixture<ConfirmationDialogComponent>
    let component: ConfirmationDialogComponent

    const mockData: ConfirmationDialogData = {
        titleKey: 'Title',
        bodyKey: 'Body',
        bodyParams: {},
        titleParams: {},
        confirmationKey: 'Confirm',
        cancelKey: 'Cancel'
    }

    async function createComponent(data: Partial<ConfirmationDialogData> = {}) {
        TestBed.configureTestingModule({
            imports: [ConfirmationDialogComponent, MatDialogModule, MatButtonModule],
            providers: [
                provideNoopAnimations(),
                provideTranslateService({}),
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: { ...mockData, ...data }
                }
            ]
        })

        fixture = TestBed.createComponent(ConfirmationDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    }

    it('should create', async () => {
        await createComponent()
        expect(component).toBeTruthy()
    })

    describe('Button Appearances', () => {
        it('should have default appearances and correct classes', async () => {
            await createComponent()
            expect(component.cancelButtonAppearance).toBe('outlined')
            expect(component.confirmationButtonAppearance).toBe('elevated')

            const buttons = fixture.debugElement.queryAll(By.css('button'))
            expect(buttons[0].nativeElement.classList).toContain('mat-mdc-outlined-button')
            expect(buttons[1].nativeElement.classList).toContain('mat-mdc-raised-button')
        })

        it('should use provided button appearances (new grouped properties) and apply classes', async () => {
            await createComponent({
                cancel: { key: 'Cancel', type: 'filled' },
                confirm: { key: 'Confirm', type: 'tonal' }
            })
            expect(component.cancelButtonAppearance).toBe('filled')
            expect(component.confirmationButtonAppearance).toBe('tonal')

            const buttons = fixture.debugElement.queryAll(By.css('button'))
            expect(buttons[0].nativeElement.classList).toContain('mat-mdc-unelevated-button')
            expect(buttons[1].nativeElement.classList).toContain('mat-tonal-button')
        })
    })

    describe('Palette', () => {
        it('should have default primary palette', async () => {
            await createComponent()
            expect(component.confirmationThemePalette).toBe('primary')
        })

        it('should use provided palette (new grouped property)', async () => {
            await createComponent({
                confirm: { key: 'Confirm', color: 'accent' }
            })
            expect(component.confirmationThemePalette).toBe('accent')
        })

        it('should use deprecated confirmationThemePalette as fallback', async () => {
            await createComponent({
                confirmationThemePalette: 'warn'
            } as any)
            expect(component.confirmationThemePalette).toBe('warn')
        })
    })

    describe('Keys and Translation', () => {
        it('should use new confirm/cancel keys', async () => {
            await createComponent({
                cancel: { key: 'NewCancel' },
                confirm: { key: 'NewConfirm' }
            })
            expect(component.cancelKey).toBe('NewCancel')
            expect(component.confirmationKey).toBe('NewConfirm')
        })

        it('should fallback to deprecated keys', async () => {
            await createComponent({
                cancelKey: 'OldCancel',
                confirmationKey: 'OldConfirm',
                cancel: undefined,
                confirm: undefined
            })
            expect(component.cancelKey).toBe('OldCancel')
            expect(component.confirmationKey).toBe('OldConfirm')
        })
    })

    describe('Visibility', () => {
        it('should show cancel button by default', async () => {
            await createComponent()
            const buttons = fixture.debugElement.queryAll(By.css('button'))
            expect(buttons.length).toBe(2)
        })

        it('should hide cancel button when allowConfirmOnly is true', async () => {
            await createComponent({ allowConfirmOnly: true })
            const buttons = fixture.debugElement.queryAll(By.css('button'))
            expect(buttons.length).toBe(1)
            expect(buttons[0].nativeElement.textContent).toContain('Confirm')
        })

        it('should show icons by default', async () => {
            await createComponent()
            const icons = fixture.debugElement.queryAll(By.css('i'))
            expect(icons.length).toBe(2)
        })

        it('should hide cancel icon when requested (new grouped property)', async () => {
            await createComponent({ cancel: { key: 'Cancel', hideIcon: true } })
            const icons = fixture.debugElement.queryAll(By.css('i'))
            expect(icons.length).toBe(1)
            expect(icons[0].nativeElement.className).toContain('fa-check')
        })

        it('should hide confirm icon when requested (new grouped property)', async () => {
            await createComponent({ confirm: { key: 'Confirm', hideIcon: true } })
            const icons = fixture.debugElement.queryAll(By.css('i'))
            expect(icons.length).toBe(1)
            expect(icons[0].nativeElement.className).toContain('fa-ban')
        })
    })
})
