import { inject, InjectionToken, signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FieldTree, form, required, validate, ValidationError } from '@angular/forms/signals'
import { FieldErrorsErrorTranslator, providePpwcodeNgForms } from '../provider/provider'
import { FieldErrorsComponent } from './field-errors.component'

describe('FieldErrorsComponent', () => {
    const translationPrefix = new InjectionToken<string>('Field error translation prefix')

    let component: FieldErrorsComponent
    let fixture: ComponentFixture<FieldErrorsComponent>
    let errorTranslator: ReturnType<typeof vi.fn<FieldErrorsErrorTranslator>>

    beforeEach(async () => {
        errorTranslator = vi.fn((error) => `${inject(translationPrefix)}${error.message ?? error.kind}`)

        await TestBed.configureTestingModule({
            imports: [FieldErrorsComponent],
            providers: [
                { provide: translationPrefix, useValue: 'Translated: ' },
                providePpwcodeNgForms({ errorTranslator })
            ]
        }).compileComponents()

        fixture = TestBed.createComponent(FieldErrorsComponent)
        component = fixture.componentInstance
    })

    const createRequiredField = (value: string): FieldTree<string> =>
        TestBed.runInInjectionContext(() =>
            form(signal(value), (path) => required(path, { message: 'A username is required.' }))
        )

    const render = async (field: FieldTree<unknown>): Promise<void> => {
        fixture.componentRef.setInput('field', field)
        fixture.detectChanges()
        await fixture.whenStable()
    }

    it('creates without displaying an error for a valid field', async () => {
        await render(createRequiredField('Ada'))

        expect(component).toBeTruthy()
        expect(component.showError()).toBe(false)
        expect(component.displayedMessage()).toBeUndefined()
        expect(fixture.nativeElement.querySelector('span')).toBeNull()
        expect(errorTranslator).not.toHaveBeenCalled()
    })

    it('displays the translated first validation error', async () => {
        const field = TestBed.runInInjectionContext(() =>
            form(signal('invalid'), (path) =>
                validate(
                    path,
                    (): Array<ValidationError> => [
                        { kind: 'first', message: 'First error' },
                        { kind: 'second', message: 'Second error' }
                    ]
                )
            )
        )

        await render(field)

        expect(component.showError()).toBe(true)
        expect(component.displayedMessage()).toBe('Translated: First error')
        expect(fixture.nativeElement.querySelector('span')?.textContent).toContain('Translated: First error')
        expect(errorTranslator).toHaveBeenCalledOnce()
        expect(errorTranslator.mock.calls[0][0]).toMatchObject({ kind: 'first', message: 'First error' })
    })

    it('reactively clears the error when the field becomes valid', async () => {
        const field = createRequiredField('')
        await render(field)

        expect(fixture.nativeElement.querySelector('span')).not.toBeNull()

        field().value.set('Ada')
        fixture.detectChanges()
        await fixture.whenStable()

        expect(component.showError()).toBe(false)
        expect(component.displayedMessage()).toBeUndefined()
        expect(fixture.nativeElement.querySelector('span')).toBeNull()
    })
})
