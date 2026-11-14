/**
 * Loads one component page of the docs site: its live examples, from `sections/<Name>.svelte`.
 * Every page in the navigation is prerendered.
 * @module
 */
import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import { navGroups } from '../nav';
import type { EntryGenerator, PageLoad } from './$types';

const sections = import.meta.glob<{ default: Component }>('../sections/*.svelte');

function fileOf(id: string): string {
	const name = id.replace(/(^|-)([a-z])/g, (_, __, letter: string) => letter.toUpperCase());
	return `../sections/${name}.svelte`;
}

export const entries: EntryGenerator = () =>
	navGroups.flatMap((group) => group.items.map((item) => ({ section: item.id })));

export const load: PageLoad = async ({ params }) => {
	const group = navGroups.find((g) => g.items.some((i) => i.id === params.section));
	const item = group?.items.find((i) => i.id === params.section);
	const loader = sections[fileOf(params.section)];
	if (!group || !item || !loader) error(404, `No component page "${params.section}"`);
	const { default: component } = await loader();
	return { component, label: item.label, group: group.group, kit: group.kit };
};
