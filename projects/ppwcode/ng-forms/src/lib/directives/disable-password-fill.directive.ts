import { Directive, ElementRef, inject, OnInit, Renderer2 } from '@angular/core'

/**
 * Directive to disable automatic password fill suggestions of the most popular password-managers.
 * These suggestions are present when the browser extension of the respective password-manager is installed.
 * The following password-managers are supported:
 * - LastPass: 'data-lpignore'
 * - 1Password: 'data-1p-ignore'
 * - ProtonPass: 'data-protonpass-ignore'
 * - Dashlane: 'data-form-type'
 * - BitWarden: 'data-bwignore'
 */
@Directive({
    selector: '[ppwDisablePasswordFill]'
})
export class disablePasswordFillDirective implements OnInit {
    private readonly el = inject(ElementRef)
    private readonly renderer = inject(Renderer2)

    ngOnInit() {
        this.disablePasswordFill()
    }

    disablePasswordFill() {
        this.renderer.setAttribute(this.el.nativeElement, 'data-lpignore', 'true')
        this.renderer.setAttribute(this.el.nativeElement, 'data-1p-ignore', 'true')
        this.renderer.setAttribute(this.el.nativeElement, 'data-protonpass-ignore', 'true')
        this.renderer.setAttribute(this.el.nativeElement, 'data-form-type', 'other')
        this.renderer.setAttribute(this.el.nativeElement, 'data-bwignore', 'true')
        this.el.nativeElement.removeAttribute('ppwDisablePasswordFill')
    }
}
