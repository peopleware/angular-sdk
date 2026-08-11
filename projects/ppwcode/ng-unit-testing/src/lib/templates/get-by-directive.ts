import { Type } from '@angular/core'
import { ComponentFixture } from '@angular/core/testing'
import { queryByDirective, QueryByDirectiveOptions } from './query-by-directive'

/**
 * Returns the first rendered instance of a required component or directive.
 *
 * Throws a descriptive error when no match is rendered. Prefer this over a nullable query when the test assumes that
 * the match exists.
 */
export function getByDirective<TFixture, TDirective>(
    fixture: ComponentFixture<TFixture>,
    directive: Type<TDirective>
): TDirective
/**
 * Returns another token from the injector of the first element matching the required component or directive.
 *
 * Throws a descriptive error when no matching element is rendered.
 */
export function getByDirective<TFixture, TDirective, TRead>(
    fixture: ComponentFixture<TFixture>,
    directive: Type<TDirective>,
    options: QueryByDirectiveOptions<TRead>
): TRead
export function getByDirective<TFixture, TDirective, TRead>(
    fixture: ComponentFixture<TFixture>,
    directive: Type<TDirective>,
    options?: QueryByDirectiveOptions<TRead>
): TDirective | TRead {
    const result = options ? queryByDirective(fixture, directive, options) : queryByDirective(fixture, directive)

    if (result === null) {
        throw new Error(`Expected ${directive.name} to be rendered`)
    }

    return result
}
