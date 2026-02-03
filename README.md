# Ppwcode/angular-sdk

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.
The src folder contains a demo project to showcase the components offered in the various projects.

## Development server

Run `npm run start` for a dev server running the demo project. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component in the demo project. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Create a new library

Run `ng g lib ng-<lib-name>` to generate a new library in the `projects` directory.

After generating the new library make sure to:

- Update the `./tsconfig.json` file in the root of the repository.
- Update the path of the newly generated library to point to the projects folder instead of the dist.
- Also delete the library contents and add in you own components or files.
- Make sure to expose the public components/classes/... by adding an export in the `public-api.ts` file of the library.
- Also add the new library in the `scripts/ci/build-libs.sh` to the LIBRARIES_LIST at line 4 in the file.
- Make sure the new lib is added to the `projects` in `angular.json`.
- Add `.eslintrc` to the library.
- Add library to `.github/workflows/publish-npmjs.yaml` to ensure it gets published to npmjs.

## Build

### Preparation (on Windows only)

When on Windows, the following should be configured:
`npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"`

### Execution

Run `ng ci:build-libs` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng ci:test-libs` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
