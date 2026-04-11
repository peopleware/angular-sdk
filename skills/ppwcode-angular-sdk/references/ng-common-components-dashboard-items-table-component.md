# DashboardItemsTableComponent

## Quick Use

Import the standalone component, provide an array of `DashboardItem`, and handle the emitted `DashboardItemAction`.

```ts
import { ChangeDetectionStrategy, Component, Signal, TemplateRef, computed, inject, viewChild } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { Router } from '@angular/router'
import {
    DashboardItem,
    DashboardItemAction,
    DashboardItemsTableComponent,
    DashboardOptions
} from '@ppwcode/ng-common-components'

@Component({
    selector: 'app-example',
    standalone: true,
    imports: [DashboardItemsTableComponent, MatIconModule, MatProgressSpinnerModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ppw-dashboard-items-table
            [dashboardItems]="dashboardItems()"
            [dashboardOptions]="dashboardOptions"
            (executeAction)="handleAction($event)"
        ></ppw-dashboard-items-table>

        <ng-template #reportsTemplate>
            <div class="reports-card-preview">
                <mat-icon>assessment</mat-icon>
                <mat-spinner diameter="48"></mat-spinner>
            </div>
        </ng-template>
    `
})
export class ExampleComponent {
    private readonly router = inject(Router)
    private readonly reportsTemplate: Signal<TemplateRef<unknown>> = viewChild.required('reportsTemplate')

    protected readonly dashboardOptions: DashboardOptions = {
        cardsAlignment: 'center'
    }

    protected readonly dashboardItems: Signal<DashboardItem[]> = computed(() => [
        this.createOrdersItem(),
        this.createReportsItem(),
        this.createSettingsItem()
    ])

    protected handleAction(action: DashboardItemAction | undefined): void {
        action?.clickFn()
    }

    private createOrdersItem(): DashboardItem {
        const openOrdersAction: DashboardItemAction = {
            labelKey: 'button.open',
            clickFn: () => this.router.navigateByUrl('/orders')
        }

        return {
            iconClass: 'fa-solid fa-box-open',
            titleKey: 'dashboard.orders.title',
            descriptionKey: 'dashboard.orders.description',
            badgeContent: '12',
            actions: [openOrdersAction],
            actionsAlignment: 'start',
            defaultAction: openOrdersAction
        }
    }

    private createReportsItem(): DashboardItem {
        const viewReportsAction: DashboardItemAction = {
            labelKey: 'dashboard.reports.open',
            clickFn: () => this.router.navigateByUrl('/reports')
        }
        const exportReportsAction: DashboardItemAction = {
            labelKey: 'dashboard.reports.export',
            clickFn: () => console.log('Export reports')
        }

        return {
            template: this.reportsTemplate(),
            titleKey: 'dashboard.reports.title',
            descriptionKey: 'dashboard.reports.description',
            actions: [viewReportsAction, exportReportsAction],
            actionsDirection: 'column',
            actionsAlignment: 'end',
            defaultAction: viewReportsAction
        }
    }

    private createSettingsItem(): DashboardItem {
        const openSettingsAction: DashboardItemAction = {
            labelKey: 'navigation.settings',
            clickFn: () => this.router.navigateByUrl('/settings')
        }

        return {
            iconClass: 'fa-solid fa-gear',
            titleKey: 'dashboard.settings.title',
            descriptionKey: 'dashboard.settings.description',
            actions: [],
            defaultAction: openSettingsAction
        }
    }
}
```

## Public API Surface

`DashboardItemsTableComponent` works with these exported types from `@ppwcode/ng-common-components`:

-   `DashboardItemsTableComponent` as the standalone component.
-   `DashboardItem` to describe each card.
-   `DashboardItemAction` for card and button actions.
-   `DashboardOptions` for layout configuration.

The component API is intentionally small:

-   `dashboardItems` is required and accepts an array of `DashboardItem`.
-   `dashboardOptions` is optional and currently supports `cardsAlignment: 'left' | 'center'`.
-   `executeAction` emits the clicked `DashboardItemAction | undefined`.

## DashboardItem Shape

Each `DashboardItem` can combine several presentation options:

-   `iconClass` renders a Font Awesome style icon when no custom template is provided.
-   `template` renders custom card content instead of the icon block.
-   `titleKey` and `descriptionKey` are passed through the translate pipe.
-   `defaultAction` is emitted when the main icon or custom template area is clicked.
-   `actions` renders buttons in the card footer.
-   `badgeContent` adds a badge to the card header.
-   `actionsDirection` controls whether the action buttons are laid out in a row or column.
-   `actionsAlignment` controls whether action buttons align to `start`, `center`, or `end`.

## Action Handling

The component emits the selected `DashboardItemAction`, but it does not invoke `clickFn` for you. Handle that in the consuming component:

```html
<ppw-dashboard-items-table
    [dashboardItems]="dashboardItems()"
    (executeAction)="$event ? $event.clickFn() : undefined"
></ppw-dashboard-items-table>
```

This keeps action execution explicit and lets the host decide whether to navigate, open a dialog, log analytics, or guard the action.

## Custom Template Cards

Use the `template` property when the card needs richer content than a single icon.

```ts
private readonly statsTemplate: Signal<TemplateRef<unknown>> = viewChild.required('statsTemplate')

private createStatsItem(): DashboardItem {
    const openAction: DashboardItemAction = {
        labelKey: 'button.open',
        clickFn: () => console.log('Open stats')
    }

    return {
        template: this.statsTemplate(),
        titleKey: 'dashboard.stats.title',
        descriptionKey: 'dashboard.stats.description',
        actions: [openAction],
        defaultAction: openAction
    }
}
```

```html
<ng-template #statsTemplate>
    <div class="stats-preview">
        <span>42</span>
        <span>Active reports</span>
    </div>
</ng-template>
```

## Guidance

-   Use `defaultAction` when clicking the card body should trigger the primary behavior.
-   Use `actions` when the card needs one or more explicit secondary actions.
-   Prefer `template` over `iconClass` when the card should preview richer content such as metrics, charts, or status blocks.
-   Keep `handleAction()` or the inline `(executeAction)` binding in the host component so action execution stays easy to test and reason about.
-   Provide `dashboardOptions` when card alignment matters for the page layout; otherwise the default component styling is sufficient.
