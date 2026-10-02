# Changelog

## 22.4.0 - 2026-09-01

[Compare changes](https://github.com/peopleware/angular-sdk/compare/22.3.0...22.4.0)

### Features

-   **resource:** Add PpwResourceExecution.toPromise ([2829632](https://github.com/peopleware/angular-sdk/commit/282963215fb6c4199bf953239af365c3b89ed0bb))

-   **resource:** Add PpwResourceExecution.toPromise (#152) ([9f83191](https://github.com/peopleware/angular-sdk/commit/9f831914903d55c4f90bb2add960726ee57611aa))

-   Feat(ng-async) Upgrade the @ngx-translate/core peer dependency supported versions ([4a13029](https://github.com/peopleware/angular-sdk/commit/4a13029411501365e36705c2436c4feceb9e0347))

## 22.3.0 - 2026-08-20

[Compare changes](https://github.com/peopleware/angular-sdk/compare/22.2.1...22.3.0)

### Features

-   **ng-forms:** Add ppw-field-errors for easy displaying of the first error message ([f79d7a8](https://github.com/peopleware/angular-sdk/commit/f79d7a808ebdc7f5754aed56c212388b26277387))

-   **common-components:** Add notifications as an Angular 22 compatible alternative for ngx-toastr (#149) ([458db8b](https://github.com/peopleware/angular-sdk/commit/458db8b6b25dc8fe9532dcf5c4f4f64ed90d714f))

### Other changes

-   Change ng-forms prefix to ppw ([0491456](https://github.com/peopleware/angular-sdk/commit/0491456c42cc70be6e2b3be6adf4b925906d655d))

-   Add ppw-field-errors component with translator provider ([a65e6ac](https://github.com/peopleware/angular-sdk/commit/a65e6ac5ea745b8647d732f2c14ccd70ecf5b291))

-   Set up design system tokens to be available throughout Storybook ([9d9dcfe](https://github.com/peopleware/angular-sdk/commit/9d9dcfee94a8123575467278d1912b7692656b06))

-   Add notifications ([468b541](https://github.com/peopleware/angular-sdk/commit/468b54199c705051105d158ba6e45b3c7f66a138))

-   Add design system as dependency to common-components ([bac7f16](https://github.com/peopleware/angular-sdk/commit/bac7f16fcf42a8a191b8da459ad1d2665764b73c))

-   Update publish action to build and deploy storybook instead of demo application ([6d74f24](https://github.com/peopleware/angular-sdk/commit/6d74f240c87811d4984bbbacb4fe54f1090b11cc))

-   Update GitHub Actions to use latest action versions to resolve NodeJS deprecation warnings ([4635dff](https://github.com/peopleware/angular-sdk/commit/4635dff49c866c1f4b8c61d46de4712eda21ed9b))

## 22.2.1 - 2026-08-12

[Compare changes](https://github.com/peopleware/angular-sdk/compare/22.2.0...22.2.1)

### Features

-   **ppw-ds:** Extend design system with generated color tokens and spacing semantic tokens (#147) ([e24de06](https://github.com/peopleware/angular-sdk/commit/e24de0670ca88b63e6cb25c9b49e1079733ab087))

### Fixes

-   **ng-forms:** Add signal-form-change-detection to public API ([b586e4d](https://github.com/peopleware/angular-sdk/commit/b586e4d3bd9d53120b29ac01f28182670266dc2c))

### Other changes

-   Extend spacing with semantic and layout tokens ([944c59c](https://github.com/peopleware/angular-sdk/commit/944c59c35f60dfd1d149c5129b8470f0dce0b2dc))

-   Add colors to design system ([4764a27](https://github.com/peopleware/angular-sdk/commit/4764a27885fcab5eab90bb9a434ff4d8273ade8e))

## 22.2.0 - 2026-08-11

[Compare changes](https://github.com/peopleware/angular-sdk/compare/22.1.1...22.2.0)

### Features

-   **forms:** Add `detectFormChanges` utility for signal-based form change tracking ([5c89344](https://github.com/peopleware/angular-sdk/commit/5c89344fd0a1e086ed1b901fb12707fd8ca27da9))

-   **unit-testing:** Add utility functions and helpers for forms, templates, outputs, data access, and translations ([4a47911](https://github.com/peopleware/angular-sdk/commit/4a479118f954e5eee808c20efeb5fa7a184f87d7))

### Other changes

-   Generate @ppwcode/ng-resource package ([aa16e5e](https://github.com/peopleware/angular-sdk/commit/aa16e5e1d0d75fcbbf3f58306e8c9773a9afd952))

-   Build @ppwcode/ng-resource as a part of the GitHub action ([66f1fc7](https://github.com/peopleware/angular-sdk/commit/66f1fc76bab1742a73ca18f9409fa66c12ddba83))

-   Test @ppwcode/ng-resource as a part of the GitHub action ([f4fa408](https://github.com/peopleware/angular-sdk/commit/f4fa40851f5f2ed07a23b45a57c622d64c91c4d7))

-   Add support for advanced resource execution in @ppwcode/ng-resource ([1688423](https://github.com/peopleware/angular-sdk/commit/1688423cc6b90b6cc941a533f4792407e5f79c42))

-   Add unit testing utilities for mocking facade and resource behavior in @ppwcode/ng-unit-testing ([41282f1](https://github.com/peopleware/angular-sdk/commit/41282f169945924c7700ddf6589329843c035b11))

## 22.1.1 - 2026-08-06

[Compare changes](https://github.com/peopleware/angular-sdk/compare/22.1.0...22.1.1)

### Fixes

-   **dialogs:** Make confirmation dialog data body and title params less strict on the requirement of it being an object ([1ebf143](https://github.com/peopleware/angular-sdk/commit/1ebf143e3d818cf78e1bbaeee113261137c60ebd))

### Other changes

-   Add ng-e2e-testing to build-libs.sh ([c880d7e](https://github.com/peopleware/angular-sdk/commit/c880d7e79fa3818d019ef9f2eb94952f00df0151))

-   Update @playwright/test to 1.62.1 to fix build of ng-e2e-testing ([8f2565b](https://github.com/peopleware/angular-sdk/commit/8f2565b47b9ec71218b3f6b9c634cd8e9b4f5c42))

-   Update Angular to 22.0.2 to fix production vulnerability warning ([0a52892](https://github.com/peopleware/angular-sdk/commit/0a52892eff7f80819bf214065a1f8457f2a578d6))

## 22.1.0 - 2026-08-03

[Compare changes](https://github.com/peopleware/angular-sdk/compare/22.0.0...22.1.0)

### Features

-   **ppw-ds:** Introduce first minimal version of a design system with shapes and spacing ([125fcb0](https://github.com/peopleware/angular-sdk/commit/125fcb0cb00486c427482d176ade65a05c37c581))

### Fixes

-   **ng-dialogs:** Allow setting the draggable dialog root element selector ([33cd4eb](https://github.com/peopleware/angular-sdk/commit/33cd4ebde8919df3639e06de0e26dfe3ef84b67d))

### Other changes

-   Add typing to bodyParams and titleParams ([af1af75](https://github.com/peopleware/angular-sdk/commit/af1af750905988a411278e0f7c5224720006a779))

-   Add Storybook to the project ([5ce1e81](https://github.com/peopleware/angular-sdk/commit/5ce1e810008debbd535e312f9dfbdb29b5989b63))

-   Add stories for the ng-wireframe components ([9d09f5f](https://github.com/peopleware/angular-sdk/commit/9d09f5f7a3b08393527bf99d2e6e541446d485cb))

-   Add stories for the ng-router components ([28a1429](https://github.com/peopleware/angular-sdk/commit/28a1429e3a87324f6c9c926b782d07db10dcd3e9))

-   Add stories for the ng-dialogs components ([faf58c6](https://github.com/peopleware/angular-sdk/commit/faf58c686e0ab75bceeafc7811409ea04fdfd1c5))

-   Add stories for the ng-common-components components ([2267dd2](https://github.com/peopleware/angular-sdk/commit/2267dd2e0c232acd681ad60f10a171d145c0996a))

-   Add stories for the ng-async components ([20b2eb5](https://github.com/peopleware/angular-sdk/commit/20b2eb5583f60ace8472176b4443ebf89db14f73))

-   Add Storybook skill ([e2b774c](https://github.com/peopleware/angular-sdk/commit/e2b774c29213f48088494d0d7396233b022f9662))

-   Generate @ppwcode/ng-ppw-ds ([10deb76](https://github.com/peopleware/angular-sdk/commit/10deb7692e801fe46d76d1ecbf99cac1da1426d1))

-   Build @ppwcode/ng-ppw-ds as a part of the GitHub action ([8d25bf8](https://github.com/peopleware/angular-sdk/commit/8d25bf8e395b86f868d5995aa34d040dc5b89248))

-   Remove unused get-libs.sh script ([9989c27](https://github.com/peopleware/angular-sdk/commit/9989c27e795c2d23e63689ee942e3f43c6ece2f9))

-   Add shapes ([08ba0cf](https://github.com/peopleware/angular-sdk/commit/08ba0cfd5d05af318d3f36d426fe458c6e0d32c7))

-   Access ppw-ds from demo application ([88c9af2](https://github.com/peopleware/angular-sdk/commit/88c9af221dfed8009f24d9597fa2cfbbe2339dd2))

-   Add spacings ([d972cea](https://github.com/peopleware/angular-sdk/commit/d972ceadef74b25eb77d17d40ee8edf3575f8264))

-   Include ppw-ds stylesheet in build assets of project ([e7f6f5d](https://github.com/peopleware/angular-sdk/commit/e7f6f5d669ff0287ee012f20308be0824e670231))

-   Document ng-ppw-ds in main storybook configuration ([7188de9](https://github.com/peopleware/angular-sdk/commit/7188de962ab8020aee42923b063b8d3a4f0abbef))

-   Make the cdkDrag rootelementselector for draggable-dialog configurable ([522bb5c](https://github.com/peopleware/angular-sdk/commit/522bb5c38c45d271a9735b8a6e1242a7b89c7d2c))

-   Integrate `axe-core` for accessibility testing and export reusable utilities for a11y checks ([ca15e3d](https://github.com/peopleware/angular-sdk/commit/ca15e3d8a4fa6058a2ae06129f98674f240b3618))

-   Add unit tests with accessibility checks for the demo components ([2a48416](https://github.com/peopleware/angular-sdk/commit/2a48416851ea0a84f18fb8b674fdddcc98b9b21b))

-   Fix a11y issues by adding aria-labels in the demo components ([38d2c5a](https://github.com/peopleware/angular-sdk/commit/38d2c5acb432a93e60c72983e1dc9b59789b2bda))

-   Translate all aria-labels across components ([3ad114f](https://github.com/peopleware/angular-sdk/commit/3ad114f54999ab2fb86c76848bb728073c41bc98))

-   Refactor spec files to use `verifyA11y` utility for streamlined accessibility testing ([0048783](https://github.com/peopleware/angular-sdk/commit/0048783d0dcd458de2e9511c13db05d6272a0440))

-   Set up `ng-e2e-testing` library with accessibility testing utilities using `axe-core` and Playwright ([5bb3903](https://github.com/peopleware/angular-sdk/commit/5bb3903d67e6e5ea950f79a1b00a654549e956a1))

-   Add end-to-end testing setup with Playwright and accessibility checks ([76cb2b0](https://github.com/peopleware/angular-sdk/commit/76cb2b0e7d9cc66e197209510bafe758085ba23b))

-   Update CI workflow to include Playwright installation and end-to-end tests ([9aa5a6f](https://github.com/peopleware/angular-sdk/commit/9aa5a6f4eb98c7d70d2f55b918c07023a9e07474))

-   Fix a11y issues - update primary color shades and adjust associated CSS variables ([998165a](https://github.com/peopleware/angular-sdk/commit/998165a7b5750e48743d87903b0506fffdd9fe2a))

-   Add support for customizable translation keys in common components ([a3c0283](https://github.com/peopleware/angular-sdk/commit/a3c02838531eb25a104b6be8fbc6b463179b2bbc))

-   Use common components translation key provider in the demo app ([7af53cc](https://github.com/peopleware/angular-sdk/commit/7af53cc2bac61b3490e2a26fbf7cbb2d5ec1e0bf))

-   Refactor providers to one injection token for all common components options ([74e8c96](https://github.com/peopleware/angular-sdk/commit/74e8c9619c8075b877ed1a2c8a62424775409b20))

## 22.0.0 - 2026-06-12

[Compare changes](https://github.com/peopleware/angular-sdk/compare/21.6.0...22.0.0)

### Features

-   **all:** Upgrade to Angular 22 (#139) ([d467726](https://github.com/peopleware/angular-sdk/commit/d467726cba2f01e7e655ae4d3eaf2e00385c24db))

### Other changes

-   [21 -> 22] Update packages using ng update ([dccaf3d](https://github.com/peopleware/angular-sdk/commit/dccaf3d6ef1f7997f619df9829d1e86c85fb41b4))

-   [21 -> 22] Remove deprecated TypeScript 6 baseUrl ([8310bfa](https://github.com/peopleware/angular-sdk/commit/8310bfa47cdd1a1e060354d86ec521824fc6a991))

-   [21 -> 22] Remove $safeNavigationMigration from templates, added by automatic migrations ([26cc875](https://github.com/peopleware/angular-sdk/commit/26cc8755eb1a973a9342919d7f4356fa37c4b979))

-   [21 -> 22] Update .nvmrc and .node-version to use Node 24.16.x ([94b007d](https://github.com/peopleware/angular-sdk/commit/94b007d9f63eb16dc59d4be1e7d73acc9b698488))

-   [21 -> 22] Remove nullishCoalescingNotNullable and optionalChainNotNullable suppressions from tsconfig, automatically added by migration ([00f1849](https://github.com/peopleware/angular-sdk/commit/00f184976aa3bf864af043a86fd5631c5863f4ae))

-   [21 -> 22] Bump Node version used in CI from 22.19 to 24.16 ([aa0f966](https://github.com/peopleware/angular-sdk/commit/aa0f96641ca5bb52a6fb5609f16f0177678e89cd))

-   [21 -> 22] Use angular-eslint flat-config style to fix broken linting execution ([4516d39](https://github.com/peopleware/angular-sdk/commit/4516d39c77d419d04d995659db76c3d2d85a7d26))

-   [21 -> 22] Remove deprecated pageIndex property from PagedEntities ([52c1356](https://github.com/peopleware/angular-sdk/commit/52c135672db5b347a9baac628ee043a25365e14b))

-   [21 -> 22] Bump Angular peer dependency versions in packages ([2552502](https://github.com/peopleware/angular-sdk/commit/25525029a69df0710ff8f30288a8e325138d5b61))

## 21.6.0 - 2026-06-03

[Compare changes](https://github.com/peopleware/angular-sdk/compare/21.5.1...21.6.0)

### Features

-   **wireframe:** Allow sidebar navigation to conditionally be the only scrollable element in the left sidenav ([56e13dc](https://github.com/peopleware/angular-sdk/commit/56e13dce65c0eb77870c156cae1262013e8f78a6))

### Fixes

-   **wireframe:** Replace flex-column in left-sidenav navigation wrapper with actual styles ([be6cd40](https://github.com/peopleware/angular-sdk/commit/be6cd407b459e057606abc249ce81bd589985bf1))

### Other changes

-   Add skill to bump the version ([1b27847](https://github.com/peopleware/angular-sdk/commit/1b2784793b610b6c8b6387743044e89b55471482))

## 21.5.1 - 2026-06-03

[Compare changes](https://github.com/peopleware/angular-sdk/compare/21.5.0...21.5.1)

### Other changes

-   Make sure sidenav items are closeable when a child is active ([de82e7d](https://github.com/peopleware/angular-sdk/commit/de82e7d718e54eeba7968f36214c6deb62c4d807))

-   Add license to package.json files ([7066c62](https://github.com/peopleware/angular-sdk/commit/7066c620d0a30625e65bed269b808497249fc311))

-   Don't rely on possibly unavailable layouting classes in left-sidenav ([c23b0c3](https://github.com/peopleware/angular-sdk/commit/c23b0c3cc7efca9437c7744d0192a43c6c217fa1))

-   Remove obsolete align-items-center from ppw-toolbar ([3b80b38](https://github.com/peopleware/angular-sdk/commit/3b80b3811d38a016cdc33b9f5bb0b926c8ecc474))

## 21.5.0 - 2026-04-24

[Compare changes](https://github.com/peopleware/angular-sdk/compare/21.4.1...21.5.0)

### Features

-   **ng-common:** Add ppwSanitizeHtml pipe (#122) ([ce53537](https://github.com/peopleware/angular-sdk/commit/ce53537a135ad27636d4e265048cb4eb8fa281de))

### Fixes

-   **ng-wireframe:** Make sure the navigation shows the current active route ([bab9667](https://github.com/peopleware/angular-sdk/commit/bab966769918471ee9bc123a1bd7d4b7981c7e72))

### Other changes

-   Add ppwSanitizeHtml pipe ([ae26683](https://github.com/peopleware/angular-sdk/commit/ae26683cbcdb671be62ae060776a22231092db50))

-   Upgrade eslint libraries to a version that is compatible with the typescript version being used ([dc382e9](https://github.com/peopleware/angular-sdk/commit/dc382e9bfeef3ff9032fd932ae53dffd441c2f47))

-   Add missing mat-footer-cell to the expand column in table.component.html and corrected the colspan calculation in table.component.html for the \*matNoDataRow. Also update the unit test. ([2b56c44](https://github.com/peopleware/angular-sdk/commit/2b56c44837631add1eeccb16c4a01da9eb5d047e))

-   Bugfix(ng-common-components) Fix combined usage of table footer row and expandable rows. (#129) ([9ce28f9](https://github.com/peopleware/angular-sdk/commit/9ce28f92549c1be2e5089cf2f77e7123fca84ba6))

-   Add AGENTS.md ([abc87e5](https://github.com/peopleware/angular-sdk/commit/abc87e569c0005d3acf91b4444ef0a50e01a0d58))

-   Add ppwcode-angular-sdk skill ([ff77727](https://github.com/peopleware/angular-sdk/commit/ff77727117b016ff8f60bbb091aada13440e5392))

-   Extend README.md to include instructions on how to add the skill ([63377e4](https://github.com/peopleware/angular-sdk/commit/63377e4b00803e43d53a79a748aef7de10820664))

-   Extend wireframe component to allow hiding the toolbar based on route data ([b5bb89b](https://github.com/peopleware/angular-sdk/commit/b5bb89ba6349fe93a2079edfde11390855106bb0))

-   Showcase route without toolbar in the global error handler page ([7e47578](https://github.com/peopleware/angular-sdk/commit/7e47578f2c3fcb2eb4cbbc01cf26455e29db7482))

-   Add global option to show toolbar ([4a07776](https://github.com/peopleware/angular-sdk/commit/4a077766769095bd90c1814caf9e1028ec513f9d))

-   Make sure the navigation shows the current active route ([3577a8b](https://github.com/peopleware/angular-sdk/commit/3577a8b5b0e44a0ef27b6fa14a2d2426f271f2eb))

## 21.4.1 - 2026-03-19

[Compare changes](https://github.com/peopleware/angular-sdk/compare/21.4.0...21.4.1)

### Features

-   Feat(119) Expose the navigation service in the public api of ng-router ([9c20b23](https://github.com/peopleware/angular-sdk/commit/9c20b23cfebb63616265f6f236aa4e2b2982803c))

## 21.4.0 - 2026-03-19

[Compare changes](https://github.com/peopleware/angular-sdk/compare/21.3.1...21.4.0)

### Features

-   **router:** Add utility functions to open routes in a new browser tab (#120) ([0d1e123](https://github.com/peopleware/angular-sdk/commit/0d1e1232f07b33ba503a136242edef0e6092b2c1))

### Other changes

-   Upgrade Angular to 21.2.5 to fix vulnerabilities ([2b77b20](https://github.com/peopleware/angular-sdk/commit/2b77b20b289d3dceaff28376ae9a3b9f677c1c50))

-   Feature(119) Add global-window injection token to ng-common public API ([faa2238](https://github.com/peopleware/angular-sdk/commit/faa223876a8273350210c2b0fccca980c5d46378))

-   Feature(119) Add NavigationService with methods for URL navigation and testing ([15befe4](https://github.com/peopleware/angular-sdk/commit/15befe428dbfea8dee2055b4d3be325b9ff730f6))

-   File formatting ([fcf5f29](https://github.com/peopleware/angular-sdk/commit/fcf5f2959b6cabe87207a34beaa96de84c5b21c3))

## 21.3.1 - 2026-03-10

[Compare changes](https://github.com/peopleware/angular-sdk/compare/21.3.0...21.3.1)

### Other changes

-   Document practices ([18e05d7](https://github.com/peopleware/angular-sdk/commit/18e05d7ed2649800ff071497a830032c8c2cb26d))

-   Feature(114) Add informational badges to the README file ([a0718b9](https://github.com/peopleware/angular-sdk/commit/a0718b9468ddb3bd9b84e4bbd817fa9d74452513))

-   Feature(114) Add a link to the deployed demo application to the README file ([58c42b7](https://github.com/peopleware/angular-sdk/commit/58c42b7d5622bfb6e51fc873b3aeca5a85b0a65f))

-   Feature(114) Add documentation links to the main README file ([e6d98cd](https://github.com/peopleware/angular-sdk/commit/e6d98cde0f71b30f9f41e20d3aa52bd678f52d1c))

-   Feature(114) Move information about contributing to the project to a CONTRIBUTING.md file ([8b67697](https://github.com/peopleware/angular-sdk/commit/8b67697263f4d49b46cd8581d635239d6836f2bb))

-   Feature/114 (#116) ([a6bf6da](https://github.com/peopleware/angular-sdk/commit/a6bf6da42419c861bbd47ca6a63377dee36f6f2c))

-   Account for wireframe visibility in drawer content margin adjustment ([372324c](https://github.com/peopleware/angular-sdk/commit/372324c71ad69ba41c504549917e8af35c8563a4))

## 21.3.0 - 2026-03-04

[Compare changes](https://github.com/peopleware/angular-sdk/compare/21.2.0...21.3.0)

### Other changes

-   Allow hiding and customizing the cancel/confirm button icons, button type, color in confirmation dialog ([462abcf](https://github.com/peopleware/angular-sdk/commit/462abcf9c929fdab09389b0f0c9ace839497ead2))

-   Expand tests for confirmation dialog ([5d3034a](https://github.com/peopleware/angular-sdk/commit/5d3034a63d115eeb83818a63d9c8923aea2ec58f))

-   Npm audit fix ([b5c2b4a](https://github.com/peopleware/angular-sdk/commit/b5c2b4a251c301a3cd0103fc1a18cbdef749b2d7))

-   Update angular packages to v21.2.0 ([3531cd2](https://github.com/peopleware/angular-sdk/commit/3531cd211112c842fdebd3bb63af984108373711))

-   Fix ng-packagr build error ([a8c72f2](https://github.com/peopleware/angular-sdk/commit/a8c72f2cfc0d6bf52bb0a130c15f41267dd31547))

-   Add version number to deprecated confirmation dialog properties on when they will be removed ([46f6295](https://github.com/peopleware/angular-sdk/commit/46f6295c98572d8aed48f29a5146643f74564348))

-   Deprecate the allowConfirmOnly property in confirmation dialog in favor of cancel data availability ([3f7c2d0](https://github.com/peopleware/angular-sdk/commit/3f7c2d0c8199e85dc9185abb03132705176c4c61))

## 21.2.0 - 2026-02-26

[Compare changes](https://github.com/peopleware/angular-sdk/compare/21.1.1...21.2.0)

### Other changes

-   Autofix vulnerabilities ([a10f156](https://github.com/peopleware/angular-sdk/commit/a10f156201b616b3460df8c091939270a69c25c8))

-   Switch to Zoneless ([c0791e9](https://github.com/peopleware/angular-sdk/commit/c0791e9fa39fb8564b05ea35b032ef67cd501e16))

-   Remove dependency on zone.js ([49a6226](https://github.com/peopleware/angular-sdk/commit/49a622687bffd30278cfe6a6cc3bf984934e9e8f))

-   Update unit tests to run zoneless ([b8fa0e1](https://github.com/peopleware/angular-sdk/commit/b8fa0e19812128441fb99866e83ae39ff7daf4a9))

-   Install vitest dependencies ([d67d9ec](https://github.com/peopleware/angular-sdk/commit/d67d9eca81b52ff753444c5ca82c938d5cb102cc))

-   Add vitest config file ([a092581](https://github.com/peopleware/angular-sdk/commit/a092581588cf8b671ca6680c1503574682bd99b2))

-   Update angular.json to use Vitest instead of Karma ([2d612e0](https://github.com/peopleware/angular-sdk/commit/2d612e09d487b60a2b14c55c52e2f9ad2941a3a4))

-   Remove Karma and Karma related dependencies ([cdcc5eb](https://github.com/peopleware/angular-sdk/commit/cdcc5eb8310a9e7809d23dc5d9c302d0d0add1e7))

-   Run command to automatically migrate tests from jasmine to vitest ([3137ab0](https://github.com/peopleware/angular-sdk/commit/3137ab0ed7133dc06c432dc163e2faa308d5241e))

-   Update tsconfig.spec.json files to refer to vitest/globals instead of jasmine types ([1e788fb](https://github.com/peopleware/angular-sdk/commit/1e788fbd5dee2779de1def4cbb0af1b45eeea157))

-   Manually fix test failures ([adf6044](https://github.com/peopleware/angular-sdk/commit/adf6044371e9cd5a6cfcf9c86a65dd4c924b25d5))

-   Generate new @ppwcode/ng-sdk project ([4ba30f9](https://github.com/peopleware/angular-sdk/commit/4ba30f90b37a11a48f7575552c8a158886cb28f6))

-   Add dependencies for building schematics ([3f37e61](https://github.com/peopleware/angular-sdk/commit/3f37e61808e1c99857ffcf3e29806ec9eaeb79a8))

-   Add @ppwcode/ng-sdk ng-add schematic that adds the ppwcode Angular SDK dependencies ([a2be03d](https://github.com/peopleware/angular-sdk/commit/a2be03dd8b57a02f6c44e2018def382b11b600c6))

-   Extend ng-add schematic to include @angular-eslint/schematics ([361f58a](https://github.com/peopleware/angular-sdk/commit/361f58affeced3dd5a1fa8dc9494b836fa4b0c96))

-   Extend ng-add schematic to include Prettier configuration ([fd0abbe](https://github.com/peopleware/angular-sdk/commit/fd0abbee37ed21e85352fd982b67a868245e02bf))

-   Extend ng-add schematic to include Angular Material ([67e999a](https://github.com/peopleware/angular-sdk/commit/67e999a9e0c5a259bfb5917d8362923a40340030))

-   Extend ng-add schematic to configure Vitest ([1d86a7e](https://github.com/peopleware/angular-sdk/commit/1d86a7ea85e9dcd71baf3cb7afd53f3ad25740a2))

-   Extend ng-add schematic to configure package.json scripts ([e412917](https://github.com/peopleware/angular-sdk/commit/e41291783619958c8e2e6de2b46d773ebc3418b4))

-   Extend ng-add schematic to generate .nvmrc file with version 24 ([bee39d3](https://github.com/peopleware/angular-sdk/commit/bee39d3d097733c98b960eb2e942cc43970447e2))

-   Update @ppwcode/ng-sdk README ([2b4a474](https://github.com/peopleware/angular-sdk/commit/2b4a47412da3ecfd8cbf41980407e6dd3dce8925))

-   Add ppwDisablePasswordFill directive ([bcf9f12](https://github.com/peopleware/angular-sdk/commit/bcf9f12268f1a74bb6c6d9e9321811ed2c423a79))

-   Build schematics in pipeline ([989a32e](https://github.com/peopleware/angular-sdk/commit/989a32ea56415f8866c5c0ab61cfe23c7cc479b0))

## 21.1.1 - 2026-01-27

[Compare changes](https://github.com/peopleware/angular-sdk/compare/21.1.0...21.1.1)

### Other changes

-   Nest styling ([90b51dd](https://github.com/peopleware/angular-sdk/commit/90b51dde45d15524cc571146c72437612ba713c4))

-   Numeric columns should be aligned to right automatically. ([d4cc6b1](https://github.com/peopleware/angular-sdk/commit/d4cc6b10c576f34132ea6dc136d2aad4e456b0ce))

-   Update table demo to not specify explicitly to align numeric columns right ([f107d66](https://github.com/peopleware/angular-sdk/commit/f107d664718952e5cbe8eb6efd687f5fa9a2fd95))

-   Bugfix/numeric cols alignment (#104) ([d84f9a7](https://github.com/peopleware/angular-sdk/commit/d84f9a73894be91882188ca2dc7b59e256c1a00c))

## 21.1.0 - 2026-01-22

[Compare changes](https://github.com/peopleware/angular-sdk/compare/21.0.0...21.1.0)

### Other changes

-   Upgrade packages to latest 21.0.x to fix vulnerabilities ([cf25c51](https://github.com/peopleware/angular-sdk/commit/cf25c517e82f247e770ad6b8c75df4fb351b98ea))

-   Disable row drag when enableRowDrag is false ([5ecc95f](https://github.com/peopleware/angular-sdk/commit/5ecc95fe20b4ff2498c3dee3b8db4403c40c6196))

-   Disable row drag when enableRowDrag is false (#101) ([fa1bebd](https://github.com/peopleware/angular-sdk/commit/fa1bebd3604a45227cc4b2888e5d9b5f98e6ff4f))

-   Add ng-utils project under ppwcode with the latest version of conditional-assert.ts and assertion.ts from the ppwcode/js-ts-oddsandends ([944150a](https://github.com/peopleware/angular-sdk/commit/944150aaa68c322474eba03a91237edd52abfdca))

-   Rework to allow removal of @ppwcode/js-ts-oddsandends ([44d6f8a](https://github.com/peopleware/angular-sdk/commit/44d6f8a858ea1d151203c75fb3edaecee958727b))

-   Add ng-utils project under ppwcode ([da8e2b1](https://github.com/peopleware/angular-sdk/commit/da8e2b1591f986a97ac2b413b4d1f4a7992d1ca6))

-   Add styling to correctly align the table headers ([e24b6c5](https://github.com/peopleware/angular-sdk/commit/e24b6c5d370821953b6903c0fe85be2868b9861a))

-   When a header column is right aligned, show the sort icon before the header label ([64c25a4](https://github.com/peopleware/angular-sdk/commit/64c25a47b19ebe5d8ebd918c8c511633509334ac))

-   Update the table demo to align the header columns the same as the data columns ([47f1fdf](https://github.com/peopleware/angular-sdk/commit/47f1fdf6b4bb1cd6f85b5a92dfff5d828887168a))

-   Bugfix/table header alignment (99) (#102) ([6b207e7](https://github.com/peopleware/angular-sdk/commit/6b207e79b5277e1d7d92ad7832945b51e8fa87b5))

## 21.0.0 - 2025-12-05

[Compare changes](https://github.com/peopleware/angular-sdk/compare/20.6.1...21.0.0)

### Features

-   **all:** Update to Angular 21 ([3b91f52](https://github.com/peopleware/angular-sdk/commit/3b91f52160b73153517fb1fcaeae101c4a90205b))

-   **all:** Enforce ChangeDetection.OnPush ([702acba](https://github.com/peopleware/angular-sdk/commit/702acbae506e23d9f8cf9c4fbc8517d47bf4a7ef))

### Other changes

-   [20 -> 21] update Angular packages using Angular CLI ([8c96f28](https://github.com/peopleware/angular-sdk/commit/8c96f28dfc3d268202cdb10a4ad608e1ddd878df))

-   [20 -> 21] update Angular Material packages using Angular CLI ([feceb01](https://github.com/peopleware/angular-sdk/commit/feceb01b27fce82c9a44e045147f291a0976ba61))

-   [20 -> 21] Update ESLint and fix new warnings ([57faedc](https://github.com/peopleware/angular-sdk/commit/57faedcf89ac0e5cecac77815620dbde60eea9df))

-   [20 -> 21] remove deprecated search filter outputs ([5d7f4e0](https://github.com/peopleware/angular-sdk/commit/5d7f4e003aaab95c475ecd298a5cffb84001ee18))

-   [20 -> 21] update Angular peer dependencies versions ([c1637a2](https://github.com/peopleware/angular-sdk/commit/c1637a20a87ab0c29a90d1cf99280b4e5ad1817a))

-   [20 -> 21] Enforce ChangeDetectionStrategy.OnPush ([af26245](https://github.com/peopleware/angular-sdk/commit/af26245aeb31689b34963c116b75b930206e783a))

## 20.6.1 - 2025-12-04

[Compare changes](https://github.com/peopleware/angular-sdk/compare/20.6.0...20.6.1)

### Other changes

-   Lock table record row dragging visually within tbody element ([7a3ffe1](https://github.com/peopleware/angular-sdk/commit/7a3ffe1a3f4743a6b4532e269e492a0bf5325381))

-   Fix table row drag not happening on first clicks ([27dc531](https://github.com/peopleware/angular-sdk/commit/27dc531e6a9bd0d5ad83ff9411fb05090254e60e))

## 20.6.0 - 2025-12-01

[Compare changes](https://github.com/peopleware/angular-sdk/compare/20.5.0...20.6.0)

### Features

-   **common-components:** Add option to disable sort clear on columns (#95) ([1d8fb62](https://github.com/peopleware/angular-sdk/commit/1d8fb62029271e07ea96035f14a29a1f7114bc42))

### Other changes

-   Add option to disable sort clear on columns ([09856e5](https://github.com/peopleware/angular-sdk/commit/09856e56c263a305624c42730e100af51d911714))

-   Update Angular dependencies to latest 20.x.x to fix vulnerability build failures ([ea3f269](https://github.com/peopleware/angular-sdk/commit/ea3f2698129d36f7bd1bc9dc4a11e7c64830f9c7))

-   Bump peer dependencies to require non-vulnerable Angular versions ([a6fa916](https://github.com/peopleware/angular-sdk/commit/a6fa9167a0e8283066a4911270aae458019557cc))

-   Include bumped peer dependencies as breaking change for release 20.6.0 ([87b5695](https://github.com/peopleware/angular-sdk/commit/87b5695cf6c1b0cdf49fbf0fc24d259e4cca978e))

## 20.5.0 - 2025-11-21

[Compare changes](https://github.com/peopleware/angular-sdk/compare/20.4.0...20.5.0)

### Other changes

-   Run npm audit fix ([d196faf](https://github.com/peopleware/angular-sdk/commit/d196faf3fcea39f586957919d32b83e805de2880))

-   Supress linting error ([4f1327d](https://github.com/peopleware/angular-sdk/commit/4f1327dfa6e34f2a7cbfdf1e438092d3c4615149))

-   Remove the Luxon dependency from the unit tests ([0635c64](https://github.com/peopleware/angular-sdk/commit/0635c64ab3b259979abdf49ceedde5d28430cd8e))

-   Remove the JS-Joda dependency from the unit tests ([ead18c3](https://github.com/peopleware/angular-sdk/commit/ead18c33ddc91ecce2729eef79a5d095f0eff8d8))

-   Remove the Date-FNS dependency from the unit tests ([45be909](https://github.com/peopleware/angular-sdk/commit/45be909248edb3aa3e03f2fedc103af3a53c3df0))

-   Bugfix/remove obsolete tests (#93) ([866809f](https://github.com/peopleware/angular-sdk/commit/866809f98f10d4f7125e67fabf25dccd75ae8838))

-   Typo ([dc6b83b](https://github.com/peopleware/angular-sdk/commit/dc6b83bb91f00e15a9090a19d68bc564e560a5ac))

-   When the error text is 'DB_UQ_CONSTRAINT_VIOLATION', the parameters list first element should always be shown as the error message ([1ffa784](https://github.com/peopleware/angular-sdk/commit/1ffa784d118e100d6c17b5df4474e05028a8ff8a))

-   When the error text is 'DB_UQ_CONSTRAINT_VIOLATION', the parameters l… (#92) ([7ea5b56](https://github.com/peopleware/angular-sdk/commit/7ea5b56d5c0028de724960ef715f756fc95d2144))

-   Add support for sortable table columns ([2e65695](https://github.com/peopleware/angular-sdk/commit/2e6569547dbb3470039a2d56a81c350fc9a05360))

-   Update table demo with sorting ([5872355](https://github.com/peopleware/angular-sdk/commit/5872355d677a2480c8c1a71eb02afeb8a75db01b))

## 20.4.0 - 2025-11-17

[Compare changes](https://github.com/peopleware/angular-sdk/compare/20.3.0...20.4.0)

### Features

-   **async:** Deprecate PagedEntities.pageIndex in favor of PagedEntities.page ([5ab5605](https://github.com/peopleware/angular-sdk/commit/5ab56051d7f169de6af51145425f3d80bb07135c))

### Performance

-   **common-components:** Improve performance of table selection ([df7c7b4](https://github.com/peopleware/angular-sdk/commit/df7c7b414a93ba5ac744ceefb8b7a249e33cbe23))

-   **common-components:** Improve performance of table selection ([2816cd9](https://github.com/peopleware/angular-sdk/commit/2816cd9729aa14089edf9201afbadd50374a0f66))

### Other changes

-   Organize imports ([e22efaa](https://github.com/peopleware/angular-sdk/commit/e22efaad8b3ed1b608ec060bd56e2ff0ef01e8df))

-   Refactor the demo app to nest the components routes under a parent page ([2dac7e9](https://github.com/peopleware/angular-sdk/commit/2dac7e96bb016a4b81c7c65a5ed0fa0d200b2af8))

-   Add DraggableDialogDirective ([d56a35c](https://github.com/peopleware/angular-sdk/commit/d56a35cb4d24209d441f905aab063b83a4f25ad3))

-   Correctly ignore the eslint warning ([c944efb](https://github.com/peopleware/angular-sdk/commit/c944efb55a297e4fb48497cf527fc7ac430e535f))

-   Make the confirmation dialog draggable ([ffd9725](https://github.com/peopleware/angular-sdk/commit/ffd9725a18959013e3d5db317330f89ab4269cdb))

-   Add missing export ([1efa852](https://github.com/peopleware/angular-sdk/commit/1efa852dd14b26f9d969b8bed4b9d021eb10a5ed))

-   Deprecate PagedEntities.pageIndex in favor of PagedEntities.page ([a290adf](https://github.com/peopleware/angular-sdk/commit/a290adfd572cdb70a1df16876f6f82d2fb2c3be6))

-   Use the signal version ([084e6f5](https://github.com/peopleware/angular-sdk/commit/084e6f5622eeef44b903c3bc82ec5cb967f92c3a))

-   Add a breadcrumb service with provider ([57cb947](https://github.com/peopleware/angular-sdk/commit/57cb9478bc7704a6c9a712599043f0c837174886))

-   Add a breadcrumb component ([4d5a4b2](https://github.com/peopleware/angular-sdk/commit/4d5a4b21fa65f385bf70424308667b1b03cbfc8b))

-   Add the breadcrumb to the demo page ([657edc0](https://github.com/peopleware/angular-sdk/commit/657edc054f490ec49f3bad5b7074ec39e7414c8d))

-   Move the breadcrumb from the app component to the wireframe ([7795e2e](https://github.com/peopleware/angular-sdk/commit/7795e2e95333cffb7c42acc73d033ae78ff6a9c2))

-   Update the README documentation of the wireframe component ([539c3d7](https://github.com/peopleware/angular-sdk/commit/539c3d731e4d307f07fcbc00aa21852abbc90123))

## 20.3.0 - 2025-11-12

[Compare changes](https://github.com/peopleware/angular-sdk/compare/20.2.1...20.3.0)

### Other changes

-   Fix unit testing code coverage output paths ([ab459e4](https://github.com/peopleware/angular-sdk/commit/ab459e451a3bf8df9fd54e5c7c48efc41d17ee81))

-   Add error handling unit tests ([1eda603](https://github.com/peopleware/angular-sdk/commit/1eda60391afebad57c90a9eeae042f723d3906c7))

-   Add async result unit tests ([46fa345](https://github.com/peopleware/angular-sdk/commit/46fa3452c69545b99068c4526f806a3830052620))

-   Add support to disable row selection by passing a custom function as a parameter to the table option ([5868e7b](https://github.com/peopleware/angular-sdk/commit/5868e7b3ca7e2c05beab6eb8060e845353a7f67d))

-   Update the table demo with a disableRowSelection example function ([8c319ac](https://github.com/peopleware/angular-sdk/commit/8c319ac8b9d758cc77fc5d28dc5c9bd510596991))

-   Organize imports ([231a159](https://github.com/peopleware/angular-sdk/commit/231a1595933eaa5c6ba2cbe3355d0651f8a94aef))

## 20.2.1 - 2025-10-28

[Compare changes](https://github.com/peopleware/angular-sdk/compare/20.2.0...20.2.1)

### Other changes

-   Update version number when this variable will be removed ([aee759d](https://github.com/peopleware/angular-sdk/commit/aee759d05bd63226c6920ceeb3b68a0096e39a58))

-   Use the new (future proof) search trigger ([589c978](https://github.com/peopleware/angular-sdk/commit/589c978b4c82695e7b5fc8163a0ea00c4513a772))

-   Emit both outputs (deprecated and the new one) to make sure both keep working fine ([8dff320](https://github.com/peopleware/angular-sdk/commit/8dff3202850242874471bf15483a9e89a970cbed))

## 20.2.0 - 2025-10-27

[Compare changes](https://github.com/peopleware/angular-sdk/compare/20.1.2...20.2.0)

### Other changes

-   Add an input `clearDisabled` that allows disabling the clear button ([6296feb](https://github.com/peopleware/angular-sdk/commit/6296feb8e6ee60be85ecb569abd788ce7da4c841))

-   Fix typo ([cfccca2](https://github.com/peopleware/angular-sdk/commit/cfccca2dd6d69ed4d42cba7110ee90e4b0310135))

-   Rename the `search` to `performSearch` because it is not allowed to name it as a standard DOM event ([289362b](https://github.com/peopleware/angular-sdk/commit/289362bc77de81ca55756e059fc64fcb9e3c2f00))

## 20.1.2 - 2025-10-27

[Compare changes](https://github.com/peopleware/angular-sdk/compare/20.1.1...20.1.2)

### Fixes

-   **common-components:** Pass signals to column cells to allow for dynamic template cell context updates ([df6c80c](https://github.com/peopleware/angular-sdk/commit/df6c80c9ea8171a35627e8ce051d89245c6fac3e))

### Other changes

-   Pass internal cell instances the full input signal to allow for dynamic updates of the template cell context ([c09b839](https://github.com/peopleware/angular-sdk/commit/c09b839972398dad19cb6439624514b50223cc86))

-   Add unit tests for the cell components ([e5661f7](https://github.com/peopleware/angular-sdk/commit/e5661f7e92486537f0b0811794689c8db2bfec10))

-   Update the dashboard items grid to auto-fill instead of auto-fit. This ensures that the dashboard cards aren't stretched too much ([3f4b3bb](https://github.com/peopleware/angular-sdk/commit/3f4b3bbb4cd09536eb30620dde1dd25a0b74f230))

## 20.1.1 - 2025-10-23

[Compare changes](https://github.com/peopleware/angular-sdk/compare/20.1.0...20.1.1)

### Fixes

-   **common-components:** Prevent emit of search-filter search event on enter key when submit is disabled ([dde8080](https://github.com/peopleware/angular-sdk/commit/dde8080db79f3ebb6729f5dd49057777f4a49cda))

### Other changes

-   Fix typo ([61eff2b](https://github.com/peopleware/angular-sdk/commit/61eff2bb7e1fba05ae376a221874a3497a999b71))

-   Update the README with an example on how to handle errors in a custom way ([0ce7097](https://github.com/peopleware/angular-sdk/commit/0ce7097870ade432b4846a248663287403faa559))

## 20.1.0 - 2025-10-17

[Compare changes](https://github.com/peopleware/angular-sdk/compare/20.0.4...20.1.0)

### Features

-   **table:** Migrate table animation to native CSS ([37d6884](https://github.com/peopleware/angular-sdk/commit/37d68846685153875914f8b196d48713238769a0))

-   **common-components:** Optimise dashboard-items-table styling ([08b3e16](https://github.com/peopleware/angular-sdk/commit/08b3e1669cd91619e135d518c9716c2af13bfd89))

### Other changes

-   Install FontAwesome Free 7.1.0 as npm dependency ([a7f801e](https://github.com/peopleware/angular-sdk/commit/a7f801ea5574fbdc1c76fe856ee613247720934e))

-   Load FontAwesome Free 7 instead of 6 ([dcf94c1](https://github.com/peopleware/angular-sdk/commit/dcf94c1d9809bbbaa98d306458c421d374cf5a2f))

-   Remove FontAwesome 6 from codebase ([7be5590](https://github.com/peopleware/angular-sdk/commit/7be559058396b64b15ef2d4649dc70064cc3ec31))

-   Migrate ppw-table row animation away from deprecated animations on component metadata ([d2bc8cb](https://github.com/peopleware/angular-sdk/commit/d2bc8cb1db316c7828f4b1eb3875b49a0910787f))

-   Add tabs to table demo page for the different tables ([17e89aa](https://github.com/peopleware/angular-sdk/commit/17e89aad86f64f9c0f9ef766bb40114adf53ab90))

-   Bootstrap demo application as standalone ([8e9e02f](https://github.com/peopleware/angular-sdk/commit/8e9e02f721cf39a27748419e351409b74fe95677))

-   Simplify dashboard-items-table styling ([8f111c1](https://github.com/peopleware/angular-sdk/commit/8f111c1c107d4149c72b2077797f56b4a5b41bbb))

-   Update dashboard-items-table demo ([b7fe8ce](https://github.com/peopleware/angular-sdk/commit/b7fe8ce8b18a5837b5f1154a5f437b807eaaac49))

-   Deploy to GitHub Pages ([dbe8fd0](https://github.com/peopleware/angular-sdk/commit/dbe8fd0646fb122fe775b342baf6a44a516f5d54))

-   Build application after publishing new packages ([3735e9d](https://github.com/peopleware/angular-sdk/commit/3735e9d66f56e7e5111f93745d1dbc2f249375b3))

## 20.0.4 - 2025-10-16

[Compare changes](https://github.com/peopleware/angular-sdk/compare/20.0.3...20.0.4)

### Fixes

-   **wireframe:** Remove effect that fires too many times causing the sidemenu to not open on small devices ([ef838cf](https://github.com/peopleware/angular-sdk/commit/ef838cfbfb8d79e5a0a1c169c65a9a5017e515a9))

### Other changes

-   Add LICENSE ([2ed4810](https://github.com/peopleware/angular-sdk/commit/2ed4810608a3c734e56bc9c2b65651bba693f631))

-   Angular-sdk/71 Remove effect that fires too many times causing the sidemenu not opening on (x)small screens anymore. ([e32f235](https://github.com/peopleware/angular-sdk/commit/e32f23593849d39ffafc01fa0e511e37b61374a8))

## 20.0.3 - 2025-10-16

[Compare changes](https://github.com/peopleware/angular-sdk/compare/20.0.2...20.0.3)

### Fixes

-   **components:** Ensure dashboard-items-table is compatible with both FontAwesome v6 and v7 ([5a1a98e](https://github.com/peopleware/angular-sdk/commit/5a1a98ed73c8596e6e1bc11cbdb410a340578828))

### Other changes

-   Fix width of icons in dashboard-items-table when using FontAwesome 7 ([8d4ccff](https://github.com/peopleware/angular-sdk/commit/8d4ccff145fbb105904e4a697b7bc68692d99abe))

-   Update publish script to use npm OIDC ([83860cd](https://github.com/peopleware/angular-sdk/commit/83860cd5ad347ba18028c399b58d82bcd3f1229e))

-   Update npm version used by publish ([86dfa6a](https://github.com/peopleware/angular-sdk/commit/86dfa6ad429564752fea9786870573e4eb2ecf75))

-   Add repository url to package.json of packages ([2d4c401](https://github.com/peopleware/angular-sdk/commit/2d4c4017fbe8076eb63d2f88242fb9295c75a58d))

## 20.0.2 - 2025-09-15

[Compare changes](https://github.com/peopleware/angular-sdk/compare/20.0.1...20.0.2)

### Other changes

-   Run test command of libraries in parallel on GitHub actions ([5757689](https://github.com/peopleware/angular-sdk/commit/57576894036133139bc6f179e9003a05e2020041))

-   Check for npm vulnerabilities in GitHub actions before downloading dependencies ([8e8d718](https://github.com/peopleware/angular-sdk/commit/8e8d7187cef7c138ff34b9ba484a6ed4ecd3759a))

-   Cache node_modules in GH Actions ([8e13bf2](https://github.com/peopleware/angular-sdk/commit/8e13bf2e9e35428cd2bfddc7fe9f914bf1ea3b23))

-   Upgrade node version to latest LTS of v22 ([bc4c6bc](https://github.com/peopleware/angular-sdk/commit/bc4c6bc6c04edc40f9166b9c621cddb32aa85717))

-   Upgrade package-lock file to fix vulnerability error. More info on: https://github.com/advisories/GHSA-4hjh-wcwx-xvwj ([a8a8b7b](https://github.com/peopleware/angular-sdk/commit/a8a8b7b904cc64267e5f5cfcecc4e4fec80e015f))

-   Align the node-version with what's configured in .nvmrc ([b5b0ae6](https://github.com/peopleware/angular-sdk/commit/b5b0ae66d291d6da596eecb9d9d670dcda6d5286))

-   Expose dashboard-options model in the API ([c5375eb](https://github.com/peopleware/angular-sdk/commit/c5375ebdad8f4d21c868155db2e51969ff928318))

## 20.0.1 - 2025-09-11

[Compare changes](https://github.com/peopleware/angular-sdk/compare/20.0.0...20.0.1)

### Fixes

-   **dialogs:** Render confirm dialog actions in a full width column on mobile ([b080d50](https://github.com/peopleware/angular-sdk/commit/b080d50f784df99ac690e1e33a0aaf4f7f894445))

### Other changes

-   Use NodeJS 22.18.0 in GitHub actions ([60861ef](https://github.com/peopleware/angular-sdk/commit/60861ef70cdb64c6054321098b06cb2258eb4e68))

-   Make the confirmation dialog mobile friendly ([09d859f](https://github.com/peopleware/angular-sdk/commit/09d859f788ce9534f59650bd18b6183c11987d98))

## 20.0.0 - 2025-08-21

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.10.0...20.0.0)

### Features

-   **router:** Provide pagination options to specify the router behavior when the page changes ([bc1fffa](https://github.com/peopleware/angular-sdk/commit/bc1fffae0048f951c126cb111af6dc1f51367f16))

### Refactoring

-   **common-components:** Move the opinionated definition of the margins of the expandable-card ([8364a64](https://github.com/peopleware/angular-sdk/commit/8364a640a53b6f2c4954a9e25506b9078332613d))

### Other changes

-   [19] -> [20] ng update @angular/core@20 @angular/cli@20 ([713d8cf](https://github.com/peopleware/angular-sdk/commit/713d8cf0601a75e8ab26cdd51252d53fba7ff4c5))

-   [19] -> [20] ng update @angular/material@20 ([10a2ab1](https://github.com/peopleware/angular-sdk/commit/10a2ab130ae6b844fc69645fe49c24fe30c6c23d))

-   [19] -> [20] Bump peer dependencies ([94a084c](https://github.com/peopleware/angular-sdk/commit/94a084c85b1d82e75e85f180a13ae80ecda00e5b))

-   [19] -> [20] Bump versions to 20 ([aec13d7](https://github.com/peopleware/angular-sdk/commit/aec13d75d321f85741219829d9e8109d5bd3efd9))

-   [19] -> [20] Upgrade node version ([41810ea](https://github.com/peopleware/angular-sdk/commit/41810ea9bb4645b6a16e62f60e9090d6a3e84417))

-   [19] -> [20] Upgrade eslint ([e564659](https://github.com/peopleware/angular-sdk/commit/e564659155617abecd8145760034182492157441))

-   [19] -> [20] Add node to the types of angularCompilerOptions ([f7e78e8](https://github.com/peopleware/angular-sdk/commit/f7e78e8bae8f68263f4a7b0c5cbab25ba0bb6908))

-   [19] -> [20] Upgrade date related packages to latest version ([dc0b4ba](https://github.com/peopleware/angular-sdk/commit/dc0b4ba4a75e14709796709fc7c43acad89503f2))

-   [19] -> [20] Upgrade ngx-translate ([3b5b7cf](https://github.com/peopleware/angular-sdk/commit/3b5b7cf8c51944532daa1e74a08dd70f4b7ec51b))

-   [19] -> [20] Resolve buildWebpack undefined error in karma.conf.js for Angular 20 ([4985e6d](https://github.com/peopleware/angular-sdk/commit/4985e6d42b2cfdd1ef44e2f6bf6e488e1b5dadb2))

-   [19] -> [20] Run lint & prettier ([a9f1ed4](https://github.com/peopleware/angular-sdk/commit/a9f1ed4912d21d1c9ed0f569ee89aa9c2ea5edc4))

-   [19] -> [20] Regenerate package lock ([bcda8e9](https://github.com/peopleware/angular-sdk/commit/bcda8e935b55772190a8bbdbfca4b3673a683520))

-   Regenerate package-lock.json with correct indentations ([c139920](https://github.com/peopleware/angular-sdk/commit/c139920c2e48a6bf1cad85ada469f3cac6f95d3d))

-   Move the opinionated definition of the margins on the expandable-card and the search-filter to the example app. ([db9f09c](https://github.com/peopleware/angular-sdk/commit/db9f09ccde95476248a67a4c0fbe431770ac473d))

-   Add variables to allow setting the margins from within a application itself ([9b0351e](https://github.com/peopleware/angular-sdk/commit/9b0351ef854f2a56383b44419e85af8d078ef25d))

-   Add defaultPageSize to the CanPage interface to enforce the override keyword on subclasses ([996d289](https://github.com/peopleware/angular-sdk/commit/996d2890c609ef9b9cbe2d30e4e2428573ab7a19))

-   Add skipLocationChange as the first pagination option ([7b59feb](https://github.com/peopleware/angular-sdk/commit/7b59feb1ef5db485fe4d44708903b2bf45efe7dc))

-   Add replaceUrl as pagination option ([828672f](https://github.com/peopleware/angular-sdk/commit/828672fa54b207092e08d609841872c79ef70965))

-   Document major version breaking changes ([274f667](https://github.com/peopleware/angular-sdk/commit/274f6670c7660f37b01727ed33b77c91598016e2))

## 19.10.0 - 2025-08-18

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.9.0...19.10.0)

### Other changes

-   Add an option to disable the table animations ([4835b5e](https://github.com/peopleware/angular-sdk/commit/4835b5e33f191d747b1efe998d63df4402eea778))

-   Update the table demo page to demonstrate the table animations ([0df5b71](https://github.com/peopleware/angular-sdk/commit/0df5b71016d13941086f764cc0990d25ea3a9e1d))

-   Add CTRL-click functionality to the ppw-table ([3498371](https://github.com/peopleware/angular-sdk/commit/3498371235ff5bd6297372bc7fbef88a717851df))

-   Update the table demo to showcase the CTRL-click function ([23ad457](https://github.com/peopleware/angular-sdk/commit/23ad457572ccc55e4c12f1102c476a3f2aa2c102))

## 19.9.0 - 2025-08-14

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.8.1...19.9.0)

### Other changes

-   Deprecate watch… functions because an alternative is available in the Angular framework ([1f7d153](https://github.com/peopleware/angular-sdk/commit/1f7d15314b970099562e0b843e42aec7660ccccb))

-   Update docs ([4c66e52](https://github.com/peopleware/angular-sdk/commit/4c66e52639112e944c3c8c7e8d7e1fb8cdf77696))

-   Add signal implementations for all is<size>Screen$ functions ([f31a024](https://github.com/peopleware/angular-sdk/commit/f31a0245060f970de4df43319eeb17f49b1df31a))

-   Add extra signal observers for is<size>ScreenExplicit ([d86bf24](https://github.com/peopleware/angular-sdk/commit/d86bf24f1b8966daa577246950a0c023e0aec609))

## 19.8.1 - 2025-07-16

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.8.0...19.8.1)

### Other changes

-   Add NL as an extra language to the application to allow a user to change the language. ([8b4bcfa](https://github.com/peopleware/angular-sdk/commit/8b4bcfa14e4432f286107e7690e5257920361420))

-   Translate the headers of the table demo ([e2d8662](https://github.com/peopleware/angular-sdk/commit/e2d86623d87d88250b460d0b1b4c1d78e000b40c))

-   Pass the column by getting it by its index from the columns signal. Reusing the signal makes sure that Angular updates the header labels correctly ([fc52e47](https://github.com/peopleware/angular-sdk/commit/fc52e47fa8083e882ba0cc3bb50e0a1f6ee60929))

## 19.8.0 - 2025-07-11

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.7.1...19.8.0)

### Features

-   **router:** Add option to pass built-in router Params to the interpolationParams methods ([342edfa](https://github.com/peopleware/angular-sdk/commit/342edfadd7046a7065d6d9adff7ae9ff41f23409))

-   **router:** Extend provideActivatedRoute to allow dynamically changing params, query params and data during a test ([265e59d](https://github.com/peopleware/angular-sdk/commit/265e59d091d06a91d27711e13943876b8e6fb744))

### Fixes

-   **wireframe:** Remove wireframe drawer content margin when the sidenav is forcibly closed because of no navigation items ([9be6bd0](https://github.com/peopleware/angular-sdk/commit/9be6bd0b5d830522c64aff3cc4ba501e2315b590))

-   **table:** Correctly check that a column should be ignored for the row click handling of a table ([79af8ef](https://github.com/peopleware/angular-sdk/commit/79af8efed02290acc1d21c0d8234773c27848e67))

### Refactoring

-   **demo:** Refactor parts of the example app to reflect a more modern implementation ([6abe5ba](https://github.com/peopleware/angular-sdk/commit/6abe5ba8710f1676f94817fc9de9ee77f10abc1b))

### Other changes

-   Add option to pass built-in router Params to the interpolationParams methods ([f6802b7](https://github.com/peopleware/angular-sdk/commit/f6802b7f3578768848332383ec34f73e23fbeef2))

-   Make sure the method docs reflect expectations for both types of interpolationParams ([ae34166](https://github.com/peopleware/angular-sdk/commit/ae341660640c001088355be9eeb6575d9fac96f7))

-   Remove wireframe drawer content margin when the sidenav is forcibly closed because of no navigation items ([843dbbf](https://github.com/peopleware/angular-sdk/commit/843dbbfa3e1cb3b1af20f4789e2af059db88b58a))

-   Refactor example app component to reflect a reactive setup to get the navigation items without triggering a rerendering of the sidenav ([ab18397](https://github.com/peopleware/angular-sdk/commit/ab1839715978b4dff855ac9cfdab6628ff2e1323))

-   Refactor example app component to be a fully modern reactive app component ([1963571](https://github.com/peopleware/angular-sdk/commit/19635718268ce5814b90b2316a809daad3b57e3d))

-   Refactor example dashboard item demo component to correctly compute the dashboard items ([d2c94f1](https://github.com/peopleware/angular-sdk/commit/d2c94f151b9e8cb01b132906d2e2c05a52b5b5f4))

-   Refactor example in memory loggin demo component to reflect modern implementation standards ([b864d71](https://github.com/peopleware/angular-sdk/commit/b864d71f24d3c6f523683e3d9a219e403c6a816b))

-   Extend provideActivatedRoute to allow dynamically changing params, query params and data during a test ([7697228](https://github.com/peopleware/angular-sdk/commit/7697228a45713f59d6b8ec2f509e29e8a1261161))

-   Correctly check that a column should be ignored for the row click handling of a table ([28cd15b](https://github.com/peopleware/angular-sdk/commit/28cd15bda8ecea1b3f0f0eba17a693b53f41a5c6))

## 19.7.1 - 2025-06-13

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.7.0...19.7.1)

### Other changes

-   Rename menu title of the dashboard ([a63a230](https://github.com/peopleware/angular-sdk/commit/a63a23008098d89fb19bf8acb39134ba015eed52))

-   Nest components pages under a Components menu item ([cd14720](https://github.com/peopleware/angular-sdk/commit/cd1472082c558775817b2876d28145971372fe2f))

-   Fix issue with equality on items in the \_openedNavigationItems array. This resolves the problem that nested menu items didn't open correctly ([6d947fe](https://github.com/peopleware/angular-sdk/commit/6d947fe710ec6e1b87a7bcd2e2526b627814a2ae))

## 19.7.0 - 2025-05-22

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.6.0...19.7.0)

### Other changes

-   Add posibility to show the action buttons of a dashboard item as a column ([919a0a9](https://github.com/peopleware/angular-sdk/commit/919a0a9e91f00411be9a2ad8efd57262db51b4dc))

-   Add possibility to align the dashboard item actions left, center or right ([78e99f1](https://github.com/peopleware/angular-sdk/commit/78e99f16eec9dc62cfc45aa4f178c4b38d851af2))

-   Update the demo page to showcase the direction and alignment possibilities of the dashboard items ([899811d](https://github.com/peopleware/angular-sdk/commit/899811d0c1d5da24e95bbc66884d82c20efd474b))

## 19.6.0 - 2025-05-15

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.5.0...19.6.0)

### Other changes

-   Extend form control generators to accept async validators ([63b113f](https://github.com/peopleware/angular-sdk/commit/63b113f12d49e93802aeb647383dac8d92d9842a))

-   Add isInitiallyPending boolean parameter to the isPending function to allow users to decide wheter the loading should start as true or false ([aecdab4](https://github.com/peopleware/angular-sdk/commit/aecdab4f78a4a3a9daf9b63a4a8cb96e960d6da3))

## 19.5.0 - 2025-05-02

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.4.3...19.5.0)

### Other changes

-   Initial support for multiple error handlers ([329d80d](https://github.com/peopleware/angular-sdk/commit/329d80dc2a24f76a2c64a15eb85c0150a507c83a))

-   Allow passing list of error handers to provideGlobalErrorHandler ([faed89c](https://github.com/peopleware/angular-sdk/commit/faed89ccf62657c875ce17aaae396e84254c3437))

-   Extend getFullRoutePath and interpolateRoutePath with a configuration object to optionally include the leading slash (default true) ([65802b5](https://github.com/peopleware/angular-sdk/commit/65802b5a4a27b49b69497b07305d1725f81a04c8))

-   Add unit tests for route retrieval functions ([a93f4ff](https://github.com/peopleware/angular-sdk/commit/a93f4ff9ca5b4450f261ecaa0c98956f68555101))

-   Introduce defineContainer ([7810af5](https://github.com/peopleware/angular-sdk/commit/7810af5224ef267126db152a848077967b148122))

## 19.4.3 - 2025-04-29

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.4.2...19.4.3)

### Other changes

-   Update the default page to go to the dashboard page ([3fb6bb6](https://github.com/peopleware/angular-sdk/commit/3fb6bb631e4e71a76314997b80ed269d9baba687))

-   Add a way to pass options to the dashboard-items-table and allow choosing between left and center alignment ([cb2b49d](https://github.com/peopleware/angular-sdk/commit/cb2b49d0dbb6dab3f0324e1e19b8856f99d7cd87))

-   Update the demo page to align the dashboard items to the left ([ed6bfd5](https://github.com/peopleware/angular-sdk/commit/ed6bfd53117c44ab45ec7fdf0e274a632031080a))

-   Bump to version 19.4.2 ([ffd8a32](https://github.com/peopleware/angular-sdk/commit/ffd8a326a35a08d7618c79a2b2a746c270bcfe34))

-   Bump to version 19.4.3 ([2016d69](https://github.com/peopleware/angular-sdk/commit/2016d696c528b5d25e22fcad49c52cdf87f375ec))

## 19.4.2 - 2025-04-29

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.4.0...19.4.2)

### Other changes

-   Restructure the scss file to nest elements according to HTML structure ([c5b4914](https://github.com/peopleware/angular-sdk/commit/c5b491436d41bedbfadf4601c06f3f67032124c1))

-   Update dashboard items styling to keep the title on 1 line and to allow configuring the total width using a css variable ([65cc676](https://github.com/peopleware/angular-sdk/commit/65cc676d0a6ad1af8bbaf2f3f44cea53b066d767))

-   Add a dashboard card with a very long title that doesn't fit in one line to demo the overflowing of the title ([8ce4ab7](https://github.com/peopleware/angular-sdk/commit/8ce4ab73504482a97d78d264e3c8c77606d6f754))

-   Override the dashboard items table width variable in the demo app ([91feee3](https://github.com/peopleware/angular-sdk/commit/91feee3134084d10dcad1ba61a0f0d9789b88785))

-   Bump to version 9.4.1 ([fc9198b](https://github.com/peopleware/angular-sdk/commit/fc9198bffa3412cceacabc54978ba9f51c552924))

## 19.4.0 - 2025-04-03

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.3.2...19.4.0)

### Other changes

-   Fix typo ([b4456b0](https://github.com/peopleware/angular-sdk/commit/b4456b0418be6284a820a3e2d4a05d81aea8ae5c))

-   Add the DashboardItemsTable component ([1aaea67](https://github.com/peopleware/angular-sdk/commit/1aaea6709e6eb36cb350291dcab914e3152bc9c3))

-   Add a demo page that showcases the dashboard items table component ([5dad8cd](https://github.com/peopleware/angular-sdk/commit/5dad8cdde1ee1db25d16a28fc05b57003ea747aa))

## 19.3.2 - 2025-04-03

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.3.1...19.3.2)

### Other changes

-   Add a toggle to easily switch drawer behavior modes ([edb39c4](https://github.com/peopleware/angular-sdk/commit/edb39c46973d1edbc9810e31bba930c7ea9de2eb))

-   Fix drawer behavior for apps with closedByDefaultOnLargerDevice set to true ([07c0bbf](https://github.com/peopleware/angular-sdk/commit/07c0bbf1e68ae90086f0afab86b0e05b9a829109))

-   Bump to version 19.3.2 ([de3cac3](https://github.com/peopleware/angular-sdk/commit/de3cac38d30fc9f97f5a8b9ff55337bebc433406))

## 19.3.1 - 2025-04-02

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.3.0...19.3.1)

### Other changes

-   Fix sidenav glitch when screensize becomes smaller than 960px ([07b4c6d](https://github.com/peopleware/angular-sdk/commit/07b4c6de140520e5a120b8391977efcc37ad07f1))

-   Bump to version 19.3.1 ([16cd1dd](https://github.com/peopleware/angular-sdk/commit/16cd1dd185ed2d851471999f98d15a06292f773a))

## 19.3.0 - 2025-03-21

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.2.0...19.3.0)

### Other changes

-   Implement expandable table rows ([eeab035](https://github.com/peopleware/angular-sdk/commit/eeab0358c92bb2e93274ee4a89237463c58d00f9))

-   Add expandable table demo ([2fdb0b6](https://github.com/peopleware/angular-sdk/commit/2fdb0b6e7e39e54336a21b51d7b6fc3afe0e5ab3))

-   Rename filter table to table demo ([f999c18](https://github.com/peopleware/angular-sdk/commit/f999c18b7cf0085d83e319bdd8e31e2be1888a81))

-   Rename expandable table demo ([b1128f5](https://github.com/peopleware/angular-sdk/commit/b1128f5b28196de7ae37ed6bbef2bca5106d8931))

-   Bump to version 19.3.0 ([b4a4d1c](https://github.com/peopleware/angular-sdk/commit/b4a4d1c80879739175898d1e008aaba249e5cbb6))

## 19.2.0 - 2025-03-18

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.1.1...19.2.0)

### Other changes

-   Implement sticky columns ([992c10c](https://github.com/peopleware/angular-sdk/commit/992c10c3a2e8f311bc60b3c231cbd36b5d75ea00))

-   Add filter table title ([7b774f8](https://github.com/peopleware/angular-sdk/commit/7b774f8a3c1d7d22a85d128304bde6b073b9c011))

-   Add sticky columns demo ([9639c22](https://github.com/peopleware/angular-sdk/commit/9639c221365e9169e9914edf8cca1534a75bb0ee))

-   Add comment on highlight sticky background color ([cbce9a8](https://github.com/peopleware/angular-sdk/commit/cbce9a8b51f2c07f249f62af947b5f2781d7ee86))

-   Bump to version 19.1.2 ([5294bc2](https://github.com/peopleware/angular-sdk/commit/5294bc29dd9666807a7f761fbd1bcc80f14b9b2c))

-   Fix linting issues ([575b756](https://github.com/peopleware/angular-sdk/commit/575b75697c8aa3763608d8fbf4f03388c80713db))

-   Add script to unpublish v19.1.2 from npmjs ([c1dbebc](https://github.com/peopleware/angular-sdk/commit/c1dbebc5e3af3f170a35b8174c3520216ff8d054))

-   Revert "Add script to unpublish v19.1.2 from npmjs" ([21e3691](https://github.com/peopleware/angular-sdk/commit/21e36910209ee5e059e1321cb3ba4d38c885d057))

-   Bump to version 19.2.0 ([a790a91](https://github.com/peopleware/angular-sdk/commit/a790a9175003741faef01454011e5c262ef97b27))

## 19.1.1 - 2025-03-06

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.1.0...19.1.1)

### Other changes

-   Fix peer dependency of ng-common-components incorrectly referencing @ppwcode/ng-common ([1e46fbb](https://github.com/peopleware/angular-sdk/commit/1e46fbb8b2dbbe1021c9af2632c96586605a4554))

-   Bump to version 19.1.1 ([aa8a0d8](https://github.com/peopleware/angular-sdk/commit/aa8a0d81a513e4aaae95b4ed09e5feccef692d07))

## 19.1.0 - 2025-03-06

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.0.2...19.1.0)

### Other changes

-   Rename 'reset' to 'clear' since there are warnings explaining that the word 'reset' is a reserved word. ([fdbe361](https://github.com/peopleware/angular-sdk/commit/fdbe361810a246c0cbf312f3452886b9ad0aaa46))

-   File formatting ([f7507f0](https://github.com/peopleware/angular-sdk/commit/f7507f0a169a9412f73e98acfd1abddb0a0c5493))

-   Enable the ESLint no-secrets plugin to verify that no secrets are checked in in Git ([b293ccc](https://github.com/peopleware/angular-sdk/commit/b293ccc81ffbd73db1e878ba3930ce78b7ca4d27))

-   Configure eslint plugin depend to scan for dependency tree bloat and redundant polyfills ([3a2eac2](https://github.com/peopleware/angular-sdk/commit/3a2eac26bc3a8dab92d97a15c9b33de35dd7c151))

-   Update package-lock file to fix 2 moderate vulnerabilities ([e59312a](https://github.com/peopleware/angular-sdk/commit/e59312ad6ef56ec6bf791c2f9c904b5281b0a9f3))

-   Add retire script to the project to allow generating a SBOM ([b3e4861](https://github.com/peopleware/angular-sdk/commit/b3e48615ece53099cbed8ef2602b281f06dd58dc))

-   Enure that the page contents are shown correctly after page reload ([0ca8a2f](https://github.com/peopleware/angular-sdk/commit/0ca8a2f89cf40a35db51a3e73643febde50543b5))

-   Add tsconfig.local.json so that manual overrides of the tsconfig paths is no longer necessary for development ([1d61599](https://github.com/peopleware/angular-sdk/commit/1d6159978dde0d4cb8e03562f92560658b5c5025))

-   Remove tsconfig override information from README ([47cab0c](https://github.com/peopleware/angular-sdk/commit/47cab0c9c78de6944e503e9f3eca65ef2f853f5e))

-   Rename tsconfig.json to tsconfig.angular.json and tsconfig.local.json to tsconfig.json so that the IDE uses the relative paths by default instead of the build-paths ([b50af1b](https://github.com/peopleware/angular-sdk/commit/b50af1b76fb62bd92198f7a0cf06845508541d18))

-   Organize imports ([ddefc67](https://github.com/peopleware/angular-sdk/commit/ddefc67c12b7a83bd2f25bf5d59cfe619aa5f16a))

-   Refactor TableComponent to inherit from AbstractTableComponent ([7097e11](https://github.com/peopleware/angular-sdk/commit/7097e11e772047c2b3828cbc1cc570cb933085ba))

-   Add FormTableComponent ([0ffcf5f](https://github.com/peopleware/angular-sdk/commit/0ffcf5f45a474b78008adbca7269864a00a0a825))

-   Add a form table example to the demo application ([8070b6c](https://github.com/peopleware/angular-sdk/commit/8070b6ce37e9c63bb24a6b17fac86b89781a9e7c))

-   Also clean up nested objects of the form's raw value ([cce55aa](https://github.com/peopleware/angular-sdk/commit/cce55aac21d2473b03be9cea64a0681cfea1e20f))

-   Add missing export to public-api of ng-common-components ([fa1edf9](https://github.com/peopleware/angular-sdk/commit/fa1edf9528b75a525776e079e27458abf19c8452))

-   Update imports to point to dependencies of current lib using relative paths ([8d8e642](https://github.com/peopleware/angular-sdk/commit/8d8e64260cfb2ef3b35fc953689829deb68ddc91))

-   Update demo app imports to point to exported modules ([5c7738f](https://github.com/peopleware/angular-sdk/commit/5c7738f456dede5dbd8d7b02842b3dd90efa4a5a))

-   Update imports to point to dependencies of current lib using relative paths ([cf40e83](https://github.com/peopleware/angular-sdk/commit/cf40e83cddf063f19f7220e836e3b6eced0fae7e))

-   Update node version in github actions to v20 ([3e7ce55](https://github.com/peopleware/angular-sdk/commit/3e7ce558b1c04afa6d4ea432948135efedb4c49b))

-   Add missing peer dependency ([5d96dea](https://github.com/peopleware/angular-sdk/commit/5d96deaa3394522089da6c06297a383f4860d7b4))

-   Fix wrong import of mixinHandleSubscriptions ([1ff3982](https://github.com/peopleware/angular-sdk/commit/1ff3982e29d13f804deec2945059a770d00b00d8))

-   File formatting ([8c61455](https://github.com/peopleware/angular-sdk/commit/8c614558c24c5646feb14dee893c1175acade1ac))

-   Update readme with info for Windows ([fcd83f8](https://github.com/peopleware/angular-sdk/commit/fcd83f806cabe80b1ef4494c7cfd26ed3e841067))

-   Add linting rule to avoid imports of components within the own lib ([98d376a](https://github.com/peopleware/angular-sdk/commit/98d376ad547c01ab7b0670e139b9b996dce4ca48))

-   Share error status with Github actions runner ([e5df0a1](https://github.com/peopleware/angular-sdk/commit/e5df0a159742dc8833d146f4675857179fe0846f))

-   Fix wrong imports ([73ac20e](https://github.com/peopleware/angular-sdk/commit/73ac20e4b9f7cf97e9a213a56d410de4c5358b94))

-   Bump to version 19.1.0 ([5514d8b](https://github.com/peopleware/angular-sdk/commit/5514d8b3db7cd22de7b6e80118388b04102a54de))

## 19.0.2 - 2024-12-04

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.0.1...19.0.2)

### Other changes

-   Update peerDependencies of ng-async to allow use of @ngx-translate/core v16 ([dca7ccc](https://github.com/peopleware/angular-sdk/commit/dca7ccc59acee33e4e8603e8227515cb821823f1))

## 19.0.1 - 2024-11-28

[Compare changes](https://github.com/peopleware/angular-sdk/compare/19.0.0...19.0.1)

### Other changes

-   Add script to unpublish v19.0.0 from npmjs ([b85328e](https://github.com/peopleware/angular-sdk/commit/b85328e576358158f99da8f01ca58d61f27d25cf))

-   Revert "Add script to unpublish v19.0.0 from npmjs" ([4762b2c](https://github.com/peopleware/angular-sdk/commit/4762b2cfd72bfa887136810b1a19dbc329f0c842))

-   Expand default error codes with PreconditionFailed and Conflict ([b860c0e](https://github.com/peopleware/angular-sdk/commit/b860c0eab6ac00a6d2c8530fd543336f7d4e1bf4))

## 19.0.0 - 2024-11-27

[Compare changes](https://github.com/peopleware/angular-sdk/compare/18.3.0...19.0.0)

### Other changes

-   [18 -> 19] Update packages using Angular CLI ([6f99b88](https://github.com/peopleware/angular-sdk/commit/6f99b8886beb38914b71351fb2800fbb93ea6e2c))

-   [18 -> 19] Bump peer dependencies ([99adf71](https://github.com/peopleware/angular-sdk/commit/99adf71d4a230bc48c050a809e64a04cbc490f4c))

-   [18 -> 19] Update eslint dependencies to latest ([7c3d0d5](https://github.com/peopleware/angular-sdk/commit/7c3d0d5f2c2b5389454feec18256f2a11f8a1ccf))

-   [18 -> 19] Fix warnings on unused imports during serve startup ([2e46905](https://github.com/peopleware/angular-sdk/commit/2e46905c6d0d5c480f206619ac3de10815cf2e39))

-   [18 -> 19] Fix warnings on declarations that appear after nested rules during serve startup ([1498dec](https://github.com/peopleware/angular-sdk/commit/1498dec43becf4a1e8409794ce13a823d1ba6d80))

-   [18 -> 19] Upgrade date related libs to latest version ([9a2425c](https://github.com/peopleware/angular-sdk/commit/9a2425c188492694f3d45be8522d2a6ec8817288))

-   [18 -> 19] Upgrade tslib to latest ([595206a](https://github.com/peopleware/angular-sdk/commit/595206a61ab2cac74c9731e2b2473bd23e764680))

-   [18 -> 19] Regenerate package-lock file to fix vulnerabilities ([77893ae](https://github.com/peopleware/angular-sdk/commit/77893ae2fb64cb55454a7906f03b8a72a2fedf15))

-   [18 -> 19] Run 'npm audit fix' to fix vulnerabilities ([7825084](https://github.com/peopleware/angular-sdk/commit/7825084394768284723eb4951de1f1eee54f7d3e))

-   [18 -> 19] Upgrade ngx-translate to latest version ([7fbcdf2](https://github.com/peopleware/angular-sdk/commit/7fbcdf2881072f0b00648ca439c451992963ef05))

## 18.3.0 - 2024-10-21

[Compare changes](https://github.com/peopleware/angular-sdk/compare/18.2.0...18.3.0)

### Other changes

-   Update readme file ([c11c476](https://github.com/peopleware/angular-sdk/commit/c11c476f34af5a2d687a7ece606c041e1cdf6b59))

-   Support navigating to external pages in the navigation menu ([207ef2a](https://github.com/peopleware/angular-sdk/commit/207ef2a8e6caf573e362a884eba905f03b5c45a5))

-   Add link to PeopleWare website in example app to showcase external navigation ([35d0706](https://github.com/peopleware/angular-sdk/commit/35d0706a283afcf7f4c19dd9ede7bbdc5dafd549))

-   Add test to validate that an error is thrown at the right time for invalid navigation items ([9bb0298](https://github.com/peopleware/angular-sdk/commit/9bb02983e014b26e9ed8238785d25fdbac1c94ad))

-   Support the creation of route maps ([df3084b](https://github.com/peopleware/angular-sdk/commit/df3084bc6ee765b4e3fbe6ac0523e34f7a20aaf9))

-   Adapt example app to use a route map instead of hardcoded routes ([4a18067](https://github.com/peopleware/angular-sdk/commit/4a1806732d999c46d7e69c7523f963c47fa51594))

## 18.2.0 - 2024-10-08

[Compare changes](https://github.com/peopleware/angular-sdk/compare/18.1.1...18.2.0)

### Other changes

-   Add missing export of SidebarOptions ([b7ccd84](https://github.com/peopleware/angular-sdk/commit/b7ccd849d497aedd155c89de6d657393f553c200))

-   Add loader component ([76576e5](https://github.com/peopleware/angular-sdk/commit/76576e583f473dc46a7e836722408fd6f88d9a28))

-   Replace MtxLoader with PpwLoader in the async-result module ([d655019](https://github.com/peopleware/angular-sdk/commit/d655019b3646a7dc07c6bdf3c243233de5377dc3))

-   Add a delay to the filter-table example component ([2f2db5d](https://github.com/peopleware/angular-sdk/commit/2f2db5d9b020e828de0f0736f742b5e90111e71c))

-   Refactor the layout of the filter-table component ([a910a1e](https://github.com/peopleware/angular-sdk/commit/a910a1e32e243ef09fd3d4b37ced4806d726de0a))

-   Remove the dependency on @ng-matero/extensions from the codebase ([d9dccc2](https://github.com/peopleware/angular-sdk/commit/d9dccc2b6be1dec8f7f8637f2f45ea5cb6f66fc5))

## 18.1.1 - 2024-08-27

[Compare changes](https://github.com/peopleware/angular-sdk/compare/18.1.0...18.1.1)

### Other changes

-   Add the ValidationService with the notOnlySpacesValidator function ([9bcc2ad](https://github.com/peopleware/angular-sdk/commit/9bcc2addeb859d2276b508ab94af8c83c6332e8e))

-   Upgrade node to v20.16.0 ([3f01fa4](https://github.com/peopleware/angular-sdk/commit/3f01fa40bf95d399d2378de2e1e789704ec49a87))

-   Extract method ([109d166](https://github.com/peopleware/angular-sdk/commit/109d1660cb659b9aca784215f9570b0fbf9b38a6))

-   Add a way to pass a footer to the table component ([c7d19de](https://github.com/peopleware/angular-sdk/commit/c7d19dec735d25e40405d8163f5442b82a8b647a))

-   Add a footer to the table in the example app ([75ebd7e](https://github.com/peopleware/angular-sdk/commit/75ebd7ee774695ba244ec940ae16f2bc919bdf00))

## 18.1.0 - 2024-07-08

[Compare changes](https://github.com/peopleware/angular-sdk/compare/18.0.0...18.1.0)

### Features

-   **wireframe:** Support projecting custom ppw-page-content instead of default router-outlet ([e32d5cf](https://github.com/peopleware/angular-sdk/commit/e32d5cf04c9585b6b7994a03af97a9193c055fdb))

-   **wireframe:** Support setting drawer border and page container background ([1886485](https://github.com/peopleware/angular-sdk/commit/188648568f81c58c7e42d0b2de9a42cf8a21aa05))

### Other changes

-   Add an expandable card demo to show text based on the expansion state ([c6f50cf](https://github.com/peopleware/angular-sdk/commit/c6f50cfc560f80d568b198a548d58f4330dcd28c))

-   Fix initial value of panelOpenState ([c56bf9f](https://github.com/peopleware/angular-sdk/commit/c56bf9f0891aa216a05e9fbd4f58a8edf3e78d97))

-   Set panelOpenState fixed to false when closing ([ab4a4aa](https://github.com/peopleware/angular-sdk/commit/ab4a4aa9354cfcee4b800bbf17edd69fba1f4ca7))

-   Showcase a more modern UI using a flat wireframe style ([bf5c164](https://github.com/peopleware/angular-sdk/commit/bf5c164e248f955db57e7964e7fc0d7d60087af9))

-   Fix prettier formatting ([5438189](https://github.com/peopleware/angular-sdk/commit/543818980fabb043e60cc24a7799e467662b520b))

## 18.0.0 - 2024-06-24

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.83...18.0.0)

### Other changes

-   [17->18] Update packages using Angular CLI ([7274dc6](https://github.com/peopleware/angular-sdk/commit/7274dc6ff33e232eefda0bb5df74f9777c83f0d4))

-   [17->18] Update ng-matero extensions ([4a4fc24](https://github.com/peopleware/angular-sdk/commit/4a4fc2404d4608afade35ca72d6c3f6fe7f01f82))

-   [17->18] Fix left-sidenav tracking performance of navigation items ([67ef3a6](https://github.com/peopleware/angular-sdk/commit/67ef3a61732d292aaefdc5630c535a9bd8ce5086))

-   [17->18] Bump peer dependencies ([de9331c](https://github.com/peopleware/angular-sdk/commit/de9331cc8e9477d8d0a4ca2de490fcda84e8d0ab))

## 0.0.83 - 2024-06-01

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.82...0.0.83)

### Features

-   **async:** Add handleAsyncResultIgnoreEntity ([5b42e1d](https://github.com/peopleware/angular-sdk/commit/5b42e1d3bb9ad5421624f84eca8937ff151a4c34))

## 0.0.82 - 2024-05-30

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.81...0.0.82)

### Other changes

-   Improve scss styling ([bb0b755](https://github.com/peopleware/angular-sdk/commit/bb0b755e23b94023fd7387b47efe437d24a94790))

-   Avoid borders on focussed drawer buttons ([b0e475b](https://github.com/peopleware/angular-sdk/commit/b0e475b26e574e36db50fff82aeefa261bd83b53))

-   Allow closing the drawer with the escape key or by clicking next to it when the drawer is closed by default on a larger device ([1290e47](https://github.com/peopleware/angular-sdk/commit/1290e470cfa2ff4a9b0c999854f5c3d6bedaf2c6))

-   Do not initially open the drawer when the setting closedByDefaultOnLargerDevice is set to true ([2d1063e](https://github.com/peopleware/angular-sdk/commit/2d1063e2fa81fb4e0fc9ba0a3e3b19b886ce31a1))

## 0.0.81 - 2024-05-27

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.80...0.0.81)

### Breaking changes

-   **common:** Simplify mixinHandleSubscriptions ([8706a2f](https://github.com/peopleware/angular-sdk/commit/8706a2f60644568495eb59a52ac5f9aae567f2f1))

> It is possible that the TypeScript compiler will complain after upgrading that ngOnDestroy is not overridable because it has no base implementation to override. This is caused by the removal of ngOnDestroy implementation in mixinHandleSubscriptions. Simply fix the issue by removing the override keyword.

### Features

-   **async-result:** Convert async-result component to use signal inputs and content childs ([20a9727](https://github.com/peopleware/angular-sdk/commit/20a9727cef411164b4212541cd0b4ad2888b7a8d))

-   **common-components:** Convert expandable card into signal inputs and add collapsed state tests ([1e63a42](https://github.com/peopleware/angular-sdk/commit/1e63a42945e1783eda89f929ba3b661f34f59a01))

-   **common-components:** Convert message-bar into signal inputs ([c413995](https://github.com/peopleware/angular-sdk/commit/c413995bfd0706ff1e006914dfb47602c9eadb5b))

-   **common-components:** Convert search-filter into signal inputs and outputs ([9b048ba](https://github.com/peopleware/angular-sdk/commit/9b048badd7ac786fb3247baa8a426bc48f0d12c5))

-   **async-result:** Convert async-result directives to use signal inputs ([4756694](https://github.com/peopleware/angular-sdk/commit/475669488a08f05ead17857185818f72360ead67))

-   **wireframe:** Convert left-sidenav component to use signal inputs and outputs ([95b0136](https://github.com/peopleware/angular-sdk/commit/95b01365ea8cb5cdfbf525232079f5f9cf62caa9))

-   **wireframe:** Convert pagination bar to use signal inputs and outputs ([feaed68](https://github.com/peopleware/angular-sdk/commit/feaed68c06f928a184ce9d94e285f7628add8bfd))

-   **wireframe:** Support passing PagedEntities directly to pagination bar ([fc06bee](https://github.com/peopleware/angular-sdk/commit/fc06bee28d9aebb9a3f73fe29d7d2230dba4bd84))

-   **wireframe:** Convert toolbar component into signal inputs and outputs ([575bee4](https://github.com/peopleware/angular-sdk/commit/575bee46dcf1d33de8d728c0dba739d27f206dae))

-   **wireframe:** Convert toolbar title into signal instead of ngOnInit subscription ([83a8f48](https://github.com/peopleware/angular-sdk/commit/83a8f48a63a8df36307310f4ff94ad247f9c041c))

-   **wireframe:** Convert wireframe in fully signal based component ([e07627f](https://github.com/peopleware/angular-sdk/commit/e07627fe18e8ac0294e58210a707b0e457ed6fcf))

-   **forms:** Make validators an optional parameter on form control generators ([930dc88](https://github.com/peopleware/angular-sdk/commit/930dc8882026229d734dede8a0b68b7d220b0581))

-   **common-components:** Convert table directives into fully signal based directives ([b2da222](https://github.com/peopleware/angular-sdk/commit/b2da222ba27971ec19a8d551bdcbbe67221f0823))

-   **common-components:** Convert table component into a signal based component ([b6fc098](https://github.com/peopleware/angular-sdk/commit/b6fc098514c22a49988edc10f19564e6f37d0364))

-   **forms:** Loosen the type constraint for the base ofmixinDetectFormChanges ([3fce5b5](https://github.com/peopleware/angular-sdk/commit/3fce5b56c9fa207700a9d6f4f40cd398eefa3f9b))

-   **forms:** Loosen the type constraint for the base of mixinRelativeNavigation ([c3238af](https://github.com/peopleware/angular-sdk/commit/c3238af51f46a0850f62259c54ce92477eb57fae))

### Fixes

-   **unit-testing:** Fix implementation and documentation of HttpCallTester.expectOneFileDownloadFromUrl ([70aea78](https://github.com/peopleware/angular-sdk/commit/70aea780f375c69963cdbc672996d2c50bafec1e))

### Refactoring

-   **wireframe:** Use router module instead of router-testing module in left-sidenav tests ([15ea5a8](https://github.com/peopleware/angular-sdk/commit/15ea5a856846b7fdba775c6cf1547fe08ee86099))

-   **forms:** Simplify mixinDetectFormChanges to remove ngOnDestroy ([7c48fc6](https://github.com/peopleware/angular-sdk/commit/7c48fc696063eb45d943f697d919528de69701b2))

-   **common-components:** Remove boilerplate for cell components by making the base class for the mixin optional ([30567b2](https://github.com/peopleware/angular-sdk/commit/30567b24c659dd7fc45097ad0436b6ab20172fd6))

## 0.0.80 - 2024-05-27

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.79...0.0.80)

### Other changes

-   Avoid infinite function call ([e4e4910](https://github.com/peopleware/angular-sdk/commit/e4e491070150d0ca3acb607fcd4e056395588f3e))

## 0.0.79 - 2024-05-16

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.78...0.0.79)

### Other changes

-   Add ppwHttpErrorExtractorWithTranslatedMessages ([3f7b9a0](https://github.com/peopleware/angular-sdk/commit/3f7b9a0845bb13415ae6f3d86c1328403d550523))

-   Use ppwHttpErrorExtractorWithTranslatedMessages in the example app ([fd42a6c](https://github.com/peopleware/angular-sdk/commit/fd42a6c73352da17cc0b955d448748099f40e139))

## 0.0.78 - 2024-05-07

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.77...0.0.78)

### Other changes

-   Add mixinResponsiveObservers ([00c5b0d](https://github.com/peopleware/angular-sdk/commit/00c5b0dc6b72de83ed01acc3e826166a361b6756))

-   Update the example app to make use of the mixinResponsiveObservers ([59c6f29](https://github.com/peopleware/angular-sdk/commit/59c6f2982870d47b01470995a459d155b09c6235))

-   Increase bundle size values ([1ca5f41](https://github.com/peopleware/angular-sdk/commit/1ca5f41d1ceaa3d9a3f17a08be134aaf7d854ef1))

## 0.0.77 - 2024-05-07

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.76...0.0.77)

### Other changes

-   Add script to allow remote debugging on locally running Angular server ([3fd70be](https://github.com/peopleware/angular-sdk/commit/3fd70be9d1301f0d60ab23dd12d9bf6e155b1dab))

-   Fix scroll issue on mobile devices ([3c1dd7e](https://github.com/peopleware/angular-sdk/commit/3c1dd7ec27c07003b10652d9c080ee601a190d1b))

## 0.0.76 - 2024-05-02

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.75...0.0.76)

### Other changes

-   Fix scroll issue in sidebar on mobile devices ([93470ac](https://github.com/peopleware/angular-sdk/commit/93470ac6d8522cb47fdf2e4481ef0a0449683b06))

## 0.0.75 - 2024-04-10

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.74...0.0.75)

### Other changes

-   Fix return type of cleanupRequestData ([259987c](https://github.com/peopleware/angular-sdk/commit/259987cf86aa57b5e173223c3dc3d471d481331e))

## 0.0.74 - 2024-04-05

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.73...0.0.74)

### Other changes

-   Add utility function to remove null or undefined values from objects destined for request data ([bce8adb](https://github.com/peopleware/angular-sdk/commit/bce8adbc6cdc30f61d77e89d5028acbdd8a90151))

-   Improve typing of expectPagedAsyncResultHttpError to make TFilters optional ([34d46f2](https://github.com/peopleware/angular-sdk/commit/34d46f26089e7434ee7d23fe071a09f2e1c03568))

-   Improve typing of expectPagedAsyncResultHttpError to make TEntity optional ([9f42da1](https://github.com/peopleware/angular-sdk/commit/9f42da19248b527d350220b15d7880f2038bcb98))

-   Add default (paged) async result handling ([a83e815](https://github.com/peopleware/angular-sdk/commit/a83e815801e2988fd37f46402a2e16b02518ba69))

-   Add provider and testing utilities for activated route ([60a70b7](https://github.com/peopleware/angular-sdk/commit/60a70b7fa99e25b758eb1e352551b9dd635caf02))

## 0.0.73 - 2024-03-15

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.72...0.0.73)

### Other changes

-   Update to Angular 17.3 ([2db1e8f](https://github.com/peopleware/angular-sdk/commit/2db1e8f6c931932817f86322d8b0dbcd21481fde))

-   Only update hasFormChangesSig when it is different from the current value ([2b52ea8](https://github.com/peopleware/angular-sdk/commit/2b52ea88839de7322ecbf83d603f473783b77d6c))

-   Add parameter to expectAsyncResultHttpError and expectPagedAsyncResultHttpError whether the stream should complete on error ([9c642d0](https://github.com/peopleware/angular-sdk/commit/9c642d029a24f59bd79f5c601af434cd04bb6d5c))

-   Update ng-matero extension internally to 17.1.2 ([4b6c81b](https://github.com/peopleware/angular-sdk/commit/4b6c81b57267bc4af0c1601ea5d5177492a665b8))

-   Remove custom \*cdkDragPlaceholder in table to fix "No provider for InjectionToken CDK_DRAG_PARENT" ([c4daae5](https://github.com/peopleware/angular-sdk/commit/c4daae5139bb0b2641188e6703e5906c66a08c1e))

## 0.0.72 - 2024-03-08

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.71...0.0.72)

### Other changes

-   Update the filters to allow passing a custom button labels and hide the reset button when not desired ([74b33f0](https://github.com/peopleware/angular-sdk/commit/74b33f0ec4c76c10f342c7a22b2f2afffdaa5f29))

## 0.0.71 - 2024-02-23

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.70...0.0.71)

### Other changes

-   Strongly type async result template context ([99e04e6](https://github.com/peopleware/angular-sdk/commit/99e04e6ff858abede33b9715c57fda4548116dc3))

-   Support message-bar content projection for more dynamic message bar contents ([23980fc](https://github.com/peopleware/angular-sdk/commit/23980fcdeae95027dc1577020541ef6c7d2d4b1c))

-   Fix default success message text contrast ([5694e18](https://github.com/peopleware/angular-sdk/commit/5694e1884815974b819c70526de3ce7f19a6ed5e))

-   Improve HttpCallTester subscription hits failure message ([dc3a703](https://github.com/peopleware/angular-sdk/commit/dc3a703c4e0683fa2f66787637f0e745675a67dc))

-   Support hiding side nav when there are no navigation items to show ([d1fdb2f](https://github.com/peopleware/angular-sdk/commit/d1fdb2f840874b7be1627d07445b2314317b18da))

-   Add value reducers ([2716efd](https://github.com/peopleware/angular-sdk/commit/2716efdbf2fe05e6bfe17ee256f2eef9004d8900))

-   Update ng-matero peer dependency for ppwcode/ng-async ([5202ad4](https://github.com/peopleware/angular-sdk/commit/5202ad4082fc84550c9a114e1b8615f2e5100bef))

-   Fix typing on pagedAsyncResult input of pagination bar to use unknown instead of never ([41ddc55](https://github.com/peopleware/angular-sdk/commit/41ddc55226a3bee6d7a8184f63d04ebaf5d06a00))

## 0.0.70 - 2024-02-06

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.69...0.0.70)

### Other changes

-   Support full-width title or description in the expandable card header ([5d66649](https://github.com/peopleware/angular-sdk/commit/5d666495cd6f78bf7783bc05b2851dcb9be0305e))

-   Use full-width title and description in expandable card demo ([4646ed5](https://github.com/peopleware/angular-sdk/commit/4646ed52300c1767d30be09ececb92e0d1537bf7))

-   Support CSS variables to define the height of the expandable card header ([9cbe91e](https://github.com/peopleware/angular-sdk/commit/9cbe91e4688e537e6ee196d3a3b6c541fb9735bd))

-   Use CSS variables for the header height in expandable card demo ([6e0658b](https://github.com/peopleware/angular-sdk/commit/6e0658bb3213217167a32ffcb7e539c89f9f776e))

-   Add a global error handler implementation ([7d674f0](https://github.com/peopleware/angular-sdk/commit/7d674f093910986e638b75d55a41493c606d7d0e))

-   Showcase global error handler ([9eaa319](https://github.com/peopleware/angular-sdk/commit/9eaa3197a870586509c719387261e51c8d6e58e2))

## 0.0.69 - 2024-01-31

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.68...0.0.69)

### Other changes

-   Expose local storage provider and mock from the package ([29ab3ee](https://github.com/peopleware/angular-sdk/commit/29ab3ee3e5a58496ba98baaff7b180b34eef1896))

-   Support prefix in Logger ([22388cb](https://github.com/peopleware/angular-sdk/commit/22388cbee63e0fce7e50dfb09a93d77da7ffbdc9))

## 0.0.68 - 2024-01-29

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.67...0.0.68)

### Other changes

-   Add abstraction for logging with in memory logger ([d26b3d0](https://github.com/peopleware/angular-sdk/commit/d26b3d0865fba3c5e9732aff1c2e10141788a113))

-   Add demo for the in memory logger ([2b90cc5](https://github.com/peopleware/angular-sdk/commit/2b90cc5db694a908b4ed77d8fa19967a66223f63))

-   Support empty page table templates ([a663244](https://github.com/peopleware/angular-sdk/commit/a6632446c1d93b6ade53e3864d66cbe9d11ba2d1))

-   Add demo showcasing an empty table page ([3afaf10](https://github.com/peopleware/angular-sdk/commit/3afaf10cd2f9a1b43b9b4e8fb840f485208c4d4b))

-   Use switch in template of async-result ([5650016](https://github.com/peopleware/angular-sdk/commit/5650016d0d8713511180b7f4bad90a1c92681585))

-   Support templates for when the async result has null as success value ([ff6fe6b](https://github.com/peopleware/angular-sdk/commit/ff6fe6b87f2c276493121f6a93ae9f193bab44d1))

-   Use empty async result templates in table demo ([3b2eba3](https://github.com/peopleware/angular-sdk/commit/3b2eba32bf0e8665591a69096d0638be97f92f31))

## 0.0.67 - 2024-01-19

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.66...0.0.67)

### Other changes

-   Add justify-content-end to global styles ([c766b40](https://github.com/peopleware/angular-sdk/commit/c766b40622a2ca60002ea6daff2a41d012320dbd))

-   Add description to expendable card and option for using content instead of property for title ([c6b6635](https://github.com/peopleware/angular-sdk/commit/c6b66350068cfc935b5776227797ce7400eb0296))

-   Add example of changes to the demo of expendable card ([4d3c31b](https://github.com/peopleware/angular-sdk/commit/4d3c31b2ce3b6b68f11fe6219cf8fe4e041d97a8))

## 0.0.66 - 2024-01-16

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.65...0.0.66)

### Other changes

-   Always apply overflow on the ppw-table-container ([174d223](https://github.com/peopleware/angular-sdk/commit/174d223bfc7fe31a69c75f19b9ce42f91abfef36))

-   Include a map of status code for improved status code error handling ([90119c9](https://github.com/peopleware/angular-sdk/commit/90119c9acbfec90de6d629ac1e3c33b422163c3f))

-   Ignore .nx folder in Git ([70d4e38](https://github.com/peopleware/angular-sdk/commit/70d4e386d2c71b13f66d17f923159cc1969c6c47))

-   Split error handling from async-result model ([fdd82c0](https://github.com/peopleware/angular-sdk/commit/fdd82c0020099d9545d7a9d65f593bcac2cbd77c))

-   Support overriding the default error extractor ([b2e4381](https://github.com/peopleware/angular-sdk/commit/b2e4381532f8b7649c7056cdc92a56be5afea2c9))

-   Ensure newline characters are rendered as a new line in the confirmation dialog ([ff46434](https://github.com/peopleware/angular-sdk/commit/ff46434ee73580e181918d33863a9cc0cd19f2ff))

## 0.0.65 - 2023-12-21

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.64...0.0.65)

### Other changes

-   Introduce module for AsyncResult ([f900d43](https://github.com/peopleware/angular-sdk/commit/f900d4306f0aa0dd6c4645404347492f07a80595))

-   Load async result templates using a directive instead of a string ([faaeeb5](https://github.com/peopleware/angular-sdk/commit/faaeeb50549e70c89014d1450fd33eb511b0bb4a))

-   [v16->v17] Update to Angular v17 ([1e2754a](https://github.com/peopleware/angular-sdk/commit/1e2754a01560cde4505a81d5642cf166d548a65f))

-   [v16->v17] Switch to the new ESBuild builder ([8d0cfdb](https://github.com/peopleware/angular-sdk/commit/8d0cfdb85b3eb37c62d902d804f3072049292078))

-   [v16->v17] Update and run Prettier 3.1.1 with config 7.0.0 ([54989e5](https://github.com/peopleware/angular-sdk/commit/54989e5c64b4e1921056fe93d59143b74131f40e))

-   [v16->v17] Switch to the new control flow syntax ([f0d851e](https://github.com/peopleware/angular-sdk/commit/f0d851e479a69cda1fc24b193b15d79404d09709))

-   [v16->v17] Fix ng serve warning on property that is not null or undefined ([1a52245](https://github.com/peopleware/angular-sdk/commit/1a522454ff02eaa1b35165cb131749accde467d7))

-   [v16->v17] Update ng-matero extensions ([99f75fc](https://github.com/peopleware/angular-sdk/commit/99f75fc098688c5e8e9b57ea59ee871632a58469))

-   [v16->v17] Update ppwcode projects peer dependencies ([44b78b0](https://github.com/peopleware/angular-sdk/commit/44b78b0b1e1329ae5cd3fe518c5cee24f23178bf))

## 0.0.64 - 2023-12-20

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.63...0.0.64)

### Other changes

-   Export table column directives from @ppwcode/ng-common-components ([060441e](https://github.com/peopleware/angular-sdk/commit/060441ecd39d9a21075a52bcfa66ccc5ec91f313))

## 0.0.63 - 2023-12-20

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.62...0.0.63)

### Other changes

-   Fix navigation panel not closing on mobile devices after clicking a navigation item ([56a38ed](https://github.com/peopleware/angular-sdk/commit/56a38ed1f70e0fd4188b7e1806b1bcef726f62ff))

-   Add flex-column to left-sidenav scss ([2ba98fd](https://github.com/peopleware/angular-sdk/commit/2ba98fde721d4a629c3a1756898955304ef21ca4))

-   Fix table height check for applying styles ([b2b58a5](https://github.com/peopleware/angular-sdk/commit/b2b58a5c5c067433770ed330192d666afc306a4c))

-   Correctly apply padding and overflow for fixed table heights ([69456f1](https://github.com/peopleware/angular-sdk/commit/69456f13b47aab26aa9767c6fd6773c5935bbb0e))

-   Support hiding the table header ([51dcf94](https://github.com/peopleware/angular-sdk/commit/51dcf94cd67ed05b27f1250ed1da56af44d19e8b))

-   Move column header styles to header configuration option of table ([f95a8b1](https://github.com/peopleware/angular-sdk/commit/f95a8b1d731ad2bfafa43fa591d29a250183471b))

-   Move column header templates to header configuration option of table ([00bf3e7](https://github.com/peopleware/angular-sdk/commit/00bf3e7bead527f23646fa1d157b203040f84545))

-   Move column row styles to columns configuration option of table ([86f4087](https://github.com/peopleware/angular-sdk/commit/86f408778c8a7eaaf5f76081e82683abb5e4b0f6))

-   Move column widths to columns configuration option of table ([6a6b201](https://github.com/peopleware/angular-sdk/commit/6a6b201b55e102a1e99d61e5f2a8e529c03efea1))

-   Move column ignore clicks to columns configuration option of table ([6eab5e7](https://github.com/peopleware/angular-sdk/commit/6eab5e7a13389b5a99ba210b5ff1d720d2f82dac))

-   Move rowClickAction and rowHighlightOnHover to rows configuration option of table ([16bf058](https://github.com/peopleware/angular-sdk/commit/16bf0588a23a2d56634048e8645bfc82987a4671))

-   Support setting the margin for a ppw-message-bar through a CSS variable ([e3edaa4](https://github.com/peopleware/angular-sdk/commit/e3edaa4c84b21605ec6e1401d9e7f4a97e54b83e))

-   Add default font size for navigation items ([7004d24](https://github.com/peopleware/angular-sdk/commit/7004d24b252bdd937a30cce4f73f3fe95ac3b913))

-   Support setting the toolbar background ([aa4b48f](https://github.com/peopleware/angular-sdk/commit/aa4b48fb56f71a85782d9691711b5484db7877e2))

-   Move column definitions from class to template ([2b31af8](https://github.com/peopleware/angular-sdk/commit/2b31af8d6e8f1c037792af4487eea065fc7f2919))

## 0.0.62 - 2023-12-13

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.61...0.0.62)

### Other changes

-   Add code to get a more precise errorcode from a unique constraint violation ([73ad449](https://github.com/peopleware/angular-sdk/commit/73ad449442ff13455f644653ed0183067a5612ec))

## 0.0.61 - 2023-12-12

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.60...0.0.61)

### Other changes

-   Fix issue with filename retrieval from content disposition ([6a38247](https://github.com/peopleware/angular-sdk/commit/6a38247d33cdfcd059dec5aee67d2f3bf31b92e0))

## 0.0.60 - 2023-12-12

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.59...0.0.60)

### Other changes

-   Fix formatting ([065e2dd](https://github.com/peopleware/angular-sdk/commit/065e2dd0352a09928b6fdec0bb840101659c5cd8))

-   Add ng-testing as ng-unit-testing to the ppwcode angular-sdk ([c9632d4](https://github.com/peopleware/angular-sdk/commit/c9632d49ce74a4b77b017e871ab7169155abca9b))

## 0.0.59 - 2023-12-12

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.58...0.0.59)

### Other changes

-   Add FileDownload code to get the filename from the response of the BE ([517dd3f](https://github.com/peopleware/angular-sdk/commit/517dd3fecff917f9eaababc0143feba82dd0e75b))

## 0.0.58 - 2023-12-05

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.57...0.0.58)

### Other changes

-   Extend pagination mixin with a method to directly navigate to a certain page number ([de24508](https://github.com/peopleware/angular-sdk/commit/de24508177bcf9f163572185c5e60f04522ca8e6))

## 0.0.57 - 2023-11-29

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.56...0.0.57)

### Other changes

-   Show the move-cursor when hovering over the drag-handle ([652beed](https://github.com/peopleware/angular-sdk/commit/652beed76a5e3d592b0ea828bddbb0a6ce5b64c3))

-   Strip empty properties from the form-object before comparing ([f276a23](https://github.com/peopleware/angular-sdk/commit/f276a23c49915bb92d010b2f14b49d7e272f777d))

## 0.0.56 - 2023-11-28

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.55...0.0.56)

### Other changes

-   Add mixin for form changes detection based on value ([9a523ec](https://github.com/peopleware/angular-sdk/commit/9a523ecca94b57757726b0f53a781c547d611be6))

-   Invert navigation icons ([967e068](https://github.com/peopleware/angular-sdk/commit/967e068d9ad8bd071a27873ef6544104cf368253))

## 0.0.55 - 2023-11-28

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.54...0.0.55)

### Other changes

-   Add extra possible http error structure to extractHttpError ([c218e7f](https://github.com/peopleware/angular-sdk/commit/c218e7ff6d8dc2206fdc04d2d14a7a3e60152cd1))

## 0.0.54 - 2023-11-28

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.53...0.0.54)

### Other changes

-   Use another icon for a closed navigation item with children ([e5db7fe](https://github.com/peopleware/angular-sdk/commit/e5db7febaf31701aa84069b63959b33d556d1982))

-   Make sure the drawer can't be closed with the escape key ([fdcb7d2](https://github.com/peopleware/angular-sdk/commit/fdcb7d24d69684062f80bafbb292c1e15ee9b25c))

-   Restyle the drag-handle to take less space and have a more subtle color ([c143be1](https://github.com/peopleware/angular-sdk/commit/c143be143f4ba612307a3251a002647abf4cc434))

## 0.0.53 - 2023-11-24

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.52...0.0.53)

### Other changes

-   Make sure only the drag handle allows row dragging ([24ac3a9](https://github.com/peopleware/angular-sdk/commit/24ac3a972b7fcbe3f9cc9a9329cbd314fe17d8a6))

-   Pass the dataSource to the cdkDropListData prop ([65a50b5](https://github.com/peopleware/angular-sdk/commit/65a50b5889bdae0a4fa0f567ae774957d325460b))

-   Update the demo of the filter table to enable/disable row dragging ([8b02356](https://github.com/peopleware/angular-sdk/commit/8b0235608b5077485bd30e7e8c9f389af49c1a92))

-   Fix linting error ([ca00ad1](https://github.com/peopleware/angular-sdk/commit/ca00ad12087394e694cbdafef4f87a4f7fc5ad65))

## 0.0.52 - 2023-11-24

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.51...0.0.52)

### Other changes

-   Add support to enable row dragging on ppw-table ([390ffd2](https://github.com/peopleware/angular-sdk/commit/390ffd27482063f181bb3d861452798474884989))

-   Update the example to showcase the row drag & drop ([89f67ab](https://github.com/peopleware/angular-sdk/commit/89f67ab41a7e5aedddb0bbaaa6a31561c4a6bbfb))

## 0.0.51 - 2023-11-23

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.50...0.0.51)

### Other changes

-   Support confirmation dialogs without a cancel button ([58e8f6f](https://github.com/peopleware/angular-sdk/commit/58e8f6fd52b3044ded7d589588e94e4025196001))

## 0.0.50 - 2023-11-20

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.49...0.0.50)

### Other changes

-   Fix scrollbar styling in the filter-table demo page ([b155d79](https://github.com/peopleware/angular-sdk/commit/b155d79b0eb98882c3e8de2745d824a43adf13c6))

-   Fix mtx-loader being too high pushing card after it off the viewport ([86d9cb0](https://github.com/peopleware/angular-sdk/commit/86d9cb01332af046e146879ccca4e16061a72500))

-   Make sure that events are emitted when selection changes ([dc8d911](https://github.com/peopleware/angular-sdk/commit/dc8d9113a80448ca275aeff1d9ede29b017d83a1))

-   Add typing ([98375ec](https://github.com/peopleware/angular-sdk/commit/98375ec52a0c141967dee2a01baf44b65168557e))

-   Fix the select-all/indeterminate checkbox ([8ba6459](https://github.com/peopleware/angular-sdk/commit/8ba6459877094308d2afbfd07ca5f58ece012c61))

## 0.0.49 - 2023-11-20

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.48...0.0.49)

### Other changes

-   Update the filter-table example to make the search results paged ([edf368c](https://github.com/peopleware/angular-sdk/commit/edf368c5ff9aa590b4ca8d45aa8e6f8349ad3e1d))

-   Update the filter-table example to make the search results paged ([4d09d17](https://github.com/peopleware/angular-sdk/commit/4d09d17cb1049643b8031ab66de5dcfcc3a81707))

-   Add support to configure the paginator ([c7d00cb](https://github.com/peopleware/angular-sdk/commit/c7d00cb87454668520bb05ad7cf8d07d7317a4c3))

-   Update the example to configure the paginator ([a671ce6](https://github.com/peopleware/angular-sdk/commit/a671ce643ddc26f37f35d3064334145e8a69a08f))

-   Set default pageSize to 5 ([ace9485](https://github.com/peopleware/angular-sdk/commit/ace94851a1813b911c422686e893813a05b23c90))

-   Fix checkbox selection in combination with pagination ([7fd604c](https://github.com/peopleware/angular-sdk/commit/7fd604cddae12ecc5ecce74e12e8d4e99150ac59))

## 0.0.48 - 2023-11-15

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.47...0.0.48)

### Other changes

-   Add support to pass row index to template cells ([46b8c7c](https://github.com/peopleware/angular-sdk/commit/46b8c7cb8ddef2ed5a404c2059d3eb782c9f47ad))

-   Show the row index as an extra column in the filter table demo component ([9a20acc](https://github.com/peopleware/angular-sdk/commit/9a20acc60863f3161176ebf2b8eae4e87de475e8))

## 0.0.47 - 2023-11-09

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.46...0.0.47)

### Other changes

-   Update GitHub action steps to use latest versions of tasks ([58b0d68](https://github.com/peopleware/angular-sdk/commit/58b0d681b275703971641354b09b77cbde283761))

-   Mark packages compatible with Angular 17 ([2b77d9f](https://github.com/peopleware/angular-sdk/commit/2b77d9f9585a7302363a5869b4304271734b5ce2))

## 0.0.46 - 2023-11-09

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.45...0.0.46)

### Other changes

-   Update shown version number also to v0.0.45 ([113c151](https://github.com/peopleware/angular-sdk/commit/113c151cb8c535864794b95363a235ab525c1ede))

-   Add a required trackBy function as ppw-table input ([7bb5d87](https://github.com/peopleware/angular-sdk/commit/7bb5d87a68d6c4b4ccec7cc96e715299e617403d))

-   Extend filter-table demo to showcase trackBy function ([cbce035](https://github.com/peopleware/angular-sdk/commit/cbce035fc5f9fe484b5a14fa5e5add2c92cd7698))

-   Mark columns and data inputs as required on ppw-table ([7412e14](https://github.com/peopleware/angular-sdk/commit/7412e14dbe439a1b6452a310750a1903057c894e))

-   Cleanup ppw-table linting warnings and errors ([39a88a5](https://github.com/peopleware/angular-sdk/commit/39a88a51db5f17f567df88ce5fae3eec7c17221e))

-   Update ppw-table tests for required trackBy function ([8eec0e4](https://github.com/peopleware/angular-sdk/commit/8eec0e404d7c172d0af5a398ab7b78d28cdb7c82))

## 0.0.45 - 2023-11-03

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.44...0.0.45)

### Other changes

-   Add a way to use a template header cell instead of using the column label ([01cc385](https://github.com/peopleware/angular-sdk/commit/01cc385e71fae104142b79ffbb4726988e1128f9))

-   Remove unused ngIf from imports ([f316de3](https://github.com/peopleware/angular-sdk/commit/f316de345e65dc45485d86e006af4871ddb35156))

-   Update the filter-table example to show a template in the header row of the active-column ([2774e30](https://github.com/peopleware/angular-sdk/commit/2774e30847ad3d3083f26742d49b42b5ee047f2c))

-   Align the active header and column contents centered ([5229522](https://github.com/peopleware/angular-sdk/commit/52295225cdf23d6f177778b54f5ae22bbeb1c2e6))

## 0.0.44 - 2023-10-26

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.43...0.0.44)

### Other changes

-   Add token, mock and provider for working with local storage ([66158e0](https://github.com/peopleware/angular-sdk/commit/66158e04a3d4eafbf519b12621540b6434283938))

-   Add a way to clear the search-filter-state ([874d0e7](https://github.com/peopleware/angular-sdk/commit/874d0e7f6db978118de46010958dcce83a8a1946))

## 0.0.43 - 2023-10-17

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.42...0.0.43)

### Other changes

-   Clean up output of ng test ([3be8794](https://github.com/peopleware/angular-sdk/commit/3be8794202888cc8009c11fcb1b83fce01175284))

-   Add if statement on the toolbar ([1af5970](https://github.com/peopleware/angular-sdk/commit/1af5970ee2f8d704c5e5a2c0c2a53d1d6455e535))

-   Bump to version 0.0.43 ([66eb344](https://github.com/peopleware/angular-sdk/commit/66eb344f6518a7ae2142b17630f968f847bf5957))

## 0.0.42 - 2023-10-17

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.41...0.0.42)

### Other changes

-   Fix sidenav not closing when navigation occurs on a smaller device ([3987ccf](https://github.com/peopleware/angular-sdk/commit/3987ccf93899ab02b9ff7c247d666f2fb6c17ef2))

-   Don't remove hamburger icon in toolbar when sidenav menu is opened in overlay mode ([9c23d73](https://github.com/peopleware/angular-sdk/commit/9c23d73ce557ab18cc0bbddac8e8e06ed26129c7))

## 0.0.41 - 2023-10-16

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.40...0.0.41)

### Other changes

-   Update docs of navigation item children wrapper CSS variables ([1f41677](https://github.com/peopleware/angular-sdk/commit/1f41677390021558cf9c35bbe781feb66af6ab24))

-   Support hiding wireframe on routes ([a3c8ff4](https://github.com/peopleware/angular-sdk/commit/a3c8ff43f05e16a8bd4d1b619c6f7c3543a70536))

-   Bump to version 0.0.41 ([09d3784](https://github.com/peopleware/angular-sdk/commit/09d378404d1405d3ea4485bed138060921358be2))

## 0.0.40 - 2023-10-13

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.39...0.0.40)

### Other changes

-   Fix left margins not being applied to navigation items ([d93a1d5](https://github.com/peopleware/angular-sdk/commit/d93a1d536c6c07a84691d838b2e6adb1ba13b550))

-   Add support for a wrapper around the navigation item children ([fed555c](https://github.com/peopleware/angular-sdk/commit/fed555c0728aaa5d205188d010a2dc2d1740c79a))

## 0.0.39 - 2023-10-13

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.38...0.0.39)

### Other changes

-   Fix class applied to table cell ([3d97be2](https://github.com/peopleware/angular-sdk/commit/3d97be27e09ad4d0bc2d69e18100c77d8ed99568))

-   Fix hover, focus and header description colors of expandable card ([a7b66be](https://github.com/peopleware/angular-sdk/commit/a7b66be717521884a6253903597781388eec63b0))

## 0.0.38 - 2023-10-12

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.37...0.0.38)

### Other changes

-   Fix eslint warning for no explicit any on async result component ([7e449c3](https://github.com/peopleware/angular-sdk/commit/7e449c34faeb9fbd59420fd8e9f4d72f5916af2e))

-   Allow overridable ppw variables for theming the expandable card ([150ce08](https://github.com/peopleware/angular-sdk/commit/150ce08720376506d30b2e20bce9de1d38c5cd44))

-   Improve theming ability of message bar component ([b5502b8](https://github.com/peopleware/angular-sdk/commit/b5502b84762b12c24532fbfb478542e95a0e8f8d))

-   Add message bar demo page ([360b82f](https://github.com/peopleware/angular-sdk/commit/360b82fbc43665690b3191c9a4da29193d7a99a3))

-   Add ppw prefix to message bar internal classes ([1e6f824](https://github.com/peopleware/angular-sdk/commit/1e6f824d4d232788d7c77b8ab3bed0669cafb2c1))

-   Improve theming ability of table component ([32d16ba](https://github.com/peopleware/angular-sdk/commit/32d16bae90ad2ccd86b6fcbbb88c99b588928d3f))

-   Make confirmation dialog title themeable ([c74fb33](https://github.com/peopleware/angular-sdk/commit/c74fb33b1205fc80b07e50e382821de98c85290e))

-   Add demo for confirmation dialog ([dab3eba](https://github.com/peopleware/angular-sdk/commit/dab3ebab8981c451f9608f122d15c3b193dfec96))

-   Make left sidenav component more themeable ([a54414d](https://github.com/peopleware/angular-sdk/commit/a54414d80b2de10319a929012720009b5e2ab116))

-   Make toolbar component more themeable ([948b149](https://github.com/peopleware/angular-sdk/commit/948b149df8113755a596a8a800874f695bd6e32c))

-   Make app wireframe component more themeable ([122daf3](https://github.com/peopleware/angular-sdk/commit/122daf3b9f045488a32b18b8f1f4d0b76adfa9c4))

-   Fix variable name of sidenav navigation item icon color ([08ec804](https://github.com/peopleware/angular-sdk/commit/08ec804a5b506c4cb9db756d34eddbfd984b6e67))

-   Update readme files of related packages to include details about the CSS variables that can be used ([a07350a](https://github.com/peopleware/angular-sdk/commit/a07350a4498de516500fdb463f552bc714077eca))

-   Remove unnecessary unit test files from demo app ([e5e7a18](https://github.com/peopleware/angular-sdk/commit/e5e7a18d944502e40c1344b2c21551f4c86a4937))

## 0.0.37 - 2023-10-12

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.36...0.0.37)

### Other changes

-   Add animation to table rows ([bc0d9ab](https://github.com/peopleware/angular-sdk/commit/bc0d9ab0910e4763af706ea4c0be425b228eb34b))

## 0.0.36 - 2023-10-06

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.35...0.0.36)

### Other changes

-   Add token, mock and provider for working with session storage ([1682567](https://github.com/peopleware/angular-sdk/commit/1682567decda707cbbea2ee0d40f43006d2992c7))

-   Add AbstractSearchFilterState to easily to store search filters ([98ceebb](https://github.com/peopleware/angular-sdk/commit/98ceebb2fefac8c0fa22f829bccf8c5c81ef4e53))

## 0.0.35 - 2023-09-28

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.34...0.0.35)

### Other changes

-   Add option to configure column header styling ([d255fde](https://github.com/peopleware/angular-sdk/commit/d255fdee5e73e2000715e9a3a0aac06caf55d21e))

-   Update table demo with custom column header styling ([2f2999a](https://github.com/peopleware/angular-sdk/commit/2f2999a7c86648bdf211498480ec54afdef5013c))

## 0.0.34 - 2023-09-28

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.33...0.0.34)

### Other changes

-   Add option to configure column styling ([5e013f4](https://github.com/peopleware/angular-sdk/commit/5e013f48c356c6974ca4fd84fc5bdc543f780ed4))

-   Update table demo with custom column styling ([08d1854](https://github.com/peopleware/angular-sdk/commit/08d18541371d76de158850cdfb2f7e933d13fe80))

## 0.0.32 - 2023-09-26

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.31...0.0.32)

### Other changes

-   Keep the status of the sidebar open/close state in a boolean. This avoids ExpressionChanged errors ([2f316a4](https://github.com/peopleware/angular-sdk/commit/2f316a4dd544a45a643ae4c871ff84b87c6eaf65))

## 0.0.31 - 2023-09-26

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.30...0.0.31)

### Other changes

-   Rename ppw-toolbar-content to ppw-toolbar-right-content ([3c97e0e](https://github.com/peopleware/angular-sdk/commit/3c97e0e7f2802305dc1736e2794a5d420c024777))

## 0.0.30 - 2023-09-25

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.29...0.0.30)

### Other changes

-   Add an option to enable/disable the toolbar title ([ce2f784](https://github.com/peopleware/angular-sdk/commit/ce2f784cad40cc65d74b97fdd1a04ba44bbf63e3))

-   Add an option set the toolbar height in px ([aa38795](https://github.com/peopleware/angular-sdk/commit/aa38795e84bc69dcb0045d4ecdbcd5a0f6b675d9))

-   Update demo app to have a toolbar with a height of 60px ([470c0f9](https://github.com/peopleware/angular-sdk/commit/470c0f9067e6db357da49c6780202316f66fab00))

-   Give ng-content a name so more than 1 ng-content can be put on the toolbar component ([3eae1e1](https://github.com/peopleware/angular-sdk/commit/3eae1e1ee30897fc678c26777a3e4fd695cba5e1))

-   Add support to pass content for the left side of the toolbar ([ca22225](https://github.com/peopleware/angular-sdk/commit/ca2222562c5b2050a4119633b282e44d298f77a9))

-   Make variables public ([0292f58](https://github.com/peopleware/angular-sdk/commit/0292f5820e327e736274366c6c405b27f3e72deb))

-   Update demo page to allow toggling the page title on or off ([5a21c81](https://github.com/peopleware/angular-sdk/commit/5a21c81a360481bc3cce1ee46e493ef4e68e6c22))

-   Show a logo in the toolbar and allow toggling it on or off ([71a5c59](https://github.com/peopleware/angular-sdk/commit/71a5c5985b0466691b4c4be1e143e287a921b933))

-   Add a selector to all cell components to ensure unique names are generated in the resulting html code ([4725dcb](https://github.com/peopleware/angular-sdk/commit/4725dcbccac0f987ae66e2c30dfbf672e0e42918))

## 0.0.29 - 2023-09-25

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.28...0.0.29)

### Other changes

-   Allow devs to add a sidebar that should be explicitly opened, even on larger screen sizes ([b85e088](https://github.com/peopleware/angular-sdk/commit/b85e088e1c7c14874637843d7b2cd877b35702e1))

-   Make sure the sidebar comes of the opened screen when closedByDefaultOnLargerDevice is true ([9f3617e](https://github.com/peopleware/angular-sdk/commit/9f3617e0b029b5513fe61c5cf75086f3aae3f4fa))

-   Improve styling on the table demo page ([afccbc1](https://github.com/peopleware/angular-sdk/commit/afccbc183abdcc113d745fbbf122ca1b3d736056))

## 0.0.28 - 2023-09-25

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.27...0.0.28)

### Other changes

-   Add a way to enable sticky headers on a ppw table ([0f35555](https://github.com/peopleware/angular-sdk/commit/0f355553bda2d77c60ccb908793a2cd83398edac))

-   Update table demo with sticky header ([488e593](https://github.com/peopleware/angular-sdk/commit/488e593e9a91c82369f8c8f4453f8f715a9f459f))

## 0.0.27 - 2023-09-22

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.26...0.0.27)

### Other changes

-   Replace fileSaver with fileSaverEs to avoid warnings ([038f8d5](https://github.com/peopleware/angular-sdk/commit/038f8d5cd93fe2a3497bf0534d59599f06f92d27))

## 0.0.26 - 2023-09-22

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.25...0.0.26)

### Other changes

-   Don't pass columnName to row click function ([7f42379](https://github.com/peopleware/angular-sdk/commit/7f42379b548a08d017dd5ae6d994b03d6b2a90bc))

## 0.0.25 - 2023-09-21

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.24...0.0.25)

### Other changes

-   Make wireframe toolbar sticky and only the content scrollable ([f8ff8e1](https://github.com/peopleware/angular-sdk/commit/f8ff8e11ad542e50d06068542d16b05878391b14))

## 0.0.24 - 2023-09-21

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.23...0.0.24)

### Other changes

-   Export the save-downloaded-file function ([2b366a0](https://github.com/peopleware/angular-sdk/commit/2b366a024c91cd9a2e916773631af2f67945a036))

-   Fix import ([7e67db4](https://github.com/peopleware/angular-sdk/commit/7e67db4fa9d285db2ee4925afb0d7f05ea806cd7))

## 0.0.23 - 2023-09-21

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.22...0.0.23)

### Other changes

-   Add filesaver to ng-async lib ([3f83996](https://github.com/peopleware/angular-sdk/commit/3f8399672c08d4cff8b23173ccc56417588fb0f0))

## 0.0.22 - 2023-09-20

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.21...0.0.22)

### Other changes

-   Move the row click function to the cells and pass the column name. Also allow ignoring click on specific columns. ([2c847b3](https://github.com/peopleware/angular-sdk/commit/2c847b3e0e7ed7cc95b0092dc80a535ea43bc367))

## 0.0.21 - 2023-09-19

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.20...0.0.21)

### Other changes

-   Remove shadow from title text since this is too opinionated ([d7b8820](https://github.com/peopleware/angular-sdk/commit/d7b88207aa2bcb2572ffaf0a227d114f254a352e))

-   Allow overriding the font-size of the menu items ([df7afc7](https://github.com/peopleware/angular-sdk/commit/df7afc7e485c7ea5e7473a2229c2f468c26391f2))

-   Add support to pass a rowClickAction to the table options ([da7a07e](https://github.com/peopleware/angular-sdk/commit/da7a07e40b0de112e3be76d34af45b44e2be64d5))

-   Add support to highlight table rows on hover ([1f7d34c](https://github.com/peopleware/angular-sdk/commit/1f7d34c1f7b2064091cc15fc533e115679483bbd))

## 0.0.20 - 2023-09-18

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.19...0.0.20)

### Other changes

-   Translates a DTO property of type PpwTranslationMap to the currently active locale language with fallback to english (en) ([2ac7375](https://github.com/peopleware/angular-sdk/commit/2ac7375c9ea5f6363b694dcbfc8adfef63a95628))

-   Add truthyFirst RXJS operator ([e31e5dc](https://github.com/peopleware/angular-sdk/commit/e31e5dcd1d67f25928de9d0fc1a985d14b405458))

-   Add truthyFilter RXJS operator ([f4d818f](https://github.com/peopleware/angular-sdk/commit/f4d818f2e3031d55fd326c853d1b88a5537c0635))

-   Add some info in the README files of ng-common-components and ng-common ([193a149](https://github.com/peopleware/angular-sdk/commit/193a149505637693c3647bccf2035aa9e0b111d0))

## 0.0.19 - 2023-09-18

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.18...0.0.19)

### Other changes

-   Introduce PpwTableOptions to allow passing fixed column widths for the table ([d5b0629](https://github.com/peopleware/angular-sdk/commit/d5b0629e9a4fa87b6d76d21e330abbb220b46da2))

-   Extend filter table example to use fixed column widths ([2834e84](https://github.com/peopleware/angular-sdk/commit/2834e84a182838098d14d6f8dbe628dd30ffe7a1))

-   Extend comments on PpwTableOptions ([5afc3f8](https://github.com/peopleware/angular-sdk/commit/5afc3f89d0a1b99e308b4d0320f100f80cbdf9e8))

## 0.0.18 - 2023-09-18

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.17...0.0.18)

### Other changes

-   File formatting ([108a4cb](https://github.com/peopleware/angular-sdk/commit/108a4cb511bfcb4282dd1f291aa4237e5b1e5356))

-   Define defaultPageSize in a public global variable to allow overriding it in a per component basis ([cf80269](https://github.com/peopleware/angular-sdk/commit/cf80269aecf1620065f9a2ebe73ffb2e592e89c8))

-   Fix lint error ([521eaf9](https://github.com/peopleware/angular-sdk/commit/521eaf9bfde335b9c3fa2e77a7d0812026625707))

## 0.0.17 - 2023-09-18

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.16...0.0.17)

### Other changes

-   Do not render a table in a card, this is too opinionated ([bcc0367](https://github.com/peopleware/angular-sdk/commit/bcc0367f0909ae6d84998245dd58332d2425455c))

## 0.0.15 - 2023-09-15

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.14...0.0.15)

### Other changes

-   Update readme ([67c591c](https://github.com/peopleware/angular-sdk/commit/67c591c4e0d9f4813280de4c3ccddd2b3847fe9c))

-   Add support for a FormArray of FormGroup instances as table data ([654acf2](https://github.com/peopleware/angular-sdk/commit/654acf26c7fb9b7c636da0cdea63f5edbd5399f1))

## 0.0.14 - 2023-09-15

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.13...0.0.14)

### Other changes

-   Make sure ng-state-management gets published to npmjs ([f57def7](https://github.com/peopleware/angular-sdk/commit/f57def7ba7417874b1d0f07fa3c3a803efe10e05))

## 0.0.13 - 2023-09-15

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.12...0.0.13)

### Other changes

-   Expose paged-entities.mock ([0c7dfeb](https://github.com/peopleware/angular-sdk/commit/0c7dfebd0d2fcf219113c7bbcb1aa32be7031278))

-   Add error-codes to the ng-async project ([af6e24c](https://github.com/peopleware/angular-sdk/commit/af6e24c1e71b3fa66b34a6c6b0abc4f01027257c))

## 0.0.12 - 2023-09-15

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.11...0.0.12)

### Other changes

-   Rename PagedList to PagedAsyncResult ([ef2a034](https://github.com/peopleware/angular-sdk/commit/ef2a03461c3492e6672038ada861d75960d9e9c0))

-   Add paged-entities.mock ([6e267a2](https://github.com/peopleware/angular-sdk/commit/6e267a2f84610bf53a932ced0964ce4f595fd9e7))

## 0.0.11 - 2023-09-14

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.10...0.0.11)

### Other changes

-   Add the possibility to pass a format function to a number cell ([93e580e](https://github.com/peopleware/angular-sdk/commit/93e580e853906df75f1e42dbecb3e4ae9c42923b))

-   Update the filter-table demo to showcase numeric possibilities ([ff010a3](https://github.com/peopleware/angular-sdk/commit/ff010a3070cc7051043673cc6e0089afacaa397a))

-   Add possibility to disable the search button on certain conditions ([5fcd7ed](https://github.com/peopleware/angular-sdk/commit/5fcd7ede981272e9679f9a2d54c6c4ae88d62b87))

-   Add support for templateRef columns to table ([e4c4f99](https://github.com/peopleware/angular-sdk/commit/e4c4f99c103cd8daed67c4f8b2f6bd4fb04a6b35))

-   Make sure the checkbox column is only generated when needed and the subscription is destroyed ([146ed0d](https://github.com/peopleware/angular-sdk/commit/146ed0df5144a9229a765e7300b1eac9d9d0a8fd))

-   Update the table-filter demo ([c418c2b](https://github.com/peopleware/angular-sdk/commit/c418c2b9351a38a11d3cd306d6e718eb18d75e4e))

## 0.0.10 - 2023-09-14

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.9...0.0.10)

### Other changes

-   Add row selection to the table component ([5a1e012](https://github.com/peopleware/angular-sdk/commit/5a1e0127d84abce9bfa0be212db32f4e5453bce2))

-   Add row selection to the filter table demo page ([12f42ce](https://github.com/peopleware/angular-sdk/commit/12f42cebdc554794bd01868bc23dfb03d69d0d87))

## 0.0.9 - 2023-09-13

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.8...0.0.9)

### Other changes

-   Add SearchFilterComponent ([37addec](https://github.com/peopleware/angular-sdk/commit/37addec12a03e5ee09aa5d87321f767f54f6f9a9))

-   Add search-filter to the filter-table demo page ([91826e6](https://github.com/peopleware/angular-sdk/commit/91826e6115c3a49bf928fc5c6907663493f4639c))

## 0.0.8 - 2023-09-13

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.7...0.0.8)

### Other changes

-   Add TranslatedPageTitleStrategy ([c6c8323](https://github.com/peopleware/angular-sdk/commit/c6c83234c804dc7c7acb1bf212332f9c98e14ac2))

-   Replace fr/nl language with en ([74185b0](https://github.com/peopleware/angular-sdk/commit/74185b0d1fdff881a7fcffde523ed5f5bf1c3847))

-   Rename home to expandable-card-demo ([c890bbb](https://github.com/peopleware/angular-sdk/commit/c890bbbd4178e86635f384ed703112e49089672a))

-   The toolbar should not set the title ([4201abb](https://github.com/peopleware/angular-sdk/commit/4201abb717f9c86968098c776210714c0ed78336))

-   Configure the TitleStrategy ([ae496ad](https://github.com/peopleware/angular-sdk/commit/ae496ada97f38ede24d480295167b44cca8d07a0))

-   Rename demo page to filter-table ([6558cf6](https://github.com/peopleware/angular-sdk/commit/6558cf6d38f398f44fe4ffa3d778e0e9a9e2c624))

-   Remove unused ToolbarOptions ([238b80f](https://github.com/peopleware/angular-sdk/commit/238b80fe2031507933c940143370fa0608146753))

## 0.0.7 - 2023-09-13

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.6...0.0.7)

### Other changes

-   Add table component to ng-common-components ([a815364](https://github.com/peopleware/angular-sdk/commit/a8153646994e04bef81e8c4e11c8180548c2c8ad))

-   Add table to demo page ([4d00b9c](https://github.com/peopleware/angular-sdk/commit/4d00b9c4ea739c950642202d1105480d79de0deb))

-   Add missing eslintrc.json ([fcd87a5](https://github.com/peopleware/angular-sdk/commit/fcd87a511319795978d34cb233e766d43c87864a))

-   Lock versions in package.json ([fb1597e](https://github.com/peopleware/angular-sdk/commit/fb1597e39446d9e4888185d86519dc25b490a3fa))

-   Override deep-equal to make eslint work again ([f5ed3e3](https://github.com/peopleware/angular-sdk/commit/f5ed3e3b1e929c935ddc7c1f703ca0d3c76b0563))

## 0.0.6 - 2023-09-13

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.5...0.0.6)

### Other changes

-   Add ng-state-management library to the projects ([a76ccf5](https://github.com/peopleware/angular-sdk/commit/a76ccf5d3eef2050fc3c221413eb1c6bdff4a53b))

## 0.0.5 - 2023-09-12

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.4...0.0.5)

### Other changes

-   Add missing priority to img ([540b8c9](https://github.com/peopleware/angular-sdk/commit/540b8c98929f8233cef8c2aa7b6b5fe18f0e8b20))

-   Add expandable-card component ([37d3f14](https://github.com/peopleware/angular-sdk/commit/37d3f146a068b0138ed0fda9f5c6104c72df9c16))

-   Fix tests ([a7998d9](https://github.com/peopleware/angular-sdk/commit/a7998d9e7448bf51cf68dd0cb39cbf0cb405937b))

## 0.0.4 - 2023-09-12

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.3...0.0.4)

### Other changes

-   Allow passing logo width & height via the wireframe ([32f8849](https://github.com/peopleware/angular-sdk/commit/32f88491e438c4f4e320b4f08826ef68610a3995))

-   Allow passing the appTitle to the wireframe ([ba48b4b](https://github.com/peopleware/angular-sdk/commit/ba48b4b0b0e723915d63b601d2bbd786649d3845))

-   Remove unused test ([a70a79a](https://github.com/peopleware/angular-sdk/commit/a70a79af42fc4480e79dfd312c5269039257b346))

-   Fix peer dependencies ([25e5212](https://github.com/peopleware/angular-sdk/commit/25e52120ce9c42dcbb3ab6d9fe2a04e3f84858f3))

## 0.0.3 - 2023-09-12

[Compare changes](https://github.com/peopleware/angular-sdk/compare/0.0.2...0.0.3)

### Other changes

-   Pass the background color of the nav-drawer via a variable instead of getting it via the theme ([d33295a](https://github.com/peopleware/angular-sdk/commit/d33295a6cfb9304397e66704620c3700d2b1edc3))

-   Add extra flex classes to the demo project ([59fc5eb](https://github.com/peopleware/angular-sdk/commit/59fc5eb45125dc28fa6bab5d2df67f353e2404f4))

-   Update left-sidenav options/styling/content ([4abbfea](https://github.com/peopleware/angular-sdk/commit/4abbfeaf5d3e546d51f7bd483b5dedf30ec1adaf))

-   Improve the sidebar in the demo app ([7011c77](https://github.com/peopleware/angular-sdk/commit/7011c777bbbfff82b15e38f168419cda611f0f07))

## 0.0.2 - 2023-09-11

### Other changes

-   Initial commit ([bb03e64](https://github.com/peopleware/angular-sdk/commit/bb03e64a4a9b08565ab0e4e95d505646e1c48f27))

-   Initial development version ([3ffebe2](https://github.com/peopleware/angular-sdk/commit/3ffebe278474f445e129458877bea26269ceeaed))

-   Add fontawesome to the demo project ([37d8fc8](https://github.com/peopleware/angular-sdk/commit/37d8fc8b52fd274bdbbd715f84348516ace24696))

-   Extend left-sidenav with extra options ([39af5c2](https://github.com/peopleware/angular-sdk/commit/39af5c27715c22366a97e737e335e1421b270bf8))

-   Update demo project theme and sidenav ([f3e49a6](https://github.com/peopleware/angular-sdk/commit/f3e49a66e5b3ecd0201590efc880e559104aff83))

-   Remove whitespaces for NPM_TOKEN secret in workflow ([4e23721](https://github.com/peopleware/angular-sdk/commit/4e23721048cd52b3cd82eca3919a643bcd89ad36))

-   Make registry url to publish package to explicit ([72013b0](https://github.com/peopleware/angular-sdk/commit/72013b0d48d02033855918cd409a775626220321))
