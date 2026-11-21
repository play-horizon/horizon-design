/**
 * Native drag and drop in component tests. jsdom has no `DragEvent` and no `DataTransfer`, which
 * pragmatic-drag-and-drop (the Editor's drag and drop) listens to: this module adds a `DragEvent`
 * and fires the events a browser fires while the user drags from one element to another.
 * @module
 */
import { fireEvent } from '@testing-library/svelte';
import { vi } from 'vitest';

class TestDragEvent extends MouseEvent {
	readonly dataTransfer: DataTransfer | null;

	constructor(type: string, options: DragEventInit = {}) {
		super(type, options);
		this.dataTransfer = options.dataTransfer ?? null;
	}
}

window.DragEvent ??= TestDragEvent as typeof DragEvent;

/** A point of the window, in client pixels. */
export type Point = { clientX: number; clientY: number };

/** pragmatic-drag-and-drop reports a drag's start and its moves in the next animation frame. */
const frame = () => new Promise((resolve) => requestAnimationFrame(resolve));

/**
 * The data store of one drag: what a drag's events share. `setDragImage` is a mock, so a test can
 * read the drag image set.
 */
export function createDataTransfer(): DataTransfer {
	const data = new Map<string, string>();
	return {
		dropEffect: 'none',
		effectAllowed: 'all',
		files: [],
		items: [],
		get types() {
			return [...data.keys()];
		},
		setData: (type: string, value: string) => void data.set(type, value),
		getData: (type: string) => data.get(type) ?? '',
		clearData: () => data.clear(),
		setDragImage: vi.fn()
	} as unknown as DataTransfer;
}

/** Starts a drag of `source` from `at`, and returns the drag's data store. */
export async function startDrag(source: Element, at: Point): Promise<DataTransfer> {
	const dataTransfer = createDataTransfer();
	await fireEvent(
		source,
		new DragEvent('dragstart', { bubbles: true, cancelable: true, dataTransfer, ...at })
	);
	await frame();
	return dataTransfer;
}

/** Drags over `target` at `at`, as the pointer enters it and moves on it. */
export async function dragOver(
	target: Element,
	at: Point,
	dataTransfer: DataTransfer
): Promise<void> {
	for (const type of ['dragenter', 'dragover']) {
		await fireEvent(
			target,
			new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer, ...at })
		);
	}
	await frame();
}

/** Drops on `target` at `at`: drags over it, then releases. */
export async function drop(target: Element, at: Point, dataTransfer: DataTransfer): Promise<void> {
	await dragOver(target, at, dataTransfer);
	await fireEvent(
		target,
		new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer, ...at })
	);
}

/** Ends a drag of `source` without a drop, as Escape or a release outside every target does. */
export async function cancelDrag(source: Element, dataTransfer: DataTransfer): Promise<void> {
	await fireEvent(
		source,
		new DragEvent('dragend', { bubbles: true, cancelable: true, dataTransfer })
	);
}
