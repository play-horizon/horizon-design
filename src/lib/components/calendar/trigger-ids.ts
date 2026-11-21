/**
 * The ids of the calendar's previous and next buttons, which both Ark's date picker (through its
 * `ids`) and their tooltips find them by: `Calendar` and `DatePicker` pass the same ids to their
 * root and to `CalendarViews`.
 * @module
 */
import type { DatePickerDateView } from '@ark-ui/svelte/date-picker';

/** The previous and next buttons' ids, for each view. */
export interface CalendarTriggerIds {
	prevTrigger: (view: DatePickerDateView) => string;
	nextTrigger: (view: DatePickerDateView) => string;
}

/** The ids of the previous and next buttons of the calendar whose unique id is `uid`. */
export function calendarTriggerIds(uid: string): CalendarTriggerIds {
	return {
		prevTrigger: (view) => `${uid}-previous-${view}`,
		nextTrigger: (view) => `${uid}-next-${view}`
	};
}
