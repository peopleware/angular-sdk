# `SignalStore`

## When To Use

Use `SignalStore<TState>` for lightweight feature-local state built on Angular signals.

## How To Use It Well

-   Extend it in a feature store class.
-   Call `initialize(...)` before reading state or selectors.
-   Expose read models through `select(...)`, `selectMany(...)`, or `state`.
-   Use `patch(...)` for partial updates.
-   Use `pick(...)` and `connect(...)` when another signal source should feed the store reactively.
-   Keep the store focused on local feature state, not broad cross-app orchestration.
