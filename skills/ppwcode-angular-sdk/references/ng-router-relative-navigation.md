# `getRelativeNavigator`

## When To Use

Use `getRelativeNavigator` when feature code needs a reusable function that navigates relative to the current activated route.

## Usage Guidelines

-   Use it in components or services where passing `relativeTo` repeatedly would add noise.
-   Keep navigation commands close to route-map definitions when both are used together.
-   Use it for feature-local navigation, not as a replacement for all routing abstractions in the app.
