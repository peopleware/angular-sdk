import { FormControl, FormGroup } from '@angular/forms'
/* eslint-disable */
/* Any is the correct notation, as this is a wrapper that has to handle ANY object. Proposed unknown is not correct and breaks function */

export type ControlsOf<T extends Record<string, any>> = {
    [K in keyof T]: T[K] extends Record<string, any> ? FormGroup<ControlsOf<T[K]>> : FormControl<T[K]>
}
