# form changes detection

## What It Is For

Use the exported form change-detection helpers when a feature needs to know whether a form has meaningfully changed.

## Usage Guidelines

-   Use these helpers for unsaved-changes guards, reset or dirty confirmation flows, and edit screens that compare current and initial values.
-   Prefer the shared helper over handwritten recursive comparison logic in each feature.
-   Keep comparison rules consistent within the feature.
