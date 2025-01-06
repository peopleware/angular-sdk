import { animate, style, transition, trigger } from '@angular/animations'
import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { AbstractTableComponent } from './abstract-table.component'

@Component({
    selector: 'ppw-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TableComponent),
            multi: true
        }
    ],
    animations: [
        trigger('rowsAnimation', [
            transition(':enter', [
                style({ transform: 'translateY(-10%)', opacity: 0 }),
                animate('.25s ease-in-out', style({ transform: 'translateY(0)', opacity: 1 }))
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TableComponent<TRecord> extends AbstractTableComponent<TRecord> implements OnInit {
    public addControl(): void {

    }
}
