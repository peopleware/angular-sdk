import { Component, inject, OnInit, Signal, viewChild } from '@angular/core'
import { AsyncResultModule } from '@ppwcode/ng-async'
import { MatCard, MatCardContent } from '@angular/material/card'
import { PpwTableModule, PpwTableOptions } from '@ppwcode/ng-common-components'
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatFormField } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatIcon } from '@angular/material/icon'
import { MatIconButton } from '@angular/material/button'
import { FormTableComponent } from '../../../projects/ppwcode/ng-common-components/src/lib/table/form-table.component'

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
        PpwTableModule,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatIcon,
        MatIconButton
    ],
    templateUrl: './editable-table.component.html',
    styleUrl: './editable-table.component.scss'
})
export default class EditableTableComponent implements OnInit {
    private fb: FormBuilder = inject(FormBuilder)
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
                actions: '80px'
            }
        },
        rows: {
            highlightOnHover: false
        }
    }

    public ngOnInit(): void {
        this.todoForm = new FormGroup<TodosForm>({
            todos: this.fb.array([] as string[])
        })
    }

    public get todos() {
        return this.todoForm.controls['todos'] as FormArray
    }

    public addItem(): void {
        const itemForm: FormGroup = this.fb.group({
            label: ['', [Validators.required]]
        })
        this.ppwTable().addControl(itemForm)
        console.log('ITEM ADDED', this.todoForm.getRawValue())
    }

    public removeItem(control: FormGroup): void {
        this.ppwTable().removeControl(control)
        console.log('ITEM REMOVED', this.todoForm.getRawValue())
    }

    public trackByFn(_index: number, item: Todo): Todo {
        return item
    }
}
