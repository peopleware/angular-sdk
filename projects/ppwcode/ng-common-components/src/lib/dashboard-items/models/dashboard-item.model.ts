import { TemplateRef } from '@angular/core'
import { DashboardItemAction } from './dashboard-item-action.model'

/**
 * The model for an item that can be shown as a dashboard item.
 */
export interface DashboardItem {
    /** The optiona fa icon class that will be used to render the dashboard item icon. */
    iconClass?: string
    /** An optional template ref that will be rendered as the dashboard item content. */
    template?: TemplateRef<unknown>
    /** The translation key for the dashboard item title. */
    titleKey: string
    /** The translation key for the description that will be added to the dashboard item. */
    descriptionKey: string
    /** The default action that will be executed when the icon or template of the dashboard item is clicked. */
    defaultAction?: DashboardItemAction
    /** The actions that will be shown on the dashboard item. */
    actions?: DashboardItemAction[]
    /** An optional badge that can be shown on a dashboard item. */
    badgeContent?: string
    /** Indicates in what direction the action buttons should be displayed */
    actionsDirection?: 'row' | 'column'
}
