import { provideHttpClient } from '@angular/common/http'
import { provideRouter, withDisabledInitialNavigation } from '@angular/router'
import { provideTranslateService, TranslateModule } from '@ngx-translate/core'
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader'
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite'
import { ExpandableCardComponent } from './expandable-card.component'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { MatExpansionModule } from '@angular/material/expansion'

const meta: Meta<ExpandableCardComponent> = {
    title: 'ng-common-components/ExpandableCard',
    component: ExpandableCardComponent,
    decorators: [
        moduleMetadata({
            imports: [ExpandableCardComponent, MatExpansionModule, TranslateModule]
        }),
        applicationConfig({
            providers: [
                provideNoopAnimations(),
                provideRouter([], withDisabledInitialNavigation()),
                provideHttpClient(),
                provideTranslateService({
                    lang: 'en',
                    fallbackLang: 'en',
                    loader: provideTranslateHttpLoader({ prefix: '/assets/i18n/', suffix: '.json' })
                })
            ]
        })
    ],
    args: { headerAriaLabel: undefined },
    argTypes: {
        headerAriaLabel: {
            description: 'Accessible name for the header, especially when it has no visible title or description.',
            control: 'text',
            table: { category: 'Inputs' }
        },
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
                [headerAriaLabel]="headerAriaLabel"
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
                [headerAriaLabel]="headerAriaLabel"
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
                [headerAriaLabel]="headerAriaLabel"
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
                [headerAriaLabel]="headerAriaLabel"
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

export const WithoutVisibleHeader: Story = {
    args: { headerAriaLabel: 'expandable-card.card-without-visible-title', openAsExpanded: true, canBeCollapsed: true },
    render: (args) => ({
        props: args,
        template: `
            <ppw-expandable-card [headerAriaLabel]="headerAriaLabel ? (headerAriaLabel | translate) : undefined"
                [openAsExpanded]="openAsExpanded" [canBeCollapsed]="canBeCollapsed">
                <div>this is a card without a title or description in the header</div>
            </ppw-expandable-card>
        `
    })
}

export const ProjectedTitleOnly: Story = {
    args: { openAsExpanded: false, canBeCollapsed: true },
    render: (args) => ({
        props: args,
        template: `
            <ppw-expandable-card [headerAriaLabel]="headerAriaLabel"
                [openAsExpanded]="openAsExpanded" [canBeCollapsed]="canBeCollapsed">
                <div ppw-expandable-card-title class="flex-grow-1"><span>Demo card which can be opened with full-width title</span></div><div>card contents</div>
            </ppw-expandable-card>
        `
    })
}

export const ProjectedDescriptionOnly: Story = {
    args: { openAsExpanded: false, canBeCollapsed: true },
    render: (args) => ({
        props: args,
        template: `
            <ppw-expandable-card [headerAriaLabel]="headerAriaLabel"
                [openAsExpanded]="openAsExpanded" [canBeCollapsed]="canBeCollapsed">
                <div ppw-expandable-card-description class="flex-grow-1"><span>Demo card which can be opened with full-width description</span></div><div>card contents</div>
            </ppw-expandable-card>
        `
    })
}

export const TitleOnly: Story = {
    args: {
        cardTitle: 'Demo card which can be opened with a full-width title passed as parameter',
        openAsExpanded: false,
        canBeCollapsed: true
    },
    render: (args) => ({
        props: args,
        template: `
            <ppw-expandable-card [headerAriaLabel]="headerAriaLabel" [cardTitle]="cardTitle"
                [openAsExpanded]="openAsExpanded" [canBeCollapsed]="canBeCollapsed">
                <div>card contents</div>
            </ppw-expandable-card>
        `
    })
}

export const DescriptionOnly: Story = {
    args: {
        cardDescription: 'Demo card which can be opened with a full-width description passed as parameter',
        openAsExpanded: false,
        canBeCollapsed: true
    },
    render: (args) => ({
        props: args,
        template: `
            <ppw-expandable-card [headerAriaLabel]="headerAriaLabel" [cardDescription]="cardDescription"
                [openAsExpanded]="openAsExpanded" [canBeCollapsed]="canBeCollapsed">
                <div>card contents</div>
            </ppw-expandable-card>
        `
    })
}

export const CustomHeaderHeights: Story = {
    args: { openAsExpanded: true, canBeCollapsed: true },
    render: (args) => ({
        props: args,
        template: `
            <ppw-expandable-card [headerAriaLabel]="headerAriaLabel" style="--ppw-expandable-card-header-height-collapsed: 48px; --ppw-expandable-card-header-height-expanded: 64px;"
                [openAsExpanded]="openAsExpanded" [canBeCollapsed]="canBeCollapsed">
                <div ppw-expandable-card-title><span>Demo card which can be collapsed and has a specific height</span></div><div ppw-expandable-card-description class="flex-grow-1 flex-row justify-content-end"><span>Description as content</span></div><div>card contents</div>
            </ppw-expandable-card>
        `
    })
}

export const ExpansionState: Story = {
    args: { cardTitle: 'Card with expansion state information', openAsExpanded: false, canBeCollapsed: true },
    render: (args) => ({
        props: args,
        template: `
            <ppw-expandable-card #conditionalCard [headerAriaLabel]="headerAriaLabel" [cardTitle]="cardTitle"
                [openAsExpanded]="openAsExpanded" [canBeCollapsed]="canBeCollapsed">
                <div ppw-expandable-card-description class="flex-grow-1 flex-row justify-content-end"><span>Is expanded: {{ conditionalCard.panelOpenState }}</span></div><div>card contents</div>
            </ppw-expandable-card>
        `
    })
}
