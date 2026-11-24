import { expect, test } from '@playwright/test'

test('design system border width tokens resolve in the demo', async ({ page }) => {
    await page.goto('./')

    const widths = ['1px', '2px', '3px']
    const computedWidths = await page.evaluate(
        (widths) =>
            widths.map((width) => {
                const sample = document.createElement('div')
                sample.style.borderStyle = 'solid'
                sample.style.borderWidth = `var(--ppw-ds-border-width-${width}, 0px)`
                document.body.append(sample)
                return getComputedStyle(sample).borderWidth
            }),
        widths
    )

    expect(computedWidths).toEqual(widths)
})
