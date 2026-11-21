# Guidelines

- Any non-private members or methods must be documented if their name might be confusing. When inheriting from an enforcing interface, prefer to document the interface and use the inherited documentation from that interface.
- Add inline documentation where third party integration makes us take a decision.
- Split multiple steps in a method in separate private methods with a clear name to make the main flow more readable, even if this means that there is a private method that will only be called once.

# Quality

When you are wrapping up your turn, always run the following commands.
1. `npm run format:prettier`
2. `npm run format:lint`, if this command causes additional code changes, run command 1 again.
