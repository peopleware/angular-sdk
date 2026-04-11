# `WireframeComponent`

## When To Use

Use `WireframeComponent` as the default application shell when a page should live inside the SDK’s responsive layout.

## How To Use It Well

-   Pass navigation items through `NavigationItem[]`.
-   Configure shell behavior through `SidebarOptions`.
-   Use the content projection slots for toolbar and sidebar customization before considering a local fork.
-   Use route data `showWireframe: false` for pages that should bypass the shell.
-   Pair it with `BreadcrumbComponent` when hierarchical navigation matters.
