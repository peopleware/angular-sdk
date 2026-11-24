import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Meta, StoryObj } from '@storybook/angular-vite'

@Component({
    selector: 'ppw-elevation-example',
    standalone: true,
    template: `
        <ul class="samples">
            @for (level of levels; track level) {
                <li class="sample sample--{{ level }}">
                    <code>{{ level }}</code>
                </li>
            }
        </ul>
    `,
    styleUrl: './elevation.stories.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElevationExampleComponent {
    protected readonly levels = [...Array.from({ length: 16 }, (_, level) => level), 'flat', 'default-raised']
}

const meta: Meta<ElevationExampleComponent> = {
    title: 'ng-ppw-ds/Elevation',
    component: ElevationExampleComponent
}

export default meta
type Story = StoryObj<ElevationExampleComponent>

export const AllLevels: Story = {}
