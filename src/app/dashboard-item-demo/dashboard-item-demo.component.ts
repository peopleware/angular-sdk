import { ChangeDetectionStrategy, Component, computed, inject, Signal, TemplateRef, viewChild } from '@angular/core'
import { Router } from '@angular/router'
import { DashboardItem, DashboardItemAction, DashboardItemsTableComponent } from '@ppwcode/ng-common-components'
import { getFullRoutePath } from '@ppwcode/ng-router'
import { ROUTE_MAP } from '../app.routes'

@Component({
    selector: 'ppw-dashboard-item-demo',
    imports: [DashboardItemsTableComponent],
    templateUrl: './dashboard-item-demo.component.html',
    styleUrl: './dashboard-item-demo.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardItemDemoComponent {
    #router: Router = inject(Router)

    private readonly componentsDemoTemplate: Signal<TemplateRef<unknown>> = viewChild.required('componentsDemoTemplate')

    protected readonly dashboardItems: Signal<DashboardItem[]> = computed(() => [
        this.#getComponentsDemoItem(),
        this.#getInMemoryLoggingDemoItem(),
        this.#getGlobalErrorHandlerDemoItem()
    ])

    #getComponentsDemoItem(): DashboardItem {
        const openDemoAction: DashboardItemAction = {
            labelKey: 'button.open',
            clickFn: this.#openComponentsDemo.bind(this)
        }
        return {
            iconClass: 'fa-solid fa-boxes-stacked',
            titleKey: 'navigation.components',
            descriptionKey: 'dashboard.components-description',
            actions: [openDemoAction],
            actionsAlignment: 'start',
            defaultAction: openDemoAction
        }
    }

    #getInMemoryLoggingDemoItem(): DashboardItem {
        const openDemoAction: DashboardItemAction = {
            labelKey: 'button.open',
            clickFn: this.#openInMemoryLoggingDemo.bind(this)
        }
        return {
            iconClass: 'fa-solid fa-file-code',
            titleKey: 'navigation.in_memory_logging',
            descriptionKey: 'dashboard.in-memory-logging-description',
            actions: [openDemoAction],
            actionsAlignment: 'center',
            defaultAction: openDemoAction
        }
    }

    #getGlobalErrorHandlerDemoItem(): DashboardItem {
        const openDemoAction: DashboardItemAction = {
            labelKey: 'button.open',
            clickFn: this.#openGlobalErrorHandlerDemo.bind(this)
        }
        return {
            iconClass: 'fa-solid fa-bug',
            titleKey: 'navigation.global_error_handler',
            descriptionKey: 'dashboard.global-error-handler-description',
            actions: [openDemoAction],
            actionsAlignment: 'center',
            defaultAction: openDemoAction
        }
    }

    #openComponentsDemo(): void {
        this.#router.navigateByUrl(getFullRoutePath(ROUTE_MAP.components))
    }

    #openInMemoryLoggingDemo(): void {
        this.#router.navigateByUrl(getFullRoutePath(ROUTE_MAP.inMemoryLogging))
    }

    #openGlobalErrorHandlerDemo(): void {
        this.#router.navigateByUrl(getFullRoutePath(ROUTE_MAP.globalErrorHandler))
    }
}
