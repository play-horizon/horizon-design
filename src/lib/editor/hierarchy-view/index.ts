/**
 * The hierarchy view entry point: `HierarchyView`.
 * @module
 */
export { default as HierarchyView } from './HierarchyView.svelte';

export type AnyNode = {
	id?: string;
	name?: string;
	label?: string;
	children?: AnyNode[];
	[key: string]: unknown;
};
