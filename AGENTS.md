# Mandatory Guidelines

-   After generating code, always run `npm run format:prettier` and `npm run format:lint`.

## Development

-   Use the Node version in `.node-version` and install dependencies with `npm ci`.
-   Start the demo on a given port with `npm run start -- --host 127.0.0.1 --port <port>`. Run Storybook with `npm run storybook -- --port <port>`.
-   The factory gate runs `python factory/checks.py` from the checkout under test. It runs CI lint, the library builds, unit tests and Playwright. Run it with `--setup` first to install Chromium. On Unix, use `python3`.

## Software factory

Invoke `$factory run <issue>` to process one GitHub issue labeled `factory` or `$factory run` to process the queue. See the [factory guide](factory/README.md) for setup, merge behavior and the dashboard.

The job script manages state in `factory/jobs/`. Each job runs in a separate Git worktree at `.worktrees/<job-id>`. Both directories are ignored by Git and should be excluded from tools that scan the main checkout.
