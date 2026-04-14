import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { SearchFilterComponent } from './search-filter.component'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { provideNoopAnimations } from '@angular/platform-browser/animations'

const meta: Meta<SearchFilterComponent> = {
    title: 'ng-common-components/SearchFilter',
    component: SearchFilterComponent,
    decorators: [
        moduleMetadata({
            imports: [
                SearchFilterComponent,
                MatCardModule,
                MatButtonModule,
                MatFormFieldModule,
                MatInputModule,
                MatSelectModule,
                MatDatepickerModule,
                MatNativeDateModule
            ]
        }),
        applicationConfig({
            providers: [provideNoopAnimations()]
        })
    ],
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
### When to use
Use the Search Filter component to provide a standardized container for search and reset controls. It is ideal for:
- Wrapping form fields that are used to filter lists or tables.
- Providing consistent positioning for "Search" and "Clear" actions.
- Building standard filter bars at the top of data-heavy views.
                `
            }
        }
    },
    argTypes: {
        submitDisabled: {
            description: 'Whether the search/submit button is disabled.',
            control: 'boolean',
            table: { category: 'Inputs' }
        },
        clearDisabled: {
            description: 'Whether the clear/reset button is disabled.',
            control: 'boolean',
            table: { category: 'Inputs' }
        },
        allowReset: {
            description: 'Whether to show the reset button.',
            control: 'boolean',
            table: { category: 'Inputs' }
        },
        searchLabel: {
            description: 'The label text for the search button.',
            control: 'text',
            table: { category: 'Inputs' }
        },
        resetLabel: {
            description: 'The label text for the reset button.',
            control: 'text',
            table: { category: 'Inputs' }
        },
        performSearch: {
            description: 'Event emitted when the search button is clicked.',
            action: 'performSearch',
            table: { category: 'Outputs' }
        },
        clear: {
            description: 'Event emitted when the reset button is clicked.',
            action: 'clear',
            table: { category: 'Outputs' }
        }
    }
}

export default meta
type Story = StoryObj<SearchFilterComponent>

export const Default: Story = {
    args: {
        searchLabel: 'Search',
        resetLabel: 'Clear Filters',
        allowReset: true,
        submitDisabled: false,
        clearDisabled: false
    },
    render: (args) => ({
        props: args,
        template: `
            <ppw-search-filter
                [searchLabel]="searchLabel"
                [resetLabel]="resetLabel"
                [allowReset]="allowReset"
                [submitDisabled]="submitDisabled"
                [clearDisabled]="clearDisabled"
                (performSearch)="performSearch()"
                (clear)="clear()">
                <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                    <mat-form-field>
                        <mat-label>First Name</mat-label>
                        <input matInput placeholder="e.g. John">
                    </mat-form-field>
                    <mat-form-field>
                        <mat-label>Last Name</mat-label>
                        <input matInput placeholder="e.g. Doe">
                    </mat-form-field>
                </div>
            </ppw-search-filter>
        `
    })
}

export const ComplexFilters: Story = {
    args: {
        searchLabel: 'Apply Filters',
        resetLabel: 'Reset All',
        allowReset: true
    },
    render: (args) => ({
        props: args,
        template: `
            <ppw-search-filter
                [searchLabel]="searchLabel"
                [resetLabel]="resetLabel"
                [allowReset]="allowReset"
                (performSearch)="performSearch()"
                (clear)="clear()">
                <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
                    <mat-form-field appearance="outline" style="width: 200px;">
                        <mat-label>Keyword</mat-label>
                        <input matInput placeholder="Search text...">
                    </mat-form-field>
                    
                    <mat-form-field appearance="outline" style="width: 200px;">
                        <mat-label>Status</mat-label>
                        <mat-select [value]="'active'">
                            <mat-option value="active">Active</mat-option>
                            <mat-option value="pending">Pending</mat-option>
                            <mat-option value="closed">Closed</mat-option>
                        </mat-select>
                    </mat-form-field>

                    <mat-form-field appearance="outline" style="width: 200px;">
                        <mat-label>Created Date</mat-label>
                        <input matInput [matDatepicker]="picker">
                        <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                        <mat-datepicker #picker></mat-datepicker>
                    </mat-form-field>

                    <div style="display: flex; align-items: center; gap: 8px;">
                         <span style="font-size: 14px; color: #666;">Include archived</span>
                         <input type="checkbox">
                    </div>
                </div>
            </ppw-search-filter>
        `
    })
}

export const NoReset: Story = {
    args: {
        searchLabel: 'Find',
        allowReset: false
    },
    render: (args) => ({
        props: args,
        template: `
            <ppw-search-filter
                [searchLabel]="searchLabel"
                [allowReset]="allowReset"
                (performSearch)="performSearch()">
                <mat-form-field style="width: 100%;">
                    <mat-label>Search Query</mat-label>
                    <input matInput placeholder="Search everything...">
                </mat-form-field>
            </ppw-search-filter>
        `
    })
}

export const Disabled: Story = {
    args: {
        submitDisabled: true,
        clearDisabled: true
    },
    render: (args) => ({
        props: args,
        template: `
            <ppw-search-filter
                [submitDisabled]="submitDisabled"
                [clearDisabled]="clearDisabled"
                (performSearch)="performSearch()"
                (clear)="clear()">
                <div style="padding: 8px; color: #cf000f; font-weight: bold;">
                    <i class="fa-solid fa-lock"></i> Filters are temporarily locked
                </div>
            </ppw-search-filter>
        `
    })
}
