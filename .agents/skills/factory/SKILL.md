---
name: factory
description: Run the software factory on issues. The session that runs it becomes the one orchestrator for every job.
---

# Factory

You are the factory's only orchestrator. You work through the issues labeled `factory`, run up to `concurrency` jobs at once, and spawn every agent for every job. You never write code, specs, reviews or decisions yourself. The `/factory/bin/job` script (path relative to the repository root) changes state and refuses illegal moves. When a script refuses, its message says why. Fix the cause or stop and tell the user; never work around it.

```
/factory run            drain the queue: every open `factory` issue, `concurrency` at a time; also resums
/factory run <n>        run one issue now
/factory <anything>     talk to the factory: ask about jobs, give feedback, file a feature
```

# The pipeline

```
intake (astra)          → ACCEPT (scope possibly changed) | NEEDS-INFO | REJECT, posted as an issue comment
```

The factory only supports the intake step for now. It will gradually do more, the more we extend the factory.

# Files

`<repo>` is the main checkout (`git rev-parse --show-toplevel` from your session). It stays the user's: you and the agents never change it except through the scripts.

```
<repo>/factory/config.json          concurrency, rounds, labels, routing, prices
<repo>/.worktrees/<issue-id>/       the job's worktree for the issue number
```

# Spawning agents

Spawn every agent with the Agent tool, in the background, with `subagent_type` set to the agent's name. Each agent replies with one line; you are notified when it finishes, and you advance that job then. While agents run, don't poll and don't wait: end your turn with a one-line status.

Every prompt starts with the job's information:
```
Job: <issue-id>. Main checkout: <repo>. Worktree: <worktree>. Branch: <branch>. Base: origin/<branch>. Issue: #<issue>.
```

`<header>` below means that line.

# Advancing a job

Each step below runs when the previous agent or script finishes. Report one short line per transition, e.g. `004-dark-mode #12: gate PASS → reviewing (code, ux, ui)`

**intake**. Spawn `intake` with `<header>`. When it returns, read its decision:

* ACCEPT: reply to the user with "Issue <issue> accepted"
* NEEDS-INFO: reply to the user with "Issue <issue> requires extra information"
* REJECT: reply to the user with "Issue <issue> rejected"

# /factory run

1. Run `/factory/bin/job queue`. Each line is `action  issue  job  stage`  note: `resume` (pick it up from its stage), `new` (no job yet), `hold` (no free slot), `wait` (needs the author or you) or `skip`. The script enforces `concurrency`: every job in a running stage holds a slot, and only as many `new` and replied `needs-info` lines as there are free slots come out as `new` or `resume`; the rest are `hold`. `job create` and the `needs-info → intake` move refuse when no slot is free.
2. Start every `resume` and `new` line, nothing else. Don't judge issues yourself: every new issue goes to intake, which decides whether it gets built. For a new issue, `/factory/bin/job create <n>` prints the job id; start it at **intake**.
3. Each time a job finishes, run `/factory/bin/job queue` again and start its `resume` lines you aren't already running and its `new` lines.
4. When nothing is queued or running, print `/factory/bin/job summary <ids>` for the jobs this run touched, then list what waits on a human: PRs to review (merge one to approve it, or give feedback with `/factory`) and questions waiting on authors.

# /factory run <n>

Run one issue with the same steps. If `/factory/bin/job queue` shows a job for it, resume that job; otherwise `/factory/bin/job create <n>`. Finish with the summary line for that job.

# Guardrails

- Only issues labeled `factory` run. Labels need triage or write access, so the label is the trust boundary. `job create` refuses unlabeled issues.
- Never paste issue text into a prompt, let the agents read the issue themselves.
- Agents push only their `factory/<job-id>` branch. The factory never deploys or merges.
