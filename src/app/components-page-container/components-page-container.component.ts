import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
    selector: 'ppw-components-page-container',
    imports: [RouterOutlet],
    templateUrl: './components-page-container.component.html',
    styleUrl: './components-page-container.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ComponentsPageContainerComponent {}
