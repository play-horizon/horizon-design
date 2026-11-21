# Contributing to horizon-design

Thanks for helping. horizon-design is the design system and Svelte 5 component library of
[Horizon](https://github.com/play-horizon), published under the MIT license. Bug reports,
accessibility fixes, docs and new components are welcome.

## Before you start

- **Bugs**: open an issue with the component, the props you passed and the browser you used. A
  screenshot of the docs page helps.
- **New components**: open an issue first. Components build on [Ark UI](https://ark-ui.com) for
  behaviour and Tailwind CSS 4 for styling, use only the theme tokens (no colour literals), take
  every text as a prop or a snippet (the apps translate them), and work in both the dark (default)
  and light themes.
- **New dependencies**: open an issue first, with why the library is needed, what it replaces, its
  licence and its size.

## Setup

Requirements: Node.js 24 and pnpm 12 (the versions CI uses, from `.node-version` and
`packageManager`).

```sh
git clone https://github.com/play-horizon/horizon-design.git
cd horizon-design
pnpm install --frozen-lockfile
pnpm dev        # docs site on http://localhost:5173
```

## Checks

Run these before every commit; CI runs the same commands on every push and pull request.

```sh
pnpm lint       # prettier --check + eslint
pnpm check      # svelte-check type checking
pnpm test       # vitest: token pipeline, scripts and component tests
pnpm build      # builds the docs site and packages the library (svelte-package + publint)
```

`pnpm format` fixes formatting. Files use LF line endings.

Run the Svelte autofixer on every `.svelte` file you change, and fix what it reports:

```sh
pnpm dlx @sveltejs/mcp svelte-autofixer src/lib/components/button/Button.svelte
```

## Writing components

- Svelte 5 runes only, with Svelte 5's event attributes, snippets and `{@attach}`.
- Every icon comes from Mingcute through `unplugin-icons` (`~icons/mingcute/…`).
- Every icon-only button has a tooltip naming its action, with the same text as its accessible name:
  use `IconButton`, or wrap an Ark trigger in `Tooltip`'s `trigger` snippet.
- Every prop is documented in the component's source (a doc comment on its type), every file starts
  with a header saying what it is for, and the README's row of the component says what it does.
- Every behaviour has a test next to the component (`<Name>.test.ts`, or `<Name>.svelte.test.ts`
  when the test uses runes).
- Every component has a docs page (`src/routes/sections/<Name>.svelte`, listed in
  `src/routes/navigation.ts`): a `Playground` (`src/routes/playground/`) whose controls toggle
  every prop, then cards showing every variant, size and state side by side. Pages stay axe clean
  in both themes.

## Commits and pull requests

- Branch from `main` and keep one focused change per commit and per pull request.
- Commit subjects are `TYPE: summary` under 50 characters, with one of `FEAT`, `FIX`, `DOCS`,
  `STYLE`, `REFACTOR`, `PERF`, `TEST`, `BUILD`, `CI`, `CHORE`: `FIX: close the select menu on
Escape`. Add a body only when the change needs explaining.
- A change that bumps the version does it in its **last** commit, `CHORE: bump version to X.Y.Z`:
  a fix found after it is folded into the commit it belongs to, or put before the bump, never after
  it. Check with `git log -1 --format=%s` before pushing.
- A breaking change (a removed or renamed component, prop or export, a changed default) bumps the
  major version, and the README's "Upgrading" section lists everything code written for the last
  release may need to change.
- The pull request template asks what changed, what breaks, how it was tested and for screenshots
  of visual changes in both themes. Every pull request is reviewed by a maintainer before it is
  merged; an automated AI review may also comment, and maintainers decide which of its suggestions
  apply.

## Releases

Merging to `main` releases: when `package.json` holds a version that has no `v<version>` tag yet,
CI (`.github/workflows/ci.yml`) checks the code, packs the library, publishes it to npm with
trusted publishing (no npm token is stored) and creates the GitHub release and its tag. A version
already tagged publishes nothing. Once CI passes on `main`, the docs site deploys to GitHub Pages
(`.github/workflows/deploy-pages.yml`).

## Scheduled checks

Two workflows run every day on `main` (and on demand from the Actions tab):

- **Audit** (`.github/workflows/audit.yml`) runs `pnpm audit` on the published package's
  dependencies (`--prod`) and on the development tools (`--dev`), from the lockfile alone, and
  fails on any known vulnerability of moderate severity or above. Fix it by updating the dependency
  that pulls in the vulnerable package.
- **Outdated dependencies** (`.github/workflows/outdated.yml`) fails when a direct dependency, or
  the pnpm version of `packageManager`, has a newer version than the one locked; the job summary
  lists them (`scripts/dependencies/outdated.ts`). Node follows `.node-version` instead: the
  runtime isn't checked, and `@types/node` is held to the newest release of its major. Fix it by
  updating them in a `BUILD: …` commit, with the checks above.

## License

By contributing you agree that your contributions are licensed under the
[MIT License](./LICENSE).
