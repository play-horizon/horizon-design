/**
 * Tests of `InspectorPanel`: opening and closing cards, moving the focus between headers,
 * reordering with the keyboard and by drag, and the ids it reports.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { tick } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import { dragOver, drop, startDrag } from '../../../test/drag';
import InspectorPanel from './InspectorPanel.svelte';

const cards = [
	{ id: 'transform', title: 'Transform' },
	{ id: 'mesh', title: 'Mesh' },
	{ id: 'collider', title: 'Collider' }
];

function setup(expandedIds: string[] = []) {
	const onCardsChange = vi.fn();
	const onExpandedChange = vi.fn();
	const result = render(InspectorPanel, {
		cards,
		expandedIds,
		onCardsChange,
		onExpandedChange
	});
	const header = (title: string) => result.getByRole('button', { name: title });
	const order = () => onCardsChange.mock.lastCall![0].map((c: { id: string }) => c.id);
	return { ...result, header, order, onCardsChange, onExpandedChange };
}

describe('InspectorPanel', () => {
	it('opens and closes a card from its header, and keeps a closed body out of reach', async () => {
		const { header, onExpandedChange } = setup();
		const transform = header('Transform');
		const body = document.getElementById(transform.getAttribute('aria-controls')!)!;
		expect(transform.getAttribute('aria-expanded')).toBe('false');
		expect(body.inert).toBe(true);

		await fireEvent.click(transform);
		expect(onExpandedChange).toHaveBeenLastCalledWith(['transform']);
		expect(transform.getAttribute('aria-expanded')).toBe('true');
		expect(body.inert).toBe(false);

		await fireEvent.click(transform);
		expect(onExpandedChange).toHaveBeenLastCalledWith([]);
	});

	it('leaves out the ids of cards no longer shown', async () => {
		const { header, onExpandedChange } = setup(['transform', 'removed']);
		await fireEvent.click(header('Mesh'));
		expect(onExpandedChange).toHaveBeenLastCalledWith(['transform', 'mesh']);
	});

	it('moves the focus between headers with the arrows, Home and End', async () => {
		const { header } = setup();
		header('Transform').focus();
		await fireEvent.keyDown(header('Transform'), { key: 'ArrowDown' });
		expect(document.activeElement).toBe(header('Mesh'));
		await fireEvent.keyDown(header('Mesh'), { key: 'End' });
		expect(document.activeElement).toBe(header('Collider'));
		await fireEvent.keyDown(header('Collider'), { key: 'ArrowDown' });
		expect(document.activeElement).toBe(header('Transform'));
		await fireEvent.keyDown(header('Transform'), { key: 'ArrowUp' });
		expect(document.activeElement).toBe(header('Collider'));
		await fireEvent.keyDown(header('Collider'), { key: 'Home' });
		expect(document.activeElement).toBe(header('Transform'));
	});

	it('moves a card with Shift+arrows and keeps the focus on it', async () => {
		const { header, order, onCardsChange } = setup();
		header('Transform').focus();
		await fireEvent.keyDown(header('Transform'), { key: 'ArrowDown', shiftKey: true });
		await tick();
		expect(order()).toEqual(['mesh', 'transform', 'collider']);
		expect(document.activeElement).toBe(header('Transform'));

		await fireEvent.keyDown(header('Mesh'), { key: 'ArrowUp', shiftKey: true });
		expect(onCardsChange).toHaveBeenCalledTimes(1);
	});

	it('moves a dropped card before or after the card under the pointer, and none dropped in place', async () => {
		const { container, order, onCardsChange } = setup();
		const rows = [...container.querySelectorAll<HTMLElement>('[data-slot="inspector-panel-card"]')];
		rows.forEach((row, i) => {
			row.getBoundingClientRect = () => new DOMRect(0, i * 40, 200, 40);
		});
		const handle = rows[0].querySelector<HTMLElement>('[data-slot="inspector-panel-handle"]')!;
		// Pointer only: assistive technologies reorder with the header's Shift+arrows.
		expect(handle.getAttribute('aria-hidden')).toBe('true');

		let drag = await startDrag(handle, { clientX: 10, clientY: 10 });
		expect(vi.mocked(drag.setDragImage).mock.calls[0][0].textContent).toBe('Transform');
		// Mesh's upper half (40 to 60): just before Mesh, which is where Transform already is.
		await drop(rows[1], { clientX: 10, clientY: 50 }, drag);
		expect(onCardsChange).not.toHaveBeenCalled();

		drag = await startDrag(handle, { clientX: 10, clientY: 10 });
		// Collider's lower half (100 to 120): after the last card, the line drawn below it.
		await dragOver(rows[2], { clientX: 10, clientY: 110 }, drag);
		expect(rows[2].querySelector('.-bottom-0\\.75')).not.toBeNull();
		await drop(rows[2], { clientX: 10, clientY: 110 }, drag);
		expect(order()).toEqual(['mesh', 'collider', 'transform']);
	});

	it('moves nothing when the card is dropped outside the panel', async () => {
		const { container, onCardsChange } = setup();
		const rows = [...container.querySelectorAll<HTMLElement>('[data-slot="inspector-panel-card"]')];
		rows.forEach((row, i) => {
			row.getBoundingClientRect = () => new DOMRect(0, i * 40, 200, 40);
		});
		const handle = rows[0].querySelector<HTMLElement>('[data-slot="inspector-panel-handle"]')!;
		const elsewhere = document.body.appendChild(document.createElement('div'));

		const drag = await startDrag(handle, { clientX: 10, clientY: 10 });
		// Mesh's lower half, then out of the panel.
		await dragOver(rows[1], { clientX: 10, clientY: 70 }, drag);
		await drop(elsewhere, { clientX: 500, clientY: 500 }, drag);
		expect(onCardsChange).not.toHaveBeenCalled();
		elsewhere.remove();
	});
});
