import { NgTemplateOutlet, UpperCasePipe } from '@angular/common'
import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core'
import { MatBadge } from '@angular/material/badge'
import { MatButton } from '@angular/material/button'
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card'
import { MatRipple } from '@angular/material/core'
import { TranslatePipe } from '@ngx-translate/core'
import { DashboardItemAction } from '../models/dashboard-item-action.model'
import { DashboardItem } from '../models/dashboard-item.model'

@Component({
    selector: 'ppw-dashboard-items-table',
    imports: [
        MatCard,
        MatCardTitle,
        MatCardHeader,
        MatBadge,
        TranslatePipe,
        NgTemplateOutlet,
        MatRipple,
        MatCardContent,
        MatCardActions,
        UpperCasePipe,
        MatButton
    ],
    templateUrl: './dashboard-items-table.component.html',
    styleUrl: './dashboard-items-table.component.scss'
})
export class DashboardItemsTableComponent {
    public dashboardItems: InputSignal<Array<DashboardItem>> = input.required()
    public executeAction: OutputEmitterRef<DashboardItemAction | undefined> = output()
}
