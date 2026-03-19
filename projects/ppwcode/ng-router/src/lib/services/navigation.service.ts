import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { WINDOW } from '@ppwcode/ng-common'

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    #window: Window = inject(WINDOW)
    #router: Router = inject(Router)
    #location: Location = inject(Location)

    public async openUrl(url: string, inNewTab = false, replaceUrl = false): Promise<Window | null> {
        if (inNewTab) {
            return this.openExternalUrlInNewTab(this.#location.prepareExternalUrl(url))
        } else {
            await this.#router.navigateByUrl(url, { replaceUrl })
            return null
        }
    }

    public openExternalUrlInNewTab(url: string): Promise<Window | null> {
        return new Promise((resolve, reject) => {
            const openedWindow = this.#window.open(url, '_blank')
            if (!openedWindow) {
                reject(new Error('Failed to open the URL in a new tab.'))
            }
            resolve(openedWindow)
        })
    }
}
