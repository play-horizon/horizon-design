/**
 * The hierarchy view entry point: `HierarchyView` and its node type, `AnyNode`.
 * @module
 */
export { default as HierarchyView } from './HierarchyView.svelte';

/**
 * A node of `HierarchyView`'s tree: an object of the scene and the objects below it. The view
 * reads its value and name through `nodeToValue` and `nodeToString` (by default `id`, then
 * `name`, and `name`, then `label`), writes a new name through `nodeWithName` (by default into
 * `name`), and keeps every other field as it is.
 */
export type AnyNode = {
	id?: string;
	name?: string;
	label?: string;
	children?: AnyNode[];
	[key: string]: unknown;
};
