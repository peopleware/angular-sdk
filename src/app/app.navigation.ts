import { NavigationItem } from '@ppwcode/ng-wireframe'
import { getFullRoutePath } from '@ppwcode/ng-router'
import { ROUTE_MAP } from './app-routing.module'

const dashboardNavigationItem: NavigationItem = {
    label: 'navigation.dashboard_item',
    icon: 'fa-solid fa-grip',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.dashboardItem)
}

const confirmationDialogNavigationItem: NavigationItem = {
    label: 'navigation.confirmation_dialog',
    icon: 'fa-solid fa-circle-question',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.confirmationDialog)
}

const expandableCardNavigationItem: NavigationItem = {
    label: 'navigation.expandable_card',
    icon: 'fa-solid fa-house',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.expandableCard)
}

const tableNavigationItem: NavigationItem = {
    label: 'navigation.table',
    icon: 'fa-solid fa-laptop-code',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.table)
}

const formTableNavigationItem: NavigationItem = {
    label: 'navigation.form_table',
    icon: 'fa-solid fa-table-list',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.formTable)
}

const messageBarNavigationItem: NavigationItem = {
    label: 'navigation.message_bar',
    icon: 'fa-solid fa-triangle-exclamation',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.messageBar)
}

const componentsNavigationItemContainer: NavigationItem = {
    label: 'navigation.components',
    icon: 'fa-solid fa-cubes',
    children: [
        confirmationDialogNavigationItem,
        expandableCardNavigationItem,
        tableNavigationItem,
        formTableNavigationItem,
        messageBarNavigationItem
    ]
}

const shapesNavigationItem: NavigationItem = {
    label: 'navigation.shapes',
    icon: 'fa-solid fa-shapes',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.designSystem.shapes)
}

const designSystemNavigationItem: NavigationItem = {
    label: 'navigation.design_system',
    icon: 'fa-solid fa-palette',
    children: [shapesNavigationItem]
}

const inMemoryLoggingNavigationItem: NavigationItem = {
    label: 'navigation.in_memory_logging',
    icon: 'fa-solid fa-file-code',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.inMemoryLogging)
}

const globalErrorHandlerNavigationItem: NavigationItem = {
    label: 'navigation.global_error_handler',
    icon: 'fa-solid fa-bug',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.globalErrorHandler)
}

const peoplewareWebsiteNavigationItem: NavigationItem = {
    label: 'navigation.peopleware_website',
    icon: 'fa-solid fa-earth-europe',
    fullRouterPath: 'https://peopleware.be',
    isExternalLink: true
}

export const getNavigationItems = () => {
    return [
        dashboardNavigationItem,
        componentsNavigationItemContainer,
        designSystemNavigationItem,
        inMemoryLoggingNavigationItem,
        globalErrorHandlerNavigationItem,
        peoplewareWebsiteNavigationItem
    ]
}
