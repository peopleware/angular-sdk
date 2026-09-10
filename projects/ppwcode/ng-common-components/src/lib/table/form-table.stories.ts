import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, input, OnInit, viewChild } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatIconButton } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatInput } from '@angular/material/input'
import { TranslateModule } from '@ngx-translate/core'
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite'
import { map } from 'rxjs'
import { FormTableComponent } from './form-table.component'
import { PpwTableOptions } from './options/table-options'
import { PpwTableModule } from './table.module'

type TodoForm = FormGroup<{ label: FormControl<string> }>

@Component({
    selector: 'ppw-form-table-story',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        JsonPipe,
        ReactiveFormsModule,
        PpwTableModule,
        MatCardModule,
        MatFormFieldModule,
        MatInput,
        MatIcon,
        MatIconButton,
        TranslateModule
    ],
    template: `
        <div class="flex-column gap-8 padding-8">
            <mat-card>
                <mat-card-content>
                    <form [formGroup]="todoForm">
                        <ppw-form-table [data]="todos" [options]="tableOptions" [trackBy]="trackByFn">
                            <ppw-column name="label" type="template" label="Todo's">
                                <ng-template ppw-column-cell let-record>
                                    <mat-form-field class="full-width">
                                        <mat-label>Enter a todo item</mat-label>
                                        <input matInput [formControl]="record.controls.label" />
                                    </mat-form-field>
                                </ng-template>
                            </ppw-column>
                            <ppw-column name="actions" type="template">
                                <ng-template ppw-column-header>
                                    <button mat-icon-button type="button" aria-label="Add todo" (click)="addItem()">
                                        <mat-icon>add</mat-icon>
                                    </button>
                                </ng-template>
                                <ng-template ppw-column-cell let-record>
                                    <button
                                        mat-icon-button
                                        type="button"
                                        aria-label="Delete todo"
                                        (click)="removeItem(record)"
                                    >
                                        <mat-icon>delete</mat-icon>
                                    </button>
                                </ng-template>
                            </ppw-column>
                        </ppw-form-table>
                    </form>
                </mat-card-content>
            </mat-card>
            <mat-card>
                <mat-card-header>
                    <mat-card-title>Current form array value:</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                    <pre data-testid="form-value">{{ formValue() | json }}</pre>
                </mat-card-content>
            </mat-card>
        </div>
    `
})
class FormTableStoryComponent implements OnInit {
    readonly initialTodos = input<string[]>([])
    protected readonly table = viewChild.required<FormTableComponent<TodoForm>>(FormTableComponent)
    protected readonly todos = new FormArray<TodoForm>([])
    protected readonly todoForm = new FormGroup({ todos: this.todos })
    protected readonly formValue = toSignal(this.todos.valueChanges.pipe(map(() => this.todos.getRawValue())), {
        initialValue: this.todos.getRawValue()
    })
    protected readonly tableOptions: PpwTableOptions<TodoForm> = {
        header: { sticky: true, styles: { actions: () => ({ 'text-align': 'right' }) } },
        columns: {
            styles: { actions: () => ({ 'text-align': 'right' }) },
            widths: { label: '100%', actions: '80px' }
        },
        rows: { highlightOnHover: false }
    }
    protected readonly trackByFn = (_index: number, control: TodoForm): TodoForm => control

    ngOnInit(): void {
        for (const label of this.initialTodos()) {
            this.todos.push(this.createTodo(label))
        }
    }

    protected addItem(): void {
        this.table().addControl(this.createTodo(''))
    }

    protected removeItem(control: TodoForm): void {
        this.table().removeControl(control)
    }

    private createTodo(label: string): TodoForm {
        return new FormGroup({ label: new FormControl(label, { nonNullable: true, validators: Validators.required }) })
    }
}

const meta: Meta<FormTableStoryComponent> = {
    title: 'ng-common-components/Table/Form',
    component: FormTableStoryComponent,
    subcomponents: { FormTableComponent },
    decorators: [moduleMetadata({ imports: [FormTableStoryComponent, TranslateModule] })],
    tags: ['autodocs'],
    argTypes: {
        initialTodos: {
            control: false,
            description: 'Initial todo labels, used when the story is created. Edit rows directly in the table.'
        }
    },
    parameters: {
        docs: {
            description: {
                component:
                    'Editable reactive-form rows backed by a FormArray of FormGroups. Add and remove rows through the form table methods, edit required todo labels, and inspect the live form value below.'
            }
        }
    }
}

export default meta
type Story = StoryObj<FormTableStoryComponent>

export const Empty: Story = {
    args: { initialTodos: [] }
}

export const Populated: Story = {
    args: { initialTodos: ['Review the pull request', 'Update the documentation'] }
}
