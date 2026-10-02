![license badge](https://badgen.net/badge/license/apache%202.0/blue)
![Latest version on npmjs](https://badge.fury.io/js/%40ppwcode%2Fng-async.svg)
![NPM Downloads](https://img.shields.io/npm/dm/ng-async)
![GitHub Repo stars](https://img.shields.io/github/stars/peopleware/angular-sdk)

[![Build & Test](https://github.com/peopleware/angular-sdk/actions/workflows/ci.yaml/badge.svg)](https://github.com/peopleware/angular-sdk/actions/workflows/ci.yaml)
[![Publish New Release to NPM](https://github.com/peopleware/angular-sdk/actions/workflows/publish-npmjs.yaml/badge.svg)](https://github.com/peopleware/angular-sdk/actions/workflows/publish-npmjs.yaml)

# Ppwcode/angular-sdk

## Install the AI Skill

Developers can install the `ppwcode-angular-sdk` skill from this repository with:

```bash
npx skills add https://github.com/peopleware/angular-sdk
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.
The src folder contains a demo project to showcase the components offered in the various projects.

# Demo project

[peopleware.github.io/angular-sdk](https://peopleware.github.io/angular-sdk/)

# Documentation

Documentation is available on a per-project basis.

## Package documentation

-   ng-async: https://github.com/peopleware/angular-sdk/tree/master/projects/ppwcode/ng-async
-   ng-common-components: https://github.com/peopleware/angular-sdk/tree/master/projects/ppwcode/ng-common-components
-   ng-common: https://github.com/peopleware/angular-sdk/tree/master/projects/ppwcode/ng-common
-   ng-dialogs: https://github.com/peopleware/angular-sdk/tree/master/projects/ppwcode/ng-dialogs
-   ng-forms: https://github.com/peopleware/angular-sdk/tree/master/projects/ppwcode/ng-forms
-   ng-router: https://github.com/peopleware/angular-sdk/tree/master/projects/ppwcode/ng-router
-   ng-router: https://github.com/peopleware/angular-sdk/tree/master/projects/ppwcode/ng-router
-   ng-sdk: https://github.com/peopleware/angular-sdk/tree/master/projects/ppwcode/ng-sdk
-   ng-state-management: https://github.com/peopleware/angular-sdk/tree/master/projects/ppwcode/ng-state-management
-   ng-unit-testing: https://github.com/peopleware/angular-sdk/tree/master/projects/ppwcode/ng-unit-testing
-   ng-utils: https://github.com/peopleware/angular-sdk/tree/master/projects/ppwcode/ng-utils
-   ng-wireframe: https://github.com/peopleware/angular-sdk/tree/master/projects/ppwcode/ng-wireframe
-

## Changelog generation

[CHANGELOG.md](CHANGELOG.md) is generated from local Git history using
[git-cliff](https://git-cliff.org/), pinned as a development dependency. Install dependencies with `npm ci`, then run:

```sh
npm run changelog:preview
npm run changelog
```

The first command prints unreleased changes; the second regenerates and formats the complete changelog.
Generation does not bump package versions, create commits or tags, or publish packages.
Use a clone with full history and all release tags (in GitHub Actions, configure checkout with `fetch-depth: 0`).

Write commit subjects as `feat(common-components): add notifications` or `fix(ng-forms): export change detection`.
Use `!` after the type/scope, or a `BREAKING CHANGE:` footer, for incompatible changes. Include migration instructions
in that footer; the changelog prints them beneath the entry. When squash merging, use this format in the final squash
commit message. A normal merge can retain both a feature commit and a similarly worded merge title as separate entries.

The policy lives in [cliff.toml](cliff.toml):

-   One SDK-wide changelog, split by existing stable tags such as `22.4.0`, with an Unreleased section for newer commits.
-   Sections for breaking changes, features, fixes, performance, reverts, and refactoring.
-   Dependency updates (`chore`/`build` with a `dependencies` or `deps` scope), documentation, other maintenance, and release
    bookkeeping are omitted; explicitly marked breaking changes take precedence over these exclusions.
-   Legacy free-form messages appear under Other changes. The generator cannot infer their type or whether they break APIs.

For release preparation, preview the next version without creating a Git tag (replace the example version as needed):

```sh
npm run changelog:preview -- --tag 22.5.0
```

To write that version into the complete changelog before the actual release tag exists:

```sh
npm exec -- git-cliff --config cliff.toml --tag 22.5.0 --output CHANGELOG.md
npm run format:prettier
npm run format:lint
```

Review the generated changes alongside the SDK version updates. Once the release commit is tagged, ordinary regeneration
uses that tag as the release boundary. Regeneration overwrites manual changelog edits. This demo does not add a CI release
workflow or enforce commit formatting.
