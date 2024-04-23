import { Component, input, InputSignal, ViewEncapsulation } from '@angular/core'

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
    // Inputs
    cardTitle: InputSignal<string | undefined> = input()
    cardDescription: InputSignal<string | undefined> = input()
    canBeCollapsed: InputSignal<boolean> = input(true)
    openAsExpanded: InputSignal<boolean> = input(true)

    public panelOpenState = true
}
