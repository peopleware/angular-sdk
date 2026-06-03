---
name: ppw-angular-sdk-releaser
description: Use when preparing a PPWCode Angular SDK release version bump by updating library package versions, internal PPWCode dependency ranges, the ng-add PPWCode version constant, the demo version display, formatting, linting, and committing the bump. Don't use for npm publishing, GitHub releases, tagging, changelog generation, or generic SDK API guidance.
---

# PPWCode Angular SDK Releaser

## Workflow

1. Extract the target version from the user's request.
2. If no target version was provided, ask the user for the new version number before continuing.
3. Run `node .agents/skills/ppw-angular-sdk-releaser/scripts/bump-version.js <version>`.
4. If the script exits with a non-zero status because the target version is lower than the current library version, stop the workflow and notify the user that the version number is wrong.
5. Run `npm run format:lint`.
6. Run `npm run format:prettier`.
7. Inspect `git status --short` and confirm that only the intended release bump files changed.
8. Commit the release bump with `git commit -am "Bump version to <version>"`.

## Release Bump Script

Use `scripts/bump-version.js` for deterministic version updates. The script updates:

-   `version` fields in `projects/ppwcode/*/package.json`.
-   Internal `@ppwcode/*` dependency ranges in those package files to `^<version>`.
-   `versions.ppwcode` in `projects/ppwcode/ng-sdk/schematics/ng-add/dependencies/versions.ts`.
-   The displayed `v<version>` in `src/app/app.component.html` inside the `.version-info` block.

## Error Handling

-   If the user did not provide a version, ask for a SemVer-style version such as `21.5.1`.
-   If `scripts/bump-version.js` reports an invalid or lower version, stop without formatting or committing.
-   If formatting or linting fails, stop and report the failing command.
-   If unrelated changes are present before committing, do not include them; ask the user how to proceed if the release bump cannot be committed cleanly.
-   If the commit fails, report the Git error and leave the changed files in place.
