/**
 * Tests of `FileUpload`: the dropzone is a button named by its text (the prompt and the hint)
 * rather than Ark's English default, holding no other control, and a disabled one is marked so,
 * which dims it.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import FileUpload from './FileUpload.svelte';

describe('FileUpload', () => {
	it('names the dropzone by its prompt and hint, and nests no file input in it', () => {
		const { getByRole } = render(FileUpload, {
			prompt: 'Drop images here or browse',
			hint: 'PNG or WebP'
		});
		const dropzone = getByRole('button', { name: 'Drop images here or browse PNG or WebP' });
		expect(dropzone.querySelector('input')).toBeNull();
	});

	it('marks a disabled dropzone', () => {
		const { getByRole } = render(FileUpload, { prompt: 'Drop images here', disabled: true });
		const dropzone = getByRole('button', { name: 'Drop images here' });
		expect(dropzone.getAttribute('aria-disabled')).toBe('true');
		expect(dropzone.hasAttribute('data-disabled')).toBe(true);
	});
});
