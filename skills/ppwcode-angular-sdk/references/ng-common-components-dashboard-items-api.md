# dashboard items API

## What It Is For

Use the dashboard items surface for clickable cards or tiles that act like a visual menu or task entry point.

Primary public exports:

-   `DashboardItemsTableComponent`
-   `DashboardItem`
-   `DashboardItemAction`
-   `DashboardOptions`

## Usage Guidelines

-   Use `DashboardItemsTableComponent` for overview pages, feature launchers, or dashboard landing screens.
-   Build item definitions with the exported models so actions, badges, icons, and navigation metadata stay aligned with the component contract.
-   Keep item actions simple and high-signal.
-   Prefer theming and options over local structural overrides.
