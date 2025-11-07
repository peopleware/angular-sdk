# NgRouter

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Code scaffolding

Run `ng generate component component-name --project ng-router` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ng-router`.

> Note: Don't forget to add `--project ng-router` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build ng-router` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ng-router`, go to the dist folder `cd dist/ng-router` and run `npm publish`.

## Running unit tests

Run `ng test ng-router` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Library contents

### Services

#### BreadcrumbService

A service that can be used to get the current location in the application.
This service can be configured using the `provideBreadcrumbOptions` function.
The following options can be passed to this function:

| Option name                | Extra info        |
| -------------------------- | ----------------- |
| `preferLabelFromRouteData` | Defaults to false |
| `enableAnimations`         | Defaults to true  |

##### preferLabelFromRouteData

When `false`, the label of the breadcrumb will be taken from the `title` property of the route.

When `true`, the label of the breadcrumb will be taken from the `data[DATA_BREADCRUMB]` property of the route.
Example:

```
    {
        path: getRouteSegment(ROUTE_MAP.home),
        loadComponent: () =>
            import('./feature/home-page.component').then((it) => it.default),
        data: { [DATA_BREADCRUMB]: 'navigation.home' }
    }
```

When custom data should be shown in the breadcrumb, the `data[DATA_DETAIL_TITLE]` property can be used with a resolver function that returns the string you want to show.
Example:

```
function getDetailTitle() {
    return (route: ActivatedRouteSnapshot) => {
        const personsFacade = inject(PersonsFacade)
        const personId: string = route.paramMap.get('id')!

        return personsFacade.get(personId).pipe(
            first(),
            map((result: AsyncResult<Person | null | undefined>) =>
                result.status === 'success' && result.entity
                    ? `${result.entity!.fullName}`
                    : null
            )
        )
    }
}

export const PERSON_ROUTES: Routes = [
    {
        path: getRouteSegment(ROUTE_MAP.person.detail),
        component: PersonDetailContainerComponent,
        resolve: {
            [DATA_DETAIL_TITLE]: getDetailTitle()
        }
    }
]
```

##### enableAnimations

Set to true to enable animations.
