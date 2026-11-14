/**
 * The command palette's search: which commands match what was typed, and in which order. Two
 * libraries share the work, each doing what it is good at:
 *
 * - fuzzysort finds the candidates and ranks them. Its targets (each command's label, group and
 *   keywords) are prepared once per command list, in a snapshot, and every keystroke searches the
 *   snapshot. It ignores case and accents itself ("creer" finds "Créer"), and its letter filter
 *   discards at once every command that lacks a typed letter, so the slower collator below only
 *   sees the candidates.
 * - Ark's `useFilter` (an `Intl.Collator` at base sensitivity, in the locale of Ark's
 *   `LocaleProvider`) then keeps only the candidates in which every typed word appears whole, in
 *   one run, ignoring case and accents as that locale does: fuzzysort alone would also accept the
 *   letters of a word scattered across the label ("odc" in "Open docs").
 *
 * Commands whose label alone holds every word come before those that need their group or a
 * keyword, then the better fuzzysort score comes first; equal scores keep the given order.
 * @module
 */
import fuzzysort from 'fuzzysort';
import type { UseFilterReturn } from '@ark-ui/svelte/locale';

/** A command the palette can run. */
export interface Command {
	/** A stable, unique id, without whitespace: it is part of the DOM ids of the list. */
	id: string;
	/** The command's name, translated. */
	label: string;
	/** The group it belongs to ("View", "Scene"), translated; shown beside it and searched. */
	group?: string;
	/** Its current shortcut, formatted ("Ctrl Shift P"). */
	shortcut?: string;
	/** Other words that find it, translated. */
	keywords?: readonly string[];
	/** Shown greyed out and not run, such as a command that needs a selection. */
	disabled?: boolean;
}

/** The locale-aware text tests of Ark's `useFilter`, as its accessor returns them. */
export type TextFilter = ReturnType<UseFilterReturn>;

/**
 * Searches one list of commands: the commands that match `query`, best first (see the module
 * header). An empty or blank query matches every command, in the given order.
 */
export type CommandSearch = (query: string, filter: TextFilter) => readonly Command[];

/**
 * Prepares the search of `commands`: call it again only when the list changes, and call the
 * returned function on every keystroke.
 *
 * @example
 * const search = createCommandSearch([
 * 	{ id: 'open', label: 'Open docs', group: 'Help' },
 * 	{ id: 'panel', label: 'Docs panel', group: 'Panels' }
 * ]);
 * search('help docs', filter); // [Open docs]: "help" is its group, "docs" in its label
 */
export function createCommandSearch(commands: readonly Command[]): CommandSearch {
	const targets = fuzzysort.snapshot(commands, {
		keys: [
			(command) => command.label,
			(command) => command.group,
			(command) => command.keywords?.join(' ')
		]
	});

	return (query, filter) => {
		const words = query.split(/\s+/).filter(Boolean);
		if (words.length === 0) return commands;
		// `threshold: 0` keeps every candidate and `limit: 0` lifts the default of ten results.
		const scores = new Map(
			fuzzysort
				.go(query.trim(), targets, { threshold: 0, limit: 0 })
				.map((result) => [result.obj, result.score])
		);
		const containsEveryWord = (texts: readonly string[]) =>
			words.every((word) => texts.some((text) => filter.contains(text, word)));
		const ranked = commands.flatMap((command) => {
			const score = scores.get(command);
			if (score === undefined) return [];
			if (containsEveryWord([command.label])) return [{ command, score, byLabel: true }];
			const texts = [command.label, command.group ?? '', ...(command.keywords ?? [])];
			return containsEveryWord(texts) ? [{ command, score, byLabel: false }] : [];
		});
		// `sort` is stable, so equal scores keep the given order.
		return ranked
			.sort((a, b) => Number(b.byLabel) - Number(a.byLabel) || b.score - a.score)
			.map((entry) => entry.command);
	};
}
