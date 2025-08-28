import { Component, input } from '@angular/core'

@Component({
    selector: 'ppw-example-items-container',
    template: '<ng-content />',
    styleUrl: './example-items-container.component.scss',
    host: {
        '[style.--example-items-columns]': 'columns()'
    }
})
export class ExampleItemsContainerComponent {
    public readonly columns = input<number>(1)
}
