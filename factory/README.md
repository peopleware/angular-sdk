# PPWCode software factory

The factory turns GitHub issues labeled `factory` into reviewed pull requests. Codex runs separate sessions for intake, specification, build, review and approval. The gate runs SDK checks on the job branch.

## First run

-   Use Codex with subagents, Python 3.11+, Git, GitHub CLI and the Node version in the root `.node-version`. For the standalone worker option, use a current Codex CLI signed in with `codex login` and a workspace-write sandbox that can access the job folders. On Windows, use Git for Windows for the library build. On Linux, install Playwright's Chromium system dependencies with `npm exec -- playwright install-deps chromium` if needed.
-   Run `gh auth login` with an account that can manage issues, push branches and merge eligible PRs. Configure Git credentials for the checkout's `origin` transport.
-   Land this installation on `master` before running jobs. Check the merge method in [config.json](config.json) against the repository's settings. Job worktrees are created from `origin/master`.
-   Create any missing GitHub labels:

    ```sh
    gh label create factory --color 5319E7 --description "Build this with the software factory"
    gh label create factory:needs-info --color FBCA04 --description "The factory asked the author a question"
    gh label create factory:needs-human --color D93F0B --description "The factory needs a human decision on the PR"
    ```

-   Label an issue, then invoke `$factory run <issue>` in Codex from the main checkout. Invoke `$factory run` to drain the queue. The approver can merge an approved PR after the gate passes again. Escalated PRs are marked ready for a person to decide.

## Commands

Run these commands from the main checkout with `python` on Windows or `python3` on Unix.

```sh
python factory/checks.py --setup
python factory/checks.py
python -X utf8 factory/bin/job queue
python -X utf8 factory/bin/job summary
python -m http.server 8000 --bind 127.0.0.1 --directory factory
```

Open [the local dashboard](http://127.0.0.1:8000/dashboard.html) with the server running. Jobs, role artifacts and Codex event logs live in the ignored `factory/jobs/` directory. Token counts cover input and output from standalone Codex CLI workers. Input totals include cached input.

The gate runs lint, library builds, unit tests and Playwright. Each job has an isolated worktree under `.worktrees/`, with separate ports for the builder, browser reviewers and gate. Run `python factory/checks.py --setup` from the relevant checkout after dependency or browser changes.

## Upstream

Adapted for Codex and Windows on 2026-11-23 from [ZazenCodes Software Factory v2 at 66ee7fe](https://github.com/zazencodes/zazencodes-season-3/tree/66ee7fe21f7e7b817b8faaec7218cb4c53de1427/src/software-factory-claude-code-v2). The factory and its adapted skill and agent definitions are distributed under the [GNU General Public License v3](LICENSE).
