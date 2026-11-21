/**
 * The context a `Dialog` (or a `Sheet`, also an Ark dialog) gives the `DialogClose` buttons inside
 * it: its close button's id, which Ark's dialog finds the button by (it focuses it first in an alert
 * dialog), so an icon `DialogClose` gives its tooltip that same id.
 * @module
 */
import { createContext } from 'svelte';

/** What a dialog tells its close buttons. */
export interface DialogContext {
	/** The id the dialog gives its close button (Ark's `ids.closeTrigger`). */
	closeTriggerId: string;
}

const [getContext, setContext, hasContext] = createContext<DialogContext>();

/** Gives the close buttons inside the calling dialog its close button's id. */
export function setDialogContext(context: DialogContext): void {
	setContext(context);
}

/** The context of the dialog around the calling button, or `undefined` outside one of the kit's. */
export function dialogContext(): DialogContext | undefined {
	return hasContext() ? getContext() : undefined;
}
