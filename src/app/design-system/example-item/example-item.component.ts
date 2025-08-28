import { Component, input } from '@angular/core'

@Component({
    selector: 'ppw-example-item',
    templateUrl: './example-item.component.html',
    styleUrl: './example-item.component.scss'
})
export class ExampleItemComponent {
    public label = input<string>()
}
