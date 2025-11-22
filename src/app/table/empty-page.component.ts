import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'ppw-empty-table-page',
    template: '<p>Page is empty</p>',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyTablePageComponent {}
