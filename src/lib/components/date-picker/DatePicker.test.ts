/**
 * Tests of `DatePicker`: the label names the field, every string announced comes from the app
 * rather than from Ark's English defaults, picking a day binds `value` and fills the field, the
 * calendar button shows its name in a tooltip, and `openOnClick` opens the calendar from the field.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { parseDate, type DateValue } from '@ark-ui/svelte/date-picker';
import DatePicker from './DatePicker.svelte';
import { expectTooltip } from '../../../test/tooltip';

const translations = {
	trigger: (open: boolean) => (open ? 'Hide days' : 'Show days'),
	content: 'Days',
	dayCell: (day: { valueText: string }) => `Pick ${day.valueText}`,
	prevTrigger: (view: string) => `Before ${view}`,
	nextTrigger: (view: string) => `After ${view}`,
	viewTrigger: (view: string) => `Change ${view}`,
	contentRoleDescription: 'day chooser',
	tableRoleDescription: (view: string) => `grid of ${view}`
};

/** The English names and roles Ark's date picker gives its parts when the app gives none. */
const arkEnglish = [
	'Open calendar',
	'Close calendar',
	'calendar',
	'datepicker',
	'Switch to',
	'Choose ',
	'Selected date'
];

/** Every name, role and value text the document announces. */
function announcedStrings(): string[] {
	const attributes = ['aria-label', 'aria-roledescription', 'aria-valuetext', 'title'];
	return [...document.querySelectorAll('*')].flatMap((element) =>
		attributes.flatMap((attribute) => element.getAttribute(attribute) ?? [])
	);
}

describe('DatePicker', () => {
	it('announces only the strings of the app', async () => {
		const { getByRole } = render(DatePicker, {
			label: 'Release date',
			locale: 'en-GB',
			defaultFocusedValue: parseDate('2026-03-10'),
			translations
		});
		expect(getByRole('textbox', { name: 'Release date' })).toBeTruthy();
		await fireEvent.click(getByRole('button', { name: 'Show days' }));
		const roles = [...document.querySelectorAll('[aria-roledescription]')].map((element) =>
			element.getAttribute('aria-roledescription')
		);
		expect(roles).toEqual(['day chooser', 'grid of day', 'grid of month', 'grid of year']);
		const announced = announcedStrings();
		expect(announced).toContain('Hide days');
		expect(announced).toContain('Days');
		expect(announced).toContain('Pick Sunday, 15 March 2026');
		expect(
			announced.filter((text) => arkEnglish.some((english) => text.includes(english)))
		).toEqual([]);
	});

	it('binds the day picked and shows it in the field', async () => {
		let bound: DateValue[] | undefined;
		const { getByRole } = render(DatePicker, {
			label: 'Release date',
			locale: 'en-GB',
			timeZone: 'UTC',
			defaultFocusedValue: parseDate('2026-03-10'),
			translations,
			// An accessor pair is how Svelte passes `bind:value`.
			get value() {
				return bound;
			},
			set value(next: DateValue[] | undefined) {
				bound = next;
			}
		});
		await fireEvent.click(getByRole('button', { name: 'Show days' }));
		await fireEvent.click(getByRole('button', { name: 'Pick Sunday, 15 March 2026' }));
		expect(bound?.map(String)).toEqual(['2026-03-15']);
		expect((getByRole('textbox', { name: 'Release date' }) as HTMLInputElement).value).toBe(
			'15/03/2026'
		);
	});

	it('names the calendar button in its tooltip', async () => {
		const { getByRole } = render(DatePicker, { label: 'Release date', translations });
		await expectTooltip(getByRole('button', { name: 'Show days' }), 'Show days');
	});

	it('opens the calendar from a press on the field only with openOnClick', async () => {
		const content = () => document.querySelector('[data-slot="date-picker-content"]');
		const closed = render(DatePicker, { label: 'Release date', translations });
		await fireEvent.click(closed.getByRole('textbox', { name: 'Release date' }));
		expect(content()?.getAttribute('data-state')).toBe('closed');
		closed.unmount();

		const { getByRole } = render(DatePicker, {
			label: 'Release date',
			translations,
			openOnClick: true
		});
		const field = getByRole('textbox', { name: 'Release date' });
		const user = userEvent.setup();
		await user.click(field);
		await waitFor(() => expect(content()?.getAttribute('data-state')).toBe('open'));
		await user.keyboard('15');
		expect(document.activeElement).toBe(field);
		expect((field as HTMLInputElement).value).toBe('15');
	});
});
