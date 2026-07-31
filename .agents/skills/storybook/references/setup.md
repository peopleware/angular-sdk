# Storybook Setup & Installation

## Initialization

To add Storybook to a new Angular project, run the following command from the root of your workspace:

```bash
npx storybook@latest init
```

For a monorepo or if you want to target a specific project:

```bash
npx storybook@latest init --project <project-name>
```

## Post-Installation Checklist

1.  **Dependencies**: Ensure essential addons are installed.
2.  **Remove Legacy Packages**: If the project contains `@storybook/addon-essentials`, `@storybook/addon-interactions`, `@storybook/addon-links`, or `@storybook/blocks`, they **MUST** be removed. These are empty in Storybook 10.

3.  **Install Modern Dependencies**:

    ```bash
    npm install --save-dev storybook @storybook/angular @storybook/addon-docs @storybook/addon-themes @storybook/addon-a11y
    ```

    _Note: Core features like Controls, Actions, and Viewport are now built-in._

4.  **Configuration**: Align your `.storybook/main.ts` and `preview.ts` with the project's real requirements (e.g., application providers, theme setup, translation loading, typography classes, Material defaults, and static assets).

5.  **Static Assets**: If your components rely on assets (images, fonts, translation files), ensure `staticDirs` is configured in `main.ts` so Storybook can load the same resources as the application.

6.  **Design System Documentation**: Add Storybook docs pages for the real design system foundations used by the project, such as colors, typography, spacing, and token usage guidance. Keep these docs updated whenever the application's styling changes.

7.  **Translations in Stories**: When a story or any rendered child uses `ngx-translate`, import `TranslateModule` in that story and use translation keys that already exist in the application. Do not add Storybook-only labels or translation keys.

8.  **Scripts**: Verify that the following scripts are added to your `package.json`:
    ```json
    "scripts": {
      "storybook": "storybook dev -p 6006",
      "build-storybook": "storybook build"
    }
    ```
