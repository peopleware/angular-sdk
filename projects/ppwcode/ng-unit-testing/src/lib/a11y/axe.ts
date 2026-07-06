import type { Type } from '@angular/core'
import { type ComponentFixture, TestBed } from '@angular/core/testing'
import axe from 'axe-core'

// `axe-core` ships a single namespace export (`export = axe`), so both the
// runtime function and the result/option types must be accessed via the
// namespace rather than named imports (which resolve to `{}` under some
// TypeScript module-resolution modes and break callers with TS2349).
export type AxeResults = axe.AxeResults
export type ElementContext = axe.ElementContext
export type RunOptions = axe.RunOptions

export interface VerifyA11yOptions<TComponent> {
    /**
     * The generated test name.
     */
    readonly description?: string

    /**
     * Optional hook for setting inputs or interacting with the fixture before
     * running axe.
     */
    readonly prepare?: (fixture: ComponentFixture<TComponent>) => void | Promise<void>

    /**
     * Additional axe-core options.
     */
    readonly runOptions?: RunOptions
}

/**
 * The WCAG 2.0 A/AA, WCAG 2.1 A/AA and WCAG 2.2 A/AA rule tags — the accessibility compliance
 * target for this application.
 */
export const WCAG_2_2_AA_TAGS: readonly string[] = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa']

/**
 * Runs `axe-core` against the given DOM context with WCAG 2.2 AA rules.
 *
 * Usage in specs:
 *   const results = await runA11yChecks(fixture.nativeElement)
 *   expectNoA11yViolations(results)
 */
export function runA11yChecks(context: ElementContext, options: RunOptions = {}): Promise<AxeResults> {
    return axe.run(context, {
        runOnly: { type: 'tag', values: [...WCAG_2_2_AA_TAGS] },
        ...options
    })
}

/**
 * Fails the current test with a formatted list of accessibility violations
 * when `results.violations` is non-empty.
 */
export function expectNoA11yViolations(results: AxeResults): void {
    if (results.violations.length === 0) {
        return
    }

    const details = results.violations
        .map((violation) => {
            const nodeList = violation.nodes
                .map((node) => `      - ${node.target.join(', ')}\n        ${node.failureSummary ?? ''}`)
                .join('\n')
            return `  • [${violation.id}] ${violation.help} (${violation.impact ?? 'n/a'})\n    ${
                violation.helpUrl
            }\n${nodeList}`
        })
        .join('\n\n')

    throw new Error(`Expected no accessibility violations but found ${results.violations.length}:\n\n${details}`)
}

/**
 * Registers a default accessibility spec for the given component.
 */
export function verifyA11y<TComponent>(component: Type<TComponent>, options: VerifyA11yOptions<TComponent> = {}): void {
    it(options.description ?? 'should have no accessibility violations in its default state', async () => {
        const fixture = TestBed.createComponent(component)
        fixture.detectChanges()
        await options.prepare?.(fixture)
        fixture.detectChanges()

        const results = await runA11yChecks(fixture.nativeElement, options.runOptions)
        expectNoA11yViolations(results)
    })
}
