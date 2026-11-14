/**
 * Tests of `Toaster`: its region and each toast's close button are named by the app's labels.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { flushSync } from 'svelte';
import { render } from '@testing-library/svelte';
import { createToaster } from '@ark-ui/svelte';
import Toaster from './Toaster.svelte';

describe('Toaster', () => {
	it('names its region and the close buttons', async () => {
		const toaster = createToaster({ placement: 'bottom-end' });
		const { getByRole, findByRole } = render(Toaster, {
			toaster,
			label: 'Notifications',
			closeLabel: 'Close'
		});
		expect(getByRole('region', { name: 'Notifications' })).toBeTruthy();

		flushSync(() => toaster.create({ title: 'Saved', type: 'success' }));
		expect(await findByRole('button', { name: 'Close' })).toBeTruthy();
		expect(getByRole('status', { name: 'Saved' })).toBeTruthy();
	});
});
