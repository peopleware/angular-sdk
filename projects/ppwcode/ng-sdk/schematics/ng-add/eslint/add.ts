import { externalSchematic } from '@angular-devkit/schematics'

/**
 * Adds Angular ESLint to the project by running the ng-add schematic of that package
 * and skipping the installation.
 */
export const addAngularESLint = () => {
    return externalSchematic('@angular-eslint/schematics', 'ng-add', { skipInstall: true })
}
