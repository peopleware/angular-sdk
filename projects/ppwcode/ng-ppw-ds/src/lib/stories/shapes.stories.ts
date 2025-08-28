import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { Component } from '@angular/core'

const shapes = ['none', 'small', 'medium', 'large', 'full']

@Component({
    selector: 'ppw-shapes-example',
    template: `
        @for (shape of shapes; track shape) {
            <div class="box" [style.border-radius]="'var(--ppw-ds-radius-' + shape + ')'">{{ shape }}</div>
        }
    `,
    styles: `
        :host {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 16px;
        }

        .box {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            background: var(--ppw-primary-color);
            color: var(--ppw-primary-contrast-color);
            padding: 16px;
            width: 250px;
        }
    `
})
export class ShapesExampleComponent {
    public readonly shapes = shapes
}

const meta: Meta<ShapesExampleComponent> = {
    title: 'ng-ppw-ds/Shapes',
    component: ShapesExampleComponent,
    decorators: [
        moduleMetadata({
            imports: [ShapesExampleComponent]
        })
    ]
}

export default meta
type Story = StoryObj<ShapesExampleComponent>

export const AllLevels: Story = {}
