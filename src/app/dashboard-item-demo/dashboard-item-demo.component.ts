import { Component, effect, inject, Signal, TemplateRef, viewChild } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { Router } from '@angular/router'
import { DashboardItem, DashboardItemsTableComponent } from '@ppwcode/ng-common-components'
import { getFullRoutePath } from '@ppwcode/ng-router'
import { ROUTE_MAP } from '../app-routing.module'

@Component({
    selector: 'ppw-dashboard-item-demo',
    imports: [DashboardItemsTableComponent, MatIcon, MatProgressSpinner],
    templateUrl: './dashboard-item-demo.component.html',
    styleUrl: './dashboard-item-demo.component.scss'
})
export class DashboardItemDemoComponent {
    #router: Router = inject(Router)
    private readonly confirmationDemoTemplate: Signal<TemplateRef<unknown>> =
        viewChild.required('confirmationDemoTemplate')

    public dashboardItems: DashboardItem[] = []

    constructor() {
        effect(() => {
            this.dashboardItems = [
                this.getConfirmationDemoItem(),
                this.getExpandableCardDemoItem(),
                this.getTableDemoItem(),
                this.getMessageBarDemoItem()
            ]
        })
    }

    private getConfirmationDemoItem() {
        const item: DashboardItem = {
            template: this.confirmationDemoTemplate(),
            titleKey: 'navigation.confirmation_dialog_with_long_title',
            descriptionKey: 'dashboard.confirmation-dialog-description',
            actions: [],
            actionsAlignment: 'start'
        }
        item.defaultAction = {
            labelKey: 'button.open',
            clickFn: this.openConfirmationDialogDemo.bind(this)
        }
        item.actions?.push({
            labelKey: 'button.open',
            clickFn: this.openConfirmationDialogDemo.bind(this)
        })
        return item
    }

    private getExpandableCardDemoItem() {
        const item: DashboardItem = {
            iconClass: 'fa-solid fa-house',
            titleKey: 'navigation.expandable_card',
            descriptionKey: 'dashboard.expandable-card-description',
            actions: [],
            actionsAlignment: 'center'
        }
        item.defaultAction = {
            labelKey: 'button.open',
            clickFn: this.openExpandableCardDemo.bind(this)
        }
        item.actions?.push({
            labelKey: 'button.open',
            clickFn: this.openExpandableCardDemo.bind(this)
        })
        return item
    }

    private getTableDemoItem() {
        const item: DashboardItem = {
            iconClass: 'fa-solid fa-laptop-code',
            titleKey: 'navigation.table',
            descriptionKey: '',
            actions: [],
            actionsAlignment: 'end',
            actionsDirection: 'column'
        }
        item.defaultAction = {
            labelKey: 'navigation.table',
            clickFn: this.openTableDemo.bind(this)
        }
        item.actions?.push({
            labelKey: 'navigation.table',
            clickFn: this.openTableDemo.bind(this)
        })
        item.actions?.push({
            labelKey: 'navigation.form_table',
            clickFn: this.openFormTableDemo.bind(this)
        })
        return item
    }

    private getMessageBarDemoItem() {
        const item: DashboardItem = {
            iconClass: 'fa-solid fa-triangle-exclamation',
            titleKey: 'navigation.message_bar',
            descriptionKey: '',
            actions: []
        }
        item.defaultAction = {
            labelKey: 'navigation.message_bar',
            clickFn: this.openMessageBarDemo.bind(this)
        }
        return item
    }

    private openConfirmationDialogDemo(): void {
        this.#router.navigateByUrl(getFullRoutePath(ROUTE_MAP.confirmationDialog))
    }

    private openExpandableCardDemo(): void {
        this.#router.navigateByUrl(getFullRoutePath(ROUTE_MAP.expandableCard))
    }

    private openTableDemo(): void {
        this.#router.navigateByUrl(getFullRoutePath(ROUTE_MAP.table))
    }

    private openFormTableDemo(): void {
        this.#router.navigateByUrl(getFullRoutePath(ROUTE_MAP.formTable))
    }

    private openMessageBarDemo(): void {
        this.#router.navigateByUrl(getFullRoutePath(ROUTE_MAP.messageBar))
    }
}
