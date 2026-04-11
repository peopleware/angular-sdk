---
name: ppwcode-angular-sdk
description: Use when working with the ppwcode Angular SDK packages in an Angular workspace and the agent needs package-specific APIs, patterns, or component guidance. Don't use for generic Angular advice that does not depend on the SDK or for imports from internal src/lib paths.
---

# PPWCode Angular SDK

## Workflow

1. Identify whether the request depends on a PPWCode package. Skip this skill when the task is plain Angular work with no SDK-specific API, pattern, or component.
2. Match the request to the package entrypoint. Import only from public entrypoints such as `@ppwcode/ng-async` or `@ppwcode/ng-router`, never from `src/lib/...`.
3. Read only the focused reference that matches the requested component, helper, or pattern. Treat anything not exported from `public-api.ts` as internal implementation detail.
4. Prefer the SDK abstraction over app-local reinvention. Reuse exported standalone components, provider helpers, typed utilities, and test helpers before suggesting custom alternatives.
5. Validate the final answer or code against the package rules in this skill. Call out deprecated APIs, internal imports, or patterns that bypass the SDK.

## Package Routing

Use the package entrypoint below to choose the smallest relevant reference file.

### `@ppwcode/ng-async`

Use for HTTP result state, async-result rendering, paged results, and download helpers.

-   `AsyncResultComponent`: read `references/ng-async-async-result-component.md`
-   `AsyncResult helpers`: read `references/ng-async-async-result-helpers.md`
-   `HTTP error operators`: read `references/ng-async-http-error-operators.md`
-   `Paged results and downloads`: read `references/ng-async-paged-results-and-downloads.md`

### `@ppwcode/ng-common`

Use for shared Angular infrastructure such as global error handling, logging, storage wrappers, mixins, pipes, and small RxJS helpers.

-   `Global error handling`: read `references/ng-common-global-error-handling.md`
-   `Logging`: read `references/ng-common-logging.md`
-   `Mixins`: read `references/ng-common-mixins.md`
-   `Pipes and RxJS helpers`: read `references/ng-common-pipes-and-rxjs.md`
-   `Storage and utilities`: read `references/ng-common-storage-and-utilities.md`

### `@ppwcode/ng-common-components`

Use for reusable UI building blocks and package-level theming.

-   `MessageBarComponent`: read `references/ng-common-components-message-bar-component.md`
-   `ExpandableCardComponent`: read `references/ng-common-components-expandable-card-component.md`
-   `SearchFilterComponent`: read `references/ng-common-components-search-filter-component.md`
-   `LoaderComponent`: read `references/ng-common-components-loader-component.md`
-   `TableComponent`: read `references/ng-common-components-table-component.md`
-   `Table API`: read `references/ng-common-components-table-api.md`
-   `FormTableComponent`: read `references/ng-common-components-form-table-component.md`
-   `DashboardItemsTableComponent`: read `references/ng-common-components-dashboard-items-table-component.md`
-   `Dashboard items API`: read `references/ng-common-components-dashboard-items-api.md`
-   `Severity`: read `references/ng-common-components-severity.md`
-   `Theming`: read `references/ng-common-components-theming.md`

### `@ppwcode/ng-dialogs`

Use for standard modal confirmation UX and draggable Material dialogs.

-   `ConfirmationDialogComponent`: read `references/ng-dialogs-confirmation-dialog.md`
-   `DraggableDialogDirective`: read `references/ng-dialogs-draggable-dialog-directive.md`

### `@ppwcode/ng-forms`

Use for typed reactive-form helpers, form controls, validation utilities, and change-detection helpers.

-   `Control generators`: read `references/ng-forms-control-generators.md`
-   `ControlsOf`: read `references/ng-forms-controls-of.md`
-   `ValidationService`: read `references/ng-forms-validation-service.md`
-   `Form change detection`: read `references/ng-forms-form-changes-detection.md`
-   `DisablePasswordFillDirective`: read `references/ng-forms-disable-password-fill-directive.md`

### `@ppwcode/ng-router`

Use for route param helpers, relative navigation, breadcrumb infrastructure, route maps, and pagination-related routing state.

-   `Modern route inputs`: prefer Angular router input binding for new code; use observable helpers only when integrating with existing observable-based code.
-   `Relative navigation`: read `references/ng-router-relative-navigation.md`
-   `Breadcrumbs`: read `references/ng-router-breadcrumbs.md`
-   `Route map`: read `references/ng-router-route-map.md`
-   `Route parameter helpers`: read `references/ng-router-route-parameter-helpers.md`
-   `Pagination`: read `references/ng-router-pagination.md`
-   `NavigationService`: read `references/ng-router-navigation-service.md`
-   `Translated page title strategy`: read `references/ng-router-translated-page-title-strategy.md`

### `@ppwcode/ng-sdk`

Use only as an Angular schematic entrypoint for `ng add`, not as a runtime or library import.

-   `Schematics`: read `references/ng-sdk-schematics.md`
-   `Runtime imports`: reject TypeScript runtime imports from this package because the public API surface is intentionally empty.

### `@ppwcode/ng-state-management`

Use for lightweight local state built on Angular signals.

-   `SignalStore`: read `references/ng-state-management-signal-store.md`
-   `AbstractSearchFilterState`: read `references/ng-state-management-abstract-search-filter-state.md`

### `@ppwcode/ng-unit-testing`

Use for Angular test helpers around HTTP calls and `ActivatedRoute`.

-   `HttpCallTester`: read `references/ng-unit-testing-http-call-tester.md`
-   `HTTP testing helpers`: read `references/ng-unit-testing-http-testing-helpers.md`
-   `ActivatedRoute helpers`: read `references/ng-unit-testing-activated-route-helpers.md`

### `@ppwcode/ng-utils`

Use for small reusable assertion predicates and guard-style helpers.

-   `Assertions`: read `references/ng-utils-assertions.md`
-   `Conditional assertions`: read `references/ng-utils-conditional-assertions.md`

### `@ppwcode/ng-wireframe`

Use for app-shell layout, left navigation, toolbar composition, and pagination bar UI.

-   `WireframeComponent`: read `references/ng-wireframe-wireframe-component.md`
-   `Navigation models`: read `references/ng-wireframe-navigation-models.md`
-   `ToolbarComponent`: read `references/ng-wireframe-toolbar-component.md`
-   `LeftSidenavComponent`: read `references/ng-wireframe-left-sidenav-component.md`
-   `PaginationBarComponent`: read `references/ng-wireframe-pagination-bar-component.md`

## Error Handling

-   If the matching package or export cannot be identified, inspect the package `public-api.ts` before proposing code.
-   If the request depends on an internal symbol or `src/lib/...` import, replace it with a public entrypoint alternative or explain that no public API exists.
-   If multiple references could apply, read only the narrowest one first and expand to a second reference only when the first does not answer the request.
