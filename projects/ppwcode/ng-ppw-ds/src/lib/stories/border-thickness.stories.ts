import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'ppw-border-thickness-example',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        @for (width of widths; track width) {
            <div class="sample" [style.border-width]="'var(--ppw-ds-border-width-' + width + ')'">
                {{ width }}
            </div>
        }
    `,
    styles: `
        :host {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
            gap: var(--ppw-ds-spacing-small);
        }

        .sample {
            border-style: solid;
            border-color: currentColor;
            padding: var(--ppw-ds-spacing-small);
            text-align: center;
        }
    `
})
export class BorderThicknessExampleComponent {
    public readonly widths = ['1px', '2px', '3px']
}

const meta: Meta<BorderThicknessExampleComponent> = {
    title: 'ng-ppw-ds/Border Thickness',
    component: BorderThicknessExampleComponent,
    decorators: [
        moduleMetadata({
            imports: [BorderThicknessExampleComponent]
        })
    ]
}

export default meta
type Story = StoryObj<BorderThicknessExampleComponent>

export const AllWidths: Story = {}
