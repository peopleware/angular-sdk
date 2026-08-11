import { ProviderToken, Type } from '@angular/core'
import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

/**
 * Options for retrieving another token from the injector of the element matched by a directive or component type.
 */
export interface QueryByDirectiveOptions<TRead> {
    /** Token to retrieve from the matching element injector. */
    read: ProviderToken<TRead>
}

/**
 * Returns the first rendered instance of a component or directive, or `null` when it is not rendered.
 *
 * Use this helper only when absence is a valid result. Use `getByDirective` when the test assumes that the match
 * exists.
 */
export function queryByDirective<TFixture, TDirective>(
    fixture: ComponentFixture<TFixture>,
    directive: Type<TDirective>
): TDirective | null
/**
 * Returns another token from the injector of the first matching element, or `null` when no match is rendered.
 */
export function queryByDirective<TFixture, TDirective, TRead>(
    fixture: ComponentFixture<TFixture>,
    directive: Type<TDirective>,
    options: QueryByDirectiveOptions<TRead>
): TRead | null
export function queryByDirective<TFixture, TDirective, TRead>(
    fixture: ComponentFixture<TFixture>,
    directive: Type<TDirective>,
    options?: QueryByDirectiveOptions<TRead>
): TDirective | TRead | null {
    const debugElement = fixture.debugElement.query(By.directive(directive))

    if (!debugElement) {
        return null
    }

    return options ? debugElement.injector.get(options.read) : debugElement.injector.get(directive)
}
