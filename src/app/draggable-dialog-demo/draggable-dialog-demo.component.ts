import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { DraggableDialogContentComponent } from './draggable-dialog-content.component'

@Component({
    selector: 'ppw-draggable-dialog-demo',
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: './draggable-dialog-demo.component.html',
    styleUrl: './draggable-dialog-demo.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggableDialogDemoComponent {
    private readonly dialog = inject(MatDialog)

    openDraggableDialog(): void {
        this.dialog.open(DraggableDialogContentComponent, {
            width: '400px'
        })
    }
}
