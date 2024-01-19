import { Component, Input, ViewEncapsulation } from '@angular/core'

import {
    MAT_EXPANSION_PANEL_DEFAULT_OPTIONS,
    MatExpansionModule,
    MatExpansionPanelDefaultOptions
} from '@angular/material/expansion'

@Component({
    selector: 'ppw-expandable-card',
    templateUrl: './expandable-card.component.html',
    styleUrls: ['./expandable-card.component.scss', './expandable-card.component.theme.scss'],
    imports: [MatExpansionModule],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: MAT_EXPANSION_PANEL_DEFAULT_OPTIONS,
            useValue: { expandedHeight: '32px', collapsedHeight: '32px' } as MatExpansionPanelDefaultOptions
        }
    ],
    standalone: true
})
export class ExpandableCardComponent {
    @Input() public cardTitle?: string
    @Input() public cardDescription?: string
    @Input() public canBeCollapsed = true
    @Input() public openAsExpanded = true
    public panelOpenState = true
}
