import { Component } from '@angular/core'
import { ExampleItemComponent } from '../example-item/example-item.component'
import { ExampleItemsContainerComponent } from '../example-items-container/example-items-container.component'

@Component({
    selector: 'ppw-spacings',
    imports: [ExampleItemComponent, ExampleItemsContainerComponent],
    templateUrl: './spacings.component.html',
    styleUrl: './spacings.component.scss'
})
export class SpacingsComponent {
    protected readonly spacings = Array.from({ length: 17 }, (_, i) => i.toString())
}
