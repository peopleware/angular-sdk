import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

/**
 * Returns all native elements whose `data-testid` exactly matches `testId`, in DOM order.
 */
export function getAllByTestId<TElement extends HTMLElement = HTMLElement, TFixture = unknown>(
    fixture: ComponentFixture<TFixture>,
    testId: string
): Array<TElement> {
    const matches = fixture.debugElement
        .queryAll(By.css('[data-testid]'))
        .filter(({ nativeElement }: { nativeElement: Element }) => nativeElement.getAttribute('data-testid') === testId)

    if (matches.length === 0) {
        throw new Error(`Expected at least one element with data-testid="${testId}" to be rendered`)
    }

    return matches.map(({ nativeElement }) => nativeElement as TElement)
}
