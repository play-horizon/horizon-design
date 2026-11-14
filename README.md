# horizon-design

Horizon's design system and Svelte 5 component library: one OKLCH palette and its tokens, the
theme and page-motion helpers, and the components of horizon, horizon-editor and the website,
built on [Ark UI](https://ark-ui.com) for behaviour and accessibility and
[Tailwind CSS 4](https://tailwindcss.com) for styling.

**Docs and live examples:** <https://play-horizon.github.io/horizon-design> (every component,
both themes). Each component's props are typed and documented in its source, so editors show
them.

## Entry points

| Import                              | What it holds                                                                                                                                                                                                                    |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `horizon-design`                    | The general kit: every component below but the Editor's, `theme` and `THEME_STORAGE_KEY`, `slidePage` and `prefersReducedMotion`, `cn`, and Ark's `createTreeCollection` for `VirtualTree`.                                      |
| `horizon-design/editor`             | The Editor window's components: `HierarchyView`, `InspectorPanel`, `FileTree` (with Ark's `createTreeCollection` and `createFileTreeCollection`), `HorizonLayout` (with everything horizon-layout exports), `createMonacoTheme`. |
| `horizon-design/tokens`             | `tokenValues`: every colour token of each theme as OKLCH and as sRGB hex, plain TypeScript with no Svelte.                                                                                                                       |
| `horizon-design/horizon-design.css` | The stylesheet: fonts, theme tokens, the Tailwind theme, base styles, page motion.                                                                                                                                               |

## Setup

```sh
pnpm add horizon-design
```

The components import their icons from [Mingcute](https://www.mingcute.com) through
[unplugin-icons](https://github.com/unplugin/unplugin-icons), which compiles each icon into a
Svelte component when the app is built, so the app sets up the same (see [Icons](#icons)).

Import the stylesheet after Tailwind, in the app's root CSS:

```css
@import 'tailwindcss';
@import 'horizon-design/horizon-design.css';
```

The stylesheet tells Tailwind to scan the library's components itself.

Then initialise the theme once, in the root layout (`theme.init` returns the function that removes
its listeners, which `onMount` calls when the layout unmounts):

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from 'horizon-design';

	onMount(() => theme.init());
</script>
```

and set it before the first paint, so the page never flashes the other theme (an inline script in
`app.html`, or the same lines in a preload script under a strict CSP). The script reads the mode
saved under `THEME_STORAGE_KEY` (`horizon-theme`) and, when storage is disabled, follows the OS as
the theme controller does:

```html
<script>
	(function () {
		var mode = null;
		try {
			mode = localStorage.getItem('horizon-theme');
		} catch {
			// Storage disabled: follow the OS, as the theme controller does.
		}
		var dark =
			mode === 'dark' ||
			(mode !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
		document.documentElement.dataset.theme = dark ? 'dark' : 'light';
	})();
</script>
```

## Tokens

One OKLCH palette (a navy ramp, a blue ramp and the status hues) is mapped, per theme, onto
semantic tokens. Components use only the semantic tokens, so both themes stay consistent; apps do
the same, and never write a colour literal.

| Group                | Tokens (Tailwind: `bg-*`, `text-*`, `border-*`…)                                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Surfaces             | `background` (the page), `sunken` (sidebars, fields, tracks), `surface` (cards, panels), `raised` (popovers, dialogs), `hover`, `active`                                                          |
| Lines                | `border`, `border-strong`                                                                                                                                                                         |
| Text                 | `fg`, `fg-2`, `muted`, `faint`                                                                                                                                                                    |
| Actions and status   | `primary`, `primary-hover`, `on-primary`, `danger`, `on-danger`, `success`, `warning`, `info`, `accent`, each with `-subtle` (a tinted fill) and `-border`                                        |
| Editor               | `server`, `local` (the two object modes), `grid-line`, the code colours `code-keyword`, `code-function`, `code-string`, `code-number`, `code-type`, `code-comment`, `code-attribute`, `code-line` |
| Fixed in both themes | `paper` (switch and slider thumbs, QR codes), `on-art` and `art-scrim` (text and pills over game art), `avatar-1` to `avatar-5`                                                                   |
| Overlays             | `scrim`                                                                                                                                                                                           |

- **Theme:** dark is the default; `data-theme="light"` on `<html>` (or on any element, for a
  light island) switches to light. `color-scheme` follows.
- **Type scale:** `text-2xs` (10.5 px) to `text-4xl` (34 px) for apps, 13 px body; `text-display-sm`,
  `text-display` and `text-display-lg` for marketing headlines. Encode Sans (semi-expanded) and
  Lilex for code.
- **Radius:** `rounded-xs` 2 px, `sm` 4 px, `md` 6 px, `lg` 10 px, `xl` 14 px.
- **Control heights:** `h-control-xs` 22 px, `sm` 26 px, `md` 30 px, `lg` 40 px.
- **Elevation:** `shadow-sm`, `shadow-md`, `shadow-lg`, and `inset-shadow-highlight`, the light
  edge on raised surfaces; each theme has its own.
- **Motion:** `ease-standard`, `ease-emphasized`; `--duration-fast` (0.15 s), `--duration-base`
  (0.2 s), `--duration-page` (0.32 s).
- **No blur by default.** Overlays (`Dialog`, `AlertDialog`, `Sheet`, `Drawer`, `Popover`, `Menu`,
  `ContextMenu`, `HoverCard`, `FloatingPanel`, `CommandPalette`) take `frosted` for a translucent,
  blurred surface; the `frosted` utility is for overlays only.
- Tailwind's default palette and shadows are removed: only these tokens produce colour utilities.

The tokens have one source, `scripts/tokens/tokens.ts`. When the library is built,
`scripts/tokens/generate.ts` writes the theme CSS (`src/lib/generated/theme.css`) and the
exported values (`src/lib/generated/tokens.ts`), converting each OKLCH value to sRGB hex. Every
OKLCH colour of the library lies inside sRGB (the generator refuses one that doesn't, and a test
checks every colour of the token source and every `oklch()` written in `src/`), so the CSS and its
hex show the same colour on every display.

### Token values as data

`horizon-design/tokens` gives every colour token of each theme in both forms, generated when the
library is built: `tokenValues[theme][token]` is `{ oklch, hex }`, where `oklch` is the value the
theme CSS uses (`oklch(0.202 0.029 268.7)`) and `hex` the same colour as lowercase sRGB hex
(`#111624`, or `#rrggbbaa` for translucent tokens), converted with CSS Color 4's conversion (colorjs.io, at build time). It is
for the colours needed before any CSS loads, which take no CSS variable and, for Electron, no
OKLCH:

```ts
import { tokenValues } from 'horizon-design/tokens';

new BrowserWindow({ backgroundColor: tokenValues[theme].background.hex });
```

## Theme and motion

```ts
import { theme, slidePage } from 'horizon-design';

theme.mode; // 'system' | 'dark' | 'light': the choice (reactive, read-only: change it with theme.set)
theme.resolved; // 'dark' | 'light': the theme in effect, following the OS while the mode is system (reactive)
theme.set('light'); // saves the mode and crossfades the whole page into it; resolves once the crossfade ends
theme.init({ blockContextMenu: true }); // applies the theme, follows the OS, blocks the browser's context menu only when asked; returns the function that stops it
```

The mode is saved in `localStorage` under `THEME_STORAGE_KEY`. Without storage (disabled, or
server rendering) the mode starts as system, and a choice lasts until the page is closed; on the
server, where there is no OS theme, `resolved` is dark. Calling `theme.init` again replaces the
listeners of the previous call.

Switching themes crossfades the whole page, and navigating slides the screen in the direction of
travel, both with the View Transitions API in 0.32 s, and neither when the browser has no View
Transitions or the system asks for reduced motion (`prefersReducedMotion()` says whether it does).
Mark the element that slides with `data-slide-region` and start the slide from SvelteKit's
`onNavigate`, with the app's own order of screens:

```ts
onNavigate((navigation) => {
	const direction = order(navigation.to) > order(navigation.from) ? 'forward' : 'backward';
	return new Promise((resolve) => {
		slidePage(direction, async () => {
			resolve();
			// A failed or cancelled navigation is SvelteKit's to report; the slide just ends.
			await navigation.complete.catch(() => {});
		});
	});
});
```

Switching documents or views inside one window is not a navigation: it switches at once.

## Text

Components hold no interface text of their own: every label, placeholder and accessible name is a
prop (`closeLabel`, `labels`, `emptyText`…) or a snippet, so apps pass their i18n messages; the
texts a component can't do without are required props. Numbers and dates arrive formatted
(`PlayerCount`'s `count`, `CircularProgress`'s `valueText`, a notification's `time`).

Ark UI components whose parts Ark names in English take Ark's `translations` prop, so the app
gives those names translated. It is required by `Calendar`, `Carousel`, `Clipboard`, `Combobox`,
`DatePicker`, `Editable`, `ImageCropper`, `NumberInput` (`incrementLabel`, `decrementLabel`,
`roleDescription`), `Pagination` (`rootLabel`, `prevTriggerLabel`, `nextTriggerLabel`,
`itemLabel`), `PinInput` (`inputLabel`) and `RatingGroup` (`ratingValueText`, `roleDescription`),
each with the keys it shows; `Calendar`, `Carousel` and `DatePicker` add the roles their parts are
announced as (`tableRoleDescription`; `roleDescription` and `slideRoleDescription`;
`contentRoleDescription`). The other Ark components take props of their own instead: `Tour`'s
`closeLabel` and `progressText`, `Marquee`'s `label` and `roleDescription`, `SignaturePad`'s
`label`, `roleDescription` and `clearLabel`, `FileUpload`'s `prompt`, `VirtualTree`'s `label` and `rename.label`, `FileTree`'s `label`, `HierarchyView`'s `label` and `renameLabel` and the
`closeLabel` of `Toaster`, `ToastItem` and `FloatingPanel` replace the names Ark gives in English,
and `ColorPicker`'s `labels` (each control, the area's role and the values its area and sliders
announce) and `Timer`'s `labels` (its buttons) name the controls Ark leaves unnamed.
`AngleSlider`'s and `CircularSlider`'s `valueText` format the values they show and announce.

## Text selection

Like a desktop app's, interface text isn't selectable: the base styles set `user-select: none` on
`<body>`. The base styles turn selection back on in what the user types (`<input>`, `<textarea>`,
editable `contenteditable` elements, so `Input`, `Textarea`, `Editable`, `PinInput`,
`NumberInput` and the other fields), and the components that show text to read or to copy turn it
on with `select-text`: `Prose` and the value of `Clipboard`.

Anywhere else that needs it, opt in with Tailwind's `select-text` class on the element:
documentation and other reading text, code (a Monaco editor's host element, a code block), and
values a user copies (an id, a link to share). Elements a pointer drags (`Slider`, `ScrollArea`'s
scroll bar, the `Splitter` handles, the `ImageCropper` image, the layout's tabs) keep
`select-none`, so a drag never selects text even inside a selectable region.

```svelte
<pre class="select-text"><code>{source}</code></pre>
```

## Icons

Icons are the [Mingcute](https://www.mingcute.com) set, through
[unplugin-icons](https://github.com/unplugin/unplugin-icons), and nothing else: no inline `<svg>`
markup in a component. Any other graphic (a logo, an illustration, example art) is a file (an
`.svg` or an image) referenced by its path. The library's components follow the same rule, and
import their icons as `~icons/mingcute/<name>`, which the app's build resolves. An app sets it up
once:

```sh
pnpm add -D unplugin-icons @iconify-json/mingcute
```

```ts
// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), Icons({ compiler: 'svelte' })]
});
```

```jsonc
// tsconfig.json: the types of the `~icons/*` imports
{
	"compilerOptions": { "types": ["unplugin-icons/types/svelte"] }
}
```

Then import an icon as a component; it takes the `class` of its size and colour and inherits
`currentColor`:

```svelte
<script lang="ts">
	import SearchIcon from '~icons/mingcute/search-line';
</script>

<SearchIcon class="size-4 text-muted" aria-hidden="true" />
```

Browse the set's names on [mingcute.com](https://www.mingcute.com) (`-line` and `-fill`
variants).

## Components

### Actions

| Component                                                                       | What it is                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`ActionBar`](https://play-horizon.github.io/horizon-design/action-bar)         | A floating bar of actions at the bottom of the window, for the current selection; `ActionBarSeparator` divides its groups.                                                                                                                                    |
| [`Button`](https://play-horizon.github.io/horizon-design/button)                | A button: `variant` sets its look and `size` its height (`icon-*` for a square icon-only button, which needs an `aria-label`); `loading` shows a spinner and disables it. `buttonVariants` gives its classes to other elements, such as an overlay's trigger. |
| [`ButtonGroup`](https://play-horizon.github.io/horizon-design/button-group)     | Groups buttons into one connected row or column (`orientation`).                                                                                                                                                                                              |
| [`Clipboard`](https://play-horizon.github.io/horizon-design/clipboard)          | Copies `value` to the clipboard, showing it, selectable, with a copy button that confirms the copy (Ark Clipboard); Ark `translations` (`triggerLabel`), required, name the button.                                                                           |
| [`SegmentGroup`](https://play-horizon.github.io/horizon-design/segment-group)   | A segmented control: a sunken track whose chosen segment is raised (Ark SegmentGroup), such as the theme or a view switch; `value` binds the chosen segment, and an `aria-label` names the group.                                                             |
| [`Swap`](https://play-horizon.github.io/horizon-design/swap)                    | Swaps between two contents with an animation, such as a play and a pause icon (Ark Swap): `on` while `swap` is true, `off` while it is false.                                                                                                                 |
| [`Toggle`](https://play-horizon.github.io/horizon-design/toggle)                | A button that stays pressed or not (Ark Toggle); `pressed` binds its state, and an icon-only toggle takes an `aria-label`.                                                                                                                                    |
| [`ToggleGroup`](https://play-horizon.github.io/horizon-design/toggle-group)     | A row of toggles of which one or several stay pressed (Ark ToggleGroup); `value` binds the pressed items, an `aria-label` names the group and an icon-only item takes a `label`.                                                                              |
| [`ToggleTooltip`](https://play-horizon.github.io/horizon-design/toggle-tooltip) | An icon toggle, such as a toolbar's Bold, with a tooltip that names it: `label`, required, is both the tooltip's text and the toggle's accessible name, and `pressed` binds its state.                                                                        |
| [`VoteButtons`](https://play-horizon.github.io/horizon-design/vote-buttons)     | Up and down votes, side by side on a segmented track, each with its count (`upCount`, `downCount`, formatted); `vote` binds the account's vote, and `labels` names the group and the buttons.                                                                 |

### Forms

| Component                                                                         | What it is                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`AngleSlider`](https://play-horizon.github.io/horizon-design/angle-slider)       | A circular control that picks an angle in degrees from 0 to 359, 0 at the top and clockwise (Ark AngleSlider); `label`, required, is its accessible name, `valueText`, required, formats the angle shown and announced (such as `45°`), and `value` binds the angle.                                                                                                            |
| [`Calendar`](https://play-horizon.github.io/horizon-design/calendar)              | A month calendar to pick a date or a range, inline (Ark DatePicker without its field); Ark `translations`, required, name its days and controls and the roles of its tables.                                                                                                                                                                                                    |
| [`Checkbox`](https://play-horizon.github.io/horizon-design/checkbox)              | A checkbox with its label (`label` or `children`, Ark Checkbox); `checked` binds true, false or indeterminate.                                                                                                                                                                                                                                                                  |
| [`CircularSlider`](https://play-horizon.github.io/horizon-design/circular-slider) | A circular control that picks a value from 0 to 359 along a ring that fills clockwise from the top up to its thumb (Ark AngleSlider), with the value in its centre; `label`, required, is its accessible name, `valueText`, required, formats the value shown and announced (such as `120°`), and `value` binds the value.                                                      |
| [`ColorPicker`](https://play-horizon.github.io/horizon-design/color-picker)       | Picks a colour: a hex field and a swatch trigger opening an area, hue and alpha sliders and fields (Ark ColorPicker); `value` binds the colour (from `parseColor`), `labels`, required, names every control, the area's role and the values the area and sliders announce, and `swatches` are passed in.                                                                        |
| [`Combobox`](https://play-horizon.github.io/horizon-design/combobox)              | A text field that filters a list of options to choose from (Ark Combobox); `label`, required, names the field, `emptyText`, required, shows when none matches, and Ark `translations` (`triggerLabel`), required, name its open button.                                                                                                                                         |
| [`DatePicker`](https://play-horizon.github.io/horizon-design/date-picker)         | A date field with a calendar popover (Ark DatePicker); `label`, required, names the field, `value` binds the chosen dates, `placeholder` shows while none is chosen, and Ark `translations`, required, name its controls and the roles of its popover and tables.                                                                                                               |
| [`Editable`](https://play-horizon.github.io/horizon-design/editable)              | Text that turns into a field when edited, then back (Ark Editable); `value` binds the text, and Ark `translations` (`input`, `edit`), required, name the field and the text.                                                                                                                                                                                                    |
| [`FacetedSearch`](https://play-horizon.github.io/horizon-design/faceted-search)   | Search with facets, for Discover and the store: a search field and an optional sort at the top, the facets in a column at the side (each a group of checkboxes, with optional counts), and the results, which the app renders in `children`. `query`, `selected` and `sort` bind, `onChange` reports each change, and `searchLabel`, `sortLabel` and `clearLabel` are required. |
| [`Field`](https://play-horizon.github.io/horizon-design/field)                    | A form field: its label, the control, a help text and an error message (`label`, `helperText`, `errorText`), wired together for assistive technology (Ark Field).                                                                                                                                                                                                               |
| [`FileUpload`](https://play-horizon.github.io/horizon-design/file-upload)         | A dropzone that takes files by drop or by browsing (Ark FileUpload); `prompt`, required, is its text and accessible name, and `hint` a second line.                                                                                                                                                                                                                             |
| [`Hint`](https://play-horizon.github.io/horizon-design/hint)                      | A short help text under a field, which the field's `aria-describedby` points at through the hint's `id`; inside a `Field`, its `helperText` takes its place.                                                                                                                                                                                                                    |
| [`ImageCropper`](https://play-horizon.github.io/horizon-design/image-cropper)     | Crops an image (`src`) to a frame that can be moved and resized (Ark ImageCropper), for avatars and thumbnails; Ark `translations`, all required, name and describe it for assistive technology.                                                                                                                                                                                |
| [`Input`](https://play-horizon.github.io/horizon-design/input)                    | A text input on a sunken field, with optional icons or controls at its start and end (`start`, `end`); `value` binds its text and `invalid` marks it invalid. Inside a `Field`, it takes the field's label, description and error.                                                                                                                                              |
| [`InputGroup`](https://play-horizon.github.io/horizon-design/input-group)         | An `Input` with `InputAddon`s (text or an icon, such as `https://`) attached to its sides, joined into one field.                                                                                                                                                                                                                                                               |
| [`Listbox`](https://play-horizon.github.io/horizon-design/listbox)                | A list of options to choose one or several from (Ark Listbox); `label`, required, names it, and `value` binds the chosen options.                                                                                                                                                                                                                                               |
| [`NativeSelect`](https://play-horizon.github.io/horizon-design/native-select)     | The browser's own select, styled like the other fields; `value` binds the chosen option, and a `<label for>` or an `aria-label` names it.                                                                                                                                                                                                                                       |
| [`NumberInput`](https://play-horizon.github.io/horizon-design/number-input)       | A number field with increment and decrement buttons (Ark NumberInput); `value` binds the field's text, and `translations` (`incrementLabel`, `decrementLabel`, `roleDescription`), required, name the buttons and the field's role.                                                                                                                                             |
| [`PinInput`](https://play-horizon.github.io/horizon-design/pin-input)             | A row of `count` one-character fields for a code, such as the sign-up code (Ark PinInput); `value` binds the characters, and Ark `translations.inputLabel` names each field.                                                                                                                                                                                                    |
| [`RadioGroup`](https://play-horizon.github.io/horizon-design/radio-group)         | A group of radio buttons to choose one option (Ark RadioGroup), from `items` or Ark's `RadioGroup.Item` parts; `value` binds the chosen option, and `label` or an `aria-label` names the group.                                                                                                                                                                                 |
| [`RatingGroup`](https://play-horizon.github.io/horizon-design/rating-group)       | A row of `count` stars to give a rating (Ark RatingGroup); `value` binds the rating, `label`, required, names the group, and `translations` (`ratingValueText`, `roleDescription`), required, name each star and its role.                                                                                                                                                      |
| [`Select`](https://play-horizon.github.io/horizon-design/select)                  | A select field with a dropdown list of options (Ark Select); `value` binds the chosen values, `label`, required, names the field, and `placeholder` shows while none is chosen.                                                                                                                                                                                                 |
| [`SignaturePad`](https://play-horizon.github.io/horizon-design/signature-pad)     | A pad to draw a signature or a sketch (Ark SignaturePad), with a clear button once something is drawn; `label`, `roleDescription` and `clearLabel`, required, name the pad, its role and the button.                                                                                                                                                                            |
| [`Slider`](https://play-horizon.github.io/horizon-design/slider)                  | A slider to pick a value, or a range with one thumb per value (Ark Slider); `value` binds the values, and `label` (or Ark's `aria-label`) names the thumbs.                                                                                                                                                                                                                     |
| [`Switch`](https://play-horizon.github.io/horizon-design/switch)                  | An on/off switch with its label (`label` or `children`, Ark Switch); `checked` binds its state.                                                                                                                                                                                                                                                                                 |
| [`TagPicker`](https://play-horizon.github.io/horizon-design/tag-picker)           | Chooses tags from a fixed list (the platform's tag lists are never free text): every tag is a toggle chip, the chosen ones tinted and checked. `value` binds the chosen ids, in the order chosen, `max` caps how many, and `label`, required, names the group.                                                                                                                  |
| [`Textarea`](https://play-horizon.github.io/horizon-design/textarea)              | A multi-line text field on a sunken field; `value` binds its text. Inside a `Field`, it takes the field's label, description and error.                                                                                                                                                                                                                                         |

### Display

| Component                                                                    | What it is                                                                                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`Announcement`](https://play-horizon.github.io/horizon-design/announcement) | A small pill that announces something new, with an optional icon and a tag.                                                                                                                                                                                                        |
| [`AspectRatio`](https://play-horizon.github.io/horizon-design/aspect-ratio)  | Keeps its content at a fixed width-to-height ratio (`ratio`, such as `16 / 9`).                                                                                                                                                                                                    |
| [`AssetCard`](https://play-horizon.github.io/horizon-design/asset-card)      | An asset in a list (a store listing, an entry of My assets or of a game's assets): its square thumbnail, its `name` (the card's link or button), its `kind`, a `meta` line (votes, the rig profile) and `actions` (Add to my assets). `name` and `kind`, translated, are required. |
| [`Avatar`](https://play-horizon.github.io/horizon-design/avatar)             | A person's avatar: their image, or their initials (`fallback`) on a coloured disc while it loads or when there is none. `alt`, the person's name, names it; without it, it is decorative.                                                                                          |
| [`AvatarStack`](https://play-horizon.github.io/horizon-design/avatar-stack)  | A row of overlapping avatars, such as who is editing a game now: up to `max` people, then a chip whose text `overflowText` gives; `label`, required, names the group.                                                                                                              |
| [`Badge`](https://play-horizon.github.io/horizon-design/badge)               | A small label: a status, a count, a tag or a restriction badge; `variant` sets its colour and `size` its height.                                                                                                                                                                   |
| [`Card`](https://play-horizon.github.io/horizon-design/card)                 | A surface that groups related content: an optional title and description, the content, and an optional footer.                                                                                                                                                                     |
| [`Carousel`](https://play-horizon.github.io/horizon-design/carousel)         | A horizontal slideshow of `slides` with previous and next controls and indicators (Ark Carousel); `label`, required, names it, and Ark `translations`, required, name the slides and the controls and the roles of the carousel and its slides.                                    |
| [`DataList`](https://play-horizon.github.io/horizon-design/data-list)        | A list of label and value pairs (`items`), such as the details of a game.                                                                                                                                                                                                          |
| [`Frame`](https://play-horizon.github.io/horizon-design/frame)               | A window-like frame around content, such as a code sample or a screenshot; with a `title`, a title bar shows it between three window dots.                                                                                                                                         |
| [`GameCard`](https://play-horizon.github.io/horizon-design/game-card)        | A game in a list: its 16:9 thumbnail and its name, the card's link (`href`) or button (`onclick`); the `feature` variant is the larger Continue playing card, with the icon and an `action` (Play).                                                                                |
| [`GameHero`](https://play-horizon.github.io/horizon-design/game-hero)        | The top of a game page: the game's 16:9 thumbnail as a banner that fades into the page, with the square icon, the name, a `byline` (the creator) and the game's `tags` over its bottom, and a `top` slot at its top left (Back).                                                   |
| [`Item`](https://play-horizon.github.io/horizon-design/item)                 | A row of a list, laying out what it is given (media, a title, a description, actions) in a line.                                                                                                                                                                                   |
| [`Kbd`](https://play-horizon.github.io/horizon-design/kbd)                   | A keyboard key or shortcut, such as `Ctrl K`, drawn as a raised key.                                                                                                                                                                                                               |
| [`Marquee`](https://play-horizon.github.io/horizon-design/marquee)           | Content (`MarqueeItem`s) that scrolls continuously, pausing while hovered or focused and still under reduced motion (Ark Marquee); `label` and `roleDescription`, required, name the region and its role.                                                                          |
| [`PlayerCount`](https://play-horizon.github.io/horizon-design/player-count)  | How many people are playing a game now: a live dot and the count. `count` (formatted) and `label` (`playing now`) are required; `variant` is `inline` or an `overlay` pill on game art.                                                                                            |
| [`Prose`](https://play-horizon.github.io/horizon-design/prose)               | Typography for long-form text, such as rendered Markdown; its text is selectable.                                                                                                                                                                                                  |
| [`QrCode`](https://play-horizon.github.io/horizon-design/qr-code)            | A QR code of `value` on the fixed `paper` background, so scanners read it in both themes (Ark QrCode); `label`, required, names the image.                                                                                                                                         |
| [`ScrollArea`](https://play-horizon.github.io/horizon-design/scroll-area)    | A scrolling region with a thin, themed vertical scrollbar, shown only while the content overflows (Ark ScrollArea); the region needs a height.                                                                                                                                     |
| [`Separator`](https://play-horizon.github.io/horizon-design/separator)       | A horizontal or vertical divider, hidden from assistive technology unless `decorative` is false.                                                                                                                                                                                   |
| [`Status`](https://play-horizon.github.io/horizon-design/status)             | A small dot that shows a status: online (or running), away, busy (or failing) or offline, with a soft ring in its colour; `label` names it, and without it the dot is decorative.                                                                                                  |
| [`Table`](https://play-horizon.github.io/horizon-design/table)               | A data table from `columns` and `rows`; `rowKey`, required, gives each row's stable key.                                                                                                                                                                                           |
| [`ThemeSwitch`](https://play-horizon.github.io/horizon-design/theme-switch)  | The theme switch: three icon buttons (system, dark, light) on a sunken pill, the chosen one raised, which call `theme.set`; `labels`, required, names the group and each mode.                                                                                                     |
| [`ThumbCard`](https://play-horizon.github.io/horizon-design/thumb-card)      | A card showing a preview (its content) with a `label` under it, a link when `href` is set.                                                                                                                                                                                         |
| [`Timer`](https://play-horizon.github.io/horizon-design/timer)               | A countdown or a stopwatch (Ark Timer), with the days before the hours from one day on (`01:02:00:00`), and start, pause, resume and reset buttons that `labels`, required, names.                                                                                                 |

### Feedback

| Component                                                                                 | What it is                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`Alert`](https://play-horizon.github.io/horizon-design/alert)                            | An inline message (a banner): a neutral, info, success, warning or error tint, an icon, a title and a description.                                                                                                                                                                                                   |
| [`CircularProgress`](https://play-horizon.github.io/horizon-design/circular-progress)     | A ring that fills with progress (`value` out of `max`), with an optional value in its centre; `label`, required, names the progress bar, and `valueText` (formatted, such as `72%`) is shown and announced.                                                                                                          |
| [`NotificationCenter`](https://play-horizon.github.io/horizon-design/notification-center) | The notification centre: a heading with "Mark all as read", then the account's notifications, newest first, each with its image (a game's icon), its text, its time and, while unread, a dot. `heading`, `emptyText`, `markAllLabel` and `unreadLabel` are required, and `actions` renders a notification's buttons. |
| [`Progress`](https://play-horizon.github.io/horizon-design/progress)                      | A horizontal progress bar of `value`, required, with an optional label and value (Ark Progress); `label` names the bar.                                                                                                                                                                                              |
| [`Skeleton`](https://play-horizon.github.io/horizon-design/skeleton)                      | A placeholder block that pulses while content loads (pages show skeletons, not spinners).                                                                                                                                                                                                                            |
| [`Spinner`](https://play-horizon.github.io/horizon-design/spinner)                        | A spinning loading indicator, for an action in progress inside a control (a button); `label` shows beside it and is announced, an `aria-label` is only announced, and with neither it is decorative.                                                                                                                 |
| [`Toaster`](https://play-horizon.github.io/horizon-design/toast)                          | Shows the toasts of a toaster made with `createToaster`, stacked at the window's edge, in a live region; `label` and `closeLabel`, required, name the region and each toast's close button.                                                                                                                          |
| [`ToastItem`](https://play-horizon.github.io/horizon-design/toast)                        | One toast message: an info, success, warning or error tint (or, while loading, a neutral one with a spinner), a title, a description and a close button named by `closeLabel`, required.                                                                                                                             |

### Navigation

| Component                                                                             | What it is                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`Accordion`](https://play-horizon.github.io/horizon-design/accordion)                | A vertical stack of collapsible sections (Ark Accordion); `AccordionItem` is one section, with its `value` and its `trigger`, and `value` binds the open sections.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [`BottomNavigation`](https://play-horizon.github.io/horizon-design/bottom-navigation) | A bar of navigation `items` fixed to the bottom of a narrow screen; `label`, required, names it among the page's landmarks.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [`Breadcrumb`](https://play-horizon.github.io/horizon-design/breadcrumb)              | The trail of pages leading to the current one, each a link but the last; `label`, required, names the trail.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [`Collapsible`](https://play-horizon.github.io/horizon-design/collapsible)            | Content that a trigger shows and hides (Ark Collapsible); `open` binds whether it shows.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [`CommandPalette`](https://play-horizon.github.io/horizon-design/command-palette)     | The command palette: a dialog at the top of the window with a search field and every command that matches what is typed (each word whole, ignoring case and accents, through Ark's `useFilter`), ranked by [fuzzysort](https://github.com/farzher/fuzzysort), label matches first, each with its shortcut. The field and the virtualised list are an Ark combobox: Up, Down, Home and End move through the commands that can run, Enter runs one, Escape closes. `open` binds, `onRun` runs the chosen command once the palette has finished closing, so the command can move the focus, and `label` and `emptyText` are required. |
| [`LinkOverlay`](https://play-horizon.github.io/horizon-design/link-overlay)           | The link of a `LinkBox`, stretched over the whole box so a click anywhere follows it, while the box's other links and controls stay usable.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [`Pagination`](https://play-horizon.github.io/horizon-design/pagination)              | Page links with previous and next for `count` items, required (Ark Pagination); `page` binds the current page, and Ark `translations` name its controls. `children` replaces the built-in controls with the parts `PaginationPrevTrigger`, `PaginationNextTrigger`, `PaginationItem`, `PaginationEllipsis` and `PaginationContext`, which reads its state.                                                                                                                                                                                                                                                                         |
| [`Sidebar`](https://play-horizon.github.io/horizon-design/sidebar)                    | An app's navigation sidebar: a sunken column with an optional header (the brand), the navigation itself (`SidebarSection` and `SidebarItem`) and an optional footer (the account); `collapsed` narrows it to its icons.                                                                                                                                                                                                                                                                                                                                                                                                            |
| [`SkipNav`](https://play-horizon.github.io/horizon-design/skip-nav)                   | A link, shown on keyboard focus, that skips to the page's main content.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [`Steps`](https://play-horizon.github.io/horizon-design/steps)                        | A multi-step flow (Ark Steps): the `steps` (each an `id`, a `title` and its `content`), the current step's content, and back and next buttons named by `prevLabel` and `nextLabel`, required; `step` binds the current step.                                                                                                                                                                                                                                                                                                                                                                                                       |
| [`Tabs`](https://play-horizon.github.io/horizon-design/tabs)                          | Tabs and their panels (Ark Tabs), a segmented or an underlined tab list; each tab is a `value`, a `label` and its `content`, and `value` binds the selected tab.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

### Overlays

| Component                                                                       | What it is                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`AlertDialog`](https://play-horizon.github.io/horizon-design/alert-dialog)     | A confirmation dialog for a destructive or irreversible action: a title, a description, Cancel and the confirming action, named by `cancelLabel` and `actionLabel`, required. Cancel takes the focus; the confirming button calls `onAction`, required, and closes it; `open` binds.                        |
| [`ContextMenu`](https://play-horizon.github.io/horizon-design/context-menu)     | A menu opened by a right click or a long press on its content (Ark Menu): its `groups` (each with an `id`, an optional title that names it, and its `items` to choose, each with an `id`), a line between groups, and Ark's `onSelect` reports the chosen item's `id`; `frosted` for a translucent surface. |
| [`Dialog`](https://play-horizon.github.io/horizon-design/dialog)                | A modal dialog (Ark Dialog): a title, a description, the content and a footer, on the raised surface over a scrim; `closeLabel`, required, names its close button, `open` binds, and `DialogClose` closes it from inside; `frosted` for a translucent surface.                                              |
| [`Drawer`](https://play-horizon.github.io/horizon-design/drawer)                | A panel that slides in from the end edge of the window and is swiped back toward it to dismiss it (Ark Drawer), with a title, content and footer; `title`, required, names it, `closeLabel`, required, names its close button, `open` binds, and `DrawerClose` closes it from inside.                       |
| [`FloatingPanel`](https://play-horizon.github.io/horizon-design/floating-panel) | A panel that floats over the window, dragged by its header and resized by its edges and corners (Ark FloatingPanel); `title`, required, names it, `closeLabel`, required, names its close button, and `open` binds.                                                                                         |
| [`HoverCard`](https://play-horizon.github.io/horizon-design/hover-card)         | A card that shows on hover or focus of its trigger (Ark HoverCard), such as the docs card of a function; `frosted` for a translucent surface.                                                                                                                                                               |
| [`Menu`](https://play-horizon.github.io/horizon-design/menu)                    | A dropdown menu opened by its trigger (Ark Menu): `MenuItem`s (each a `value`, which Ark's `onSelect` reports), `MenuGroup`s named by a `MenuGroupLabel`, and `MenuSeparator`s; `open` binds, `frosted` for a translucent surface.                                                                          |
| [`Popover`](https://play-horizon.github.io/horizon-design/popover)              | A non-modal panel anchored to its trigger (Ark Popover), with a title, content and footer; `open` binds, and `PopoverClose`, named by its required `label`, closes it from inside; `frosted` for a translucent surface.                                                                                     |
| [`Sheet`](https://play-horizon.github.io/horizon-design/sheet)                  | A modal panel that slides in from one `side` of the window (Ark Dialog); `closeLabel`, required, names its close button, and `open` binds; `frosted` for a translucent surface.                                                                                                                             |
| [`Tooltip`](https://play-horizon.github.io/horizon-design/tooltip)              | A short label (`content`) shown on hover or keyboard focus of its trigger (Ark Tooltip): a button holding `children`, or the app's own element through `trigger`. It describes the trigger, so an icon-only trigger still needs an `aria-label`.                                                            |
| [`Tour`](https://play-horizon.github.io/horizon-design/tour)                    | A guided tour of the interface, step by step, with the step's target spotlit (Ark Tour); the app passes the `steps` and their action labels translated, and `closeLabel` and `progressText`, required.                                                                                                      |

### Layout

| Component                                                                   | What it is                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`Float`](https://play-horizon.github.io/horizon-design/float)              | Pins its content at a corner or the bottom centre of the window (`position`), over the page, such as floating action buttons; several children stack in a column.                                                                                                                                                                                                                                                                                                                                                                                                |
| [`Splitter`](https://play-horizon.github.io/horizon-design/splitter)        | Resizable panels (Ark Splitter): `SplitterPanel`s, each with its `id` from `panels`, and a `SplitterResizeTrigger` between each two, named by its `label`, required.                                                                                                                                                                                                                                                                                                                                                                                             |
| [`VirtualList`](https://play-horizon.github.io/horizon-design/virtual-list) | A scrolling list that renders only the rows in view (plus `overscan` rows on each side), so a list of any length costs the same as one screenful; `items`, `itemHeight`, `key` and `row` are required, and `scrollToIndex` brings a row into view, and `keepIndex` keeps a row (such as the active one) rendered while it is out of view.                                                                                                                                                                                                                        |
| [`VirtualTree`](https://play-horizon.github.io/horizon-design/virtual-tree) | A virtualised tree (WAI-ARIA tree view, on Ark TreeView): only the rows in view are rendered, so a hierarchy of any size stays fast, with Ark's keyboard, multiple selection and renaming, and its own type-to-find, which takes names with spaces. `collection` (from `createTreeCollection`), `label` and `row` are required; `expandedValue`, `selectedValue` and `focusedValue` bind, `rename` enables F2 renaming, and `focus`, `visibleValues` and `startRenaming` bring a row into view and focus it, list the rows on screen, and open the rename field. |

### Editor

| Component                                                                         | What it is                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`FileTree`](https://play-horizon.github.io/horizon-design/file-tree)             | A tree of files and folders (Ark TreeView) from a `collection`, with expandable folders and custom icons; only files are selected. `label`, required, names it, and `selectedValue`, `expandedValue` and `focusedValue` bind.                                                                                                                                                                                   |
| [`HierarchyView`](https://play-horizon.github.io/horizon-design/hierarchy-view)   | The Editor's hierarchy of a scene's objects: a tree with keyboard navigation, multiple selection, renaming, and drag and drop to reparent and reorder, which reports each change of `data` through `onDataChange`. `label`, `renameLabel` and `dragLabel` are required; `nodeWithName` writes a renamed node when `nodeToString` reads a field other than `name`, and `selectedValue` and `expandedValue` bind. |
| [`HorizonLayout`](https://play-horizon.github.io/horizon-design/horizon-layout)   | The Editor window's docking layout: horizon-layout styled with horizon-design, with a button that restores a maximised view; `config` binds, `views` holds the views, and `restoreLabel`, required, names the restore button.                                                                                                                                                                                   |
| [`InspectorPanel`](https://play-horizon.github.io/horizon-design/inspector-panel) | The Editor's inspector: a column of collapsible cards (a component each) that can be reordered by drag or keyboard; `cards` and `expandedIds` bind.                                                                                                                                                                                                                                                             |

## Developing

Requirements: Node 24.2 or later (the token generator uses `import.meta.main`) and pnpm 12 (`.node-version`, `packageManager`).

```sh
pnpm install
pnpm dev     # the docs site on http://localhost:5173
pnpm lint    # Prettier and ESLint
pnpm check   # svelte-check
pnpm test    # vitest: the token pipeline and component tests (jsdom)
pnpm build   # the docs site (build/) and the package (dist/)
```

- `src/lib/components/<name>/`: one directory per general component, with its `index.ts`, its
  tests (`*.test.ts`) and any helper module.
- `src/lib/editor/`: the Editor's components, exported as `horizon-design/editor`.
- `src/lib/styles/`: the stylesheet's parts (fonts, scale, base, motion, frosted), imported by
  `src/lib/horizon-design.css`; `src/lib/generated/` holds the generated token files (gitignored).
- `src/lib/theme.svelte.ts` and `src/lib/motion/`: the theme controller and page motion.
- `scripts/tokens/`: the token source and the generator, which converts OKLCH to hex with [colorjs.io](https://colorjs.io) when the library is built.
- `src/routes/`: the docs site, one page per component (`sections/<Name>.svelte`), listed in
  `src/routes/nav.ts`.

Every new component gets a docs page with live examples and component tests. Publishing: a push
to `main` that bumps the version publishes to npm and deploys the docs site.

## Fonts

[Encode Sans](https://fonts.google.com/specimen/Encode+Sans) (variable weight and width) and
[Lilex](https://github.com/mishamyrt/Lilex) (variable weight) are self-hosted and bundled with the
stylesheet, each split into a Latin and an extended subset.

## Licence

MIT.
