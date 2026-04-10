import { inject, Pipe, PipeTransform, SecurityContext } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

/**
 * Sanitizes an HTML string with Angular's built-in HTML sanitizer and returns the
 * sanitized result as `SafeHtml`.
 *
 * The pipe first removes unsafe markup such as scripts and dangerous attributes
 * by calling `DomSanitizer.sanitize(SecurityContext.HTML, value)`. It then wraps
 * the sanitized output with `bypassSecurityTrustHtml` so Angular can bind the
 * result to `[innerHTML]` without sanitizing it a second time.
 *
 * Use this pipe when the source value may contain user-provided or otherwise
 * untrusted HTML and you want to render the remaining safe markup in the view.
 * Typical usage is:
 *
 * `<div [innerHTML]="htmlContent | ppwSanitizeHtml"></div>`
 *
 * Do not use this pipe to preserve unsafe markup. Any content removed by the
 * sanitizer is intentionally discarded before the result is marked as trusted.
 */
@Pipe({
    name: 'ppwSanitizeHtml',
    standalone: true
})
export class PpwSanitizeHtmlPipe implements PipeTransform {
    private readonly sanitizer = inject(DomSanitizer)

    /** Returns trusted HTML that has already been sanitized for safe rendering. */
    transform(value: string | null): SafeHtml {
        const sanitizedValue = this.sanitizer.sanitize(SecurityContext.HTML, value) ?? ''
        return this.sanitizer.bypassSecurityTrustHtml(sanitizedValue)
    }
}
