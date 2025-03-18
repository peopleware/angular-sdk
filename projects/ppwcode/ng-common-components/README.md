# NgCommonComponents

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

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

## Usage

### Theming

The following CSS variables are available for theming. Just add them to the `body` selector.

#### ppw-expandable-card

| Variable name                                   | Extra info       |
| ----------------------------------------------- | ---------------- |
| `--ppw-expandable-card-header-background-color` |                  |
| `--ppw-expandable-card-header-indicator-color`  |                  |
| `--ppw-expandable-card-header-text-color`       |                  |
| `--ppw-expandable-card-header-height-collapsed` | Defaults to 32px |
| `--ppw-expandable-card-header-height-expanded`  | Defaults to 32px |

#### ppw-message-bar

| Variable name                                | Extra info                                                  |
| -------------------------------------------- | ----------------------------------------------------------- |
| `--ppw-message-bar-error-background-color`   |                                                             |
| `--ppw-message-bar-error-text-color`         |                                                             |
| `--ppw-message-bar-info-background-color`    |                                                             |
| `--ppw-message-bar-info-text-color`          |                                                             |
| `--ppw-message-bar-margin`                   | Adds extra margin to the outer section of the message bar.  |
| `--ppw-message-bar-spacing`                  | Adds extra spacing to the inner section of the message bar. |
| `--ppw-message-bar-success-background-color` |                                                             |
| `--ppw-message-bar-success-text-color`       |                                                             |
| `--ppw-message-bar-warning-background-color` |                                                             |
| `--ppw-message-bar-warning-text-color`       |                                                             |

#### ppw-table

| Variable name                                       | Extra info                                                                  |
| --------------------------------------------------- | --------------------------------------------------------------------------- |
| `--ppw-table-height`                                |                                                                             |
| `--ppw-table-row-highlight-background-color`        |                                                                             |
| `--ppw-table-row-highlight-sticky-background-color` | This can't be a transparent color since this would show overlapping content |
