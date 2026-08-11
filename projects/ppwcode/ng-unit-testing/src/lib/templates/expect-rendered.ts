import { Type } from '@angular/core'
import { ComponentFixture } from '@angular/core/testing'
import { getByTestId } from './get-by-test-id'
import { queryByDirective } from './query-by-directive'

/**
 * Asserts that exactly one element with the given `data-testid` is rendered in the fixture.
 *
 * Use this overload when rendering is the assertion and the native element is not needed afterward.
 */
export function expectRendered<TFixture>(fixture: ComponentFixture<TFixture>, testId: string): void
/**
 * Asserts that the given component or directive is rendered in the fixture.
 *
 * Use this overload when rendering is the assertion and the typed instance is not needed afterward.
 */
export function expectRendered<TFixture, TDirective>(
    fixture: ComponentFixture<TFixture>,
    directive: Type<TDirective>
): void
export function expectRendered<TFixture, TDirective>(
    fixture: ComponentFixture<TFixture>,
    target: Type<TDirective> | string
): void {
    if (typeof target === 'string') {
        expect(getByTestId(fixture, target), `Expected data-testid="${target}" to be rendered`).toBeTruthy()
        return
    }

    expect(queryByDirective(fixture, target), `Expected ${target.name} to be rendered`).not.toBeNull()
}
