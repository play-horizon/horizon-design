<!--
@component
A scrolling list that renders only the rows in view (plus `overscan` rows on each side), so a list
of any length costs the same as one screenful. Every row has the same height, `itemHeight`
pixels. The list gives no roles of its own: pass the container's (`role="listbox"`,
`aria-label`…) as attributes, and render each row's semantic element in `row`, which receives
the item and its index. `keepIndex` keeps one more row rendered while it is out of view: the
active row an `aria-activedescendant` names, so the id it points at always exists, or the row that
has the focus, which unmounting would lose.

Call `scrollToIndex(index)` (through `bind:this`) to bring a row into view, such as the active
row of a keyboard-driven list.
-->
<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '#lib/utils.js';
	import { visibleRange } from './range';

	let {
		items,
		itemHeight,
		key,
		row,
		overscan = 6,
		keepIndex,
		class: className,
		onscroll,
		...rest
	}: HTMLAttributes<HTMLDivElement> & {
		/** Every item of the list. */
		items: readonly T[];
		/** The height of every row, in pixels. */
		itemHeight: number;
		/** A stable, unique key of an item. */
		key: (item: T) => string;
		/** Renders one row: the item and its index in `items`. */
		row: Snippet<[T, number]>;
		/** Rows rendered beyond each edge of the view, so fast scrolling shows no gap. */
		overscan?: number;
		/** The index of a row rendered even when out of view, such as the active or focused row. */
		keepIndex?: number;
	} = $props();

	let viewport: HTMLDivElement | undefined;
	let scrollTop = $state(0);
	let viewportHeight = $state(0);

	const range = $derived(
		visibleRange({ count: items.length, itemHeight, scrollTop, viewportHeight, overscan })
	);
	const visible = $derived.by(() => {
		const inView = items
			.slice(range.start, range.end)
			.map((item, offset) => ({ item, index: range.start + offset }));
		if (keepIndex === undefined || keepIndex < 0 || keepIndex >= items.length) return inView;
		if (keepIndex >= range.start && keepIndex < range.end) return inView;
		// In list order, so the DOM order stays the reading order.
		const entry = { item: items[keepIndex], index: keepIndex };
		return keepIndex < range.start ? [entry, ...inView] : [...inView, entry];
	});

	/** Scrolls the least needed to show the row at `index` entirely. */
	export function scrollToIndex(index: number): void {
		if (!viewport) return;
		const top = index * itemHeight;
		const bottom = top + itemHeight;
		if (top < viewport.scrollTop) viewport.scrollTop = top;
		else if (bottom > viewport.scrollTop + viewport.clientHeight)
			viewport.scrollTop = bottom - viewport.clientHeight;
		scrollTop = viewport.scrollTop;
	}

	function measure(node: HTMLDivElement) {
		viewport = node;
		viewportHeight = node.clientHeight;
		const observer = new ResizeObserver(() => (viewportHeight = node.clientHeight));
		observer.observe(node);
		return () => {
			observer.disconnect();
			viewport = undefined;
		};
	}
</script>

<div
	data-slot="virtual-list"
	{...rest}
	{@attach measure}
	class={cn('relative overflow-auto', className)}
	onscroll={(event) => {
		scrollTop = event.currentTarget.scrollTop;
		onscroll?.(event);
	}}
>
	<div class="relative" style:height="{items.length * itemHeight}px">
		{#each visible as entry (key(entry.item))}
			<div
				class="absolute inset-x-0 top-0"
				style:height="{itemHeight}px"
				style:transform="translateY({entry.index * itemHeight}px)"
			>
				{@render row(entry.item, entry.index)}
			</div>
		{/each}
	</div>
</div>
