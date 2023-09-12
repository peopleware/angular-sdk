# NgWireframe

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Code scaffolding

Run `ng generate component component-name --project ng-wireframe` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ng-wireframe`.

> Note: Don't forget to add `--project ng-wireframe` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build ng-wireframe` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ng-wireframe`, go to the dist folder `cd dist/ng-wireframe` and run `npm publish`.

## Running unit tests

Run `ng test ng-wireframe` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Usage

### Wireframe

The wireframe places an application layout with responsible left navigation and a toolbar on your web page.

#### Colors

The background color of the drawer can be configured by adding:

    .mat-drawer.drawer-color {
        --ppw-sidenav-background-color: #18428c;
    }

to the styles.scss of your application.

The icon color of the navigation items can be set adding:

    .navigation-item {
        i.ppw-navigation-icon {
            --ppw-sidenav-icon-color: #6eb343;
        }
    }

#### Content

Content can be added in 3 places:

-   The right side of the toolbar: `ppw-toolbar-content`
-   Above the navigation menu items: `ppw-sidebar-top-content`
-   At the bottom of the drawer: `ppw-sidebar-bottom-content`

Complete example:

    <ppw-wireframe [navigationItems]="getNavigationItems()" [sidebarOptions]="sidebarOptions">
        <ng-container ppw-toolbar-content><mat-icon>person</mat-icon></ng-container>
        <ng-container ppw-sidebar-top-content></ng-container>
        <ng-container ppw-sidebar-bottom-content><div class="version-info"><div>v0.0.2</div></div></ng-container>
    </ppw-wireframe>

#### Logo

A logo can be added to the sidebar using the `sidebarOptions`.

#### Navigation items

Navigation links can be added using `navigationItems`.
