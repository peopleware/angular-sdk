# FormTableComponent

## Quick Use

`FormTableComponent` is available through `PpwTableModule`. The table rows are form groups, so custom cell templates usually bind directly to controls on the current row.

```ts
import { CommonModule, JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, Signal, inject, viewChild } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule, MatIconButton } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { FormTableComponent, PpwTableModule, PpwTableOptions } from '@ppwcode/ng-common-components'

type TodoFormGroup = FormGroup<{
    label: FormControl<string>
    notes: FormControl<string>
}>

type TodosForm = FormGroup<{
    todos: FormArray<TodoFormGroup>
}>

@Component({
    selector: 'app-example',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PpwTableModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        JsonPipe,
        MatIconButton
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <mat-card>
            <mat-card-content>
                <form [formGroup]="todoForm">
                    <ppw-form-table [data]="todos" [options]="tableOptions" [trackBy]="trackByControl">
                        <ppw-column name="label" type="template" label="Todo">
                            <ng-template ppw-column-cell let-record>
                                <mat-form-field class="full-width">
                                    <mat-label>Label</mat-label>
                                    <input matInput [formControl]="record.controls.label" />
                                </mat-form-field>
                            </ng-template>
                        </ppw-column>

                        <ppw-column name="notes" type="template" label="Notes">
                            <ng-template ppw-column-cell let-record>
                                <mat-form-field class="full-width">
                                    <mat-label>Notes</mat-label>
                                    <input matInput [formControl]="record.controls.notes" />
                                </mat-form-field>
                            </ng-template>
                        </ppw-column>

                        <ppw-column name="actions" type="template">
                            <ng-template ppw-column-header>
                                <button mat-icon-button type="button" aria-label="Add row" (click)="addItem()">
                                    <mat-icon>add</mat-icon>
                                </button>
                            </ng-template>
                            <ng-template ppw-column-cell let-record>
                                <button
                                    mat-icon-button
                                    type="button"
                                    aria-label="Delete row"
                                    (click)="removeItem(record)"
                                >
                                    <mat-icon>delete</mat-icon>
                                </button>
                            </ng-template>
                        </ppw-column>

                        <ng-template ppw-empty-page>
                            <p>No todo items yet. Use the add button to create one.</p>
                        </ng-template>
                    </ppw-form-table>
                </form>
            </mat-card-content>
        </mat-card>

        <pre>{{ todoForm.getRawValue().todos | json }}</pre>
    `
})
export class ExampleComponent {
    protected readonly ppwTable: Signal<FormTableComponent<TodoFormGroup>> = viewChild.required(FormTableComponent)
    private readonly fb = inject(FormBuilder)

    protected readonly todoForm: TodosForm = this.fb.group({
        todos: this.fb.array<TodoFormGroup>([
            this.createTodoGroup('Review PR', 'Check validation edge cases'),
            this.createTodoGroup('Ship release notes', 'Summarize table improvements')
        ])
    })

    protected readonly tableOptions: PpwTableOptions<TodoFormGroup> = {
        header: {
            sticky: true,
            styles: {
                actions: () => ({ 'text-align': 'right' })
            }
        },
        columns: {
            widths: {
                label: '35%',
                notes: '55%',
                actions: '80px'
            },
            styles: {
                actions: () => ({ 'text-align': 'right' })
            }
        },
        rows: {
            highlightOnHover: false
        }
    }

    protected get todos(): FormArray<TodoFormGroup> {
        return this.todoForm.controls.todos
    }

    protected addItem(): void {
        this.ppwTable().addControl(this.createTodoGroup())
    }

    protected removeItem(control: TodoFormGroup): void {
        this.ppwTable().removeControl(control)
    }

    protected trackByControl(_index: number, control: TodoFormGroup): TodoFormGroup {
        return control
    }

    private createTodoGroup(label = '', notes = ''): TodoFormGroup {
        return this.fb.group({
            label: this.fb.nonNullable.control(label, { validators: [Validators.required] }),
            notes: this.fb.nonNullable.control(notes)
        })
    }
}
```

## Public APIs For Form Tables

Use the same exported column APIs as `TableComponent`, together with the `FormTableComponent` class:

-   `PpwTableModule` to make `ppw-form-table`, `ppw-column`, `ppw-column-header`, `ppw-column-cell`, and `ppw-empty-page` available.
-   `FormTableComponent` when you want to call `addControl()` or `removeControl()` from component code.
-   `ppw-column` and template directives for editable cells.
-   `PpwTableOptions` for layout, widths, hover behavior, and click handling.

For editable rows, prefer `type="template"` columns so the cell template can bind directly to form controls on the current `FormGroup`.

## Data Shape

`FormTableComponent` expects a `FormArray<FormGroup>` as its `data` input.

-   Each row passed to `ppw-column-cell` is the current `FormGroup`.
-   Event outputs such as `selectionChanged` and `orderChanged` still use `TableRecord<T>`, where `initialRecord` is the original row `FormGroup`.
-   The table reuses the same public options and outputs as `TableComponent`.

## Common Patterns

-   Keep the parent `<form>` around the `ppw-form-table` so all row controls participate in the same reactive form.
-   Use `viewChild.required(FormTableComponent)` when you want to call `addControl()` and `removeControl()` from the host component.
-   Define action columns as template columns with a custom header button for add and row buttons for delete or duplicate actions.
-   Use `trackBy` with the `FormGroup` instance itself when rows are identified by control identity rather than a persisted id.
-   Bind form controls from the row template with `record.controls.fieldName` or `record.get('fieldName')`.

## Guidance

-   Prefer `FormTableComponent` when each row is editable and should stay synchronized with a reactive form model.
-   Prefer `TableComponent` when the rows are plain objects and editing happens outside the table.
-   Use only public column directives from `@ppwcode/ng-common-components` for column definitions, not internal column classes.
-   If rows can be added or removed from the UI, use the component methods `addControl()` and `removeControl()` instead of manually mutating the `FormArray` without refreshing the table.
