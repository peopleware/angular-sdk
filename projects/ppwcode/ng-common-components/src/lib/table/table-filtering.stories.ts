import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { PageEvent } from '@angular/material/paginator'
import { TranslateModule } from '@ngx-translate/core'
import { AsyncResult, AsyncResultModule, PagedEntities } from '@ppwcode/ng-async'
import { PaginationBarComponent } from '@ppwcode/ng-wireframe'
import { Meta, StoryObj } from '@storybook/angular-vite'
import { BehaviorSubject, map, switchMap, tap, timer } from 'rxjs'
import { SearchFilterComponent } from '../search-filter/search-filter.component'
import { SortChange } from './models/sort-change.model'
import { createPlayers, PlayerTableStoryComponent, playerStoryDecorators, StoryPlayer } from './player-table-story'

interface PlayerQuery {
    firstName: string
    lastName: string
    page: number
    pageSize: number
    sort: SortChange
}

@Component({
    selector: 'ppw-filtered-table-story',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        TranslateModule,
        SearchFilterComponent,
        AsyncResultModule,
        PlayerTableStoryComponent,
        PaginationBarComponent
    ],
    template: `
        <div class="flex-column gap-16 padding-8">
            <ppw-search-filter [submitDisabled]="form.invalid" (performSearch)="search()" (clear)="clear()">
                <form [formGroup]="form" (ngSubmit)="search()" class="flex-row gap-8">
                    <mat-form-field>
                        <mat-label>{{ 'table.firstname' | translate }}</mat-label>
                        <input matInput formControlName="firstName" />
                    </mat-form-field>
                    <mat-form-field>
                        <mat-label>{{ 'table.lastname' | translate }}</mat-label>
                        <input matInput formControlName="lastName" />
                    </mat-form-field>
                </form>
            </ppw-search-filter>
            @if (pending()) {
                <p role="status">Loading players…</p>
            }
            <ppw-async-result [asyncResult]="result()" [pending]="pending()">
                <ng-template ppw-async-result-success>
                    <ppw-player-table-story
                        [data]="result().entity.items"
                        [sortable]="true"
                        [sort]="tableSort()"
                        (sortChanged)="sortChanged($event)"
                    />
                    <ppw-pagination-bar
                        [pagedAsyncResult]="result().entity"
                        [pageSizeOptions]="[2, 5, 10]"
                        [hidePageSize]="false"
                        [showFirstLastButtons]="true"
                        (page)="pageChanged($event)"
                    />
                </ng-template>
            </ppw-async-result>
        </div>
    `
})
class FilteredTableStoryComponent {
    readonly #players = createPlayers()
    readonly #query = new BehaviorSubject<PlayerQuery>({
        firstName: '',
        lastName: '',
        page: 1,
        pageSize: 5,
        sort: { column: '', direction: '' }
    })
    protected readonly form = new FormGroup({
        firstName: new FormControl('', { nonNullable: true, validators: Validators.required }),
        lastName: new FormControl('', { nonNullable: true })
    })
    protected readonly pending = signal(true)
    protected readonly result = signal<AsyncResult<PagedEntities<StoryPlayer>>>({
        status: 'initial',
        filters: null,
        entity: {
            page: 1,
            pageSize: 5,
            totalCount: 0,
            totalPages: 0,
            hasPreviousPage: false,
            hasNextPage: false,
            items: []
        }
    })
    protected readonly activeSort = signal<SortChange>({ column: '', direction: '' })
    protected readonly tableSort = computed(() => ({
        active: this.activeSort().column,
        direction: this.activeSort().direction
    }))

    constructor() {
        this.#query
            .pipe(
                tap(() => this.pending.set(true)),
                switchMap((query) => timer(500).pipe(map(() => this.load(query)))),
                takeUntilDestroyed()
            )
            .subscribe((entity) => {
                this.result.set({ status: 'success', entity, filters: null })
                this.pending.set(false)
            })
    }
    protected search(): void {
        if (this.form.invalid) return
        this.#query.next({ ...this.#query.value, ...this.form.getRawValue(), page: 1 })
    }
    protected clear(): void {
        this.form.reset({ firstName: '', lastName: '' })
        this.#query.next({ ...this.#query.value, firstName: '', lastName: '', page: 1 })
    }
    protected sortChanged(sort: SortChange): void {
        this.activeSort.set(sort)
        this.#query.next({ ...this.#query.value, sort, page: 1 })
    }
    protected pageChanged(event: PageEvent): void {
        this.#query.next({
            ...this.#query.value,
            pageSize: event.pageSize,
            page: event.pageSize !== this.#query.value.pageSize ? 1 : event.pageIndex + 1
        })
    }
    private load(query: PlayerQuery): PagedEntities<StoryPlayer> {
        const filtered = this.#players.filter(
            (p) =>
                p.firstName.toLowerCase().startsWith(query.firstName.toLowerCase()) &&
                p.lastName.toLowerCase().startsWith(query.lastName.toLowerCase())
        )
        const value = (p: StoryPlayer): string | number => {
            switch (query.sort.column) {
                case 'firstName':
                    return p.firstName
                case 'lastName':
                    return p.lastName
                case 'birthDate':
                    return p.birthDate.toMillis()
                case 'income':
                    return p.income
                case 'bonus':
                    return p.bonus
                default:
                    return p.id
            }
        }
        if (query.sort.direction) {
            filtered.sort((a, b) => {
                const left = value(a),
                    right = value(b)
                return (left < right ? -1 : left > right ? 1 : 0) * (query.sort.direction === 'asc' ? 1 : -1)
            })
        }
        const totalPages = Math.ceil(filtered.length / query.pageSize)
        const page = Math.min(query.page, Math.max(1, totalPages))
        return {
            page,
            pageSize: query.pageSize,
            totalCount: filtered.length,
            totalPages,
            hasPreviousPage: page > 1,
            hasNextPage: page < totalPages,
            items: filtered.slice((page - 1) * query.pageSize, page * query.pageSize)
        }
    }
}

const meta: Meta<FilteredTableStoryComponent> = {
    title: 'ng-common-components/Table/FilteringAndPagination',
    component: FilteredTableStoryComponent,
    decorators: playerStoryDecorators,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Search by case-insensitive first/last-name prefixes, sort columns, and page through six local example players. First name is required for Search; Reset restores all players. Requests take 500ms and superseded requests are cancelled. Filtering, sorting, and page-size changes return to page one. Clearing sorting restores fixture order.'
            }
        }
    }
}
export default meta
type Story = StoryObj<FilteredTableStoryComponent>
export const Default: Story = {}
