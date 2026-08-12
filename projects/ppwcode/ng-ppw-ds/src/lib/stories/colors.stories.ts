import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Meta, StoryObj } from '@storybook/angular'

const colorSchemes = [
    { id: 'primary', label: 'Primary' },
    { id: 'secondary', label: 'Secondary' },
    { id: 'tertiary', label: 'Tertiary' },
    { id: 'error', label: 'Error' },
    { id: 'success', label: 'Success' },
    { id: 'neutral', label: 'Neutral' }
] as const

const colorLevels = [100, 200, 300, 400, 500, 600] as const

@Component({
    selector: 'ppw-colors-example',
    standalone: true,
    template: `
        <div class="schemes">
            @for (scheme of colorSchemes; track scheme.id) {
                <section class="scheme" [attr.aria-labelledby]="scheme.id + '-heading'">
                    <h2 [id]="scheme.id + '-heading'">{{ scheme.label }}</h2>
                    <div class="swatches">
                        @for (level of colorLevels; track level) {
                            <div class="swatch">
                                <div
                                    class="swatch__color"
                                    [style.background-color]="'var(--ppw-ds-' + scheme.id + '-' + level + ')'"
                                    [attr.aria-label]="scheme.label + ' color, level ' + level"
                                    role="img"
                                ></div>
                                <code>{{ level }}</code>
                            </div>
                        }
                    </div>
                </section>
            }
        </div>
    `,
    styleUrl: './colors.stories.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorsExampleComponent {
    protected readonly colorSchemes = colorSchemes
    protected readonly colorLevels = colorLevels
}

const meta: Meta<ColorsExampleComponent> = {
    title: 'ng-ppw-ds/Colors',
    component: ColorsExampleComponent
}

export default meta
type Story = StoryObj<ColorsExampleComponent>

export const AllColors: Story = {}
