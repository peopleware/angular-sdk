import { Component, Input, ViewEncapsulation } from '@angular/core'

import { MatExpansionModule } from '@angular/material/expansion'

@Component({
    selector: 'ppw-expandable-card',
    templateUrl: './expandable-card.component.html',
    styleUrls: ['./expandable-card.component.scss', './expandable-card.component.theme.scss'],
    imports: [MatExpansionModule],
    encapsulation: ViewEncapsulation.None,
    standalone: true
})
export class ExpandableCardComponent {
    @Input() public cardTitle?: string
    @Input() public cardDescription?: string
    @Input() public canBeCollapsed = true
    @Input() public openAsExpanded = true
    public panelOpenState = true
}
