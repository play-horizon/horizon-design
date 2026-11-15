/**
 * The window arithmetic of `VirtualList`: which rows of a fixed-row-height list are in view.
 * @module
 */

/** A half-open range of row indexes: `start` included, `end` excluded. */
export interface RowRange {
	start: number;
	end: number;
}

/**
 * The rows to render: those that intersect the view, plus `overscan` rows on each side, clamped
 * to the list.
 *
 * @example
 * visibleRange({ count: 1000, itemHeight: 20, scrollTop: 400, viewportHeight: 100, overscan: 2 });
 * // { start: 18, end: 27 }: rows 20–24 are in view
 */
export function visibleRange({
	count,
	itemHeight,
	scrollTop,
	viewportHeight,
	overscan
}: {
	count: number;
	itemHeight: number;
	scrollTop: number;
	viewportHeight: number;
	overscan: number;
}): RowRange {
	if (count === 0 || itemHeight <= 0) return { start: 0, end: 0 };
	const first = Math.floor(scrollTop / itemHeight);
	const last = Math.ceil((scrollTop + viewportHeight) / itemHeight);
	return {
		start: Math.max(0, first - overscan),
		end: Math.min(count, last + overscan)
	};
}
