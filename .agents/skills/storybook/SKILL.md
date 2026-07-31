---
name: storybook
description: Creates, enhances, and documents Storybook stories for Angular components. Use when the user wants to demo visual components, add interactivity (Controls, Actions), write documentation (MDX), or test interactions (play functions).
---

# Storybook for Angular Skill

This skill provides patterns and workflows for building professional Storybook stories in an Angular environment.

## Information Retrieval & Documentation

-   **Always use `context7`**: Before answering questions, implementing changes related to Storybook, or **generating Angular example components**, you **MUST** use the `context7` MCP tool to retrieve the latest documentation and code examples. Storybook and Angular both evolve rapidly, and your training data may be outdated.
-   **Verify Library IDs**: Use `resolve-library-id` for 'Storybook' and 'Angular' and use the most relevant versioned library IDs for your queries.
-   **Inspect the real project first**: Before creating or updating Storybook config, stories, or MDX docs, inspect the existing `.storybook` files, shared global styles, theme/token files, font setup, translation setup, and design-system documentation so Storybook reflects the real application instead of a generic demo environment.

## Angular Component Generation Standards

When generating Angular components (including examples, demos, and wrapper components for stories), you **MUST** adhere to the following standards:

-   **Adhere to Linting Rules**: Follow the project's established linting rules (e.g., prefix `ppw` for selectors, no restricted imports).
-   **Type Safety**: Never use the `any` keyword as a type. Always use explicit types or generics.
-   **Modern Architecture**:
    -   Create **standalone components**.
    -   Use `changeDetection: ChangeDetectionStrategy.OnPush`.
-   **Modern Reactivity (Signals)**:
    -   Use **Signal Inputs**: `input()` and `input.required()`.
    -   Use **Signal Outputs**: `output()`.
    -   Use **Signal Queries**: `viewChild()`, `viewChildren()`, `contentChild()`, `contentChildren()`.
-   **Consistency**: Ensure the generated code is idiomatic and matches the surrounding codebase's style and patterns.

## Storybook 10+ Compatibility

When working with Storybook version 10 or higher, adhere to the following architectural changes:

-   **Core Integration**: Many previously separate addons are now built into Storybook core. You **MUST NOT** install or list `@storybook/addon-essentials`, `@storybook/addon-interactions`, or `@storybook/addon-links` in your configuration.
-   **Testing Imports**: Import testing utilities (`expect`, `userEvent`, `within`, `fn`) exclusively from `'storybook/test'`. The `@storybook/test` package is no longer used.
-   **Documentation**: The `@storybook/blocks` package is empty. If using MDX, you **MUST** install `@storybook/addon-docs` separately and import blocks (`Meta`, `Canvas`, `Story`, `Controls`) from `'@storybook/addon-docs/blocks'`.

## Project Styling Fidelity

When creating or updating Storybook, treat it as an extension of the real application, not as a separate visual sandbox.

-   **Reuse the application's real styling**: Load the same global styles, theme setup, CSS variables, typography classes, font assets, spacing scale, and other shared styling primitives that the real application uses.
-   **Never invent a Storybook-only design language**: Do not create separate token values, fake typography scales, placeholder spacings, or alternate color systems just for Storybook unless the user explicitly asks for a temporary experiment.
-   **Document the actual design system**: Add or update Storybook MDX pages that document the real colors, typography, spacings, radii, surfaces, and usage guidance from the application.
-   **Keep docs synchronized**: Whenever application styling changes in a meaningful way, update the Storybook design-system docs and related examples in the same work so Storybook stays aligned with the live project.
-   **Use real examples**: Story examples and docs examples should use realistic labels, content, and states from the application so rendered output matches real-world usage.

## Core Workflows

### 0. Setup & Installation

Learn how to add Storybook to a new project or library.
See [references/setup.md](references/setup.md).

### 1. Configure Storybook

Ensure the project is correctly configured with essential addons.
See [references/config.md](references/config.md) for standard `.storybook/main.ts` and `preview.ts` setups.

### 2. Add Controls and Actions

Enhance stories with interactive controls for inputs and action logging for outputs.
See [references/controls-actions.md](references/controls-actions.md) for `argTypes` and mapping `@Output` events.

### 3. Implement Interaction Testing

Automate user interactions to demo component behavior and verify functionality.
See [references/interactions.md](references/interactions.md) for using `play` functions with `userEvent` and `expect`.

### 4. Document with MDX

Write rich documentation combining Markdown with live Storybook canvases.
See [references/mdx-docs.md](references/mdx-docs.md) for MDX structure and blocks.

### 5. Angular Signals Integration

Demo modern Angular components that use Signals for reactive state.
See [references/signals.md](references/signals.md) for patterns using Signal-based state in stories.

### 6. Realistic Async Lifecycle

Simulate loading, success, and error states for async components.
See [references/lifecycle.md](references/lifecycle.md) for implementing state-transitioning stories.

### 7. Working with Translations

Ensure components that use `ngx-translate` (via `TranslatePipe` or `TranslateService`) render correctly in Storybook.

-   **Global Configuration**: `preview.ts` should be configured with `provideTranslateService` and `provideTranslateHttpLoader` (pointing to static translation files in `public/i18n/`).
-   **Load `TranslateModule` when needed**: If the component itself, any rendered child component, or any story wrapper uses `TranslatePipe` or `TranslateService`, you **MUST** include `TranslateModule` in the story's `moduleMetadata` `imports`. Do this even when global translate providers already exist in `preview.ts`.
-   **Static Assets**: Ensure the `staticDirs` in `.storybook/main.ts` correctly maps the translations directory (e.g., `public`) to the root so they can be fetched by the loader.
-   **Use real application keys**: Use translation keys and labels that already exist in the real application. Do not add i18n keys that exist only for Storybook examples.
-   **Correct Keys**: Verify that the `labelKey` or other translation keys passed as `args` match the structure in the real translation files. Components often append suffixes (e.g., `.street`, `-info.state`) to the base `labelKey`.

## Best Practices

-   **Use Autodocs**: Enable `tags: ['autodocs']` for automatic API documentation.
-   **Input Signals as Controls**: ALWAYS add `argTypes` (toggles/controls) for every `input()` and `input.required()` signal in the component. This allows users to interact with all configuration options of the component from the Storybook UI.
-   **Provide Realistic Data**: Use meaningful mock data, labels, and states that reflect the real application so component rendering is trustworthy.
-   **Theming**: Always ensure components are tested against both light and dark themes.
-   **Accessibility**: Use the A11y addon panel to verify WCAG compliance.
