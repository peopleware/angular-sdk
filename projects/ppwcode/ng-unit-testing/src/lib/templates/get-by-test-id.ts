import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

/**
 * Returns the required native element whose `data-testid` exactly matches `testId`.
 *
 * Use this helper when a test needs to inspect or interact with a unique rendered element. It throws a descriptive
 * error when the fixture contains no match or more than one match. Use `expectRendered` instead when rendering itself
 * is the only assertion.
 */
export function getByTestId<TElement extends HTMLElement = HTMLElement, TFixture = unknown>(
    fixture: ComponentFixture<TFixture>,
    testId: string
): TElement {
    const matches = fixture.debugElement
        .queryAll(By.css('[data-testid]'))
        .filter(({ nativeElement }: { nativeElement: Element }) => nativeElement.getAttribute('data-testid') === testId)

    if (matches.length === 0) {
        throw new Error(`Expected an element with data-testid="${testId}" to be rendered`)
    }

    if (matches.length > 1) {
        throw new Error(`Expected one element with data-testid="${testId}", but found ${matches.length}`)
    }

    return matches[0].nativeElement as TElement
}
