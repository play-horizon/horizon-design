/**
 * Tests of `Toaster`: its region and each toast's close button are named by the app's labels, and
 * a loading toast shows a spinner.
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

	it('shows a spinner on a loading toast, and only there', async () => {
		const toaster = createToaster({ placement: 'bottom-end' });
		const { findByRole } = render(Toaster, {
			toaster,
			label: 'Notifications',
			closeLabel: 'Close'
		});
		flushSync(() => toaster.create({ title: 'Uploading', type: 'loading' }));
		flushSync(() => toaster.create({ title: 'Saved', type: 'success' }));
		const loading = await findByRole('status', { name: 'Uploading' });
		const saved = await findByRole('status', { name: 'Saved' });
		expect(loading.querySelector('[data-slot="spinner"]')).not.toBeNull();
		expect(loading.className).toContain('border-border');
		expect(saved.querySelector('[data-slot="spinner"]')).toBeNull();
	});
});
