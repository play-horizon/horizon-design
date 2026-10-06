# Contributing to horizon-design

Thanks for helping. horizon-design is the design system and Svelte 5 component
library of [Horizon](https://github.com/play-horizon), published under the MIT
license. Bug reports, accessibility fixes, docs and new components are welcome.

## Before you start

- **Bugs**: open an issue with the component, the props you passed and the
  browser you used. A screenshot of the showcase page helps.
- **New components**: open an issue first. Components build on
  [Ark UI](https://ark-ui.com) for behaviour and Tailwind CSS v4 for styling,
  and must work in both the dark (default) and `.light` themes.

## Setup

Requirements: Node.js 22 and pnpm 10 (the versions CI uses).

```sh
git clone https://github.com/play-horizon/horizon-design.git
cd horizon-design
pnpm install --frozen-lockfile
pnpm dev        # showcase app on http://localhost:5173
```

## Checks

Run these before opening a pull request; CI runs the same commands.

```sh
pnpm check      # svelte-check type checking
pnpm lint       # prettier --check + eslint
pnpm build      # builds the showcase and packages the library
```

`pnpm format` fixes formatting. Files must use LF line endings.

## Pull requests

- Branch from `main` and keep one logical change per pull request.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/):
  `fix(select): close the menu on Escape`, `feat: add a Tooltip component`.
- Document new props in the README table of the component.
- Every pull request is reviewed by at least one maintainer before it is
  merged. An automated AI review may also comment; maintainers decide which of
  its suggestions apply.

## License

By contributing you agree that your contributions are licensed under the
[MIT License](./LICENSE).
