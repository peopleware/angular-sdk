import { ChangeDetectionStrategy, Component, computed, inject, Signal, TemplateRef, viewChild } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { Router } from '@angular/router'
import { DashboardItem, DashboardItemAction, DashboardItemsTableComponent } from '@ppwcode/ng-common-components'
import { getFullRoutePath } from '@ppwcode/ng-router'
import type { RouteMapRoute } from '@ppwcode/ng-router'
import { ROUTE_MAP } from '../app.routes'

@Component({
    selector: 'ppw-components-dashboard-demo',
    imports: [DashboardItemsTableComponent, MatIcon, MatProgressSpinner],
    templateUrl: './components-dashboard-demo.component.html',
    styleUrl: './components-dashboard-demo.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ComponentsDashboardDemoComponent {
    #router: Router = inject(Router)

    private readonly confirmationDemoTemplate: Signal<TemplateRef<unknown>> =
        viewChild.required('confirmationDemoTemplate')

    protected readonly dashboardItems: Signal<DashboardItem[]> = computed(() => [
        this.#getConfirmationDemoItem(),
        this.#getExpandableCardDemoItem(),
        this.#getTableDemoItem(),
        this.#getMessageBarDemoItem(),
        this.#getAsyncResultDemoItem(),
        this.#getFileDownloadDemoItem(),
        this.#getDraggableDialogDemoItem(),
        this.#getFormsDemoItem(),
        this.#getRouteMapDemoItem(),
        this.#getSignalStoreDemoItem(),
        this.#getUtilsDemoItem(),
        this.#getSubscriptionHandlingDemoItem(),
        this.#getLocalStorageDemoItem()
    ])

    #getConfirmationDemoItem(): DashboardItem {
        const openDemoAction: DashboardItemAction = {
            labelKey: 'button.open',
            clickFn: this.#openConfirmationDialogDemo.bind(this)
        }
        return {
            template: this.confirmationDemoTemplate(),
            titleKey: 'navigation.confirmation_dialog_with_long_title',
            descriptionKey: 'dashboard.confirmation-dialog-description',
            actions: [openDemoAction],
            actionsAlignment: 'start',
            defaultAction: openDemoAction
        }
    }

    #getExpandableCardDemoItem(): DashboardItem {
        const openDemoAction: DashboardItemAction = {
            labelKey: 'button.open',
            clickFn: this.#openExpandableCardDemo.bind(this)
        }
        return {
            iconClass: 'fa-solid fa-house',
            titleKey: 'navigation.expandable_card',
            descriptionKey: 'dashboard.expandable-card-description',
            actions: [openDemoAction],
            actionsAlignment: 'center',
            defaultAction: openDemoAction
        }
    }

    #getTableDemoItem(): DashboardItem {
        const openTableDemoAction: DashboardItemAction = {
            labelKey: 'button.open',
            clickFn: this.#openTableDemo.bind(this)
        }
        const openFormTableDemoAction: DashboardItemAction = {
            labelKey: 'navigation.form_table',
            clickFn: this.#openFormTableDemo.bind(this)
        }
        return {
            iconClass: 'fa-solid fa-laptop-code',
            titleKey: 'navigation.table',
            descriptionKey: '',
            actions: [openTableDemoAction, openFormTableDemoAction],
            actionsAlignment: 'end',
            actionsDirection: 'column',
            defaultAction: openTableDemoAction
        }
    }

    #getMessageBarDemoItem(): DashboardItem {
        const openDemoAction: DashboardItemAction = {
            labelKey: 'navigation.message_bar',
            clickFn: this.#openMessageBarDemo.bind(this)
        }
        return {
            iconClass: 'fa-solid fa-triangle-exclamation',
            titleKey: 'navigation.message_bar',
            descriptionKey: '',
            actions: [],
            defaultAction: openDemoAction
        }
    }

    #openConfirmationDialogDemo(): void {
        this.#router.navigateByUrl(getFullRoutePath(ROUTE_MAP.components.confirmationDialog))
    }

    #openExpandableCardDemo(): void {
        this.#router.navigateByUrl(getFullRoutePath(ROUTE_MAP.components.expandableCard))
    }

    #openTableDemo(): void {
        this.#router.navigateByUrl(getFullRoutePath(ROUTE_MAP.components.table))
    }

    #openFormTableDemo(): void {
        this.#router.navigateByUrl(getFullRoutePath(ROUTE_MAP.components.formTable))
    }

    #openMessageBarDemo(): void {
        this.#router.navigateByUrl(getFullRoutePath(ROUTE_MAP.components.messageBar))
    }

    #getAsyncResultDemoItem(): DashboardItem {
        return this.#item('navigation.async_result', 'dashboard.async-result-description', 'fa-solid fa-spinner', ROUTE_MAP.components.asyncResult)
    }

    #getFileDownloadDemoItem(): DashboardItem {
        return this.#item('navigation.file_download', 'dashboard.file-download-description', 'fa-solid fa-download', ROUTE_MAP.components.fileDownload)
    }

    #getDraggableDialogDemoItem(): DashboardItem {
        return this.#item('navigation.draggable_dialog', 'dashboard.draggable-dialog-description', 'fa-solid fa-arrows-up-down-left-right', ROUTE_MAP.components.draggableDialog)
    }

    #getFormsDemoItem(): DashboardItem {
        return this.#item('navigation.forms_demo', 'dashboard.forms-demo-description', 'fa-solid fa-pen-to-square', ROUTE_MAP.components.formsDemo)
    }

    #getRouteMapDemoItem(): DashboardItem {
        return this.#item('navigation.route_map', 'dashboard.route-map-description', 'fa-solid fa-route', ROUTE_MAP.components.routeMap)
    }

    #getSignalStoreDemoItem(): DashboardItem {
        return this.#item('navigation.signal_store', 'dashboard.signal-store-description', 'fa-solid fa-database', ROUTE_MAP.components.signalStore)
    }

    #getUtilsDemoItem(): DashboardItem {
        return this.#item('navigation.utils_demo', 'dashboard.utils-demo-description', 'fa-solid fa-wrench', ROUTE_MAP.components.utilsDemo)
    }

    #getSubscriptionHandlingDemoItem(): DashboardItem {
        return this.#item('navigation.subscription_handling', 'dashboard.subscription-handling-description', 'fa-solid fa-link-slash', ROUTE_MAP.subscriptionHandling)
    }

    #getLocalStorageDemoItem(): DashboardItem {
        return this.#item('navigation.local_storage', 'dashboard.local-storage-description', 'fa-solid fa-hard-drive', ROUTE_MAP.localStorage)
    }

    #item(
        titleKey: string,
        descriptionKey: string,
        iconClass: string,
        route: RouteMapRoute
    ): DashboardItem {
        const openAction: DashboardItemAction = {
            labelKey: 'button.open',
            clickFn: () => this.#router.navigateByUrl(getFullRoutePath(route))
        }
        return {
            iconClass,
            titleKey,
            descriptionKey,
            actions: [openAction],
            defaultAction: openAction
        }
    }
}
