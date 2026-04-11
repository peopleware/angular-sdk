# SearchFilterComponent

## Quick Use

Import the component, project your filter form fields into it, and handle the output events:

```ts
import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { SearchFilterComponent } from '@ppwcode/ng-common-components'

@Component({
    selector: 'app-example',
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, SearchFilterComponent],
    template: `
        <ppw-search-filter
            (performSearch)="performSearch()"
            (clear)="performReset()"
            [submitDisabled]="searchForm.invalid"
        >
            <form [formGroup]="searchForm">
                <mat-form-field>
                    <mat-label>First name</mat-label>
                    <input matInput formControlName="firstName" />
                </mat-form-field>
            </form>
        </ppw-search-filter>
    `
})
export class ExampleComponent {
    protected readonly searchForm = new FormGroup({
        firstName: new FormControl('', { nonNullable: true })
    })

    protected performSearch(): void {
        // Trigger the search with the current form values.
    }

    protected performReset(): void {
        this.searchForm.reset({ firstName: '' })
        this.performSearch()
    }
}
```

## Inputs

-   `submitDisabled` defaults to `false`. Set it to `true` to disable the Search button and Enter key submission.
-   `clearDisabled` defaults to `false`. Set it to `true` to disable the Reset button.
-   `allowReset` defaults to `true`. Set it to `false` to hide the Reset button and disable the reset keyboard shortcut.
-   `searchLabel` defaults to `'Search'`. Override it to customize the Search button label.
-   `resetLabel` defaults to `'Reset'`. Override it to customize the Reset button label.

## Outputs

-   `performSearch` emits when the Search button is clicked or when Enter is pressed inside the projected content while search is enabled.
-   `clear` emits when the Reset button is clicked or when Ctrl+Enter is pressed while reset is enabled.

## Content Projection

Project the filter controls inside the component. `SearchFilterComponent` provides the surrounding card and action buttons, while the projected content defines the actual filters.

```html
<ppw-search-filter (performSearch)="performSearch()" (clear)="performReset()">
    <form [formGroup]="searchForm" class="flex-row gap-8">
        <mat-form-field>
            <mat-label>First name</mat-label>
            <input matInput formControlName="firstName" />
        </mat-form-field>
        <mat-form-field>
            <mat-label>Last name</mat-label>
            <input matInput formControlName="lastName" />
        </mat-form-field>
    </form>
</ppw-search-filter>
```

## Guidance

-   Keep the filter state in your own `FormGroup` or signals; `SearchFilterComponent` only renders the container and emits the actions.
-   Bind `submitDisabled` to form validity when search should only run for valid input.
-   Bind `clearDisabled` to pending state when a reset should be blocked during an in-flight request.
-   Use `performReset()` to both reset local state and trigger a fresh search when that matches the UX you want.
