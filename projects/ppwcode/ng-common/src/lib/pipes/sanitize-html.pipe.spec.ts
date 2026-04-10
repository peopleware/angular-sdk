import { SecurityContext } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { DomSanitizer } from '@angular/platform-browser'
import { PpwSanitizeHtmlPipe } from './sanitize-html.pipe'

describe('PpwSanitizeHtmlPipe', () => {
    let pipe: PpwSanitizeHtmlPipe
    let sanitizer: DomSanitizer

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PpwSanitizeHtmlPipe]
        })

        pipe = TestBed.inject(PpwSanitizeHtmlPipe)
        sanitizer = TestBed.inject(DomSanitizer)
    })

    it('sanitizes HTML before trusting it', () => {
        const sanitizeSpy = vi.spyOn(sanitizer, 'sanitize')
        const bypassSpy = vi.spyOn(sanitizer, 'bypassSecurityTrustHtml')
        const html = '<div><script>alert("xss")</script><p>safe</p></div>'

        pipe.transform(html)

        expect(sanitizeSpy).toHaveBeenCalledWith(SecurityContext.HTML, html)
        expect(bypassSpy).toHaveBeenCalledWith('<div><p>safe</p></div>')
    })

    it('strips unsafe HTML content from the result', () => {
        const html = '<section><script>alert("xss")</script><p>safe</p></section>'

        const result = pipe.transform(html)

        expect(result).toEqual({
            changingThisBreaksApplicationSecurity: '<section><p>safe</p></section>'
        })
    })

    it('returns trusted empty HTML for null input', () => {
        const bypassSpy = vi.spyOn(sanitizer, 'bypassSecurityTrustHtml')

        const result = pipe.transform(null)

        expect(bypassSpy).toHaveBeenCalledWith('')
        expect(result).toEqual({
            changingThisBreaksApplicationSecurity: ''
        })
    })
})
