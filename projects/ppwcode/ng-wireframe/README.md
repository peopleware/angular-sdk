# NgWireframe

This library provides a wireframe for Angular applications.

## Usage

### Theming

The following CSS variables are available for theming. Just add them to the `body` selector.

#### ppw-left-sidenav

| Variable name                                                  | Extra info                                                                                                    |
|----------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| `--ppw-sidenav-close-button-color`                             |                                                                                                               |
| `--ppw-sidenav-navigation-item-child-margin`                   | The default margin to apply to children have a collapsible navigation item.                                   |
| `--ppw-sidenav-navigation-item-hover-background-color`         |                                                                                                               |
| `--ppw-sidenav-navigation-item-icon-color`                     |                                                                                                               |
| `--ppw-sidenav-navigation-item-icon-font-size`                 |                                                                                                               |
| `--ppw-sidenav-navigation-item-margin-left`                    | The default margin of a navigation item. The greater the margin, the more space between two navigation items. |
| `--ppw-sidenav-navigation-item-radius`                         | The border radius applied to the navigation items, visible on hover.                                          |
| `--ppw-sidenav-navigation-item-text-color`                     |                                                                                                               |
| `--ppw-sidenav-navigation-item-text-font-size`                 |                                                                                                               |
| `--ppw-sidenav-navigation-item-text-font-weight`               |                                                                                                               |
| `--ppw-sidenav-navigation-item-children-wrapper-background`    |                                                                                                               |
| `--ppw-sidenav-navigation-item-children-wrapper-border`        |                                                                                                               |
| `--ppw-sidenav-navigation-item-children-wrapper-border-radius` |                                                                                                               |
| `--ppw-sidenav-navigation-item-children-wrapper-margin`        |                                                                                                               |
| `--ppw-sidenav-navigation-item-children-wrapper-padding`       |                                                                                                               |

#### ppw-toolbar

| Variable name                           | Extra info |
|-----------------------------------------|------------|
| `--ppw-toolbar-border-bottom`           |            |
| `--ppw-toolbar-box-shadow`              |            |
| `--ppw-toolbar-button-background`       |            |
| `--ppw-toolbar-button-hover-background` |            |
| `--ppw-toolbar-button-hover-text-color` |            |
| `--ppw-toolbar-button-padding`          |            |
| `--ppw-toolbar-page-title-font-size`    |            |
| `--ppw-toolbar-page-title-padding`      |            |
| `--ppw-toolbar-page-title-text-color`   |            |

#### ppw-wireframe

| Variable name                       | Extra info |
|-------------------------------------|------------|
| `--ppw-app-wireframe-drawer-width`  |            |
| `--ppw-app-wireframe-drawer-border` |            |
| `--ppw-page-container-background`   |            |
| `--ppw-sidenav-background-color`    |            |

### Wireframe

The wireframe places an application layout with responsive left navigation and a toolbar on your web page.
You can hide the wireframe by adding a flag in the route configuration - In data add the `'showWireframe: false'` flag - If this flag is not added it will by default be true and show the wireframe

#### Content

Content can be added in 3 places:

-   The left side of the toolbar: `ppw-toolbar-left-content`
-   The right side of the toolbar: `ppw-toolbar-right-content`
-   Above the navigation menu items: `ppw-sidebar-top-content`
-   At the bottom of the drawer: `ppw-sidebar-bottom-content`

Complete example:

    <ppw-wireframe [navigationItems]="getNavigationItems()" [sidebarOptions]="sidebarOptions">
        <ng-container ppw-toolbar-right-content><mat-icon>person</mat-icon></ng-container>
        <ng-container ppw-sidebar-top-content></ng-container>
        <ng-container ppw-sidebar-bottom-content><div class="version-info"><div>v0.0.2</div></div></ng-container>
    </ppw-wireframe>

#### Logo

A logo can be added to the sidebar using the `sidebarOptions`.

#### Navigation items

Navigation links can be added using `navigationItems`.
