import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, OnInit, Signal, viewChild } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatIconButton } from '@angular/material/button'
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatInput } from '@angular/material/input'
import { AsyncResultModule } from '@ppwcode/ng-async'
import { FormTableComponent, PpwTableModule, PpwTableOptions } from '@ppwcode/ng-common-components'

export interface Todo {
    label: string
}

type TodosForm = {
    todos: FormArray<FormControl<string | null>>
}

@Component({
    selector: 'ppw-editable-table',
    imports: [
        AsyncResultModule,
        MatCard,
        MatCardContent,
        MatLabel,
        PpwTableModule,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatIcon,
        MatIconButton,
        MatCardHeader,
        MatCardTitle,
        JsonPipe
    ],
    templateUrl: './editable-table.component.html',
    styleUrl: './editable-table.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class EditableTableComponent implements OnInit {
    ppwTable: Signal<FormTableComponent<Todo>> = viewChild.required(FormTableComponent)
    public todoForm!: FormGroup<TodosForm>
    public tableOptions: PpwTableOptions<Todo> = {
        header: {
            sticky: true,
            styles: {
                actions: () => {
                    return { 'text-align': 'right' }
                }
            }
        },
        columns: {
            styles: {
                actions: () => {
                    return { 'text-align': 'right' }
                }
            },
            widths: {
                label: '100%',
                actions: '80px'
            }
        },
        rows: {
            highlightOnHover: false
        }
    }
    private fb: FormBuilder = inject(FormBuilder)

    public get todos() {
        return this.todoForm.controls['todos'] as FormArray
    }

    public ngOnInit(): void {
        this.todoForm = new FormGroup<TodosForm>({
            todos: this.fb.array([] as string[])
        })
    }

    public addItem(): void {
        const itemForm: FormGroup = this.fb.group({
            label: ['', [Validators.required]]
        })
        this.ppwTable().addControl(itemForm)
    }

    public removeItem(control: FormGroup): void {
        this.ppwTable().removeControl(control)
    }

    public trackByFn(_index: number, item: Todo): Todo {
        return item
    }
}
