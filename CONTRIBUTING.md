# Contributing to horizon-design

Thanks for helping. horizon-design is the design system and Svelte 5 component
library of [Horizon](https://github.com/play-horizon), published under the MIT
license. Bug reports, accessibility fixes, docs and new components are welcome.

## Before you start

- **Bugs**: open an issue with the component, the props you passed and the
  browser you used. A screenshot of the docs page helps.
- **New components**: open an issue first. Components build on
  [Ark UI](https://ark-ui.com) for behaviour and Tailwind CSS 4 for styling,
  use only the theme tokens (no colour literals), take every text as a prop or
  a snippet, and must work in both the dark (default) and light themes.

## Setup

Requirements: Node.js 24 and pnpm 12 (the versions CI uses, from `.node-version` and `packageManager`).

```sh
git clone https://github.com/play-horizon/horizon-design.git
cd horizon-design
pnpm install --frozen-lockfile
pnpm dev        # docs site on http://localhost:5173
```

## Checks

Run these before opening a pull request; CI runs the same commands.

```sh
pnpm lint       # prettier --check + eslint
pnpm check      # svelte-check type checking
pnpm test       # vitest: token pipeline and component tests
pnpm build      # builds the docs site and packages the library
```

`pnpm format` fixes formatting. Files must use LF line endings.

## Pull requests

- Branch from `main` and keep one logical change per pull request.
- Commit subjects are `TYPE: summary` under 50 characters, with one of `FEAT`,
  `FIX`, `DOCS`, `STYLE`, `REFACTOR`, `PERF`, `TEST`, `BUILD`, `CI`, `CHORE`:
  `FIX: close the select menu on Escape`.
- Document every prop in the component's source (a doc comment on its type),
  and give every new component a docs page with live examples
  (`src/routes/sections/`, listed in `src/routes/nav.ts`) and tests.
- Every pull request is reviewed by at least one maintainer before it is
  merged. An automated AI review may also comment; maintainers decide which of
  its suggestions apply.

## License

By contributing you agree that your contributions are licensed under the
[MIT License](./LICENSE).
