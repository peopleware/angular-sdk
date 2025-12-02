import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { ConfirmationDialogComponent, ConfirmationDialogData } from '@ppwcode/ng-dialogs'

@Component({
    selector: 'ppw-confirmation-dialog-demo',
    imports: [MatDialogModule, MatButtonModule],
    templateUrl: './confirmation-dialog-demo.component.html',
    styleUrls: ['./confirmation-dialog-demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ConfirmationDialogDemoComponent {
    private matDialog: MatDialog = inject(MatDialog)

    public openConfirmationDialog(): void {
        this.matDialog.open(ConfirmationDialogComponent, {
            data: {
                titleKey: 'confirmation-dialog.title',
                bodyKey: 'confirmation-dialog.body',

                confirmationKey: 'OK',
                cancelKey: 'Cancel',

                confirmationThemePalette: 'primary'
            } as ConfirmationDialogData
        })
    }

    public openConfirmationOnlyDialog(): void {
        this.matDialog.open(ConfirmationDialogComponent, {
            data: {
                titleKey: 'Something happened',
                bodyKey:
                    'This is just to ensure that you have been notified of something. You can click OK to close this dialog but not cancel.',

                confirmationKey: 'OK',
                cancelKey: 'Cancel',

                allowConfirmOnly: true,

                confirmationThemePalette: 'primary'
            } as ConfirmationDialogData
        })
    }
}
