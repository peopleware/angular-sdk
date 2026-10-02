---
name: ppw-angular-sdk-releaser
description: Use when preparing a PPWCode Angular SDK release by updating library versions and internal dependency ranges, generating CHANGELOG.md from Git history, formatting, linting, and committing the release changes. Don't use for npm publishing, GitHub releases, tagging, standalone changelog configuration, or generic SDK API guidance.
---

# PPWCode Angular SDK Releaser

## Workflow

1. Extract the target version from the user's request.
2. If no target version was provided, ask the user for the new version number before continuing.
3. Inspect `git status --short` to identify existing changes. Generate release notes from a clone with full Git history and release tags; install the locked development dependencies if git-cliff is unavailable.
4. Run `node .agents/skills/ppw-angular-sdk-releaser/scripts/bump-version.js <version>`. If it fails, stop and report the error.
5. Run `npm exec -- git-cliff --config cliff.toml --tag <version> --output CHANGELOG.md` from the repository root.
6. Run `npm run format:lint`.
7. Run `npm run format:prettier`.
8. Inspect the release diff, including `CHANGELOG.md`, and confirm that its newest release section uses the target version and the expected previous release boundary.
9. Stage only the intended version bump files and `CHANGELOG.md` with explicit paths, including the changelog if it is newly created. Review `git diff --cached` and commit with `git commit -m "Bump version to <version>"`.

## Release Changelog

Use the repository's pinned git-cliff and `cliff.toml` policy. The `--tag <version>` option labels the pending release in the generated file without creating a Git tag. Use the target version without a `v` prefix, matching the existing release tags. Generate the complete changelog rather than prepending entries, so rerunning release preparation does not duplicate a release section.

Dependency and documentation entries are omitted by the configuration, except for explicitly marked breaking changes. Preserve this policy and the handling of legacy commit messages; do not edit generated entries manually. If all pending commits are excluded, git-cliff may omit the empty release section; verify this against the pending commits rather than inventing an entry.

The ordinary `npm run changelog` command has no pending release version and can replace the prepared release heading with Unreleased before the actual tag exists. During release preparation, use the versioned command in step 5. Publishing and creating the actual Git tag remain outside this skill.

## Release Bump Script

Use `scripts/bump-version.js` for deterministic version updates. The script updates:

-   `version` fields in release-managed `projects/ppwcode/*/package.json` files.
-   Internal `@ppwcode/*` dependency ranges in release-managed package files to `^<version>`.
-   `versions.ppwcode` in `projects/ppwcode/ng-sdk/schematics/ng-add/dependencies/versions.ts`.
-   The displayed `v<version>` in `src/app/app.component.html` inside the `.version-info` block.

Packages whose current version is `0.x.x` are ignored. They are pre-release packages and are released manually, so their package versions, dependency ranges, and consistency do not participate in the SDK release bump.

## Error Handling

-   If the user did not provide a version, ask for a SemVer-style version such as `21.5.1`.
-   If `scripts/bump-version.js` reports an invalid or lower version, stop without formatting or committing.
-   If release-managed library package versions are inconsistent, stop and report the versions found. `0.x.x` packages do not count toward this consistency check.
-   If changelog generation, formatting, or linting fails, stop before committing and report the failing command.
-   If unrelated changes are present before committing, do not include them; ask the user how to proceed if the release bump cannot be committed cleanly.
-   If the commit fails, report the Git error and leave the changed files in place.
