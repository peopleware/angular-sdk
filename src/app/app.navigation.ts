import { getFullRoutePath } from '@ppwcode/ng-router'
import { NavigationItem } from '@ppwcode/ng-wireframe'
import { ROUTE_MAP } from './app.routes'

const dashboardNavigationItem: NavigationItem = {
    label: 'navigation.dashboard_item',
    icon: 'fa-solid fa-grip',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.dashboardItem)
}

const confirmationDialogNavigationItem: NavigationItem = {
    label: 'navigation.confirmation_dialog',
    icon: 'fa-solid fa-circle-question',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.components.confirmationDialog)
}

const expandableCardNavigationItem: NavigationItem = {
    label: 'navigation.expandable_card',
    icon: 'fa-solid fa-house',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.components.expandableCard)
}

const tableNavigationItem: NavigationItem = {
    label: 'navigation.table',
    icon: 'fa-solid fa-laptop-code',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.components.table)
}

const formTableNavigationItem: NavigationItem = {
    label: 'navigation.form_table',
    icon: 'fa-solid fa-table-list',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.components.formTable)
}

const messageBarNavigationItem: NavigationItem = {
    label: 'navigation.message_bar',
    icon: 'fa-solid fa-triangle-exclamation',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.components.messageBar)
}

const asyncResultNavigationItem: NavigationItem = {
    label: 'navigation.async_result',
    icon: 'fa-solid fa-spinner',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.components.asyncResult)
}

const fileDownloadNavigationItem: NavigationItem = {
    label: 'navigation.file_download',
    icon: 'fa-solid fa-download',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.components.fileDownload)
}

const draggableDialogNavigationItem: NavigationItem = {
    label: 'navigation.draggable_dialog',
    icon: 'fa-solid fa-arrows-up-down-left-right',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.components.draggableDialog)
}

const formsDemoNavigationItem: NavigationItem = {
    label: 'navigation.forms_demo',
    icon: 'fa-solid fa-pen-to-square',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.components.formsDemo)
}

const routeMapNavigationItem: NavigationItem = {
    label: 'navigation.route_map',
    icon: 'fa-solid fa-route',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.components.routeMap)
}

const signalStoreNavigationItem: NavigationItem = {
    label: 'navigation.signal_store',
    icon: 'fa-solid fa-database',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.components.signalStore)
}

const utilsDemoNavigationItem: NavigationItem = {
    label: 'navigation.utils_demo',
    icon: 'fa-solid fa-wrench',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.components.utilsDemo)
}

const componentsNavigationItemContainer: NavigationItem = {
    label: 'navigation.components',
    icon: 'fa-solid fa-cubes',
    children: [
        confirmationDialogNavigationItem,
        expandableCardNavigationItem,
        tableNavigationItem,
        formTableNavigationItem,
        messageBarNavigationItem,
        asyncResultNavigationItem,
        fileDownloadNavigationItem,
        draggableDialogNavigationItem,
        formsDemoNavigationItem,
        routeMapNavigationItem,
        signalStoreNavigationItem,
        utilsDemoNavigationItem
    ]
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

const subscriptionHandlingNavigationItem: NavigationItem = {
    label: 'navigation.subscription_handling',
    icon: 'fa-solid fa-link-slash',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.subscriptionHandling)
}

const localStorageNavigationItem: NavigationItem = {
    label: 'navigation.local_storage',
    icon: 'fa-solid fa-hard-drive',
    fullRouterPath: getFullRoutePath(ROUTE_MAP.localStorage)
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
        inMemoryLoggingNavigationItem,
        subscriptionHandlingNavigationItem,
        localStorageNavigationItem,
        globalErrorHandlerNavigationItem,
        peoplewareWebsiteNavigationItem
    ]
}
