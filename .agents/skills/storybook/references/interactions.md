# Interaction Testing (`play` functions)

Use the `play` function to automate user interactions within a story. In Storybook 10+, import utilities from `storybook/test`.

```typescript
import { expect, userEvent, within } from 'storybook/test'

export const AutoClick: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const button = canvas.getByRole('button', { name: /Submit/i })

        // Assertions
        await expect(button).toBeInTheDocument()

        // Interactions
        await userEvent.click(button)
    }
}
```
