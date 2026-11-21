/**
 * Tests of `slidingIndicator`: it writes the chosen button's box on the row, follows the choice,
 * and only slides once the indicator has been placed.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { slidingIndicator } from './sliding-indicator';

/** A button whose layout box is fixed, as jsdom has no layout. */
function button(left: number, width: number, pressed: boolean): HTMLButtonElement {
	const element = document.createElement('button');
	element.setAttribute('aria-pressed', String(pressed));
	Object.defineProperties(element, {
		offsetLeft: { value: left },
		offsetTop: { value: 2 },
		offsetWidth: { value: width },
		offsetHeight: { value: 24 }
	});
	return element;
}

const nextFrame = () => new Promise((done) => requestAnimationFrame(() => done(undefined)));

describe('slidingIndicator', () => {
	it('places the indicator on the chosen button, then slides it to the next choice', async () => {
		const row = document.createElement('div');
		const first = button(2, 26, true);
		const second = button(30, 40, false);
		row.append(first, second);
		document.body.append(row);
		const detach = slidingIndicator('[aria-pressed="true"]')(row);

		expect(row.style.getPropertyValue('--indicator-left')).toBe('2px');
		expect(row.style.getPropertyValue('--indicator-top')).toBe('2px');
		expect(row.style.getPropertyValue('--indicator-width')).toBe('26px');
		expect(row.style.getPropertyValue('--indicator-height')).toBe('24px');
		expect(row.dataset.indicator).toBe('placed');
		await nextFrame();
		expect(row.dataset.indicator).toBe('moving');

		first.setAttribute('aria-pressed', 'false');
		second.setAttribute('aria-pressed', 'true');
		await Promise.resolve();
		expect(row.style.getPropertyValue('--indicator-left')).toBe('30px');
		expect(row.style.getPropertyValue('--indicator-width')).toBe('40px');
		expect(row.dataset.indicator).toBe('moving');

		second.setAttribute('aria-pressed', 'false');
		await Promise.resolve();
		expect(row.dataset.indicator).toBe('none');

		if (typeof detach === 'function') detach();
		row.remove();
	});
});
