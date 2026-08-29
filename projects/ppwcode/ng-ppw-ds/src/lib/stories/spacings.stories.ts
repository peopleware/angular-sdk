import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite'
import { Component } from '@angular/core'

const spacings = Array.from({ length: 21 }, (_, i) => i)

@Component({
    selector: 'ppw-spacings-example',
    template: `
        @for (level of spacings; track level) {
            <div class="boxes-wrapper" [style.gap]="'var(--ppw-ds-spacing-' + level + ')'">
                <div class="box box--primary">{{ level }}</div>
                <div class="box box--secondary">{{ level * 4 }}px</div>
            </div>
        }
    `,
    styles: `
        :host {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 16px;
        }

        .boxes-wrapper {
            display: flex;
            flex-direction: row;
        }

        .box {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            padding: 16px;
            width: 25px;

            &--primary {
            background: var(--ppw-primary-color);
            color: var(--ppw-primary-contrast-color);
            }

            &--secondary {
                background: var(--ppw-secondary-color);
                color: var(--ppw-secondary-contrast-color);
            }
        }
    `
})
export class SpacingsExampleComponent {
    public readonly spacings = spacings
}

const meta: Meta<SpacingsExampleComponent> = {
    title: 'ng-ppw-ds/Spacings',
    component: SpacingsExampleComponent,
    decorators: [
        moduleMetadata({
            imports: [SpacingsExampleComponent]
        })
    ],
    parameters: {
        docs: {
            description: {
                component: `

                `
            }
        }
    }
}

export default meta
type Story = StoryObj<SpacingsExampleComponent>

export const AllLevels: Story = {}
