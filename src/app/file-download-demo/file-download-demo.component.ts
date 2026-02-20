import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import {
    createSuccessAsyncResult,
    saveDownloadedFile,
    saveFileDownload
} from '@ppwcode/ng-async'

@Component({
    selector: 'ppw-file-download-demo',
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: './file-download-demo.component.html',
    styleUrl: './file-download-demo.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileDownloadDemoComponent {
    downloadWithFixedName(): void {
        const content = 'Demo content from ppwcode Angular SDK – saveDownloadedFile demo.'
        const blob = new Blob([content], { type: 'text/plain' })
        const result = createSuccessAsyncResult<Blob | null>(blob)
        saveDownloadedFile('demo-download.txt')(result)
    }

    downloadWithFileNameFromResponse(): void {
        const content = 'Content with filename from response – saveFileDownload demo.'
        const blob = new Blob([content], { type: 'text/plain' })
        const result = createSuccessAsyncResult({
            blob,
            fileName: 'server-filename-demo.txt'
        })
        saveFileDownload()(result)
    }
}
