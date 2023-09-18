# NgCommonComponents

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Code scaffolding

Run `ng generate component component-name --project ng-common-components` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ng-common-components`.

> Note: Don't forget to add `--project ng-common-components` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build ng-common-components` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ng-common-components`, go to the dist folder `cd dist/ng-common-components` and run `npm publish`.

## Running unit tests

Run `ng test ng-common-components` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Optional dependencies

    "@js-joda/core": "^5.5.3",
    "@js-joda/extra": "^0.11.3",
    "@js-joda/locale": "^4.8.10",
    "@js-joda/timezone": "^2.18.0",
    "@types/luxon": "^3.3.2",
    "date-fns": "^2.30.0",
    "luxon": "^3.4.3"

## Library contents

### enum

#### Severity

An enum that indicates the severity of a message

#### Expandable card

A card with a colored top-bar. The card can be expanded and collapsed which can optionally be disabled.

#### Message bar

A card that can show a message of a specific severity. It is colored depending on the secerity.

#### Search filter

A component to show search filters in a card with a search button and a reset-form button.

#### Table

A component to render search result in a grid. All columns can be configured to render correctly.
