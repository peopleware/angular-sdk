import { externalSchematic } from '@angular-devkit/schematics'

/**
 * Adds Angular Material to the project by running the ng-add schematic with the default theme azure-blue.
 */
export const addAngularMaterial = () => {
    // Material 3 theming no longer allows specifying a custom theme. Fall back to azure-blue and let the developer
    // modify the generated theme later.
    return externalSchematic('@angular/material', 'ng-add', { theme: 'azure-blue' })
}
