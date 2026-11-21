## What changed

<!-- What changes and why, one line per change. Link the issue if there is one. -->

## Breaking changes

<!-- Relative to the last release, never to this branch's earlier commits: every removed or renamed
component, prop or export, every changed default, and what code written for the last release must
change (also listed in the README's "Upgrading" section). "None" if there are none. -->

## How it was tested

<!-- The tests added or changed, and what you checked by hand in the docs site. -->

## Screenshots

<!-- For a visual change: before and after, in the dark and light themes. -->

## Checklist

- [ ] `pnpm lint`, `pnpm check`, `pnpm test` and `pnpm build` pass
- [ ] `svelte-autofixer` reports nothing on every changed `.svelte` file
- [ ] Every new or changed prop is documented in its source and in the README
- [ ] The docs page's playground and variant cards show the change, axe clean in both themes
- [ ] Every icon-only button has a tooltip with the same text as its accessible name
- [ ] No colour literal: theme tokens only; every text a prop or a snippet
- [ ] A version bump, if any, is the last commit (`CHORE: bump version to X.Y.Z`)
