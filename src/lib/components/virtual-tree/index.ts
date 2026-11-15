/**
 * The virtualised tree: `VirtualTree`, and Ark's `createTreeCollection` that builds its nodes, with
 * the types its props use.
 * @module
 */
export { default as VirtualTree } from './VirtualTree.svelte';
export { createTreeCollection } from '@ark-ui/svelte';
export type {
	TreeCollection,
	TreeNode,
	TreeViewNodeState,
	TreeViewRenameCompleteDetails
} from '@ark-ui/svelte';
