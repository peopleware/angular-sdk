export interface NavigationItem {
    label: string
    icon: string
    fullRouterPath?: string
    isEnabled?: boolean
    children?: Array<NavigationItem>
}
