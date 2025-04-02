/**
 * A model representing an action on a dashboard item.
 */
export interface DashboardItemAction {
    /** The translation key of the label to show on the button. */
    labelKey: string
    /** The function that will be executed when the action button is clicked. */
    clickFn: () => void
}
