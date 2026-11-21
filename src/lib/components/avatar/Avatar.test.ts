/**
 * Tests of `Avatar`: the same box with or without an image at every size (the image laid over the
 * disc, out of the layout), and its name for assistive technology.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Avatar from './Avatar.svelte';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

describe('Avatar', () => {
	it('has the same box with or without an image, at every size', () => {
		for (const size of sizes) {
			const initials = render(Avatar, { size, fallback: 'RM' });
			const box = initials.container.querySelector('[data-slot="avatar"]')?.className;
			initials.unmount();
			const image = render(Avatar, { size, fallback: 'RM', src: 'face.png' });
			expect(image.container.querySelector('[data-slot="avatar"]')?.className).toBe(box);
			const picture = image.container.querySelector('[data-slot="avatar-image"]');
			expect(picture?.classList.contains('absolute')).toBe(true);
			expect(picture?.classList.contains('inset-0')).toBe(true);
			image.unmount();
		}
	});

	it('is one named image with alt, and decorative without', () => {
		const named = render(Avatar, { fallback: 'RM', alt: 'Rayan M.' });
		expect(named.getByRole('img', { name: 'Rayan M.' })).toBeTruthy();
		named.unmount();
		const decorative = render(Avatar, { fallback: 'RM' });
		expect(
			decorative.container.querySelector('[data-slot="avatar"]')?.getAttribute('aria-hidden')
		).toBe('true');
	});
});
