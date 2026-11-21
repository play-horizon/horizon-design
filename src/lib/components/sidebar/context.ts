/**
 * The context a `Sidebar` gives its `SidebarItem`s: whether it is collapsed, so each item shows
 * its text as a tooltip while only its icon is visible.
 * @module
 */
import { createContext } from 'svelte';

/** What a `Sidebar` tells its items. */
export interface SidebarContext {
	/** Whether the sidebar is narrowed to its icons (reactive). */
	readonly collapsed: boolean;
}

const [getContext, setContext, hasContext] = createContext<SidebarContext>();

/** Gives the items under the calling `Sidebar` its state. */
export function setSidebarContext(context: SidebarContext): void {
	setContext(context);
}

/** The state of the `Sidebar` around the calling item, or `undefined` outside any sidebar. */
export function sidebarContext(): SidebarContext | undefined {
	return hasContext() ? getContext() : undefined;
}
