import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import type { AxeResults } from 'axe-core'

/**
 * The WCAG 2.0 A/AA, WCAG 2.1 A/AA and WCAG 2.2 A/AA rule tags — the accessibility compliance
 * target for this application.
 */
export const WCAG_2_2_AA_TAGS: readonly string[] = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa']

/**
 * Runs axe-core against the given Playwright page with WCAG 2.2 AA rules.
 * Mirrors the unit-test helper so both layers stay aligned on what "accessible"
 * means for this project.
 *
 * Usage in e2e specs:
 *   const results = await analyzePage(page)
 *   expectNoViolations(results)
 */
export function analyzePage(page: Page): Promise<AxeResults> {
    return new AxeBuilder({ page }).withTags([...WCAG_2_2_AA_TAGS]).analyze()
}

/**
 * Fails the current test with a formatted list of accessibility violations
 * when `results.violations` is non-empty.
 */
export function expectNoViolations(results: AxeResults): void {
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
