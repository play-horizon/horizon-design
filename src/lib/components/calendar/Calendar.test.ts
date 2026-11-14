/**
 * Tests of `Calendar`: every string announced comes from `translations` rather than from Ark's
 * English defaults, the next button moves a month, and picking a day reports it.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import { parseDate } from '@ark-ui/svelte/date-picker';
import Calendar from './Calendar.svelte';

const translations = {
	dayCell: (day: { valueText: string }) => `Pick ${day.valueText}`,
	prevTrigger: (view: string) => `Before ${view}`,
	nextTrigger: (view: string) => `After ${view}`,
	viewTrigger: (view: string) => `Change ${view}`,
	tableRoleDescription: (view: string) => `grid of ${view}`
};

/** The English names and roles Ark's calendar gives its parts when the app gives none. */
const arkEnglish = ['calendar', 'Switch to', 'Choose ', 'Selected date'];

/** Every name, role and value text the document announces. */
function announcedStrings(): string[] {
	const attributes = ['aria-label', 'aria-roledescription', 'aria-valuetext', 'title'];
	return [...document.querySelectorAll('*')].flatMap((element) =>
		attributes.flatMap((attribute) => element.getAttribute(attribute) ?? [])
	);
}

describe('Calendar', () => {
	it('announces only the strings of translations', () => {
		render(Calendar, {
			locale: 'en-GB',
			defaultFocusedValue: parseDate('2026-03-10'),
			translations
		});
		const roles = [...document.querySelectorAll('[aria-roledescription]')].map((element) =>
			element.getAttribute('aria-roledescription')
		);
		expect(roles).toEqual(['grid of day', 'grid of month', 'grid of year']);
		const announced = announcedStrings();
		expect(announced).toContain('Pick Tuesday, 10 March 2026');
		expect(
			announced.filter((text) => arkEnglish.some((english) => text.includes(english)))
		).toEqual([]);
	});

	it('moves a month with the next button and reports the day picked', async () => {
		const onValueChange = vi.fn();
		const { getByRole } = render(Calendar, {
			locale: 'en-GB',
			timeZone: 'UTC',
			defaultFocusedValue: parseDate('2026-03-10'),
			onValueChange,
			translations
		});
		const viewTrigger = getByRole('button', { name: 'Change day' });
		expect(viewTrigger.textContent?.trim()).toBe('March 2026');
		await fireEvent.click(getByRole('button', { name: 'After day' }));
		expect(viewTrigger.textContent?.trim()).toBe('April 2026');
		await fireEvent.click(getByRole('button', { name: 'Pick Friday, 17 April 2026' }));
		expect(onValueChange).toHaveBeenLastCalledWith(
			expect.objectContaining({ valueAsString: ['17/04/2026'] })
		);
	});
});
