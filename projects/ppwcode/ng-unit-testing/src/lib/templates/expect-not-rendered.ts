import { Type } from '@angular/core'
import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

/**
 * Asserts that no element with the exact `data-testid` is rendered in the fixture.
 */
export function expectNotRendered<TFixture>(fixture: ComponentFixture<TFixture>, testId: string): void
/**
 * Asserts that the given component or directive is not rendered in the fixture.
 */
export function expectNotRendered<TFixture, TDirective>(
    fixture: ComponentFixture<TFixture>,
    directive: Type<TDirective>
): void
export function expectNotRendered<TFixture, TDirective>(
    fixture: ComponentFixture<TFixture>,
    target: Type<TDirective> | string
): void {
    if (typeof target === 'string') {
        const matches = fixture.debugElement
            .queryAll(By.css('[data-testid]'))
            .filter(
                ({ nativeElement }: { nativeElement: Element }) => nativeElement.getAttribute('data-testid') === target
            )

        expect(
            matches,
            `Expected data-testid="${target}" not to be rendered, but found ${matches.length}`
        ).toHaveLength(0)
        return
    }

    const matches = fixture.debugElement.queryAll(By.directive(target))
    expect(matches, `Expected ${target.name} not to be rendered, but found ${matches.length}`).toHaveLength(0)
}
