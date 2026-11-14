/**
 * Tests of the page motion helpers: the change applied directly without View Transitions or with
 * reduced motion, and the slide direction set on `<html>` for the length of a transition.
 * @module
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { setMedia } from '../../test/setup';
import { crossfadePage, slidePage } from './page-transition';

/** A stand-in for `document.startViewTransition` whose transition finishes when told to. */
function fakeViewTransitions() {
	let finish = () => {};
	const start = vi.fn((update: () => void | Promise<void>) => {
		const updateCallbackDone = Promise.resolve().then(update);
		const finished = new Promise<void>((resolve) => (finish = resolve)).then(() => undefined);
		return { updateCallbackDone, finished, ready: finished, skipTransition: () => {} };
	});
	Object.defineProperty(document, 'startViewTransition', { value: start, configurable: true });
	return { start, finish: () => finish() };
}

afterEach(() => {
	Reflect.deleteProperty(document, 'startViewTransition');
});

describe('slidePage', () => {
	it('just applies the change without View Transitions', async () => {
		const update = vi.fn();
		await slidePage('forward', update);
		expect(update).toHaveBeenCalledOnce();
		expect(document.documentElement.dataset.slide).toBeUndefined();
	});

	it('sets the direction for the length of the slide', async () => {
		const fake = fakeViewTransitions();
		const update = vi.fn();
		await slidePage('backward', update);
		expect(update).toHaveBeenCalledOnce();
		expect(document.documentElement.dataset.slide).toBe('backward');
		fake.finish();
		await vi.waitFor(() => expect(document.documentElement.dataset.slide).toBeUndefined());
	});

	it('skips the transition when the system asks for reduced motion', async () => {
		const fake = fakeViewTransitions();
		setMedia('(prefers-reduced-motion: reduce)', true);
		const update = vi.fn();
		await slidePage('forward', update);
		expect(update).toHaveBeenCalledOnce();
		expect(fake.start).not.toHaveBeenCalled();
	});
});

describe('crossfadePage', () => {
	it('freezes other transitions while the crossfade runs', async () => {
		const fake = fakeViewTransitions();
		const done = crossfadePage(() => {});
		expect(document.documentElement.dataset.crossfade).toBe('');
		fake.finish();
		await done;
		expect(document.documentElement.dataset.crossfade).toBeUndefined();
	});
});
