import { ChangeDetectionStrategy, Component, computed, inject, Signal, TemplateRef, viewChild } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { Router } from '@angular/router'
import { DashboardItem, DashboardItemAction, DashboardItemsTableComponent } from '@ppwcode/ng-common-components'
import { getFullRoutePath } from '@ppwcode/ng-router'
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
        this.#getMessageBarDemoItem()
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
}
