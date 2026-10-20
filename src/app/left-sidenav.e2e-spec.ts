import { expect, test } from '@playwright/test'

test('native sidenav links retain legacy item sizing', async ({ page }) => {
    await page.goto('./')
    const sidenav = page.locator('ppw-left-sidenav')
    const items = sidenav.locator('.ppw-sidenav-navigation-item')
    await expect(items.first()).toBeVisible()
    await sidenav.getByRole('button', { name: 'Components', exact: true }).click()
    await expect(sidenav.locator('.ppw-sidenav-navigation-item-children-wrapper')).toBeVisible()
    await page.evaluate(() => document.fonts.ready)

    const measureItems = () =>
        items.evaluateAll((elements) =>
            elements.map((element) => {
                const measure = (node: Element) => {
                    const style = getComputedStyle(node)
                    const bounds = node.getBoundingClientRect()
                    return {
                        width: bounds.width,
                        height: bounds.height,
                        font: style.font,
                        lineHeight: style.lineHeight,
                        letterSpacing: style.letterSpacing,
                        boxSizing: style.boxSizing,
                        padding: style.padding,
                        margin: style.margin,
                        display: style.display
                    }
                }
                return {
                    label: element.textContent?.trim(),
                    item: measure(element),
                    content: Array.from(element.querySelectorAll('span, i'), measure)
                }
            })
        )

    const legacySizing = await measureItems()
    await expect(sidenav.locator('a.ppw-sidenav-navigation-item')).toHaveCount(0)
    const toggle = page.getByRole('switch', { name: 'Use native navigation links' })
    await toggle.click()
    await expect(sidenav.locator('a.ppw-sidenav-navigation-item').first()).toBeVisible()
    await expect(sidenav.getByRole('button', { name: 'Components', exact: true })).toHaveAttribute(
        'aria-expanded',
        'true'
    )
    await expect(sidenav.locator('a[target="_blank"]')).toHaveAttribute('rel', 'noopener noreferrer')
    expect(await measureItems()).toEqual(legacySizing)

    await toggle.click()
    await expect(sidenav.locator('a.ppw-sidenav-navigation-item')).toHaveCount(0)
    expect(await measureItems()).toEqual(legacySizing)
})
