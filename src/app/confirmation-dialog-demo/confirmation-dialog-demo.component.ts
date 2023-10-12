import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { ConfirmationDialogComponent, ConfirmationDialogData } from '@ppwcode/ng-dialogs'

@Component({
    selector: 'ppw-confirmation-dialog-demo',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    templateUrl: './confirmation-dialog-demo.component.html',
    styleUrls: ['./confirmation-dialog-demo.component.scss']
})
export class ConfirmationDialogDemoComponent {
    private matDialog: MatDialog = inject(MatDialog)

    public openConfirmationDialog(): void {
        this.matDialog.open(ConfirmationDialogComponent, {
            data: {
                titleKey: 'Confirm',
                bodyKey: 'Are you sure',

                confirmationKey: 'OK',
                cancelKey: 'Cancel',

                confirmationThemePalette: 'primary'
            } as ConfirmationDialogData
        })
    }
}
