import { Component } from '@angular/core'
import { ExampleItemComponent } from '../example-item/example-item.component'
import { ExampleItemsContainerComponent } from '../example-items-container/example-items-container.component'

@Component({
    selector: 'ppw-shapes',
    templateUrl: './shapes.component.html',
    imports: [ExampleItemComponent, ExampleItemsContainerComponent],
    styleUrl: './shapes.component.scss'
})
export class ShapesComponent {
    protected readonly shapes = ['none', 'small', 'medium', 'large', 'full']
}
