# MDX Documentation

MDX allows combining Markdown with Storybook blocks (Canvas, Controls, Story). In Storybook 10+, import blocks from `@storybook/addon-docs/blocks`.

```mdx
import { Meta, Canvas, Controls } from '@storybook/addon-docs/blocks'
import * as MyStories from './my.stories'

<Meta of={MyStories} />

# My Component

Description of the component.

<Canvas of={MyStories.Default} />

## API Reference

<Controls />
```
