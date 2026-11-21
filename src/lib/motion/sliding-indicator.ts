/**
 * The sliding indicator of the kit's single-choice button rows (`ThemeSwitch`, a single-choice
 * `ToggleGroup`): one highlight that moves to the chosen button, as Ark's `SegmentGroup` indicator
 * does, instead of each button lighting up in place. An attachment on the row measures the chosen
 * button and writes its box as CSS variables on the row; the row's indicator element is positioned
 * from them and transitions between two choices.
 * @module
 */
import type { Attachment } from 'svelte/attachments';

/**
 * Tracks the button of `row` that matches `chosen` (a CSS selector, such as
 * `[aria-pressed="true"]`) and sets `--indicator-left`, `--indicator-top`, `--indicator-width` and
 * `--indicator-height` on the row, in pixels from its padding box (the row must be positioned).
 * `data-indicator` on the row is `none` while no button is chosen, `placed` once the first box is
 * set, and `moving` from the next frame on, so the indicator appears in place and only slides
 * between two choices. It follows the choice (attribute changes inside the row) and the buttons'
 * sizes (a font that loads late, a resized window).
 */
export function slidingIndicator(chosen: string): Attachment<HTMLElement> {
	return (row) => {
		let frame = 0;
		const place = () => {
			const button = row.querySelector<HTMLElement>(chosen);
			if (!button) {
				row.dataset.indicator = 'none';
				return;
			}
			row.style.setProperty('--indicator-left', `${button.offsetLeft}px`);
			row.style.setProperty('--indicator-top', `${button.offsetTop}px`);
			row.style.setProperty('--indicator-width', `${button.offsetWidth}px`);
			row.style.setProperty('--indicator-height', `${button.offsetHeight}px`);
			if (row.dataset.indicator === 'moving') return;
			row.dataset.indicator = 'placed';
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => (row.dataset.indicator = 'moving'));
		};
		place();
		const mutations = new MutationObserver(place);
		mutations.observe(row, {
			subtree: true,
			attributes: true,
			attributeFilter: ['aria-pressed', 'data-state']
		});
		// The row is as wide as its buttons, so a button that grows resizes the row too.
		const sizes = new ResizeObserver(place);
		sizes.observe(row);
		return () => {
			cancelAnimationFrame(frame);
			mutations.disconnect();
			sizes.disconnect();
		};
	};
}

/** How long the indicator slides, in milliseconds: the `duration-200` of its classes. */
export const slidingIndicatorMs = 200;

/**
 * The classes of the indicator element: placed from the row's variables, hidden until the
 * attachment has placed it (on the server, before hydration, and while nothing is chosen), and
 * sliding once placed (never under reduced motion). The row carries the `group` class; the indicator comes before the buttons, which are
 * positioned so they paint over it.
 */
export const slidingIndicatorClasses =
	'pointer-events-none absolute top-(--indicator-top) left-(--indicator-left) h-(--indicator-height) w-(--indicator-width) group-data-[indicator=moving]:transition-[left,top,width,height] group-data-[indicator=moving]:duration-200 group-data-[indicator=moving]:ease-standard hidden group-data-[indicator=moving]:block group-data-[indicator=placed]:block motion-reduce:transition-none';
