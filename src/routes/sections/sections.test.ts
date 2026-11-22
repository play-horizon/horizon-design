/**
 * Tests of the docs site's component pages: every page of the navigation loads through the
 * route's own `load` and mounts without an error, so a page whose example breaks (a bound value
 * its component refuses) fails here rather than as a 500 on the published site.
 * @module
 */
import { render } from '@testing-library/svelte';
import { describe, it } from 'vitest';
import { navigationGroups } from '../navigation';
import { load } from '../[section]/+page';

type LoadEvent = Parameters<typeof load>[0];

describe('the docs pages', () => {
	const ids = navigationGroups.flatMap((group) => group.items.map((item) => item.id));

	// The first page compiles the kit, which takes longer than the default 5 s.
	it.each(ids)('load and mount the %s page', { timeout: 30_000 }, async (id) => {
		const { component } = (await load({ params: { section: id } } as LoadEvent)) as {
			component: import('svelte').Component;
		};
		const { unmount } = render(component);
		unmount();
	});
});
