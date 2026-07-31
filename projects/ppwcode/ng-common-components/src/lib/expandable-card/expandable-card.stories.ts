import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { ExpandableCardComponent } from './expandable-card.component'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { MatExpansionModule } from '@angular/material/expansion'

const meta: Meta<ExpandableCardComponent> = {
    title: 'ng-common-components/ExpandableCard',
    component: ExpandableCardComponent,
    decorators: [
        moduleMetadata({
            imports: [ExpandableCardComponent, MatExpansionModule]
        }),
        applicationConfig({
            providers: [provideNoopAnimations()]
        })
    ],
    argTypes: {
        cardTitle: {
            description: 'The title displayed in the card header.',
            control: 'text',
            table: { category: 'Inputs' }
        },
        cardDescription: {
            description: 'The description displayed in the card header.',
            control: 'text',
            table: { category: 'Inputs' }
        },
        openAsExpanded: {
            description: 'Whether the card should be expanded by default.',
            control: 'boolean',
            table: { category: 'Inputs' }
        },
        canBeCollapsed: {
            description: 'Whether the card can be collapsed by the user.',
            control: 'boolean',
            table: { category: 'Inputs' }
        }
    }
}

export default meta
type Story = StoryObj<ExpandableCardComponent>

export const Default: Story = {
    args: {
        cardTitle: 'Standard Expandable Card',
        cardDescription: 'This card contains some important information.',
        openAsExpanded: true,
        canBeCollapsed: true
    },
    render: (args) => ({
        props: args,
        template: `
            <ppw-expandable-card
                [cardTitle]="cardTitle"
                [cardDescription]="cardDescription"
                [openAsExpanded]="openAsExpanded"
                [canBeCollapsed]="canBeCollapsed">
                <p>This is the main content area of the expandable card. You can put any HTML or components here.</p>
            </ppw-expandable-card>
        `
    })
}

export const InitiallyCollapsed: Story = {
    args: {
        cardTitle: 'Initially Collapsed Card',
        cardDescription: 'Click to expand and see more details.',
        openAsExpanded: false,
        canBeCollapsed: true
    },
    render: (args) => ({
        props: args,
        template: `
            <ppw-expandable-card
                [cardTitle]="cardTitle"
                [cardDescription]="cardDescription"
                [openAsExpanded]="openAsExpanded"
                [canBeCollapsed]="canBeCollapsed">
                <p>Surprise! Here is the hidden content.</p>
            </ppw-expandable-card>
        `
    })
}

export const NotCollapsible: Story = {
    args: {
        cardTitle: 'Static Card',
        cardDescription: 'This card cannot be collapsed.',
        openAsExpanded: true,
        canBeCollapsed: false
    },
    render: (args) => ({
        props: args,
        template: `
            <ppw-expandable-card
                [cardTitle]="cardTitle"
                [cardDescription]="cardDescription"
                [openAsExpanded]="openAsExpanded"
                [canBeCollapsed]="canBeCollapsed">
                <p>The expansion toggle is disabled on this card.</p>
            </ppw-expandable-card>
        `
    })
}

export const ContentProjection: Story = {
    args: {
        openAsExpanded: true,
        canBeCollapsed: true
    },
    render: (args) => ({
        props: args,
        template: `
            <ppw-expandable-card
                [openAsExpanded]="openAsExpanded"
                [canBeCollapsed]="canBeCollapsed">
                <span ppw-expandable-card-title style="color: #009b3e; font-weight: bold;">
                    <i class="fa-solid fa-star"></i> Custom Projected Title
                </span>
                <span ppw-expandable-card-description style="font-style: italic;">
                    Projected description with custom styling
                </span>
                <div style="padding: 16px; background-color: #f5f5f5; border-radius: 4px;">
                    <h4>Rich Content</h4>
                    <p>This story demonstrates using <b>content projection</b> for the title and description slots instead of simple string inputs.</p>
                </div>
            </ppw-expandable-card>
        `
    })
}
