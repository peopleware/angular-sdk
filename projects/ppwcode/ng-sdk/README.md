# @ppwcode/ng-sdk

This project contains the ppwcode Angular schematics to add our Angular SDK to a project.

## ng-add

`ng add @ppwcode/ng-sdk`

Adds the Angular SDK to a project:

-   Add dependencies
-   Add Angular ESLint
-   Add Angular Material
-   Configure Angular Vitest runner
-   Modify package.json scripts

## Development

Development of this schematic is straightforward. Use the following steps to verify changes made to the schematics:

1. In a terminal, make sure you are in the root of the project (not the workspace!)
2. Run `npm run build` - This will build the project and place the artifacts in the `dist/ppwcode/ng-sdk` directory
3. In a second terminal, generate a new Angular project using the following command:
    > `ng new [name] --skip-install --ssr=false --style=scss --ai-config=none`
4. cd into the new project
5. Execute the schematic: `ng add [relative-path-to-dist]/dist/ppwcode/ng-sdk`

Repeat these steps every time you make changes to the schematics.
