import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CdkDragHandle } from '@angular/cdk/drag-drop'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { DraggableDialogDirective } from '@ppwcode/ng-dialogs'

@Component({
    selector: 'ppw-draggable-dialog-content',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, DraggableDialogDirective, CdkDragHandle],
    template: `
        <div ppwDraggableDialog>
            <h2 mat-dialog-title cdkDragHandle style="cursor: move;">Draggable Dialog</h2>
            <mat-dialog-content>
                <p>This dialog can be dragged by the title bar. Uses ppwDraggableDialog and cdkDragHandle from ng-dialogs.</p>
            </mat-dialog-content>
            <mat-dialog-actions align="end">
                <button mat-button mat-dialog-close>Close</button>
            </mat-dialog-actions>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggableDialogContentComponent {}
