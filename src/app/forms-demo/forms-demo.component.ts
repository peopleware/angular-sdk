import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import {
    createNonNullableControl,
    createNullableControl,
    ValidationService
} from '@ppwcode/ng-forms'

@Component({
    selector: 'ppw-forms-demo',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './forms-demo.component.html',
    styleUrl: './forms-demo.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsDemoComponent {
    readonly form = new FormGroup({
        name: createNonNullableControl('', [
            Validators.required,
            ValidationService.notOnlySpacesValidator
        ]),
        nickname: createNullableControl<string | null>(null),
        email: createNonNullableControl('', {
            validators: [Validators.required, Validators.email]
        })
    })

    submit(): void {
        if (this.form.valid) {
            console.log('Submitted:', this.form.getRawValue())
        }
    }

    reset(): void {
        this.form.reset({
            name: '',
            nickname: null,
            email: ''
        })
    }
}
