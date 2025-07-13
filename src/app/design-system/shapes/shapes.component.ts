import { Component } from '@angular/core'

@Component({
    selector: 'ppw-shapes',
    templateUrl: './shapes.component.html',
    styleUrl: './shapes.component.scss'
})
export class ShapesComponent {
    protected readonly shapes = ['none', 'small', 'medium', 'large', 'full']
}
